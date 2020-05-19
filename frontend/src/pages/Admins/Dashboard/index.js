import React, { useEffect, useState } from 'react';
import adminService from '../../../services/admin';

import { Container, Cards, SmallCardData, BigCardData } from './styles';

import Spinner from '../../../components/Spinner';

import Navigation from '../../../components/Navigation';
import { SmallCard, BigCard } from '../../../components/Card';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
} from 'react-icons/fa';

function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [students, setStudents] = useState({ online: [], offline: [] });
	const [professors, setProfessors] = useState({ online: [], offline: [] });
	const [admins, setAdmins] = useState({ online: [], offline: [] });
	const [coursesData, setCoursesData] = useState({
		courses: [],
		units: [],
		classes: [],
	});

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setStudents, adminService.getStudents);
			await setUsersStatus(setProfessors, adminService.getProfessors);
			await setUsersStatus(setAdmins, adminService.getAdmins);
			const courses = await adminService.getCourses();
			const units = [];
			const classes = [];
			setCoursesData({ courses, units, classes });
			setLoading(false);
		}
		setState();
	}, []);

	return (
		<>
			<Navigation
				items={[
					{ icon: <FaUserGraduate />, name: 'Alunos', path: '/students' },
					{ icon: <FaUserTie />, name: 'Professores', path: '/professors' },
					{ icon: <FaUserShield />, name: 'Admins', path: '/admins' },
					{ icon: <FaUniversity />, name: 'Cursos', path: '/courses' },
				]}
			/>
			<Container>
				{loading ? (
					<Spinner />
				) : (
					<Cards>
						<SmallCard
							title={'alunos'}
							icon={<FaUserGraduate />}
							path={'/students'}
							label={'Gerir Alunos'}
							data={
								<>
									<SmallCardData status={'online'}>
										{students.online.length} online <span></span>
									</SmallCardData>
									<SmallCardData status={'offline'}>
										{students.offline.length} offline <span></span>
									</SmallCardData>
								</>
							}
						/>
						<SmallCard
							title={'professores'}
							icon={<FaUserTie />}
							path={'/professors'}
							label={'Gerir Professores'}
							data={
								<>
									<SmallCardData status={'online'}>
										{professors.online.length} online <span></span>
									</SmallCardData>
									<SmallCardData status={'offline'}>
										{professors.offline.length} offline <span></span>
									</SmallCardData>
								</>
							}
						/>
						<SmallCard
							title={'admins'}
							icon={<FaUserTie />}
							path={'/admins'}
							label={'Gerir Admins'}
							data={
								<>
									<SmallCardData status={'online'}>
										{admins.online.length} online <span></span>
									</SmallCardData>
									<SmallCardData status={'offline'}>
										{admins.offline.length} offline <span></span>
									</SmallCardData>
								</>
							}
						/>
						<BigCard
							title={'cursos'}
							icon={<FaUserTie />}
							path={'/courses'}
							label={'Gerir Cursos'}
							data={
								<BigCardData>
									<span>{coursesData.courses.length} cursos</span>
									<span>{coursesData.units.length} cadeiras</span>
									<span>{coursesData.classes.length} turmas</span>
								</BigCardData>
							}
						/>
					</Cards>
				)}
			</Container>
		</>
	);
}

export default Dashboard;
