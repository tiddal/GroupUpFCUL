import React from 'react';
import { useAuth } from '../../hooks';

import { Container, Menu, Logo, User, UserAvatar, UserName } from './styles';

import logo from '../../assets/logo_icon_white.svg';

import { FaBars } from 'react-icons/fa';

function Navbar({ toggleSidebar }) {
	const { user } = useAuth();

	return (
		<Container>
			<Menu onClick={toggleSidebar}>
				<FaBars />
			</Menu>
			<Logo>
				<img src={logo} alt="Group Up Logo" />
			</Logo>
			<User>
				<UserName>{user.first_name}</UserName>
				<UserAvatar>
					{user.avatar ? (
						<img src={user.avatar} alt="foto de perfil" />
					) : (
						<div>
							<span>{user.first_name.charAt(0)}</span>
						</div>
					)}
				</UserAvatar>
			</User>
		</Container>
	);
}

export default Navbar;
