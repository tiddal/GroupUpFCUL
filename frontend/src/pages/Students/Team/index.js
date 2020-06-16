import React, { useState, useEffect } from 'react';
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
	const [teamData, setTeamData] = useState();
	const [initializing, setInitializing] = useState(true);

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
			setTeamData(teamData);
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
										}}
									/>
								)}
							/>
							<Route path={`${path}/stages`} component={Stages} />
							<Route path={`${path}/tasks`} component={Tasks} />
							<Route path={`${path}/meetings`} component={Meetings} />
							<Route path={`${path}/schedules`} component={Schedules} />
						</Switch>
					</Content>
				</Container>
			)}
		</>
	);
}

export default Team;
