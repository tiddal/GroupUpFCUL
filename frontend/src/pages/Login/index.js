import React, { useState, useEffect } from 'react';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks';
import {
	Background,
	Container,
	Logo,
	Form,
	Input,
	Button,
	Error,
	Spinner,
} from './styles';

function Login({ history }) {
	const { login, loading, error } = useAuth();

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	useEffect(() => {
		history.push('/');
	}, [history]);

	function handleLogin(event) {
		event.preventDefault();
		login({ email, password });
	}

	return (
		<Background>
			<Container>
				<Logo>
					<img src={logo} alt="Group Up logo" />
				</Logo>
				<Form onSubmit={handleLogin}>
					<Input
						placeholder="Email"
						onChange={({ target }) => setEmail(target.value)}
					/>
					<Input
						placeholder="Password"
						type="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
					{error && <Error>Falha na autenticação</Error>}
					<Button type="submit">{loading ? <Spinner /> : 'Entrar'}</Button>
				</Form>
			</Container>
		</Background>
	);
}

export default Login;
