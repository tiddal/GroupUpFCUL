import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import adminService from '../../../services/admin';

import { Container, Sheet, Title, Form, Button } from './styles';

import Navigation from '../../../components/Navigation';
import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import Spinner, { ButtonSpinner } from '../../../components/Spinner';
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

function EditUnit() {
	const initialState = {
		name: {
			id: 'name',
			type: 'text',
			label: 'Nome',
			value: '',
			validation: { required: true, name: true },
			valid: true,
			error: false,
			info: '',
		},
		initials: {
			id: 'initials',
			type: 'text',
			label: 'Sigla',
			value: '',
			validation: { required: true, max: 3 },
			valid: true,
			error: false,
			info: '',
		},
		ects: {
			id: 'ects',
			type: 'text',
			label: 'ECTSs',
			value: '',
			validation: { required: true },
			valid: true,
			error: false,
			info: '',
		},
		semester: {
			id: 'semester',
			type: 'select',
			label: 'Semestre',
			value: '',
			validation: { required: true, semester: true },
			valid: true,
			error: false,
			info: '',
			options: [
				{ value: 1, text: '1º Semestre' },
				{ value: 2, text: '2º Semestre' },
			],
		},
	};
	const {
		params: { course, unit },
	} = useRouteMatch('/courses/:course/units/:unit/edit');
	const history = useHistory();
	const { logout } = useAuth();
	const [initializing, setInitializing] = useState(true);
	const [courseData, setCourseData] = useState({ initials: '', code: '' });
	const [editValid, setEditValid] = useState(false);
	const [removeValid, setRemoveValid] = useState(false);
	const [edited, setEdited] = useState(false);
	const [loadingEdit, setLoadingEdit] = useState(false);
	const [loadingRemove, setLoadingRemove] = useState(false);
	const [editForm, setEditForm] = useState(initialState);
	const [removeForm, setRemoveForm] = useState({
		code: {
			id: 'code',
			type: 'text',
			label: 'Código da cadeira',
			value: '',
			validation: { match: unit },
			valid: false,
			error: false,
			info: (
				<div>
					Escreva <strong>{unit}</strong> para confirmar que quer remover esta
					cadeira.
				</div>
			),
		},
	});

	useEffect(() => {
		let isCancelled = false;
		async function getCourse() {
			const [{ initials, code }] = await adminService.get.courseByCode(course);
			setCourseData({ initials, code });
		}
		async function getUnit() {
			const [response, status] = await adminService.get.unitByCode(
				course,
				unit
			);
			setInitializing(false);
			if (!isCancelled) {
				if (status !== 200) {
					return history.push(`/courses/${course}/units`);
				}
				Object.keys(response).map((key) =>
					setEditForm((prevState) => {
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
		getCourse();
		getUnit();
		return () => (isCancelled = true);
	}, [course, history, unit]);

	function handleEditInputs(target, inputKey) {
		const [valid, info] = validate(target.value, editForm[inputKey].validation);
		const updatedForm = {
			...editForm,
			[inputKey]: {
				...editForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setEditForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setEditValid(validForm);
	}

	function handleRemoveInput(target) {
		const [valid] = validate(target.value, removeForm.code.validation);
		const updatedForm = {
			...removeForm,
			code: {
				...removeForm.code,
				value: target.value,
				valid,
				error: !valid,
			},
		};
		setRemoveForm(updatedForm);
		setRemoveValid(updatedForm.code.valid);
	}

	async function handleEditSubmission(event) {
		event.preventDefault();
		if (!editValid) return;
		setLoadingEdit(true);
		const unitData = {};
		Object.keys(editForm).map((key) => (unitData[key] = editForm[key].value));
		const [response, status] = await adminService.edit.unit(
			unitData,
			course,
			unit
		);
		const error = {};

		switch (status) {
			case 409:
				error.key = 'code';
				error.msg = 'Já existe uma cadeira com este código.';
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
			setEditForm({
				...editForm,
				[error.key]: {
					...editForm[error.key],
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
		const [, status] = await adminService.remove.unit(course, unit);
		if (status !== 204) logout();
		setLoadingEdit(false);
		history.push(`/courses/${course}/units`);
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
			{!initializing && (
				<Context
					path={[
						{ tier: 'courses', title: 'cursos' },
						{ tier: `courses/${course}`, title: courseData.initials },
						{
							tier: `courses/${course}/units`,
							title: 'cadeiras',
						},
						{
							tier: `courses/${course}/units/${unit}`,
							title: editForm.initials.value,
						},
						{ tier: `courses/${course}/units/${unit}/edit`, title: `editar` },
					]}
				/>
			)}

			<Container>
				{initializing ? (
					<Spinner />
				) : (
					<Sheet>
						<Title>
							<FaEdit />
							<span>{editForm.initials.value}</span>
						</Title>
						<Form autoComplete="off" onSubmit={handleEditSubmission}>
							{Object.keys(editForm).map((key) => (
								<Input
									key={editForm[key].id}
									id={editForm[key].id}
									type={editForm[key].type}
									label={editForm[key].label}
									validation={editForm[key].validation}
									error={editForm[key].error}
									info={editForm[key].info}
									value={editForm[key].value}
									options={editForm[key].options}
									change={({ target }) =>
										handleEditInputs(target, editForm[key].id)
									}
								/>
							))}
							<Button disabled={!editValid}>
								{loadingEdit ? <ButtonSpinner /> : 'Guardar'}
							</Button>
						</Form>
						<Title danger>
							<FaTrash />
							<span>Remover cadeira</span>
						</Title>
						<Form autoComplete="off" onSubmit={handleRemoveSubmission}>
							<Input
								key={removeForm.code.id}
								id={removeForm.code.id}
								type={removeForm.code.type}
								label={removeForm.code.label}
								validation={removeForm.code.validation}
								value={removeForm.code.value}
								error={removeForm.code.error}
								info={removeForm.code.info}
								change={({ target }) =>
									handleRemoveInput(target, removeForm.code.id)
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

export default EditUnit;
