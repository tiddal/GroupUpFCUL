import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import adminService from '../../../services/admin';

import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { FaUsers, FaSearch, FaPortrait, FaMinus } from 'react-icons/fa';

import {
	Container,
	Sheet,
	Title,
	Avatar,
	SearchSection,
	SearchBar,
	Button,
	RemoveButton,
	TableSection,
} from './styles';

import { ButtonSpinner } from '../../../components/Spinner';

function ListClassMembers({ location: { panelSearchInput } }) {
	const [list, setList] = useState();
	const [members, setMembers] = useState();
	const [initializing, setInitializing] = useState(true);
	const [unitData, setUnitData] = useState({
		course_initials: '',
		unit_initials: '',
	});
	const {
		params: { course, unit, class_number },
	} = useRouteMatch(
		'/courses/:course/units/:unit/classes/:class_number/members'
	);
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [update, setUpdate] = useState(true);
	const [loading, setLoading] = useState(true);

	const removeFromClass = useCallback(
		async (username, role) => {
			if (role === 'Aluno') {
				const [, status] = await adminService.remove.studentFromClass(
					course,
					unit,
					'2019-2020',
					class_number,
					username
				);
				if (status === 204) setUpdate(true);
			}
			if (role === 'Professor') {
				const [, status] = await adminService.remove.professorFromClass(
					course,
					unit,
					'2019-2020',
					class_number,
					username
				);
				if (status === 204) setUpdate(true);
			}
		},
		[class_number, course, unit]
	);

	const createTableRow = useCallback(
		(user) => [
			{
				data: user.avatar_url ? (
					<Avatar>
						<img src={user.avatar_url} alt={`${user.username} profile`} />
					</Avatar>
				) : (
					<Avatar>
						<span>{user.first_name.charAt(0)}</span>
					</Avatar>
				),
			},
			{ data: user.username },
			{ data: user.role },
			{ data: `${user.first_name} ${user.last_name}`, align: 'left' },
			{
				data: (
					<RemoveButton
						onClick={() => removeFromClass(user.username, user.role)}
					>
						<FaMinus />
					</RemoveButton>
				),
			},
		],
		[removeFromClass]
	);

	useEffect(() => {
		async function setState() {
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
		setState();
		async function getMembers(username = '') {
			let [students] = await adminService.get.studentsFromClass(
				class_number,
				'2019-2020',
				course,
				unit
			);
			students = students.map((student) => ({ ...student, role: 'Aluno' }));
			let [professors] = await adminService.get.professorsFromClass(
				class_number,
				'2019-2020',
				course,
				unit
			);
			professors = professors.map((professor) => ({
				...professor,
				role: 'Professor',
			}));
			let users = professors.concat(students);
			setLoading(false);
			setMembers(users);
			if (username !== '')
				users = users.filter((user) => user.username === username);
			const rows = users.map((user) => createTableRow(user));
			setList(!!rows.length ? rows : undefined);
		}
		if (update) {
			if (searchInput.initial !== '') {
				getMembers(searchInput.initial);
			} else {
				getMembers();
			}
			setUpdate(false);
		}
	}, [searchInput, course, unit, class_number, createTableRow, update]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;
		const [user] = members.filter(
			(user) => user.username === searchInput.value
		);
		if (user) rows = [createTableRow(user)];
		if (searchInput.value === '')
			rows = members.map((user) => createTableRow(user));
		setList(rows);
	}

	return (
		<>
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
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}`,
							title: class_number,
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}/members`,
							title: 'membros',
						},
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaUsers />
						<span>Membros</span>
					</Title>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar membro...'}
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

						<span>Procurar por número de utilizador</span>
					</SearchSection>
					<TableSection>
						<Table
							columns_width={[9, 15, 15, 52, 9]}
							columns={[
								{ name: <FaPortrait /> },
								{ name: 'Número' },
								{ name: 'Estatuto' },
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

export default ListClassMembers;
