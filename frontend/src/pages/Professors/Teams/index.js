import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';
import Table from '../../../components/Table';
import Context from '../../../components/Context';
import {
	FaListAlt,
	FaSearch,
	FaExternalLinkAlt,
	FaUsers,
	FaQuestionCircle,
} from 'react-icons/fa';

import {
	Container,
	Sheet,
	Title,
	SearchSection,
	SearchBar,
	Button,
	Link,
	TableSection,
} from './styles';
import Spinner from '../../../components/Spinner';

function Teams() {
	const [list, setList] = useState();
	const [searchInput, setSearchInput] = useState('');
	const { user } = useAuth();
	const {
		params: { unit, project },
		url,
	} = useRouteMatch('/projects/:unit/:project/teams');
	const [unitData, setUnitData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [teamsData, setTeamsData] = useState([]);

	const createTableRow = useCallback(
		(team) => [
			{ data: team.team_number },
			{ data: team.name, align: 'left' },
			{ data: team.confirmed_members.length },
			{ data: '0' },

			{
				data: (
					<Link to={`${url}/${team.number}`}>
						<FaExternalLinkAlt />
					</Link>
				),
			},
		],
		[url]
	);

	useEffect(() => {
		async function getInitialState() {
			const classes = await professorService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const [unitData] = classes.filter(
				(class_) => class_.code.toString() === unit
			);
			setUnitData(unitData);

			const teams = await professorService.get.teams(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project
			);
			const teamsData = [];
			for (let team of teams) {
				const members = await professorService.get.teamMembers(
					unitData.course_code,
					unitData.code,
					'2019-2020',
					project,
					team.team_number
				);
				const confirmed_members = members.filter(
					(member) => member.role !== 'pending'
				);
				teamsData.push({
					...team,
					members,
					confirmed_members,
				});
			}
			setTeamsData(teamsData);
			const rows = teamsData.map((team) => createTableRow(team));
			setInitializing(false);
			setList(!!rows.length ? rows : undefined);
		}
		getInitialState();
	}, [project, user, createTableRow, unit]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;

		const [team] = teamsData.filter((team) => team.number === searchInput);
		if (team) rows = [createTableRow(team)];
		if (searchInput.value === '')
			rows = teamsData.map((team) => createTableRow(team));
		setList(rows);
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
					<Sheet>
						<Title>
							<FaListAlt />
							<span>Grupos</span>
						</Title>
						<SearchSection onSubmit={handleSearch}>
							<SearchBar
								placeholder={'Procurar grupo...'}
								onChange={({ target }) => setSearchInput(target.value)}
							/>
							<Button>
								<FaSearch />
							</Button>
							<span>Procurar por número do grupo</span>
						</SearchSection>
						<TableSection>
							<Table
								columns_width={[16, 50, 12, 13, 9]}
								columns={[
									{ name: 'Número' },
									{ name: 'Nome', align: 'left' },
									{ name: <FaUsers /> },
									{ name: <FaQuestionCircle /> },
								]}
								rows={list}
							/>
						</TableSection>
					</Sheet>
				</Container>
			)}
		</>
	);
}

export default Teams;
