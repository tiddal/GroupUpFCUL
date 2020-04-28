const connection = require('../db/config/connection');
const errors = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

class MeetingController {
	constructor() {
		this.index = this.index.bind(this);
		this.store = this.store.bind(this);
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);

		this.findStudents = this.findStudents.bind(this);
		this.storeStudents = this.storeStudents.bind(this);
		this.removeStudents = this.removeStudents.bind(this);

		this.findTeam = this.findTeam.bind(this);
		this.findProject = this.findProject.bind(this);
		this.findStudentByUsername = this.findStudentByUsername.bind(this);
	}

	async index(request, response, next) {
		const team = await this.findTeam(request, response, next);
		if (!team) return next();
		const meetings = await connection('Meeting')
			.select(['meeting_number', 'topic', 'begins_at', 'ends_at'])
			.where({ team_id: team.id });
		return response.json(meetings);
	}

	async find(request, response, next) {
		const team = await this.findTeam(request, response, next);
		if (!team) return next();
		const { meeting_number } = request.params;
		const [meeting] = await connection('Meeting')
			.select(['meeting_number', 'topic', 'begins_at', 'ends_at'])
			.where({ meeting_number, team_id: team.id });
		if (!meeting)
			return next(errors.MEETING_NOT_FOUND(meeting_number, 'params'));
		return response.json(meeting_number);
	}

	async store(request, response, next) {
		const { id: user_id, role } = request.user;
		if (role !== 'student') return next(errors.INVALID_IDENTITY());
		const team = await this.findTeam(request, response, next);
		if (!team) return next();

		const [belongsToTeam] = await connection('team_student')
			.select('student_id')
			.where({
				student_id: user_id,
				team_id: team.id,
			});
		if (!belongsToTeam) return next(errors.INVALID_IDENTITY());

		let meeting_number = 1;
		const { topic, begins_at, ends_at } = request.body.meeting;
		const id = uuidv4();
		const { id: team_id } = team;
		const [existentMeeting] = await connection('Meeting')
			.select('meeting_number')
			.where({ team_id })
			.orderBy('meeting_number', 'desc')
			.limit(1);
		if (existentMeeting) meeting_number = existentMeeting.meeting_number + 1;
		try {
			const [meeting] = await connection('Meeting').insert(
				{
					id,
					team_id,
					meeting_number,
					topic,
					begins_at,
					ends_at,
				},
				['meeting_number', 'topic', 'begins_at', 'ends_at']
			);
			return response.status(201).json(meeting);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async modify(request, response, next) {
		const meeting = await this.findMeeting(request, response, next);
		if (!meeting) return next();

		const { id: student_id } = request.user;
		const [belongsToTeam] = await connection('team_student')
			.select('student_id')
			.where({
				student_id,
				team_id: meeting.team_id,
			});
		if (!belongsToTeam) return next(errors.INVALID_IDENTITY());

		const { topic, begins_at, ends_at } = request.body.meeting;
		const [updatedMeeting] = await connection('Meeting')
			.where(meeting)
			.update({ topic, begins_at, ends_at }, ['topic', 'begins_at', 'ends_at']);
		return response.json(updatedMeeting);
	}

	async remove(request, response, next) {
		const meeting = await this.findMeeting(request, response, next);
		if (!meeting) return next();
		const { id: student_id } = request.user;
		const [belongsToTeam] = await connection('team_student')
			.select('student_id')
			.where({
				student_id,
				team_id: meeting.team_id,
			});
		if (!belongsToTeam) return next(errors.INVALID_IDENTITY());
		await connection('Meeting').where(meeting).del();
		return response.status(204).send();
	}

	async findStudents(request, response, next) {
		const meeting = await this.findMeeting(request, response, next);
		if (!meeting) return next();
		const { id: meeting_id } = meeting;
		const students = await connection('meeting_student')
			.join('User', 'User.id', '=', 'meeting_student.student_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.avatar_url',
				'User.status',
			])
			.where({ meeting_id });
		return response.json(students);
	}

	async storeStudents(request, response, next) {
		const meeting = await this.findMeeting(request, response, next);
		if (!meeting) return next();
		const { id: student_id, username } = request.user;
		const { id: meeting_id, team_id } = meeting;

		const [userInTeam] = await connection('team_student')
			.select('*')
			.where({ team_id, student_id });
		if (!userInTeam) return next(errors.USER_NOT_FOUND(username, 'header'));
		try {
			await connection('meeting_student').insert({
				meeting_id,
				student_id,
			});
			return response.status(201).send();
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async removeStudents(request, response, next) {
		const meeting = await this.findMeeting(request, response, next);
		if (!meeting) return next();
		const { id: meeting_id } = meeting;
		const { id: student_id } = request.user;
		await connection('meeting_student').where({ student_id, meeting_id }).del();
		return response.status(204).send();
	}

	async findProject(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('Course').select('id').where({ code });
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		const { unit_code } = request.params;
		const [unit] = await connection('course_unit')
			.join('Unit', 'Unit.id', '=', 'course_unit.unit_id')
			.select('Unit.id')
			.where({
				'course_unit.course_id': course.id,
				'Unit.code': unit_code,
			});
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		const {
			project_year: academic_year,
			project_number: number,
		} = request.params;
		const [project] = await connection('Project')
			.select('id', 'academic_year', 'unit_id')
			.where({ academic_year, number, unit_id: unit.id });
		if (!project)
			return next(errors.PROJECT_NOT_FOUND(academic_year, number, 'params'));
		return project;
	}

	async findTeam(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const { team_number } = request.params;
		const [team] = await connection('Team')
			.select('id')
			.where({ team_number, project_id: project.id });
		if (!team) return next(errors.TEAM_NOT_FOUND(team_number, 'params'));
		return team;
	}

	async findMeeting(request, response, next) {
		const team = await this.findTeam(request, response, next);
		if (!team) return next();
		const { meeting_number } = request.params;
		const [meeting] = await connection('Meeting')
			.select('id', 'team_id')
			.where({ meeting_number, team_id: team.id });
		if (!meeting)
			return next(errors.MEETING_NOT_FOUND(meeting_number, 'params'));
		return meeting;
	}

	async findStudentByUsername(request, response, next) {
		const { student_username } = request.params;
		const [student] = await connection('Student')
			.join('User', 'User.id', '=', 'Student.user_id')
			.select(['User.id', 'User.username'])
			.where('User.username', student_username);
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(student_username, 'params'));
		return student;
	}
}

module.exports = new MeetingController();
