import React from 'react';

import { Container } from './styles';
import Spinner from '../../components/Spinner';

function Loading() {
	return (
		<Container>
			<Spinner size={100} color={'#0c4da2'} />
		</Container>
	);
}

export default Loading;
