import React, { useState, useEffect } from 'react';
import moment from 'moment';
import studentService from '../../../services/student';

import { Container, Content, Title, Navigation, Link } from './styles';
import Context from '../../../components/Context';

import {
	FaUsers,
	FaArchive,
	FaClipboardList,
	FaHandshake,
	FaCalendarWeek,
} from 'react-icons/fa';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import Members from './Members';
import Stages from './Stages';
import Tasks from './Tasks';
import Meetings from './Meetings';
import Schedules from './Schedules';
import { useAuth } from '../../../hooks';
import Spinner from '../../../components/Spinner';

function Team() {
	const {
		path,
		url,
		params: { unit, project, team },
	} = useRouteMatch();
	const history = useHistory();
	const { user } = useAuth();
	const [unitData, setUnitData] = useState();
	const [projectData, setProjectData] = useState();
	const [stagesData, setStagesData] = useState();
	const [teamData, setTeamData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [selectedStage, setSelectedStage] = useState();
	const [meetingsData, setMeetingsData] = useState();
	const [tasksData, setTasksData] = useState();

	useEffect(() => {
		async function getInitialState() {
			const classes = await studentService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const [unitData] = classes.filter(
				(class_) => class_.code.toString() === unit
			);
			setUnitData(unitData);
			const projectData = await studentService.get.project(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project
			);
			const stagesData = await studentService.get.stages(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project
			);
			const teamData = await studentService.get.team(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project,
				team
			);
			if (teamData.response) return history.push('/');
			const members = await studentService.get.teamMembers(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project,
				team
			);
			teamData.pendingMembers = members.filter(
				(member) => member.role === 'pending'
			);
			teamData.members = members.filter((member) => member.role !== 'pending');
			teamData.owner = members.find((member) => member.role === 'owner');
			const inTeam = teamData.members.find(
				(member) => member.username === user.username
			);
			if (!inTeam) return history.push('/');
			teamData.members.sort((a, b) => {
				if (a.role < b.role) return 1;
				if (a.role > b.role) return -1;
				return 0;
			});
			teamData.max_members = projectData.max_students;
			const teamRatings = await studentService.get.teamRates(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project,
				team
			);
			teamData.teamRatings = teamRatings;
			const stages = {};
			for (let stage of stagesData) {
				const submission = await studentService.get.submission(
					unitData.course_code,
					unitData.code,
					'2019-2020',
					project,
					stage.stage_number,
					team
				);
				stages[`stage${stage.stage_number}`] = {
					number: stage.stage_number,
					due_date: moment
						.utc(stage.end_date)
						.local()
						.format('DD/MM/YYYY, HH[h]mm'),
					weight: stage.weight,
					assignment_url: stage.assignment_url,
					description: stage.description,
					artifacts: submission.artifacts || [],
					feedback: submission.stage_feedback || '',
					grade: submission.stage_grade || '--',
				};
			}
			const meetingsData = [];
			const meetings = await studentService.get.meetings(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project,
				team
			);
			for (let meeting of meetings) {
				const confirmed_members = await studentService.get.meetingMembers(
					unitData.course_code,
					unitData.code,
					'2019-2020',
					project,
					team,
					meeting.meeting_number
				);
				meeting.number = meeting.meeting_number;
				meeting.confirmed_members = confirmed_members;
				meeting.inputs = [
					{
						id: 'date',
						type: 'date',
						label: 'Data',
						value: meeting.begins_at.split('T')[0],
						validation: { required: false },
						valid: false,
						error: false,
						info: '',
					},
					{
						id: 'time',
						type: 'time',
						label: 'Horas',
						value: moment(meeting.begins_at).format('HH:mm'),
						validation: { required: false },
						valid: false,
						error: false,
						info: '',
					},
					{
						id: 'topic',
						type: 'text',
						label: 'Tópico',
						value: meeting.topic,
						validation: { required: false },
						valid: false,
						error: false,
						info: '',
					},
				];
				delete meeting.meeting_number;
				delete meeting.topic;
				delete meeting.begins_at;
				delete meeting.ends_at;
				meetingsData.push(meeting);
			}

			const tasks = await studentService.get.tasks(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project,
				team
			);
			const tasksData = [];
			for (let task of tasks) {
				const taskData = {
					number: parseInt(task.task_number),
					performed_by: task.username
						? `${task.first_name} ${task.last_name.split(' ').pop()}`
						: null,
					title: task.title ? task.title : '',
					inputs: [
						{
							id: 'description',
							type: 'textarea',
							label: 'Descrição',
							value: task.description,
							validation: { required: false },
							valid: false,
							error: false,
							info: '',
						},
						{
							id: 'time',
							type: 'text',
							label: 'Tempo dedicado (h)',
							value: task.time ? task.time : '0',
							validation: { required: false },
							valid: false,
							error: false,
							info: '',
						},
					],
				};
				tasksData.push(taskData);
			}
			setTasksData(tasksData);
			setMeetingsData(meetingsData);
			setTeamData(teamData);
			setSelectedStage(Object.keys(stages)[0]);
			setStagesData(stages);
			setProjectData(projectData);
			setInitializing(false);
		}
		getInitialState();
	}, [user, unit, project, history, team]);

	async function handleAcceptRequest(member) {
		if (teamData.owner.username !== user.username) return;
		const [
			,
			status,
		] = await studentService.update.teamMember(
			unitData.course_code,
			unitData.code,
			'2019-2020',
			project,
			team,
			member.username,
			{ role: 'member' }
		);
		if (status !== 200) return;
		const updatedTeam = {
			...teamData,
			members: [...teamData.members, member],
			pendingMembers: teamData.pendingMembers.filter(
				(pendingMember) => pendingMember !== member
			),
		};
		setTeamData(updatedTeam);
	}

	async function handleRejectRequest(member) {
		if (teamData.owner.username !== user.username) return;
		const [, status] = await studentService.remove.teamMember(
			unitData.course_code,
			unitData.code,
			'2019-2020',
			project,
			team,
			member.username
		);
		if (status !== 204) return;
		const updatedTeam = {
			...teamData,
			pendingMembers: teamData.pendingMembers.filter(
				(pendingMember) => pendingMember !== member
			),
		};
		setTeamData(updatedTeam);
	}

	async function handleKickMember(member) {
		if (teamData.owner.username !== user.username) return;
		const [, status] = await studentService.remove.teamMember(
			unitData.course_code,
			unitData.code,
			'2019-2020',
			project,
			team,
			member.username
		);
		if (status !== 204) return;
		const updatedTeam = {
			...teamData,
			members: teamData.members.filter((m) => m !== member),
		};
		setTeamData(updatedTeam);
	}

	async function handleLeaveTeam() {
		if (
			teamData.owner.username === user.username &&
			teamData.members.length > 1
		)
			return;
		if (teamData.owner.username === user.username) {
			const [, status] = await studentService.remove.team(
				unitData.course_code,
				unit,
				'2019-2020',
				project,
				team
			);
			if (status !== 204 && status !== 404) return;
		} else {
			const [, status] = await studentService.remove.teamMember(
				unitData.course_code,
				unit,
				'2019-2020',
				project,
				team,
				user.username
			);
			if (status !== 204 && status !== 404) return;
		}
		history.push(`/projects/${unit}/${project}/teams`);
	}

	async function handleRate(username, rate) {
		let index;
		const ratedMember = teamData.teamRatings.find((member, i) => {
			if (member.username === username) index = i;
			return member.username === username;
		});
		if (!ratedMember) {
			const [, status] = await studentService.create.teamRate(
				unitData.course_code,
				unit,
				'2019-2020',
				project,
				team,
				{
					username,
					rate,
				}
			);
			const teamRatingsUpdate = [...teamData.teamRatings, { username, rate }];
			const updatedTeam = { ...teamData, teamRatings: teamRatingsUpdate };
			setTeamData(updatedTeam);
			if (status !== 201) return;
		} else {
			const [, status] = await studentService.update.teamRate(
				unitData.course_code,
				unit,
				'2019-2020',
				project,
				team,
				{
					username,
					rate,
				}
			);
			const teamRatingsUpdate = [...teamData.teamRatings];
			teamRatingsUpdate[index].rate = rate;
			const updatedTeam = { ...teamData, teamRatings: teamRatingsUpdate };
			setTeamData(updatedTeam);
			if (status !== 200) return;
		}
	}

	return (
		<>
			{!initializing && (
				<Context
					path={[
						{ tier: `projects/${unit}`, title: unitData.initials },
						{
							tier: `projects/${unit}/${project}/teams`,
							title: `Projeto ${project} - Grupos`,
						},
					]}
				/>
			)}
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					<Content>
						<Title>
							<FaUsers /> <span>{teamData.name}</span>
						</Title>
						<Navigation>
							<Link exact to={`${url}`}>
								<FaUsers /> Membros
							</Link>
							<Link exact to={`${url}/stages`}>
								<FaArchive /> Etapas
							</Link>
							<Link exact to={`${url}/tasks`}>
								<FaClipboardList /> Tarefas
							</Link>
							<Link exact to={`${url}/meetings`}>
								<FaHandshake /> Reuniões
							</Link>
							<Link exact to={`${url}/schedules`}>
								<FaCalendarWeek /> Horários
							</Link>
						</Navigation>
						<Switch>
							<Route
								exact
								path={`${path}`}
								component={() => (
									<Members
										team={teamData}
										handlers={{
											handleAcceptRequest,
											handleRejectRequest,
											handleKickMember,
											handleLeaveTeam,
											handleRate,
										}}
									/>
								)}
							/>
							<Route
								path={`${path}/stages`}
								component={() => (
									<Stages
										stages={stagesData}
										setStages={setStagesData}
										course={unitData.course_code}
										projectData={projectData}
										selectedStage={selectedStage}
										setSelectedStage={setSelectedStage}
									/>
								)}
							/>
							<Route
								path={`${path}/tasks`}
								component={() => (
									<Tasks
										course={unitData.course_code}
										unit={unit}
										project={project}
										team={team}
										user={user}
										tasksData={tasksData}
										setTasksData={setTasksData}
									/>
								)}
							/>
							<Route
								path={`${path}/meetings`}
								component={() => (
									<Meetings
										course={unitData.course_code}
										unit={unit}
										project={project}
										team={team}
										user={user}
										meetings={meetingsData}
										setMeetings={setMeetingsData}
									/>
								)}
							/>
							<Route path={`${path}/schedules`} component={Schedules} />
						</Switch>
					</Content>
				</Container>
			)}
		</>
	);
}

export default Team;
