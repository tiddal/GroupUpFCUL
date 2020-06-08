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

function ProfessorPanel({ history }) {
	const [loading, setLoading] = useState(true);
	const [professors, setProfessors] = useState({ online: [], offline: [] });
	const [searchInput, setSearchInput] = useState('');

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setProfessors, adminService.get.professors);
			setLoading(false);
		}
		setState();
	}, []);

	function handleSearch(event) {
		event.preventDefault();
		history.push({
			pathname: '/professors/list',
			panelSearchInput: searchInput,
		});
	}

	return (
		<>
			<Context path={[{ tier: 'professors', title: 'professores' }]} />
			<Container>
				<StatusCard
					data={
						loading ? (
							<CardSpinner />
						) : (
							<>
								<StatusCardData status="online">
									{professors.online.length} Online <span></span>
								</StatusCardData>
								<StatusCardData status="offline">
									{professors.offline.length} offline <span></span>
								</StatusCardData>
							</>
						)
					}
				/>
				<SearchCard>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar professor...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>
							<FaSearch />
						</Button>
						<span>Procurar por número de professor</span>
					</SearchSection>
				</SearchCard>

				<XSmallCard
					path={'professors/list'}
					label={'Ver lista de Professores'}
					icon={<FaListUl />}
				/>
				<XSmallCard
					path={'professors/new'}
					label={'Adicionar Professores'}
					icon={<FaUserPlus />}
				/>
				<XSmallCard
					path={'professors/file'}
					label={'Carregar ficheiro'}
					icon={<FaFileUpload />}
				/>
			</Container>
		</>
	);
}

export default ProfessorPanel;
