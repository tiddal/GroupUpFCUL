import React from 'react';

import { Container, Title, Link } from './styles';

import { FaUserGraduate } from 'react-icons/fa';

function Card() {
	return (
		<Container>
			<Title>
				<FaUserGraduate />
				<span>Alunos</span>
			</Title>
			<Link to="/students">
				<span>Gerir Alunos</span>
			</Link>
		</Container>
	);
}

export default Card;
