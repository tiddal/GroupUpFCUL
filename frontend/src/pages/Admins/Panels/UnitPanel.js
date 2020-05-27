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
	FaUsers,
} from 'react-icons/fa';

import {
	Container,
	SearchSection,
	SearchBar,
	Button,
	StatusCardData,
} from './styles';

function UnitPanel() {
	const [loading, setLoading] = useState(true);
	const [unitData, setUnitData] = useState({
		course_initials: '',
		course_code: '',
		unit_initials: '',
		unit_code: '',
		classes: [],
	});
	const [searchInput, setSearchInput] = useState('');
	const {
		params: { course, unit },
	} = useRouteMatch('/courses/:course/units/:unit');
	const history = useHistory();

	useEffect(() => {
		async function setState() {
			const [
				{ initials: course_initials, code: course_code },
			] = await adminService.get.courseByCode(course);
			const [
				{ initials: unit_initials, code: unit_code },
			] = await adminService.get.unitByCode(course, unit);
			const classes = await adminService.get.classesFromUnit(course, unit);
			setUnitData({
				course_initials,
				course_code,
				unit_initials,
				unit_code,
				classes,
			});
			setLoading(false);
		}
		setState();
	}, [course, unit]);

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
							tier: `courses/${unitData.course_code}`,
							title: unitData.course_initials,
						},
						{
							tier: `courses/${unitData.course_code}/units`,
							title: 'cadeiras',
						},
						{
							tier: `courses/${unitData.course_code}/units/${unitData.unit_code}`,
							title: unitData.unit_initials,
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
									{unitData.classes.length} Turmas
								</StatusCardData>
							</>
						)
					}
				/>
				<SearchCard>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar turma...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>
							<FaSearch />
						</Button>
						<span>Procurar por número da turma</span>
					</SearchSection>
				</SearchCard>

				<XSmallCard
					path={`/courses/${unitData.course_code}/units/${unitData.unit_code}/classes`}
					label={'Ver Turmas'}
					icon={<FaListUl />}
				/>
				<XSmallCard
					path={`/courses/${unitData.course_code}/units/${unitData.unit_code}/classes/new`}
					label={'Adicionar Turma'}
					icon={<FaUsers />}
				/>
				<XSmallCard
					path={`/courses/${unitData.course_code}/units/${unitData.unit_code}/edit`}
					label={'Editar Cadeira'}
					icon={<FaEdit />}
				/>
			</Container>
		</>
	);
}

export default UnitPanel;
