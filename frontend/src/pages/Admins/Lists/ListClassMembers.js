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
	FaEdit,
	FaPortrait,
} from 'react-icons/fa';

import {
	Container,
	Sheet,
	Title,
	Avatar,
	SearchSection,
	SearchBar,
	Button,
	Link,
	TableSection,
} from './styles';

function ListClassMembers({ location: { panelSearchInput } }) {
	const [list, setList] = useState();
	const [members, setMembers] = useState([]);
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
	const [loading, setLoading] = useState(false);

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
					<Link to={`/`}>
						<FaEdit />
					</Link>
				),
			},
		],
		[course, unit]
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
			setLoading(false);
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
			const users = students.concat(professors);
			setMembers(users);
			if (username === '') {
				!!users.length ? setList([createTableRow(users)]) : setList();
			} else {
				let member = members.filter(
					(user) => user.username === searchInput.value
				);
				!!member.length ? setList([createTableRow(member)]) : setList();
			}
		}
		if (searchInput.initial !== '') {
			getMembers(searchInput.initial);
		} else {
			getMembers();
		}
	}, [searchInput, course, unit, createTableRow]);

	function handleSearch(event) {
		event.preventDefault();
		let member = members.filter((user) => user.username === searchInput.value);
		!!member.length ? setList([createTableRow(member)]) : setList();
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
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}`,
							title: class_number,
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}/members`,
							title: 'elementos',
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
