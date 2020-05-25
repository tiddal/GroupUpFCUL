import React, { useState, useEffect } from 'react';
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
	FaEdit,
	FaTrash,
} from 'react-icons/fa';
import { useAuth } from '../../../hooks';

function EditAdmin({
	match: {
		params: { user },
	},
	history,
}) {
	const initialState = {
		first_name: {
			id: 'first_name',
			type: 'text',
			label: 'Nomes próprios',
			value: '',
			validation: { name: true },
			valid: true,
			error: '',
		},
		last_name: {
			id: 'last_name',
			type: 'text',
			label: 'Apelidos',
			value: '',
			validation: { name: true },
			valid: true,
			error: '',
		},
		email: {
			id: 'email',
			type: 'text',
			label: 'Email',
			value: '',
			validation: { email: true },
			valid: true,
			error: '',
		},
	};
	const { logout } = useAuth();
	const [initializing, setInitializing] = useState(true);
	const [editValid, setEditValid] = useState(false);
	const [removeValid, setRemoveValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editAdminForm, setEditAdminForm] = useState(initialState);
	const [removeAdminForm, setRemoveAdminForm] = useState({
		username: {
			id: 'username',
			type: 'text',
			label: 'Número de administrador',
			value: '',
			validation: { username: true },
			valid: false,
			error: '',
		},
	});

	useEffect(() => {
		let isCancelled = false;
		async function getAdmin() {
			const [response, status] = await adminService.getAdminByUsername(user);
			if (!isCancelled) {
				setInitializing(false);
				if (status !== 200) {
					return history.push('/admins/list');
				}
				Object.keys(response).map((key) =>
					setEditAdminForm((prevState) => {
						if (key in prevState)
							return {
								...prevState,
								[key]: { ...prevState[key], value: response[key] },
							};
						return prevState;
					})
				);
			}
		}
		getAdmin();
		return () => (isCancelled = true);
	}, [user, history]);

	function handleEditInputs(target, inputKey) {
		const [valid, error] = validate(
			target.value,
			editAdminForm[inputKey].validation
		);
		const updatedForm = {
			...editAdminForm,
			[inputKey]: {
				...editAdminForm[inputKey],
				value: target.value,
				valid,
				error,
			},
		};
		setEditAdminForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setEditValid(validForm);
	}

	async function handleRemoveInput(target) {
		const [valid, error] = validate(
			target.value,
			removeAdminForm.username.validation
		);
		const updatedForm = {
			...removeAdminForm,
			username: {
				...removeAdminForm.username,
				value: target.value,
				valid,
				error,
			},
		};
		setRemoveAdminForm(updatedForm);
		setRemoveValid(updatedForm.username.valid);
	}

	async function handleSubmission(event) {
		event.preventDefault();
		setLoading(true);
		const adminData = {};
		Object.keys(editAdminForm).map(
			(key) => (adminData[key] = editAdminForm[key].value)
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
			setEditAdminForm({
				...editAdminForm,
				[error.key]: {
					...editAdminForm[error.key],
					error: error.msg,
					valid: false,
				},
			});
			setEditValid(false);
		} else {
			setEditAdminForm(initialState);
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
						<FaEdit />
						<span>{user}</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(editAdminForm).map((key) => (
							<Input
								key={editAdminForm[key].id}
								id={editAdminForm[key].id}
								type={editAdminForm[key].type}
								label={editAdminForm[key].label}
								validation={editAdminForm[key].validation}
								error={editAdminForm[key].error}
								value={editAdminForm[key].value}
								change={({ target }) =>
									handleEditInputs(target, editAdminForm[key].id)
								}
							/>
						))}
						<Button disabled={!editValid}>
							{loading ? <ButtonSpinner /> : 'Guardar'}
						</Button>
					</Form>
					<Title danger>
						<FaTrash />
						<span>Remover</span>
					</Title>
					<Form autoComplete="off">
						<Input
							key={removeAdminForm.username.id}
							id={removeAdminForm.username.id}
							type={removeAdminForm.username.type}
							label={removeAdminForm.username.label}
							validation={removeAdminForm.username.validation}
							value={removeAdminForm.username.value}
							change={({ target }) =>
								handleRemoveInput(target, removeAdminForm.username.id)
							}
						/>

						<Button disabled={!removeValid}>
							{loading ? <ButtonSpinner /> : 'Remover'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Utilizador criado com sucesso.'} />
		</>
	);
}

export default EditAdmin;
