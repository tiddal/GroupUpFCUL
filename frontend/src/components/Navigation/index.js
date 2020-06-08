import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Profilebar from '../Profilebar';
import Modal from '../Modal';
import professorService from '../../services/professor';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
} from 'react-icons/fa';

function Navigation() {
	const [sidebarState, setSidebarState] = useState(false);
	const [profileBarState, setProfileBarState] = useState(false);

	const [sideBarItems, setSideBarItems] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		async function getAsyncItems() {
			const classes = await professorService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const units = classes.reduce((unique, unit) => {
				return unique.some((item) => item.code === unit.code)
					? unique
					: [...unique, unit];
			}, []);
			setSideBarItems(
				units
					? units.map((unit) => ({
							icon: <div>{unit.initials}</div>,
							name: unit.name,
							path: `/projects/${unit.code}`,
					  }))
					: []
			);
		}
		function getItems() {
			setSideBarItems([
				{ icon: <FaUserGraduate />, name: 'Alunos', path: '/students' },
				{ icon: <FaUserTie />, name: 'Professores', path: '/professors' },
				{ icon: <FaUserShield />, name: 'Admins', path: '/admins' },
				{ icon: <FaUniversity />, name: 'Cursos', path: '/courses' },
			]);
		}
		if (user.role !== 'admin') getAsyncItems();
		if (user.role === 'admin') getItems();
	}, [user]);

	return (
		<>
			<Navbar
				toggleSidebar={() => setSidebarState(!sidebarState)}
				setProfileBarState={() => setProfileBarState(true)}
				profileBarState={profileBarState}
			/>
			<Sidebar
				items={sideBarItems}
				sidebarState={sidebarState}
				toggleSidebar={() => setSidebarState(!sidebarState)}
			/>
			<Modal
				contentState={profileBarState}
				setContentState={() => setProfileBarState(false)}
			>
				<Profilebar
					profilebarState={profileBarState}
					toggleProfilebar={() => setSidebarState(false)}
				/>
			</Modal>
		</>
	);
}

export default React.memo(Navigation);
