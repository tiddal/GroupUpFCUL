import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import adminService from '../../../services/admin';

import { Container, Sheet, Title, Form, Button } from './styles';

import Navigation from '../../../components/Navigation';
import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import {
	FaUsers,
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
} from 'react-icons/fa';
import { useAuth } from '../../../hooks';

function NewUserToClass() {
	const initialStudentForm = {
		username: {
			id: 'username',
			type: 'text',
			label: 'Número de aluno',
			value: '',
			validation: { required: true, username: true },
			valid: false,
			error: false,
			info: '',
		},
	};
	const initialProfessorForm = {
		...initialStudentForm,
		username: { ...initialStudentForm.username, label: 'Número de Professor' },
	};
	const [unitData, setUnitData] = useState({
		course_initials: '',
		unit_initials: '',
	});
	const {
		params: { course, unit, class_number },
	} = useRouteMatch('/courses/:course/units/:unit/classes/:class_number');
	const [initializng, setInitializing] = useState(true);
	const { logout } = useAuth();
	const [valid, setValid] = useState({ student: false, professor: false });
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState({ student: false, professor: false });
	const [addStudentForm, setAddStudentForm] = useState(initialStudentForm);
	const [addProfessorForm, setAddProfessorForm] = useState(
		initialProfessorForm
	);

	useEffect(() => {
		async function setState() {
			const [
				{ initials: course_initials },
			] = await adminService.get.courseByCode(course);
			const [{ initials: unit_initials }] = await adminService.get.unitByCode(
				course,
				unit
			);
			setUnitData({ course_initials, unit_initials });
			setInitializing(false);
		}
		setState();
	}, [course, unit]);

	function handleInputStudent(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			addStudentForm[inputKey].validation
		);
		const updatedForm = {
			...addStudentForm,
			[inputKey]: {
				...addStudentForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setAddStudentForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setValid({ ...valid, student: validForm });
	}

	function handleInputProfessor(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			addProfessorForm[inputKey].validation
		);
		const updatedForm = {
			...addProfessorForm,
			[inputKey]: {
				...addProfessorForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setAddProfessorForm(updatedForm);
		let validForm = true;
		for (let key in updatedForm) {
			validForm = updatedForm[key].valid && validForm;
		}
		setValid({ ...valid, professor: validForm });
	}

	async function handleSubmissionStudent(event) {
		event.preventDefault();
		if (!valid.student) return;
		const username = addStudentForm.username.value;
		setLoading({ ...loading, student: true });
		const [response, status] = await adminService.create.studentToClass(
			unit,
			course,
			class_number,
			'2019-2020',
			{ username }
		);
		const error = {};
		switch (status) {
			case 409:
				error.key = 'username';
				error.msg =
					'Já existe um aluno com este número de utilizador na turma.';
				break;
			case 400:
				const field = response.validation.keys[0].split('.').pop();
				const [, msg] = validate(field, { [field]: true });
				error.key = field;
				error.msg = msg;
				break;
			case 404:
				error.key = 'username';
				error.msg = 'Não existe nenhum aluno com este número de utilizador.';
				break;
			case 401:
				logout();
				break;
			default:
				break;
		}
		if (Object.keys(error).length > 0) {
			setAddStudentForm({
				...addStudentForm,
				[error.key]: {
					...addStudentForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid({ ...valid, student: false });
		} else {
			setAddStudentForm(initialStudentForm);
			setCreated(true);
			setTimeout(() => setCreated(false), 2000);
		}
		setLoading({ ...loading, student: false });
	}

	async function handleSubmissionProfessor(event) {
		event.preventDefault();
		if (!valid.professor) return;
		setLoading({ ...loading, professor: true });
		const username = addProfessorForm.username.value;
		const [response, status] = await adminService.create.professorToClass(
			unit,
			course,
			class_number,
			'2019-2020',
			{ username }
		);
		const error = {};
		switch (status) {
			case 409:
				error.key = 'username';
				error.msg =
					'Já existe um professor com este número de utilizador na turma.';
				break;
			case 400:
				const field = response.validation.keys[0].split('.').pop();
				const [, msg] = validate(field, { [field]: true });
				error.key = field;
				error.msg = msg;
				break;
			case 404:
				error.key = 'username';
				error.msg =
					'Não existe nenhum professor com este número de utilizador.';
				break;
			case 401:
				logout();
				break;
			default:
				break;
		}
		if (Object.keys(error).length > 0) {
			setAddProfessorForm({
				...addProfessorForm,
				[error.key]: {
					...addProfessorForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid({ ...valid, professor: false });
		} else {
			setAddProfessorForm(initialProfessorForm);
			setCreated(true);
			setTimeout(() => setCreated(false), 2000);
		}
		setLoading({ ...loading, professor: false });
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
			{!initializng && (
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
							tier: `courses/${course}/units/${unit}/classes/`,
							title: 'turmas',
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}`,
							title: class_number,
						},
						{
							tier: `courses/${course}/units/${unit}/classes/${class_number}/members/new`,
							title: 'adicionar membro',
						},
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaUsers />
						<span>Adicionar Aluno</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmissionStudent}>
						{Object.keys(addStudentForm).map((key) => (
							<Input
								key={addStudentForm[key].id}
								id={addStudentForm[key].id}
								type={addStudentForm[key].type}
								label={addStudentForm[key].label}
								validation={addStudentForm[key].validation}
								error={addStudentForm[key].error}
								info={addStudentForm[key].info}
								value={addStudentForm[key].value}
								change={({ target }) =>
									handleInputStudent(target, addStudentForm[key].id)
								}
							/>
						))}
						<Button disabled={!valid.student}>
							{loading.student ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
					<Title>
						<FaUsers />
						<span>Adicionar Professor</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmissionProfessor}>
						{Object.keys(addProfessorForm).map((key) => (
							<Input
								key={addProfessorForm[key].id}
								id={addProfessorForm[key].id}
								type={addProfessorForm[key].type}
								label={addProfessorForm[key].label}
								validation={addProfessorForm[key].validation}
								error={addProfessorForm[key].error}
								info={addProfessorForm[key].info}
								value={addProfessorForm[key].value}
								change={({ target }) =>
									handleInputProfessor(target, addProfessorForm[key].id)
								}
							/>
						))}
						<Button disabled={!valid.professor}>
							{loading.professor ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification
				popup={created}
				text={'Utilizador adicionado com sucesso.'}
			/>
		</>
	);
}

export default NewUserToClass;
