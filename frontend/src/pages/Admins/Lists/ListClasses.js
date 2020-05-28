import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import adminService from '../../../services/admin';

import Navigation from '../../../components/Navigation';
import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { ButtonSpinner } from '../../../components/Spinner';
import {
	FaUsers,
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaSearch,
	FaExternalLinkAlt,
} from 'react-icons/fa';

import {
	Container,
	Sheet,
	Title,
	SearchSection,
	SearchBar,
	Button,
	Link,
	TableSection,
} from './styles';

function ListClasses({ location: { panelSearchInput } }) {
	const [classes, setClasses] = useState();
	const [list, setList] = useState();
	const [update, setUpdate] = useState(true);
	const [initializing, setInitializing] = useState(true);
	const [unitData, setUnitData] = useState({
		course_initials: '',
		unit_initials: '',
	});
	const {
		params: { course, unit },
	} = useRouteMatch('/courses/:course/units/:unit');
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [loading, setLoading] = useState(true);

	const createTableRow = useCallback(
		(class_) => [
			{ data: class_.number },
			{ data: class_.academic_year },
			{ data: class_.week_day },
			{ data: class_.begins_at },
			{ data: class_.ends_at },
			{
				data: (
					<Link
						to={{
							pathname: `/courses/${course}/units/${unit}/classes/${class_.number}`,
						}}
					>
						<FaExternalLinkAlt />
					</Link>
				),
			},
		],
		[course, unit]
	);

	useEffect(() => {
		async function getUnit() {
			const [
				{ initials: course_initials },
			] = await adminService.get.courseByCode(course);
			const [{ initials: unit_initials }] = await adminService.get.unitByCode(
				course,
				unit
			);
			setUnitData({ course_initials, unit_initials });
			setInitializing(false);
		}

		async function getClasses(number = '') {
			let classes = await adminService.get.classesFromUnit(
				course,
				unit,
				'2019-2020'
			);
			setLoading(false);
			setClasses(classes);

			if (number !== '')
				classes = classes.filter(
					(class_) => class_.number.toString() === number
				);
			const rows = classes.map((class_) => createTableRow(class_));
			setList(!!rows.length ? rows : undefined);
		}

		if (update) {
			getUnit();
			if (searchInput.initial !== '') {
				getClasses(searchInput.initial);
			} else {
				getClasses();
			}
			setUpdate(false);
		}
	}, [searchInput, course, unit, createTableRow, update]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;
		const [class_] = classes.filter(
			(class_) => class_.number.toString() === searchInput.value
		);
		if (class_) rows = [createTableRow(class_)];
		if (searchInput.value === '')
			rows = classes.map((class_) => createTableRow(class_));
		setList(rows);
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
			{!initializing && (
				<Context
					path={[
						{ tier: 'courses', title: 'cursos' },
						{
							tier: `courses/${course}`,
							title: unitData.course_initials,
						},
						{
							tier: `courses/${course}/units`,
							title: 'cadeiras',
						},
						{
							tier: `courses/${course}/units/${unit}`,
							title: unitData.unit_initials,
						},
						{
							tier: `courses/${course}/units/${unit}/classes`,
							title: 'turmas',
						},
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaUsers />
						<span>Turmas</span>
					</Title>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar turma...'}
							onChange={({ target }) =>
								setSearchInput({ initial: '', value: target.value })
							}
							value={
								searchInput.initial === ''
									? searchInput.value
									: searchInput.initial
							}
						/>
						<Button>{loading ? <ButtonSpinner /> : <FaSearch />}</Button>
						<span>Procurar por código de turma</span>
					</SearchSection>
					<TableSection>
						<Table
							columns_width={[12, 17, 22, 20, 20, 9]}
							columns={[
								{ name: 'Código' },
								{ name: 'Ano Lectivo' },
								{ name: 'Dia da Semana' },
								{ name: 'Hora Inicio' },
								{ name: 'Hora Fim' },
							]}
							rows={list}
						/>
					</TableSection>
				</Sheet>
			</Container>
		</>
	);
}

export default ListClasses;
