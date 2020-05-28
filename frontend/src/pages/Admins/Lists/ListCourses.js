import React, { useState, useEffect } from 'react';
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

function ListCourses({ location: { panelSearchInput } }) {
	const [courses, setCourses] = useState();
	const [list, setList] = useState();
	const [update, setUpdate] = useState(true);
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getCourses(code = '') {
			let courses = await adminService.get.courses();
			setLoading(false);
			setCourses(courses);
			if (code !== '')
				courses = courses.filter((course) => course.code.toString() === code);
			const rows = courses.map((course) => createTableRow(course));
			setList(!!rows.length ? rows : undefined);
		}

		if (update) {
			if (searchInput.initial !== '') {
				getCourses(searchInput.initial);
			} else {
				getCourses();
			}
			setUpdate(false);
		}
	}, [searchInput, update]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;
		const [course] = courses.filter(
			(course) => course.code.toString() === searchInput.value
		);
		if (course) rows = [createTableRow(course)];
		if (searchInput.value === '')
			rows = courses.map((course) => createTableRow(course));
		setList(rows);
	}

	const createTableRow = (course) => [
		{ data: course.code },
		{ data: course.initials },
		{ data: course.cycle },
		{ data: course.name, align: 'left' },
		{
			data: (
				<Link
					to={{
						pathname: `/courses/${course.code}/`,
						initials: course.initials,
					}}
				>
					<FaExternalLinkAlt />
				</Link>
			),
		},
	];

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
			<Context
				path={[
					{ tier: 'courses', title: 'cursos' },
					{ tier: 'courses/list', title: 'listar' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaUniversity />
						<span>Cursos</span>
					</Title>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar curso...'}
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
						<span>Procurar por código de curso</span>
					</SearchSection>
					<TableSection>
						<Table
							columns_width={[11, 10, 10, 60, 9]}
							columns={[
								{ name: 'Código' },
								{ name: 'Sigla' },
								{ name: 'Cíclo' },
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

export default ListCourses;
