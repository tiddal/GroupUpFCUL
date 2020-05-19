import React from 'react';

import { Container, Link } from './styles';

function Context({ path }) {
	return (
		<Container>
			{path.map((route) => (
				<span key={route.tier}>
					<Link to={`/${route.tier}`}>{route.title}</Link>
					<span> /</span>
				</span>
			))}
		</Container>
	);
}

export default Context;
