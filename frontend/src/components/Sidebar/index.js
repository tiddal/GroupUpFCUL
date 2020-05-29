import React from 'react';

import { Container, StaticContainer, ItemGroup, Item } from './styles';
import { FaColumns, FaBell, FaEnvelope } from 'react-icons/fa';

function Sidebar({ items, sidebarState, profilebarState, toggleSidebar }) {
	return (
		<>
			<Container sidebarState={sidebarState} profilebarState={profilebarState}>
				<ItemGroup>
					<Item exact to="/" onClick={() => sidebarState && toggleSidebar()}>
						<div>
							<FaColumns />
						</div>
						<span>Dashboard</span>
					</Item>
					<Item
						to="/notifications"
						onClick={() => sidebarState && toggleSidebar()}
					>
						<div>
							<FaBell />
						</div>
						<span>Notificações</span>
					</Item>
					<Item to="/messages" onClick={() => sidebarState && toggleSidebar()}>
						<div>
							<FaEnvelope />
						</div>
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
							<div>{item.icon}</div>
							<span>{item.name}</span>
						</Item>
					))}
				</ItemGroup>
			</Container>
			<StaticContainer>
				<ItemGroup>
					<Item exact to="/" onClick={() => sidebarState && toggleSidebar()}>
						<div>
							<FaColumns />
						</div>
					</Item>
					<Item
						to="/notifications"
						onClick={() => sidebarState && toggleSidebar()}
					>
						<div>
							<FaBell />
						</div>
					</Item>
					<Item to="/messages" onClick={() => sidebarState && toggleSidebar()}>
						<div>
							<FaEnvelope />
						</div>
					</Item>
				</ItemGroup>
				<ItemGroup>
					{items.map((item) => (
						<Item
							key={item.name}
							to={item.path}
							onClick={() => sidebarState && toggleSidebar()}
						>
							<div>{item.icon}</div>
						</Item>
					))}
				</ItemGroup>
			</StaticContainer>
		</>
	);
}

export default React.memo(Sidebar);
