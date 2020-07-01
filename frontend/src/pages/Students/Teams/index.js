import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../hooks';

import {
	Container,
	MainButton,
	Card,
	Title,
	ExpandButton,
	Content,
	MembersSection,
	Button,
	Member,
	Link,
} from './styles';
import Context from '../../../components/Context';

import {
	FaPlus,
	FaAngleDown,
	FaStar,
	FaStarHalf,
	FaUsers,
	FaUserPlus,
	FaBan,
} from 'react-icons/fa';
import studentService from '../../../services/student';
import Spinner, { ButtonSpinner } from '../../../components/Spinner';

function Teams() {
	const {
		params: { unit, project },
		url,
	} = useRouteMatch('/projects/:unit/:project/teams');
	const history = useHistory();
	const { user } = useAuth();
	const [unitData, setUnitData] = useState();
	const [projectData, setProjectData] = useState();
	const [teamsData, setTeamsData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [teamStatus, setTeamStatus] = useState();
	const [loading, setLoading] = useState(false);

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
			const teams = await studentService.get.teams(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project
			);
			const teamsData = [];
			for (let team of teams) {
				const members = await studentService.get.teamMembers(
					unitData.course_code,
					unitData.code,
					'2019-2020',
					project,
					team.team_number
				);
				const confirmed_members = members.filter(
					(member) => member.role !== 'pending'
				);
				const inTeam = members.find(
					(member) => member.username === user.username
				);
				if (inTeam) {
					teamsData.unshift({
						...team,
						members,
						confirmed_members,
						expand: true,
					});
					setTeamStatus({ team: team.team_number, role: inTeam.role });
				} else {
					teamsData.push({
						...team,
						members,
						confirmed_members,
						expand: false,
					});
				}
			}
			console.log(teamsData);
			setTeamsData(teamsData);
			setProjectData(projectData);
			setInitializing(false);
		}
		getInitialState();
	}, [user, unit, project]);

	async function handleCreateTeam() {
		const [{ team_number }, status] = await studentService.create.team(
			unitData.course_code,
			unitData.code,
			'2019-2020',
			project
		);
		if (status !== 201) return;
		history.push(`${url}/${team_number}`);
	}

	function handleCardState(card) {
		setTeamsData(
			teamsData.map((team) =>
				team.team_number === card.team_number
					? { ...team, expand: !team.expand }
					: { ...team }
			)
		);
	}

	async function handleJoinTeam(team_number) {
		setLoading(true);
		const [, status] = await studentService.create.teamMember(
			unitData.course_code,
			unitData.code,
			'2019-2020',
			project,
			team_number
		);
		if (status !== 201) return;
		setTeamStatus({ team: team_number, role: 'pending' });
		setLoading(false);
	}

	async function handleCancelRequest(team_number) {
		setLoading(true);
		const [, status] = await studentService.remove.teamMember(
			unitData.course_code,
			unitData.code,
			'2019-2020',
			project,
			team_number,
			user.username
		);
		if (status === 404) {
			const updatedTeams = teamsData.filter(
				(team) => team.team_number !== team_number
			);
			setTeamsData(updatedTeams);
			setTeamStatus();
			setLoading(false);
			return;
		}
		if (status !== 204) return;
		setTeamStatus();
		setLoading(false);
	}

	function renderTeamOptions(card) {
		if (!teamStatus && card.confirmed_members.length < projectData.max_students)
			return loading ? (
				<Button disabled>
					<ButtonSpinner />
				</Button>
			) : (
				<Button onClick={() => handleJoinTeam(card.team_number)}>
					<FaUserPlus /> Aderir ao Grupo
				</Button>
			);

		if (teamStatus.team === card.team_number) {
			if (teamStatus.role !== 'pending')
				return (
					<Link to={`${url}/${card.team_number}`}>
						<FaUsers /> Ver Grupo
					</Link>
				);
			if (teamStatus.role === 'pending')
				return loading ? (
					<Button disabled type="danger">
						<ButtonSpinner />
					</Button>
				) : (
					<Button
						onClick={() => handleCancelRequest(card.team_number)}
						type="danger"
					>
						<FaBan /> Cancelar Pedido
					</Button>
				);
		}
	}

	function renderRate(rate) {
		if (!rate)
			return [...Array(5)].map((star, i) => (
				<FaStar key={i} color={'#AAAAAA'} />
			));
		const decimalPart = parseInt((rate % 1).toFixed(1).substring(2));
		const integerPart = parseInt(rate);
		const stars = [...Array(integerPart)];
		if (decimalPart === 0)
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
				</React.Fragment>
			);
		if (decimalPart <= 5) {
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
					<FaStarHalf />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
					<FaStar />
				</React.Fragment>
			);
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
							title: `Projeto ${project}`,
						},
					]}
				/>
			)}
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					{!teamStatus && (
						<MainButton onClick={handleCreateTeam}>
							<FaPlus />
							Criar Grupo
						</MainButton>
					)}

					{teamsData.map((team) => (
						<Card
							key={team.team_number}
							expand={team.expand}
							members={team.members.length}
						>
							<Title onClick={() => handleCardState(team)}>
								<span>
									<FaUsers />
									{team.name}
								</span>
								<ExpandButton expand={team.expand}>
									<FaAngleDown />
								</ExpandButton>
							</Title>
							<Content expand={team.expand}>
								<MembersSection>
									<span>
										Membros: ({team.confirmed_members.length}/
										{projectData.max_students})
									</span>
									{team.confirmed_members.map((member) => (
										<Member
											key={member.username}
											to={`/profile/${member.username}`}
										>
											{member.avatar_url ? (
												<img src={member.avatar_url} alt="foto de perfil" />
											) : (
												<span>{member.first_name.charAt(0)}</span>
											)}
											<div>
												<p>
													{member.first_name}{' '}
													{member.last_name.split(' ').pop()}
												</p>
												<p>{member.username}</p>
												<p>{renderRate(member.rating)}</p>
											</div>
										</Member>
									))}
								</MembersSection>
								{renderTeamOptions(team)}
							</Content>
						</Card>
					))}
				</Container>
			)}
		</>
	);
}

export default Teams;
