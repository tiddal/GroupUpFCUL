import React, { useEffect, useState } from 'react';
import adminService from '../../../services/admin';

import Navigation from '../../../components/Navigation';
import Spinner from '../../../components/Spinner';
import Context from '../../../components/Context';
import { StatusCard, SearchCard, XSmallCard } from '../../../components/Card';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaListUl,
	FaUserPlus,
	FaFileUpload,
} from 'react-icons/fa';

import { Container, StatusCardData } from './styles';

function AdminPanel() {
	const [loading, setLoading] = useState(true);
	const [admins, setAdmins] = useState({ online: [], offline: [] });

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setAdmins, adminService.getAdmins);
			setLoading(false);
		}
		setState();
	}, []);

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
			<Context path={[{ tier: 'admins', title: 'admins' }]} />
			{loading ? (
				<Spinner />
			) : (
				<Container>
					<StatusCard
						data={
							<>
								<StatusCardData status="online">
									{admins.online.length} Online <span></span>
								</StatusCardData>
								<StatusCardData status="offline">
									{admins.offline.length} offline <span></span>
								</StatusCardData>
							</>
						}
					/>
					<SearchCard
						placeholder={'Procurar administrador...'}
						info={'Procure por número de administrador'}
					/>
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
			)}
		</>
	);
}

export default AdminPanel;
