import React from 'react';

import { Container } from './styles';
import { ReactComponent as Construction } from '../../assets/construction.svg';

function Notifications() {
	return (
		<Container>
			<div>
				<Construction />
				<p>Página em construção</p>
			</div>
		</Container>
	);
}

export default Notifications;
