import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';

import {
	FaPlus,
	FaProjectDiagram,
	FaAngleDown,
	FaArchive,
	FaUsers,
	FaEdit,
	FaInfoCircle,
} from 'react-icons/fa';

import {
	Container,
	Card,
	Title,
	Content,
	Button,
	MainButton,
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
	const [projectsData, setProjectsData] = useState([]);

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
			const projects = await professorService.get.projects(
				unitData.course_code,
				unitData.code,
				'2019-2020'
			);
			const projectsData = projects.map((project) => ({
				expand: false,
				number: project.number,
				name: project.name,
				min_students: project.min_students,
				max_students: project.max_students,
				description: project.description,
			}));
			setProjectsData(projectsData);
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
				<Context path={[{ tier: `projects/${unit}`, title: unitData.name }]} />
			)}
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					<MainButton to={`/projects/${unit}/new`}>
						<FaPlus />
						Novo Projeto
					</MainButton>
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
										<FaInfoCircle /> Projeto {project.number} - {project.name}
									</InfoTitle>
									<p>
										Descrição: {project.description}
										<br />
										Alunos por grupo: {project.min_students} a{' '}
										{project.max_students}
									</p>
								</Info>
								<Button to={`/projects/${unit}/${project.number}/stages`}>
									<FaArchive />
									Ver Etapas
								</Button>
								<Button to={`/projects/${unit}/${project.number}/teams`}>
									<FaUsers />
									Ver Grupos
								</Button>
								<Button to={`/projects/${unit}/${project.number}/edit`}>
									<FaEdit />
									Editar
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
