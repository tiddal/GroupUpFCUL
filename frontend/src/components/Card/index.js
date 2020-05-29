import React from 'react';

import {
	Container,
	TwoThirdsContainer,
	MiniContainer,
	XSmallContainer,
	SmallContainer,
	BigContainer,
	StatusContainer,
	SearchCardContainer,
	Title,
	SmallTitle,
	Link,
	Content,
	Icon,
} from './styles';

import { FaSearch } from 'react-icons/fa';

export function Card({ title, icon, link, content }) {
	return (
		<Container>
			<Title>
				{icon}
				<span>{title}</span>
			</Title>
			<Content>{content}</Content>
			{link && (
				<Link to={link.path}>
					<span>{link.label}</span>
				</Link>
			)}
		</Container>
	);
}

export function TwoThirdsCard({ title, icon, link, content }) {
	return (
		<TwoThirdsContainer>
			<Title>
				{icon}
				<span>{title}</span>
			</Title>
			<Content>{content}</Content>
			{link && (
				<Link to={link.path}>
					<span>{link.label}</span>
				</Link>
			)}
		</TwoThirdsContainer>
	);
}

export function MiniCard({ data }) {
	return (
		<MiniContainer>
			<span>{data}</span>
		</MiniContainer>
	);
}

export function SmallCard({ title, icon, path, label, data }) {
	return (
		<SmallContainer>
			<Title>
				{icon}
				<span>{title}</span>
			</Title>
			<Content>{data}</Content>
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
			<Content>{data}</Content>
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
