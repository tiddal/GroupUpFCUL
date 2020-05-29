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
			label: 'Número de professor',
			value: '',
			validation: { required: true, username: true },
			valid: false,
			error: false,
			info: '',
		},
		first_name: {
			id: 'first_name',
			type: 'text',
			label: 'Nomes próprios',
			value: '',
			validation: { required: true, name: true },
			valid: false,
			error: false,
			info: '',
		},
		last_name: {
			id: 'last_name',
			type: 'text',
			label: 'Apelidos',
			value: '',
			validation: { required: true, name: true },
			valid: false,
			error: false,
			info: '',
		},
		email: {
			id: 'email',
			type: 'text',
			label: 'Email',
			value: '',
			validation: { required: true, email: true },
			valid: false,
			error: false,
			info: '',
		},
		department: {
			id: 'department',
			type: 'select',
			label: 'Departamento',
			value: '',
			validation: { required: false },
			valid: true,
			error: false,
			info: '',
			options: [
				{ value: '', text: 'Selecionar opção...' },
				{ value: 'Biologia Animal', text: 'Biologia Animal' },
				{ value: 'Biologia Vegetal', text: 'Biologia Vegetal' },
				{
					value: 'Engenharia Geográfica, Geofísica e Energia',
					text: 'Engenharia Geográfica, Geofísica e Energia',
				},
				{
					value: 'Estatística e Investigação Operacional ',
					text: 'Estatística e Investigação Operacional',
				},
				{ value: 'Física', text: 'Física' },
				{ value: 'Geologia', text: 'Geologia' },
				{
					value: 'História e Filosofia das Ciências',
					text: 'História e Filosofia das Ciências',
				},
				{ value: 'Informática', text: 'Informática' },
				{ value: 'Matemática', text: 'Matemática' },
				{ value: 'Química e Bioquímica', text: 'Química e Bioquímica' },
			],
		},
		room: {
			id: 'room',
			type: 'text',
			label: 'Gabinete',
			value: '',
			validation: { required: false },
			valid: true,
			error: false,
			info: '',
		},
	};
	const { logout } = useAuth();
	const [valid, setValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newProfessorForm, setNewProfessorForm] = useState(initialState);

	function handleInput(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			newProfessorForm[inputKey].validation
		);
		const updatedForm = {
			...newProfessorForm,
			[inputKey]: {
				...newProfessorForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setNewProfessorForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setValid(validForm);
	}

	async function handleSubmission(event) {
		event.preventDefault();
		if (!valid) return;
		setLoading(true);
		const professorData = {};
		Object.keys(newProfessorForm).map(
			(key) => (professorData[key] = newProfessorForm[key].value)
		);
		professorData.password = 'password';
		professorData.role = {
			type: 'professor',
			data: { department: professorData.department, room: professorData.room },
		};
		professorData.department = undefined;
		professorData.room = undefined;
		const [response, status] = await adminService.create.user(professorData);
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
			setNewProfessorForm({
				...newProfessorForm,
				[error.key]: {
					...newProfessorForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid(false);
		} else {
			setNewProfessorForm(initialState);
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
					{ tier: 'professors', title: 'professores' },
					{ tier: 'professors/new', title: 'novo' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaAddressCard />
						<span>Novo Professor</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(newProfessorForm).map((key) => (
							<Input
								key={newProfessorForm[key].id}
								id={newProfessorForm[key].id}
								type={newProfessorForm[key].type}
								label={newProfessorForm[key].label}
								validation={newProfessorForm[key].validation}
								error={newProfessorForm[key].error}
								info={newProfessorForm[key].info}
								value={newProfessorForm[key].value}
								options={newProfessorForm[key].options}
								change={({ target }) =>
									handleInput(target, newProfessorForm[key].id)
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
