import React from 'react';

import Navigation from '../../../components/Navigation';
import Table from '../../../components/Table';
import Context from '../../../components/Context';
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
					<SearchSection>
						<SearchBar placeholder={'Procurar administrador...'} />
						<Button>
							<FaSearch />
						</Button>
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
							rows={[
								{
									cells: [
										{
											data: (
												<Avatar>
													<span>Z</span>
												</Avatar>
											),
										},
										{
											data: 'fc49049',
										},
										{
											data: 'Zé Pedro Resende',
											align: 'left',
										},
										{
											data: (
												<Link to="/">
													<FaExternalLinkAlt />
												</Link>
											),
										},
									],
								},
								{
									cells: [
										{
											data: (
												<Avatar>
													<span>Z</span>
												</Avatar>
											),
										},
										{
											data: 'fc49049',
										},
										{
											data: 'Zé Pedro Resende',
											align: 'left',
										},
										{
											data: (
												<Link to="/">
													<FaExternalLinkAlt />
												</Link>
											),
										},
									],
								},
							]}
						/>
					</TableSection>
				</Sheet>
			</Container>
		</>
	);
}

export default ListAdmins;
