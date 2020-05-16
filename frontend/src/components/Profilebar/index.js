import React from 'react';
import { useAuth, useTheme } from '../../hooks';

import {
	Container,
	User,
	UserAvatar,
	UserDetails,
	ItemGroup,
	Item,
	ItemButton,
} from './styles';
import {
	FaMoon,
	FaSignOutAlt,
	FaUserEdit,
	FaToggleOn,
	FaToggleOff,
} from 'react-icons/fa';

function Profilebar({ profilebarState, sidebarState, toggleProfilebar }) {
	const { user, logout } = useAuth();
	const { toggleTheme, title } = useTheme();

	return (
		<Container profilebarState={profilebarState} sidebarState={sidebarState}>
			<User to={`/profile`}>
				<UserAvatar>
					{user.avatar ? (
						<img src={user.avatar} alt="foto de perfil" />
					) : (
						<div>
							<span>{user.first_name.charAt(0)}</span>
						</div>
					)}
				</UserAvatar>
				<UserDetails>
					<div>
						{user.first_name} {user.last_name}
					</div>
					<div>{user.email}</div>
					<div>{user.username}</div>
				</UserDetails>
			</User>
			<ItemGroup>
				<ItemButton
					onClick={() => {
						toggleTheme();
						toggleProfilebar();
					}}
				>
					<FaMoon />
					<span>Modo escuro</span>
					{title === 'light' ? <FaToggleOff /> : <FaToggleOn />}
				</ItemButton>
				<Item to={`/profile/edit`} onClick={toggleProfilebar}>
					<FaUserEdit />
					<span>Editar Perfil</span>
				</Item>
				<ItemButton onClick={logout}>
					<FaSignOutAlt />
					<span>Sair</span>
				</ItemButton>
			</ItemGroup>
		</Container>
	);
}

export default Profilebar;
