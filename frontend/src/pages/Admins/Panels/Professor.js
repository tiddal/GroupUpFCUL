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

function ProfessorPanel() {
	const [loading, setLoading] = useState(true);
	const [professors, setProfessors] = useState({ online: [], offline: [] });

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setProfessors, adminService.getProfessors);
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
			<Context path={[{ tier: 'professors', title: 'professores' }]} />
			{loading ? (
				<Spinner />
			) : (
				<Container>
					<StatusCard
						data={
							<>
								<StatusCardData status="online">
									{professors.online.length} online <span></span>
								</StatusCardData>
								<StatusCardData status="offline">
									{professors.offline.length} offline <span></span>
								</StatusCardData>
							</>
						}
					/>
					<SearchCard
						placeholder={'Procurar professor...'}
						info={'Procure por número de professor'}
					/>
					<XSmallCard
						path={'professors/list'}
						label={'Ver lista de Professores'}
						icon={<FaListUl />}
					/>
					<XSmallCard
						path={'professors/new'}
						label={'Adicionar Professor'}
						icon={<FaUserPlus />}
					/>
					<XSmallCard
						path={'professors/file'}
						label={'Carregar ficheiro'}
						icon={<FaFileUpload />}
					/>
				</Container>
			)}
		</>
	);
}

export default ProfessorPanel;
