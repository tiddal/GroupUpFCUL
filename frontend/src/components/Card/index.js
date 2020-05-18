import React from 'react';

import { SmallContainer, BigContainer, Title, Link, Info } from './styles';

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
