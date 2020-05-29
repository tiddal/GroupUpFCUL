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
import Spinner from '../../../components/Spinner';

import Separator from '../../../components/Separator';

function Dashboard() {
	const { user } = useAuth();
	const [unitsData, setUnitsData] = useState();
	const [classesData, setClassesData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [nextClass, setNextClass] = useState();

	useEffect(() => {
		async function getInitialState() {
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
			setClassesData(classes);
			let { initials, number, begins_at, week_day } = findNextClass(
				classes,
				new Date().getDay()
			);
			begins_at = getBeginningDate(week_day, begins_at);

			setNextClass({ initials, number, begins_at, week_day });
			setInitializing(false);
		}
		getInitialState();
	}, [user]);

	function getBeginningDate(week_day, begins_at) {
		let date = new Date();
		let currentWeekDay = date.getDay();
		let distance = week_day + 7 - currentWeekDay;
		date.setDate(date.getDate() + distance);
		const begginingDate = date
			.toLocaleDateString('pt-BR', { dateStyle: 'full' })
			.slice(0, -8);
		let [beggining_hours, begging_minutes] = begins_at.split(':');
		beggining_hours = parseInt(beggining_hours);
		return `${begginingDate}, ${beggining_hours}h${begging_minutes}`;
	}

	function findNextClass(classes, currentWeekDay) {
		//	Sort classes by week_day and begining time
		const sortedClasses = classes.sort((a, b) => {
			if (a.week_day > b.week_day) return 1;
			if (a.week_day < b.week_day) return -1;
			if (a.begins_at > b.begins_at) return 1;
			if (a.begins_at < b.begins_at) return -1;
			return 0;
		});
		if (currentWeekDay > 5) return sortedClasses[0];

		//	Get week day
		const date = new Date();
		let currentTime = `${date.getHours()}:${date.getMinutes()}`;
		if (currentTime > '17:30') currentWeekDay++;

		// Get classes from week day
		let filteredClasses = sortedClasses.filter(
			(class_) => class_.week_day === currentWeekDay
		);

		if (filteredClasses.length === 0)
			return findNextClass(classes, currentWeekDay++);

		//	Skip to next day
		currentTime = '07:00';
		filteredClasses = filteredClasses.filter(
			(class_) => class_.begins_at > currentTime
		);
		if (filteredClasses.length === 0)
			return findNextClass(classes, currentWeekDay++);
		return filteredClasses[0];
	}

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
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					<InfoSection>
						<TwoThirdsCard
							title={'Próxima Aula'}
							icon={<FaCalendarDay />}
							content={
								<>
									<NextClassName>
										{nextClass.initials} - {nextClass.number}
									</NextClassName>
									<NextClassDate>{nextClass.begins_at}</NextClassDate>
								</>
							}
							link={{ path: '/projects', label: 'Ver Horário' }}
						/>
						<MiniCard data={`${unitsData.length} cadeiras`} />
						<MiniCard data={`${classesData.length} turmas`} />
					</InfoSection>
					<Separator>Cadeiras</Separator>
					<UnitsSection>
						{unitsData.map((unit) => (
							<Card
								key={unit.code}
								title={unit.initials}
								icon={<FaBook />}
								content={
									<>
										{/* <UnitInfo>125 Alunos</UnitInfo> */}
										<UnitInfo>0 Projetos</UnitInfo>
									</>
								}
								link={{ path: `/units/${unit.code}`, label: 'Gerir Projetos' }}
							/>
						))}
					</UnitsSection>
					<Separator>Dúvidas</Separator>
					<QuestionsSection>
						<Card
							title={'p1 - projeto 1'}
							icon={<FaQuestionCircle />}
							link={{ path: '/projects', label: 'Responder' }}
							content={
								<>
									<ProjectQuestion>
										O Grupo 2 colocou uma dúvida
									</ProjectQuestion>
									<ProjectQuestionTime>há 5 minutos</ProjectQuestionTime>
								</>
							}
						/>
					</QuestionsSection>
				</Container>
			)}
		</>
	);
}

export default Dashboard;
