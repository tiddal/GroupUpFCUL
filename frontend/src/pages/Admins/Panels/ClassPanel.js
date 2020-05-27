import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import adminService from '../../../services/admin';

import Navigation from '../../../components/Navigation';
import { CardSpinner } from '../../../components/Spinner';
import Context from '../../../components/Context';
import { StatusCard, SearchCard, XSmallCard } from '../../../components/Card';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaListUl,
	FaEdit,
	FaSearch,
	FaUserPlus,
} from 'react-icons/fa';

import {
	Container,
	SearchSection,
	SearchBar,
	Button,
	StatusCardData,
} from './styles';

function ClassPanel() {
	const [loading, setLoading] = useState(true);
	const [classData, setClassData] = useState({
		courseData: { initials: '', code: '' },
		unitData: { initials: '', code: '' },
		students: [],
		professors: [],
	});
	const [searchInput, setSearchInput] = useState('');
	const {
		params: { course, unit, class_number },
	} = useRouteMatch('/courses/:course/units/:unit/classes/:class_number');
	const history = useHistory();

	useEffect(() => {
		async function setState() {
			let [{ initials, code }] = await adminService.get.courseByCode(course);
			console.log(initials);
			const courseData = { initials, code };
			[{ initials, code }] = await adminService.get.unitByCode(course, unit);
			const unitData = { initials, code };
			const [students] = await adminService.get.studentsFromClass(
				class_number,
				'2019-2020',
				course,
				unit
			);
			const [professors] = await adminService.get.professorsFromClass(
				class_number,
				'2019-2020',
				course,
				unit
			);
			setClassData({
				courseData,
				unitData,
				students,
				professors,
			});
			setLoading(false);
		}
		setState();
	}, [course, unit, class_number]);

	function handleSearch(event) {
		event.preventDefault();
		history.push({
			pathname: `/courses/${course}/units/${unit}/classes`,
			panelSearchInput: searchInput,
		});
	}

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
			{!loading && (
				<Context
					path={[
						{ tier: 'courses', title: 'cursos' },
						{
							tier: `courses/${course}`,
							title: classData.courseData.initials,
						},
						{
							tier: `courses/${course}/units`,
							title: 'cadeiras',
						},
						{
							tier: `courses/${course}/units/${unit}`,
							title: classData.unitData.initials,
						},
						{
							tier: `courses/${course}/units/${unit}/classes`,
							title: 'turmas',
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}`,
							title: class_number,
						},
					]}
				/>
			)}

			<Container>
				<StatusCard
					data={
						loading ? (
							<CardSpinner />
						) : (
							<>
								<StatusCardData>
									{classData.students.length} Alunos
								</StatusCardData>
								<StatusCardData>
									{classData.professors.length} Professores
								</StatusCardData>
							</>
						)
					}
				/>
				<SearchCard>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar elemento...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>
							<FaSearch />
						</Button>
						<span>Procurar por número de utilizador</span>
					</SearchSection>
				</SearchCard>

				<XSmallCard
					path={`/courses/${course}/units/${unit}/classes/${class_number}/members`}
					label={'Ver lista de Elementos'}
					icon={<FaListUl />}
				/>
				<XSmallCard
					path={`/courses/${course}/units/${unit}/classes/${class_number}/new`}
					label={'Adicionar Elemento'}
					icon={<FaUserPlus />}
				/>
				<XSmallCard
					path={`/courses/${course}/units/${unit}/classes/${class_number}/edit`}
					label={'Editar Turma'}
					icon={<FaEdit />}
				/>
			</Container>
		</>
	);
}

export default ClassPanel;
