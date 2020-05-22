import React from 'react';

import {
	XSmallContainer,
	SmallContainer,
	BigContainer,
	StatusContainer,
	SearchCardContainer,
	Title,
	SmallTitle,
	Link,
	Info,
	Icon,
} from './styles';

import { FaSearch } from 'react-icons/fa';

export function SmallCard({ title, icon, path, label, data }) {
	return (
		<SmallContainer>
			<Title>
				{icon}
				<span>{title}</span>
			</Title>
			<Info>{data}</Info>
			<Link to={path}>
				<span>{label}</span>
			</Link>
		</SmallContainer>
	);
}

export function BigCard({ title, icon, path, label, data }) {
	return (
		<BigContainer>
			<Title>
				{icon}
				<span>{title}</span>
			</Title>
			<Info>{data}</Info>
			<Link to={path}>
				<span>{label}</span>
			</Link>
		</BigContainer>
	);
}

export function StatusCard({ data }) {
	return <StatusContainer>{data}</StatusContainer>;
}

export function SearchCard({ children }) {
	return (
		<SearchCardContainer>
			<SmallTitle>
				<FaSearch />
				<span>Procurar</span>
			</SmallTitle>
			{children}
		</SearchCardContainer>
	);
}

export function XSmallCard({ icon, path, label }) {
	return (
		<XSmallContainer>
			<Icon>{icon}</Icon>
			<Link to={path}>{label}</Link>
		</XSmallContainer>
	);
}
