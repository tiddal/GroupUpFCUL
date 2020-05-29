import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';

import Navigation from '../../../components/Navigation';
import { FaCalendarDay, FaBook, FaQuestionCircle } from 'react-icons/fa';

import {
	Container,
	InfoSection,
	UnitsSection,
	QuestionsSection,
	NextClassName,
	NextClassDate,
	UnitInfo,
	ProjectQuestion,
	ProjectQuestionTime,
} from './styles';
import { Card, MiniCard, TwoThirdsCard } from '../../../components/Card';

import Separator from '../../../components/Separator';

function Dashboard() {
	const { user } = useAuth();
	const [unitsData, setUnitsData] = useState();
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		async function getUnits() {
			const classes = await professorService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const units = classes.reduce((unique, unit) => {
				return unique.some((item) => item.code === unit.code)
					? unique
					: [...unique, unit];
			}, []);
			setUnitsData(units);
			setInitializing(false);
		}
		getUnits();
	}, [user]);
	return (
		<>
			{!initializing && (
				<Navigation
					items={unitsData.map((unit) => ({
						icon: <div>{unit.initials}</div>,
						name: unit.name,
						path: `/units/${unit.code}`,
					}))}
				/>
			)}
			<Container>
				<InfoSection>
					<TwoThirdsCard
						title={'Próxima Aula'}
						icon={<FaCalendarDay />}
						content={
							<>
								<NextClassName>ADS - T2</NextClassName>
								<NextClassDate>Dia 8 de maio, 13h00</NextClassDate>
							</>
						}
						link={{ path: '/projects', label: 'Ver Horário' }}
					/>
					<MiniCard data={'3 cadeiras'} />
					<MiniCard data={'5 turmas'} />
				</InfoSection>
				<Separator>Cadeiras</Separator>
				<UnitsSection>
					<Card
						title={'p1'}
						icon={<FaBook />}
						content={
							<>
								<UnitInfo>125 Alunos</UnitInfo>
								<UnitInfo>1 Projeto</UnitInfo>
							</>
						}
						link={{ path: '/projects', label: 'Gerir Projetos' }}
					/>
					<Card
						title={'p1'}
						icon={<FaBook />}
						content={
							<>
								<UnitInfo>125 Alunos</UnitInfo>
								<UnitInfo>1 Projeto</UnitInfo>
							</>
						}
						link={{ path: '/projects', label: 'Gerir Projetos' }}
					/>
					<Card
						title={'p1'}
						icon={<FaBook />}
						content={
							<>
								<UnitInfo>125 Alunos</UnitInfo>
								<UnitInfo>1 Projeto</UnitInfo>
							</>
						}
						link={{ path: '/projects', label: 'Gerir Projetos' }}
					/>
					<Card
						title={'p1'}
						icon={<FaBook />}
						content={
							<>
								<UnitInfo>125 Alunos</UnitInfo>
								<UnitInfo>1 Projeto</UnitInfo>
							</>
						}
						link={{ path: '/projects', label: 'Gerir Projetos' }}
					/>
					<Card
						title={'p1'}
						icon={<FaBook />}
						content={
							<>
								<UnitInfo>125 Alunos</UnitInfo>
								<UnitInfo>1 Projeto</UnitInfo>
							</>
						}
						link={{ path: '/projects', label: 'Gerir Projetos' }}
					/>
					<Card
						title={'p1'}
						icon={<FaBook />}
						content={
							<>
								<UnitInfo>125 Alunos</UnitInfo>
								<UnitInfo>1 Projeto</UnitInfo>
							</>
						}
						link={{ path: '/projects', label: 'Gerir Projetos' }}
					/>
				</UnitsSection>
				<Separator>Dúvidas</Separator>
				<QuestionsSection>
					<Card
						title={'p1 - projeto 1'}
						icon={<FaQuestionCircle />}
						link={{ path: '/projects', label: 'Responder' }}
						content={
							<>
								<ProjectQuestion>O Grupo 2 colocou uma dúvida</ProjectQuestion>
								<ProjectQuestionTime>há 5 minutos</ProjectQuestionTime>
							</>
						}
					/>
					<Card
						title={'p1 - projeto 1'}
						icon={<FaQuestionCircle />}
						link={{ path: '/projects', label: 'Responder' }}
						content={
							<>
								<ProjectQuestion>O Grupo 2 colocou uma dúvida</ProjectQuestion>
								<ProjectQuestionTime>há 5 minutos</ProjectQuestionTime>
							</>
						}
					/>
					<Card
						title={'p1 - projeto 1'}
						icon={<FaQuestionCircle />}
						link={{ path: '/projects', label: 'Responder' }}
						content={
							<>
								<ProjectQuestion>O Grupo 2 colocou uma dúvida</ProjectQuestion>
								<ProjectQuestionTime>há 5 minutos</ProjectQuestionTime>
							</>
						}
					/>
					<Card
						title={'p1 - projeto 1'}
						icon={<FaQuestionCircle />}
						link={{ path: '/projects', label: 'Responder' }}
						content={
							<>
								<ProjectQuestion>O Grupo 2 colocou uma dúvida</ProjectQuestion>
								<ProjectQuestionTime>há 5 minutos</ProjectQuestionTime>
							</>
						}
					/>
				</QuestionsSection>
			</Container>
		</>
	);
}

export default Dashboard;
