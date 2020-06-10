import React from 'react';

import { Container, Content, Title, Navigation, Link } from './styles';
import Context from '../../../components/Context';

import {
	FaUsers,
	FaArchive,
	FaClipboardList,
	FaHandshake,
	FaCalendarWeek,
} from 'react-icons/fa';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Members from './Members';
import Stages from './Stages';

function Team() {
	const { path, url } = useRouteMatch();

	return (
		<>
			<Context
				path={[
					{ tier: '', title: 'projetos' },
					{ tier: `projects/`, title: 'unitData.name' },
				]}
			/>
			<Container>
				<Content>
					<Title>
						<FaUsers /> <span>Grupo 1</span>
					</Title>
					<Navigation>
						<Link exact to={`${url}`}>
							<FaUsers /> Membros
						</Link>
						<Link exact to={`${url}/stages`}>
							<FaArchive /> Etapas
						</Link>
						<Link exact to="/">
							<FaClipboardList /> Tarefas
						</Link>
						<Link exact to="/">
							<FaHandshake /> Reuniões
						</Link>
						<Link exact to="/">
							<FaCalendarWeek /> Horários
						</Link>
					</Navigation>
					<Switch>
						<Route exact path={`${path}`} component={Members} />
						<Route path={`${path}/stages`} component={Stages} />
					</Switch>
				</Content>
			</Container>
		</>
	);
}

export default Team;
