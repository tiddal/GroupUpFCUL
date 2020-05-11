import React, { useState } from 'react';

import logo from '../../assets/logo.svg';
import authService from '../../services/auth';

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

function Login() {
	const [inputs, setInputs] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const loginHandler = async (event) => {
		event.preventDefault();
		setLoading(true);
		await authService.authenticate(inputs.email, inputs.password);
		// setError(true);
		setLoading(false);
	};

	return (
		<Background>
			<Container>
				<Logo>
					<img src={logo} alt="Group Up logo" />
				</Logo>
				<Form onSubmit={(event) => loginHandler(event)}>
					<Input
						placeholder="Email"
						onChange={(event) =>
							setInputs({ ...inputs, email: event.target.value })
						}
					/>
					<Input
						placeholder="Password"
						type="password"
						onChange={(event) =>
							setInputs({ ...inputs, password: event.target.value })
						}
					/>
					{error && <Error>Falha na autenticação</Error>}
					<Button type="submit">{loading ? <Spinner /> : 'Entrar'}</Button>
				</Form>
			</Container>
		</Background>
	);
}

export default Login;
