import React from 'react';

import { Container, StaticContainer, ItemGroup, Item } from './styles';
import { FaColumns, FaBell, FaEnvelope } from 'react-icons/fa';

function Sidebar({ items, sidebarState, profilebarState, toggleSidebar }) {
	return (
		<>
			<Container sidebarState={sidebarState} profilebarState={profilebarState}>
				<ItemGroup>
					<Item exact to="/" onClick={() => sidebarState && toggleSidebar()}>
						<FaColumns />
						<span>Dashboard</span>
					</Item>
					<Item
						to="/notifications"
						onClick={() => sidebarState && toggleSidebar()}
					>
						<FaBell />
						<span>Notificações</span>
					</Item>
					<Item to="/messages" onClick={() => sidebarState && toggleSidebar()}>
						<FaEnvelope />
						<span>Mensagens</span>
					</Item>
				</ItemGroup>
				<ItemGroup>
					{items.map((item) => (
						<Item
							key={item.name}
							to={item.path}
							onClick={() => sidebarState && toggleSidebar()}
						>
							{item.icon}
							<span>{item.name}</span>
						</Item>
					))}
				</ItemGroup>
			</Container>
			<StaticContainer>
				<ItemGroup>
					<Item exact to="/" onClick={() => sidebarState && toggleSidebar()}>
						<FaColumns />
					</Item>
					<Item
						to="/notifications"
						onClick={() => sidebarState && toggleSidebar()}
					>
						<FaBell />
					</Item>
					<Item to="/messages" onClick={() => sidebarState && toggleSidebar()}>
						<FaEnvelope />
					</Item>
				</ItemGroup>
				<ItemGroup>
					{items.map((item) => (
						<Item
							key={item.name}
							to={item.path}
							onClick={() => sidebarState && toggleSidebar()}
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
