import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import adminService from '../../../services/admin';

import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { ButtonSpinner } from '../../../components/Spinner';
import { FaListAlt, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';

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
	const [courseData, setCourseData] = useState({ initials: '' });
	const [units, setUnits] = useState();
	const [list, setList] = useState();
	const [update, setUpdate] = useState(true);
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [loading, setLoading] = useState(true);

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
			const [{ initials }] = await adminService.get.courseByCode(course);
			setCourseData({ initials });
			setInitializing(false);
		}

		async function getUnits(code = '') {
			let units = await adminService.get.unitsFromCourse(course);
			setLoading(false);
			setUnits(units);
			if (code !== '')
				units = units.filter((unit) => unit.code.toString() === code);
			const rows = units.map((unit) => createTableRow(unit));
			setList(!!rows.length ? rows : undefined);
		}
		if (update) {
			getCourse();
			if (searchInput.initial !== '') {
				getUnits(searchInput.initial);
			} else {
				getUnits();
			}
			setUpdate(false);
		}
	}, [searchInput, course, createTableRow, update]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;
		const [unit] = units.filter(
			(unit) => unit.code.toString() === searchInput.value
		);
		if (unit) rows = [createTableRow(unit)];
		if (searchInput.value === '')
			rows = units.map((unit) => createTableRow(unit));
		setList(rows);
	}

	return (
		<>
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
							columns_width={[11, 10, 20, 50, 9]}
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
