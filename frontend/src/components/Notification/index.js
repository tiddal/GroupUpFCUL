import React from 'react';

import { Container } from './styles';

function Notification({ text, popup }) {
	return <Container popup={popup}>{text}</Container>;
}

export default Notification;
