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
	FaListAlt,
	FaSearch,
	FaExternalLinkAlt,
	FaPortrait,
} from 'react-icons/fa';

import {
	Container,
	Sheet,
	Title,
	SearchSection,
	SearchBar,
	Button,
	Link,
	Avatar,
	TableSection,
} from './styles';

function ListAdmins() {
	const [list, setList] = useState();
	const [searchInput, setSearchInput] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getAdmins() {
			const response = await adminService.getAdmins();
			const rows = response.map((user) => createTableRow(user));
			setList(rows);
		}
		if (searchInput === '') getAdmins();
	}, [searchInput]);

	async function handleSearch(event) {
		event.preventDefault();
		setLoading(true);
		const [admin, status] = await adminService.getAdminByUsername(searchInput);
		status === 200 ? setList([createTableRow(admin)]) : setList();
		setLoading(false);
	}

	const createTableRow = (user) => [
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
		{ data: `${user.first_name} ${user.last_name}`, align: 'left' },
		{
			data: (
				<Link to={`/admins/${user.username}/edit`} target="_blank">
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
					{ tier: 'admins', title: 'admins' },
					{ tier: 'admins/list', title: 'listar' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaListAlt />
						<span>Admins</span>
					</Title>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar administrador...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>{loading ? <ButtonSpinner /> : <FaSearch />}</Button>
						<span>Procurar por número de administrador</span>
					</SearchSection>
					<TableSection>
						<Table
							columns_width={[9, 15, 67, 9]}
							columns={[
								{ name: <FaPortrait /> },
								{ name: 'Número' },
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

export default ListAdmins;
