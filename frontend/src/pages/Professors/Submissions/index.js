import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';
import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { FaListAlt, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import moment from 'moment';

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

function Submissions() {
	const [list, setList] = useState();
	const [searchInput, setSearchInput] = useState('');
	const { user } = useAuth();
	const {
		params: { unit, project, stage },
		url,
	} = useRouteMatch('/projects/:unit/:project/stages/:stage/submissions');
	const [unitData, setUnitData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [submissionsData, setSubmissionsData] = useState([]);

	const createTableRow = useCallback(
		(team) => [
			{ data: team.team_number },
			{ data: moment(team.submitted_at).format('DD/MM/YYYY, HH[h]mm') },
			{ data: team.grade },
			{
				data: (
					<Link to={`${url}/${team.team_number}`}>
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

			const submissionsData = await professorService.get.submissions(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project,
				stage
			);
			setSubmissionsData(submissionsData);
			const rows = submissionsData.map((team) => createTableRow(team));
			setInitializing(false);
			setList(!!rows.length ? rows : undefined);
		}
		getInitialState();
	}, [project, user, createTableRow, unit, stage]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;
		const [team] = submissionsData.filter(
			(team) => team.number === searchInput
		);
		if (team) rows = [createTableRow(team)];
		if (searchInput.value === '')
			rows = submissionsData.map((team) => createTableRow(team));
		setList(rows);
	}

	return (
		<>
			{!initializing && (
				<Context
					path={[
						{ tier: `projects/${unit}`, title: unitData.initials },
						{
							tier: `projects/${unit}/${project}/stages`,
							title: `Projeto ${project} - Etapas`,
						},
						{
							tier: `projects/${unit}/${project}/stages/${stage}/submissions`,
							title: `Etapa ${stage} - Submissões`,
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
							<span>Submissões</span>
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
								columns_width={[15, 45, 31, 9]}
								columns={[
									{ name: 'Grupo' },
									{ name: 'Data de Entrega' },
									{ name: 'Avaliação' },
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

export default Submissions;
