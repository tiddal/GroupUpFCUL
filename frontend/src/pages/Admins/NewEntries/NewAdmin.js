import React, { useState } from 'react';
import adminService from '../../../services/admin';

import { Container, Sheet, Title, Form, Button } from './styles';

import Navigation from '../../../components/Navigation';
import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaAddressCard,
} from 'react-icons/fa';
import { useAuth } from '../../../hooks';

function NewAdmin() {
	const initialState = {
		username: {
			id: 'username',
			type: 'text',
			label: 'Número de administrador',
			value: '',
			validation: { required: true, username: true },
			valid: false,
			error: '',
		},
		first_name: {
			id: 'first_name',
			type: 'text',
			label: 'Nomes próprios',
			value: '',
			validation: { required: true, name: true },
			valid: false,
			error: '',
		},
		last_name: {
			id: 'last_name',
			type: 'text',
			label: 'Apelidos',
			value: '',
			validation: { required: true, name: true },
			valid: false,
			error: '',
		},
		email: {
			id: 'email',
			type: 'text',
			label: 'Email',
			value: '',
			validation: { required: true, email: true },
			valid: false,
			error: '',
		},
	};
	const { logout } = useAuth();
	const [valid, setValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newAdminForm, setNewAdminForm] = useState(initialState);

	function handleInput(target, inputKey) {
		const [valid, error] = validate(
			target.value,
			newAdminForm[inputKey].validation
		);
		const updatedForm = {
			...newAdminForm,
			[inputKey]: {
				...newAdminForm[inputKey],
				value: target.value,
				valid,
				error,
			},
		};
		setNewAdminForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setValid(validForm);
	}

	async function handleSubmission(event) {
		event.preventDefault();
		setLoading(true);
		const adminData = {};
		Object.keys(newAdminForm).map(
			(key) => (adminData[key] = newAdminForm[key].value)
		);
		adminData.password = 'password';
		adminData.role = { type: 'admin', data: { previleges: 1 } };
		const [response, status] = await adminService.createAdmin(adminData);
		const error = {};

		switch (status) {
			case 409:
				if (response.error.key === 'email') {
					error.key = 'email';
					error.msg = 'Este email já se encontra registado.';
					break;
				}
				error.key = 'username';
				error.msg = 'Este número de utilizador já se encontra registado.';
				break;
			case 400:
				const field = response.validation.keys[0].split('.').pop();
				const [, msg] = validate(field, { [field]: true });
				error.key = field;
				error.msg = msg;
				break;
			case 401:
				logout();
				break;
			default:
				break;
		}
		if (Object.keys(error).length > 0) {
			setNewAdminForm({
				...newAdminForm,
				[error.key]: {
					...newAdminForm[error.key],
					error: error.msg,
					valid: false,
				},
			});
			setValid(false);
		} else {
			setNewAdminForm(initialState);
			setCreated(true);
			setTimeout(() => setCreated(false), 2000);
		}
		setLoading(false);
	}

	return (
		<>
			<Navigation
				items={[
					{ icon: <FaUserGraduate />, name: 'Alunos', path: '/students' },
					{ icon: <FaUserTie />, name: 'Professores', path: '/professors' },
					{ icon: <FaUserShield />, name: 'Admins', path: '/admins' },
					{ icon: <FaUniversity />, name: 'Cursos', path: '/courses' },
				]}
			/>
			<Context
				path={[
					{ tier: 'admins', title: 'admins' },
					{ tier: 'admins/new', title: 'novo' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaAddressCard />
						<span>Novo Administrador</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(newAdminForm).map((key) => (
							<Input
								key={newAdminForm[key].id}
								id={newAdminForm[key].id}
								type={newAdminForm[key].type}
								label={newAdminForm[key].label}
								validation={newAdminForm[key].validation}
								error={newAdminForm[key].error}
								value={newAdminForm[key].value}
								change={({ target }) =>
									handleInput(target, newAdminForm[key].id)
								}
							/>
						))}
						<Button disabled={!valid}>
							{loading ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Utilizador criado com sucesso.'} />
		</>
	);
}

export default NewAdmin;
