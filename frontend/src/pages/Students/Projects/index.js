import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import studentService from '../../../services/student';

import {
	FaProjectDiagram,
	FaAngleDown,
	FaUsers,
	FaInfoCircle,
	FaExternalLinkAlt,
} from 'react-icons/fa';

import {
	Container,
	Card,
	Title,
	Content,
	Button,
	ExpandButton,
	Info,
	InfoTitle,
} from './styles';
import Spinner from '../../../components/Spinner';
import Context from '../../../components/Context';

function Projects() {
	const { user } = useAuth();
	const {
		params: { unit },
	} = useRouteMatch('/projects/:unit');
	const [unitData, setUnitData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [projectsData, setProjectsData] = useState([
		{
			expand: true,
			number: 1,
			name: 'hi',
			min_students: 1,
			max_students: 2,
			assignment_url: 'https://www.google.com/',
		},
	]);

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
			setInitializing(false);
		}
		getInitialState();
	}, [user, unit]);

	function handleCardState(project) {
		setProjectsData(
			projectsData.map((p) =>
				p.number === project.number ? { ...p, expand: !p.expand } : { ...p }
			)
		);
	}

	return (
		<>
			{!initializing && (
				<Context
					path={[
						{ tier: '', title: 'projetos' },
						{ tier: `projects/${unit}`, title: unitData.name },
					]}
				/>
			)}
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					{projectsData.map((project) => (
						<Card key={`project${project.number} `} expand={project.expand}>
							<Title onClick={() => handleCardState(project)}>
								<span>
									<FaProjectDiagram />
									Projeto {project.number}
								</span>
								<ExpandButton expand={project.expand}>
									<FaAngleDown />
								</ExpandButton>
							</Title>
							<Content expand={project.expand}>
								<Info>
									<InfoTitle>
										<FaInfoCircle /> Projeto {project.number}
									</InfoTitle>
									<p>
										Etapa: 2/4
										<br />
										Grupos: 12
										<br />
										Alunos por grupo: {project.min_students} a{' '}
										{project.max_students}
										<br />
										<a
											href={project.assignment_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											Enunciado <FaExternalLinkAlt />
										</a>
									</p>
								</Info>

								<Button to={`/projects/${unit}/1/teams`}>
									<FaUsers />
									Ver Grupos
								</Button>
							</Content>
						</Card>
					))}
				</Container>
			)}
		</>
	);
}

export default Projects;
