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

function StudentPanel({ history }) {
	const [loading, setLoading] = useState(true);
	const [students, setStudents] = useState({ online: [], offline: [] });
	const [searchInput, setSearchInput] = useState('');

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setStudents, adminService.get.students);
			setLoading(false);
		}
		setState();
	}, []);

	function handleSearch(event) {
		event.preventDefault();
		history.push({ pathname: '/students/list', panelSearchInput: searchInput });
	}

	return (
		<>
			<Context path={[{ tier: 'students', title: 'Alunos' }]} />
			<Container>
				<StatusCard
					data={
						loading ? (
							<CardSpinner />
						) : (
							<>
								<StatusCardData status="online">
									{students.online.length} Online <span></span>
								</StatusCardData>
								<StatusCardData status="offline">
									{students.offline.length} offline <span></span>
								</StatusCardData>
							</>
						)
					}
				/>
				<SearchCard>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar aluno...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>
							<FaSearch />
						</Button>
						<span>Procurar por número de aluno</span>
					</SearchSection>
				</SearchCard>

				<XSmallCard
					path={'students/list'}
					label={'Ver lista de Alunos'}
					icon={<FaListUl />}
				/>
				<XSmallCard
					path={'students/new'}
					label={'Adicionar Aluno'}
					icon={<FaUserPlus />}
				/>
				<XSmallCard
					path={'students/file'}
					label={'Carregar ficheiro'}
					icon={<FaFileUpload />}
				/>
			</Container>
		</>
	);
}

export default StudentPanel;
