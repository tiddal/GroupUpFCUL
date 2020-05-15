import React from 'react';

import {
	Container,
	StaticContainer,
	ItemGroup,
	Item,
	ModalBackdrop,
} from './styles';
import { FaColumns, FaBell, FaEnvelope } from 'react-icons/fa';

function Sidebar({ items, state, toggleSidebar }) {
	return (
		<>
			<Container open={state}>
				<ItemGroup>
					<Item exact to="/" onClick={state && toggleSidebar}>
						<FaColumns />
						<span>Dashboard</span>
					</Item>
					<Item to="/notifications" onClick={state && toggleSidebar}>
						<FaBell />
						<span>Notificações</span>
					</Item>
					<Item to="/messages" onClick={state && toggleSidebar}>
						<FaEnvelope />
						<span>Mensagens</span>
					</Item>
				</ItemGroup>
				<ItemGroup>
					{items.map((item) => (
						<Item
							key={item.name}
							to={item.path}
							onClick={state && toggleSidebar}
						>
							{item.icon}
							<span>{item.name}</span>
						</Item>
					))}
				</ItemGroup>
			</Container>
			<StaticContainer>
				<ItemGroup>
					<Item exact to="/" onClick={state && toggleSidebar}>
						<FaColumns />
					</Item>
					<Item to="/notifications" onClick={state && toggleSidebar}>
						<FaBell />
					</Item>
					<Item to="/messages" onClick={state && toggleSidebar}>
						<FaEnvelope />
					</Item>
				</ItemGroup>
				<ItemGroup>
					{items.map((item) => (
						<Item
							key={item.name}
							to={item.path}
							onClick={state && toggleSidebar}
						>
							{item.icon}
						</Item>
					))}
				</ItemGroup>
			</StaticContainer>
		</>
	);
}

export default Sidebar;
