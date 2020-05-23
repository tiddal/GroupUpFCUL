import React from 'react';

import { Container, MiniContainer, CardContainer } from './styles';

function Spinner() {
	return <Container />;
}

export default Spinner;

export function ButtonSpinner() {
	return <MiniContainer />;
}

export function CardSpinner() {
	return <CardContainer />;
}
