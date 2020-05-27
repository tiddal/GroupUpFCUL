import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import adminService from '../../../services/admin';

import Navigation from '../../../components/Navigation';
import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { ButtonSpinner } from '../../../components/Spinner';
import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaListAlt,
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

function ListUnits({ location: { panelSearchInput } }) {
	const {
		params: { course },
	} = useRouteMatch('/courses/:course/units');
	const [initializing, setInitializing] = useState(true);
	const [courseData, setCourseData] = useState({ initials: '', code: '' });
	const [list, setList] = useState();
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [loading, setLoading] = useState(false);

	const createTableRow = useCallback(
		(unit) => [
			{ data: unit.code },
			{ data: unit.initials },
			{ data: unit.semester },
			{ data: unit.name, align: 'left' },
			{
				data: (
					<Link to={`/courses/${course}/units/${unit.code}`}>
						<FaExternalLinkAlt />
					</Link>
				),
			},
		],
		[course]
	);

	useEffect(() => {
		async function getCourse() {
			const [{ initials, code }] = await adminService.get.courseByCode(course);
			setCourseData({ initials, code });
			setInitializing(false);
		}
		async function getUnits(unitCode = '') {
			if (unitCode === '') {
				const units = await adminService.get.unitsFromCourse(course);
				const rows = units.map((unit) => createTableRow(unit));
				setList(rows);
			} else {
				const [unit, status] = await adminService.get.unitByCode(
					course,
					unitCode
				);
				status === 200 ? setList([createTableRow(unit)]) : setList();
			}
		}
		getCourse();
		if (searchInput.initial !== '') {
			getUnits(searchInput.initial);
		} else {
			getUnits();
		}
	}, [searchInput, course, createTableRow]);

	async function getUnitByCode() {
		setLoading(true);
		const [unit, status] = await adminService.get.unitByCode(
			course,
			searchInput.value
		);
		status === 200 ? setList([createTableRow(unit)]) : setList();
		setLoading(false);
	}

	function handleSearch(event) {
		event.preventDefault();
		getUnitByCode();
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
						{ tier: `courses/${course}`, title: courseData.initials },
						{ tier: `courses/${course}/units`, title: 'cadeiras' },
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaListAlt />
						<span>Cadeiras</span>
					</Title>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar cadeira...'}
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
						<span>Procurar por código da cadeira</span>
					</SearchSection>
					<TableSection>
						<Table
							columns_width={[11, 10, 12, 58, 9]}
							columns={[
								{ name: 'Código' },
								{ name: 'Sigla' },
								{ name: 'Semestre' },
								{ name: 'Nome', align: 'left' },
							]}
							rows={list}
						/>
					</TableSection>
				</Sheet>
			</Container>
		</>
	);
}

export default ListUnits;
