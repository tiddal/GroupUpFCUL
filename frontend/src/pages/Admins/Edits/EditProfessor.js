import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import adminService from '../../../services/admin';

import { Container, Sheet, Title, Form, Button } from './styles';

import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import Spinner, { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../../hooks';

function EditProfessor() {
	const initialState = {
		first_name: {
			id: 'first_name',
			type: 'text',
			label: 'Nomes próprios',
			value: '',
			validation: { name: true },
			valid: true,
			error: false,
			info: '',
		},
		last_name: {
			id: 'last_name',
			type: 'text',
			label: 'Apelidos',
			value: '',
			validation: { name: true },
			valid: true,
			error: false,
			info: '',
		},
		email: {
			id: 'email',
			type: 'text',
			label: 'Email',
			value: '',
			validation: { email: true },
			valid: true,
			error: false,
			info: '',
		},
		department: {
			id: 'department',
			type: 'select',
			label: 'Departamento',
			value: '',
			validation: {},
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
			validation: {},
			valid: true,
			error: false,
			info: '',
		},
	};
	const {
		params: { user },
	} = useRouteMatch('/professors/:user');
	const history = useHistory();
	const [initializing, setInitializing] = useState(true);
	const { logout } = useAuth();
	const [editValid, setEditValid] = useState(false);
	const [removeValid, setRemoveValid] = useState(false);
	const [edited, setEdited] = useState(false);
	const [loadingEdit, setLoadingEdit] = useState(false);
	const [loadingRemove, setLoadingRemove] = useState(false);
	const [editProfessorForm, setEditProfessorForm] = useState(initialState);
	const [removeProfessorForm, setRemoveProfessorForm] = useState({
		username: {
			id: 'username',
			type: 'text',
			label: 'Número de professor',
			value: '',
			validation: { match: user },
			valid: false,
			error: false,
			info: (
				<div>
					Escreva <strong>{user}</strong> para confirmar que quer remover este
					utilizador
				</div>
			),
		},
	});

	useEffect(() => {
		let isCancelled = false;
		async function getProfessor() {
			const [response, status] = await adminService.get.professorByUsername(
				user
			);
			setInitializing(false);
			if (!isCancelled) {
				if (status !== 200) {
					return history.push('/professors/list');
				}
				Object.keys(response).map((key) =>
					setEditProfessorForm((prevState) => {
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
		getProfessor();
		return () => (isCancelled = true);
	}, [user, history]);

	function handleEditInputs(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			editProfessorForm[inputKey].validation
		);
		const updatedForm = {
			...editProfessorForm,
			[inputKey]: {
				...editProfessorForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setEditProfessorForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setEditValid(validForm);
	}

	function handleRemoveInput(target) {
		const [valid] = validate(
			target.value,
			removeProfessorForm.username.validation
		);
		const updatedForm = {
			...removeProfessorForm,
			username: {
				...removeProfessorForm.username,
				value: target.value,
				valid,
				error: !valid,
			},
		};
		setRemoveProfessorForm(updatedForm);
		setRemoveValid(updatedForm.username.valid);
	}

	async function handleEditSubmission(event) {
		event.preventDefault();
		if (!editValid) return;
		setLoadingEdit(true);
		const professorData = {};
		Object.keys(editProfessorForm).map(
			(key) => (professorData[key] = editProfessorForm[key].value)
		);
		const [response, status] = await adminService.edit.professor(
			professorData,
			user
		);
		const error = {};

		switch (status) {
			case 409:
				error.key = 'email';
				error.msg = 'Este email já se encontra registado.';
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
			setEditProfessorForm({
				...editProfessorForm,
				[error.key]: {
					...editProfessorForm[error.key],
					error: true,
					valid: false,
					info: error.msg,
				},
			});
			setEditValid(false);
		} else {
			setEdited(true);
			setTimeout(() => setEdited(false), 2000);
		}
		setLoadingEdit(false);
	}

	async function handleRemoveSubmission(event) {
		event.preventDefault();
		if (!removeValid) return;
		setLoadingRemove(true);
		const [, status] = await adminService.remove.user(user);
		if (status !== 204) logout();
		setLoadingEdit(false);
		history.push('/professors/list');
	}

	return (
		<>
			<Context
				path={[
					{ tier: 'professors', title: 'professores' },
					{ tier: `professors/${user}/edit`, title: `editar ${user}` },
				]}
			/>
			<Container>
				{initializing ? (
					<Spinner />
				) : (
					<Sheet>
						<Title>
							<FaEdit />
							<span>{user}</span>
						</Title>
						<Form autoComplete="off" onSubmit={handleEditSubmission}>
							{Object.keys(editProfessorForm).map((key) => (
								<Input
									key={editProfessorForm[key].id}
									id={editProfessorForm[key].id}
									type={editProfessorForm[key].type}
									label={editProfessorForm[key].label}
									validation={editProfessorForm[key].validation}
									error={editProfessorForm[key].error}
									info={editProfessorForm[key].info}
									value={editProfessorForm[key].value}
									options={editProfessorForm[key].options}
									change={({ target }) =>
										handleEditInputs(target, editProfessorForm[key].id)
									}
								/>
							))}
							<Button disabled={!editValid}>
								{loadingEdit ? <ButtonSpinner /> : 'Guardar'}
							</Button>
						</Form>
						<Title danger>
							<FaTrash />
							<span>Remover professor</span>
						</Title>
						<Form autoComplete="off" onSubmit={handleRemoveSubmission}>
							<Input
								key={removeProfessorForm.username.id}
								id={removeProfessorForm.username.id}
								type={removeProfessorForm.username.type}
								label={removeProfessorForm.username.label}
								validation={removeProfessorForm.username.validation}
								value={removeProfessorForm.username.value}
								error={removeProfessorForm.username.error}
								info={removeProfessorForm.username.info}
								change={({ target }) =>
									handleRemoveInput(target, removeProfessorForm.username.id)
								}
								danger
							/>
							<Button disabled={!removeValid} danger>
								{loadingRemove ? <ButtonSpinner /> : 'Remover'}
							</Button>
						</Form>
					</Sheet>
				)}
			</Container>
			<Notification popup={edited} text={'Alterações guardadas.'} />
		</>
	);
}

export default EditProfessor;
