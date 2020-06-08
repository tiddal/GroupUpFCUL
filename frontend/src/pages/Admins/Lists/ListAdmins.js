import React, { useState, useEffect } from 'react';
import adminService from '../../../services/admin';

import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { ButtonSpinner } from '../../../components/Spinner';
import { FaListAlt, FaSearch, FaPortrait, FaEdit } from 'react-icons/fa';

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

function ListAdmins({ location: { panelSearchInput } }) {
	const [admins, setAdmins] = useState();
	const [list, setList] = useState();
	const [update, setUpdate] = useState(true);
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getAdmins(username = '') {
			let users = await adminService.get.admins();
			setLoading(false);
			setAdmins(users);
			if (username !== '')
				users = users.filter((user) => user.username === username);
			const rows = users.map((user) => createTableRow(user));
			setList(!!rows.length ? rows : undefined);
		}

		if (update) {
			if (searchInput.initial !== '') {
				getAdmins(searchInput.initial);
			} else {
				getAdmins();
			}
			setUpdate(false);
		}
	}, [searchInput, update]);

	function handleSearch(event) {
		event.preventDefault();
		let rows = undefined;
		const [user] = admins.filter((user) => user.username === searchInput.value);
		if (user) rows = [createTableRow(user)];
		if (searchInput.value === '')
			rows = admins.map((user) => createTableRow(user));
		setList(rows);
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
				<Link to={`/admins/${user.username}/edit`}>
					<FaEdit />
				</Link>
			),
		},
	];

	return (
		<>
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
