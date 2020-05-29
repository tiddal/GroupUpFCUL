import React from 'react';

import { Container } from './styles';

function Separator({ children }) {
	return (
		<Container>
			<div>
				<span>{children}</span>
			</div>
		</Container>
	);
}

export default Separator;
