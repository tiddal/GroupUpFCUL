import React, { useEffect, useState } from 'react';
import adminService from '../../../services/admin';

import Navigation from '../../../components/Navigation';
import Spinner from '../../../components/Spinner';
import Context from '../../../components/Context';
import { StatusCard, SearchCard, XSmallCard } from '../../../components/Card';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaListUl,
	FaFileUpload,
} from 'react-icons/fa';

import { Container, StatusCardData } from './styles';

function CoursesPanel() {
	const [loading, setLoading] = useState(true);
	const [coursesData, setCoursesData] = useState({
		courses: [],
		units: [],
		classes: [],
	});

	useEffect(() => {
		async function setState() {
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
			<Context path={[{ tier: 'courses', title: 'cursos' }]} />
			{loading ? (
				<Spinner />
			) : (
				<Container>
					<StatusCard
						data={
							<>
								<StatusCardData>
									{coursesData.courses.length} cursos
								</StatusCardData>
								<StatusCardData status="offline">
									{coursesData.units.length} cadeiras
								</StatusCardData>
								<StatusCardData status="offline">
									{coursesData.classes.length} turmas
								</StatusCardData>
							</>
						}
					/>
					<SearchCard
						placeholder={'Procurar curso...'}
						info={'Procure por código de curso'}
					/>
					<XSmallCard
						path={'courses/list'}
						label={'Ver lista de cursos'}
						icon={<FaListUl />}
					/>
					<XSmallCard
						path={'courses/new'}
						label={'Adicionar Curso'}
						icon={<FaUniversity />}
					/>
					<XSmallCard
						path={'courses/file'}
						label={'Carregar ficheiro'}
						icon={<FaFileUpload />}
					/>
				</Container>
			)}
		</>
	);
}

export default CoursesPanel;
