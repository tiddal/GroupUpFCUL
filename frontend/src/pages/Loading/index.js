import React from 'react';

import { Container } from './styles';
import Spinner from '../../components/Spinner';

function Loading() {
	return (
		<Container>
			<Spinner />
		</Container>
	);
}

export default Loading;
