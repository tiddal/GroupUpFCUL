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

function EditClass() {
	const initialState = {
		number: {
			id: 'number',
			type: 'text',
			label: 'Número',
			value: '',
			validation: { required: true, class: true },
			valid: true,
			error: false,
			info: '',
		},
		begins_at: {
			id: 'begins_at',
			type: 'select',
			label: 'Hora de inicio',
			value: '',
			validation: { required: true },
			valid: true,
			error: false,
			info: '',
			options: [
				{ value: '9:00', text: '9:00' },
				{ value: '9:30', text: '9:30' },
				{ value: '10:00', text: '10:00' },
				{ value: '10:30', text: '10:30' },
				{ value: '11:00', text: '11:00' },
				{ value: '11:30', text: '11:30' },
				{ value: '12:00', text: '12:00' },
				{ value: '12:30', text: '12:30' },
				{ value: '13:00', text: '13:00' },
				{ value: '13:30', text: '13:30' },
				{ value: '14:00', text: '14:00' },
				{ value: '14:30', text: '14:30' },
				{ value: '15:00', text: '15:00' },
				{ value: '15:30', text: '15:30' },
				{ value: '16:00', text: '16:00' },
				{ value: '16:30', text: '16:30' },
				{ value: '17:00', text: '17:00' },
				{ value: '17:30', text: '17:30' },
				{ value: '18:00', text: '18:00' },
				{ value: '18:30', text: '18:30' },
			],
		},
		ends_at: {
			id: 'ends_at',
			type: 'select',
			label: 'Hora de fim',
			value: '',
			validation: { required: true },
			valid: true,
			error: false,
			info: '',
			options: [
				{ value: '9:00', text: '9:00' },
				{ value: '9:30', text: '9:30' },
				{ value: '10:00', text: '10:00' },
				{ value: '10:30', text: '10:30' },
				{ value: '11:00', text: '11:00' },
				{ value: '11:30', text: '11:30' },
				{ value: '12:00', text: '12:00' },
				{ value: '12:30', text: '12:30' },
				{ value: '13:00', text: '13:00' },
				{ value: '13:30', text: '13:30' },
				{ value: '14:00', text: '14:00' },
				{ value: '14:30', text: '14:30' },
				{ value: '15:00', text: '15:00' },
				{ value: '15:30', text: '15:30' },
				{ value: '16:00', text: '16:00' },
				{ value: '16:30', text: '16:30' },
				{ value: '17:00', text: '17:00' },
				{ value: '17:30', text: '17:30' },
				{ value: '18:00', text: '18:00' },
				{ value: '18:30', text: '18:30' },
			],
		},
		week_day: {
			id: 'week_day',
			type: 'select',
			label: 'Dia da semana',
			value: '',
			validation: { required: true },
			valid: true,
			error: false,
			info: '',
			options: [
				{ value: 1, text: 'Segunda-feira' },
				{ value: 2, text: 'Terça-feira' },
				{ value: 3, text: 'Quarta-feira' },
				{ value: 4, text: 'Quinta-feira' },
				{ value: 5, text: 'Sexta-feira' },
			],
		},
	};
	const {
		params: { course, unit, class_number },
	} = useRouteMatch('/courses/:course/units/:unit/classes/:class_number/edit');
	const history = useHistory();
	const { logout } = useAuth();
	const [initializing, setInitializing] = useState(true);
	const [unitData, setUnitData] = useState({
		course_initials: '',
		unit_initials: '',
	});
	const [editValid, setEditValid] = useState(false);
	const [removeValid, setRemoveValid] = useState(false);
	const [edited, setEdited] = useState(false);
	const [loadingEdit, setLoadingEdit] = useState(false);
	const [loadingRemove, setLoadingRemove] = useState(false);
	const [editForm, setEditForm] = useState(initialState);
	const [removeForm, setRemoveForm] = useState({
		number: {
			id: 'number',
			type: 'text',
			label: 'Número da turma',
			value: '',
			validation: { match: class_number },
			valid: false,
			error: false,
			info: (
				<div>
					Escreva <strong>{class_number}</strong> para confirmar que quer
					remover esta turma.
				</div>
			),
		},
	});

	useEffect(() => {
		let isCancelled = false;
		async function getClass() {
			const [
				{ initials: course_initials },
			] = await adminService.get.courseByCode(course);
			const [{ initials: unit_initials }] = await adminService.get.unitByCode(
				course,
				unit
			);
			setUnitData({ course_initials, unit_initials });
			const [response, status] = await adminService.get.classByNumber(
				class_number,
				'2019-2020',
				course,
				unit
			);
			setInitializing(false);
			if (!isCancelled) {
				if (status !== 200) {
					return history.push(`/courses/${course}/units/${unit}/classes`);
				}
				response.academic_year = undefined;
				Object.keys(response).map((key) =>
					setEditForm((prevState) => {
						if (key in prevState) {
							let value = response[key];
							if (key === 'begins_at' || key === 'ends_at') {
								value = response[key].slice(0, -3);
								console.log(value);
							}
							return {
								...prevState,
								[key]: { ...prevState[key], value },
							};
						}

						return prevState;
					})
				);
			}
		}
		getClass();
		return () => (isCancelled = true);
	}, [course, history, unit, class_number]);

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
		const [valid] = validate(target.value, removeForm.number.validation);
		const updatedForm = {
			...removeForm,
			number: {
				...removeForm.number,
				value: target.value,
				valid,
				error: !valid,
			},
		};
		setRemoveForm(updatedForm);
		setRemoveValid(updatedForm.number.valid);
	}

	async function handleEditSubmission(event) {
		event.preventDefault();
		if (!editValid) return;
		setLoadingEdit(true);
		const classData = {};
		Object.keys(editForm).map((key) => (classData[key] = editForm[key].value));
		const [response, status] = await adminService.edit.class_(
			classData,
			class_number,
			course,
			unit
		);
		const error = {};

		switch (status) {
			case 409:
				error.key = 'number';
				error.msg = 'Já existe uma turma com este número.';
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
		const [, status] = await adminService.remove.class(
			'2019-2020',
			class_number,
			course,
			unit
		);
		if (status !== 204) logout();
		setLoadingEdit(false);
		history.push(`/courses/${course}/units/${unit}`);
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
						{
							tier: `courses/${course}`,
							title: unitData.course_initials,
						},
						{
							tier: `courses/${course}/units`,
							title: 'cadeiras',
						},
						{
							tier: `courses/${course}/units/${unit}`,
							title: unitData.unit_initials,
						},
						{
							tier: `courses/${course}/units/${unit}/classes`,
							title: 'turmas',
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}`,
							title: class_number,
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}/edit`,
							title: 'editar',
						},
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
							<span>{editForm.number.value}</span>
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
							<span>Remover turma</span>
						</Title>
						<Form autoComplete="off" onSubmit={handleRemoveSubmission}>
							<Input
								key={removeForm.number.id}
								id={removeForm.number.id}
								type={removeForm.number.type}
								label={removeForm.number.label}
								validation={removeForm.number.validation}
								value={removeForm.number.value}
								error={removeForm.number.error}
								info={removeForm.number.info}
								change={({ target }) =>
									handleRemoveInput(target, removeForm.number.id)
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

export default EditClass;
