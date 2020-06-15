import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../../hooks';
import studentService from '../../../services/student';

import { FaCalendarDay, FaBook, FaUsers } from 'react-icons/fa';
import {
	Container,
	InfoSection,
	GroupsSection,
	UnitsSection,
	NextClassName,
	NextClassDate,
	Submission,
	SubmissionDate,
	UnitInfo,
} from './styles';
import { Card, MiniCard, TwoThirdsCard } from '../../../components/Card';
import Spinner from '../../../components/Spinner';

import Separator from '../../../components/Separator';

function Dashboard() {
	const { user } = useAuth();

	const [groups, setGroups] = useState([]);

	const [unitsData, setUnitsData] = useState();
	const [classesData, setClassesData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [nextClass, setNextClass] = useState();

	const findNextClass = useCallback((classes, currentWeekDay, currentTime) => {
		//	Sort classes by week_day and begining time
		const sortedClasses = classes.sort((a, b) => {
			if (a.week_day > b.week_day) return 1;
			if (a.week_day < b.week_day) return -1;
			if (a.begins_at > b.begins_at) return 1;
			if (a.begins_at < b.begins_at) return -1;
			return 0;
		});

		//	Sunday or Saturday
		if (currentWeekDay > 5) return sortedClasses[0];

		// Any day after 17:30
		if (currentTime > '17:30')
			return findNextClass(classes, ++currentWeekDay, '07:00');

		// Classes from the day of the week
		let filteredClasses = sortedClasses.filter(
			(class_) => class_.week_day === currentWeekDay
		);
		if (filteredClasses.length === 0)
			return findNextClass(classes, ++currentWeekDay, '07:00');

		// 	Classes after the current time
		filteredClasses = filteredClasses.filter(
			(class_) => class_.begins_at > currentTime
		);
		if (filteredClasses.length === 0)
			return findNextClass(classes, ++currentWeekDay, '07:00');

		return filteredClasses[0];
	}, []);

	function getBeginningDate(week_day, begins_at) {
		let date = new Date();
		let currentWeekDay = date.getDay();
		let distance = (week_day + 7 - currentWeekDay) % 7;
		date.setDate(date.getDate() + distance);
		const begginingDate = date
			.toLocaleDateString('pt-BR', { dateStyle: 'full' })
			.slice(0, -8);
		let [beggining_hours, begging_minutes] = begins_at.split(':');
		beggining_hours = parseInt(beggining_hours);
		return `${begginingDate}, ${beggining_hours}h${begging_minutes}`;
	}

	useEffect(() => {
		async function getInitialState() {
			const classes = await studentService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const units = classes.reduce((unique, unit) => {
				return unique.some((item) => item.code === unit.code)
					? unique
					: [...unique, unit];
			}, []);
			const unitsData = [];
			for (let unit of units) {
				const unitProjects = await studentService.get.projects(
					unit.course_code,
					unit.code,
					'2019-2020'
				);
				unitsData.push({ ...unit, projects: unitProjects.length });
			}
			setUnitsData(unitsData);
			setClassesData(classes);
			if (classes.length) {
				const date = new Date();
				let currentTime = `${date.getHours()}:${date.getMinutes()}`;
				let currentWeekDay = date.getDay();
				let { initials, number, begins_at, week_day } = findNextClass(
					classes,
					currentWeekDay,
					currentTime
				);
				begins_at = getBeginningDate(week_day, begins_at);
				setNextClass({ initials, number, begins_at });
			}
			setInitializing(false);
		}
		getInitialState();
	}, [user, findNextClass]);

	return (
		<>
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					<InfoSection>
						<TwoThirdsCard
							title={'Próxima Aula'}
							icon={<FaCalendarDay />}
							content={
								nextClass && (
									<>
										<NextClassName>
											{nextClass.initials} - {nextClass.number}
										</NextClassName>
										<NextClassDate>{nextClass.begins_at}</NextClassDate>
									</>
								)
							}
							link={{ path: '/', label: 'Ver Horário' }}
						/>
						<MiniCard data={`${unitsData.length} cadeiras`} />
						<MiniCard data={`${classesData.length} grupos`} />
					</InfoSection>
					<Separator>Grupos</Separator>
					<GroupsSection>
						<Card
							title={'P1 - Grupo 23'}
							icon={<FaUsers />}
							content={
								<>
									<Submission>Próxima entrega:</Submission>
									<SubmissionDate>22/07/2020, 23h55</SubmissionDate>
								</>
							}
							link={{
								path: `/projects/1/teams/1`,
								label: 'Ver Grupo',
							}}
						/>
					</GroupsSection>
					<Separator>Cadeiras</Separator>
					<UnitsSection>
						{unitsData.map((unit) => (
							<Card
								key={unit.code}
								title={unit.initials}
								icon={<FaBook />}
								content={
									<UnitInfo>
										{unit.projects} Projeto{unit.projects !== 1 && 's'}
									</UnitInfo>
								}
								link={{
									path: `/projects/${unit.code}`,
									label: 'Ver Projetos',
								}}
							/>
						))}
					</UnitsSection>
				</Container>
			)}
		</>
	);
}

export default Dashboard;
