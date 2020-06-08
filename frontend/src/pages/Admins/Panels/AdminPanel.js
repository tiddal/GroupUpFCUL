import React, { useEffect, useState } from 'react';
import adminService from '../../../services/admin';

import { CardSpinner } from '../../../components/Spinner';
import Context from '../../../components/Context';
import { StatusCard, SearchCard, XSmallCard } from '../../../components/Card';

import { FaListUl, FaUserPlus, FaFileUpload, FaSearch } from 'react-icons/fa';

import {
	Container,
	SearchSection,
	SearchBar,
	Button,
	StatusCardData,
} from './styles';

function AdminPanel({ history }) {
	const [loading, setLoading] = useState(true);
	const [admins, setAdmins] = useState({ online: [], offline: [] });
	const [searchInput, setSearchInput] = useState('');

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setAdmins, adminService.get.admins);
			setLoading(false);
		}
		setState();
	}, []);

	function handleSearch(event) {
		event.preventDefault();
		history.push({ pathname: '/admins/list', panelSearchInput: searchInput });
	}

	return (
		<>
			<Context path={[{ tier: 'admins', title: 'admins' }]} />
			<Container>
				<StatusCard
					data={
						loading ? (
							<CardSpinner />
						) : (
							<>
								<StatusCardData status="online">
									{admins.online.length} Online <span></span>
								</StatusCardData>
								<StatusCardData status="offline">
									{admins.offline.length} offline <span></span>
								</StatusCardData>
							</>
						)
					}
				/>
				<SearchCard>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar administrador...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>
							<FaSearch />
						</Button>
						<span>Procurar por número de administrador</span>
					</SearchSection>
				</SearchCard>

				<XSmallCard
					path={'admins/list'}
					label={'Ver lista de Admins'}
					icon={<FaListUl />}
				/>
				<XSmallCard
					path={'admins/new'}
					label={'Adicionar Admin'}
					icon={<FaUserPlus />}
				/>
				<XSmallCard
					path={'admins/file'}
					label={'Carregar ficheiro'}
					icon={<FaFileUpload />}
				/>
			</Container>
		</>
	);
}

export default AdminPanel;
