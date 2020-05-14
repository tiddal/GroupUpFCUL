import React from 'react';
import { useAuth } from '../../hooks';

import { Container, Menu, Logo, Avatar } from './styles';

import professor from '../../assets/professor.jpeg';
import logo from '../../assets/logo_icon_white.svg';

import { FaBars } from 'react-icons/fa';

function Navbar() {
	const { user } = useAuth();

	return (
		<Container>
			<Menu>
				<FaBars />
			</Menu>
			<Logo>
				<img src={logo} />
			</Logo>
			<Avatar>
				{user.avatar ? (
					<img src={user.avatar} alt="foto de perfil" />
				) : (
					<div>{user.username.charAt(0)}</div>
				)}
			</Avatar>
		</Container>
	);
}

export default Navbar;
