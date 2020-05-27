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

function NewUnit() {
	const initialState = {
		number: {
			id: 'number',
			type: 'text',
			label: 'Número',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		begins_at: {
			id: 'begins_at',
			type: 'text',
			label: 'Hora de inicio',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		ends_at: {
			id: 'ends_at',
			type: 'text',
			label: 'Hora de fim',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		week_day: {
			id: 'week_day',
			type: 'text',
			label: 'Dia da Semana',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
	};
	const [unitData, setUnitData] = useState({
		course_initials: '',
		course_code: '',
		unit_initials: '',
		unit_code: '',
	});
	const {
		params: { course, unit },
	} = useRouteMatch('/courses/:course/units/:unit');
	const [initializng, setInitializing] = useState(true);
	const { logout } = useAuth();
	const [valid, setValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newClassForm, setNewClassForm] = useState(initialState);

	useEffect(() => {
		async function setState() {
			const [
				{ initials: course_initials, code: course_code },
			] = await adminService.get.courseByCode(course);
			const [
				{ initials: unit_initials, code: unit_code },
			] = await adminService.get.unitByCode(course, unit);
			setUnitData({
				course_initials,
				course_code,
				unit_initials,
				unit_code,
			});
			setInitializing(false);
		}
		setState();
	}, [course, unit]);

	function handleInput(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			newClassForm[inputKey].validation
		);
		const updatedForm = {
			...newClassForm,
			[inputKey]: {
				...newClassForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setNewClassForm(updatedForm);
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
		const classData = {};
		Object.keys(newClassForm).map(
			(key) => (classData[key] = newClassForm[key].value)
		);
		classData.academic_year = '2019-2020';
		const [response, status] = await adminService.create.class_(
			unitData.unit_code,
			unitData.course_code,
			classData
		);
		const error = {};
		switch (status) {
			case 409:
				error.key = 'code';
				error.msg = 'Já existe uma turma com este código.';
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
			setNewClassForm({
				...newClassForm,
				[error.key]: {
					...newClassForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid(false);
		} else {
			setNewClassForm(initialState);
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
			{!initializng && (
				<Context
					path={[
						{ tier: 'courses', title: 'cursos' },
						{
							tier: `courses/${unitData.course_code}`,
							title: unitData.course_initials,
						},
						{
							tier: `courses/${unitData.course_code}/units`,
							title: 'cadeiras',
						},
						{
							tier: `courses/${unitData.course_code}/units/${unitData.unit_code}`,
							title: unitData.unit_initials,
						},
						{
							tier: `courses/${unitData.course_code}/units/${unitData.unit_code}/classes/new`,
							title: 'nova turma',
						},
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaUsers />
						<span>Nova Turma</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(newClassForm).map((key) => (
							<Input
								key={newClassForm[key].id}
								id={newClassForm[key].id}
								type={newClassForm[key].type}
								label={newClassForm[key].label}
								validation={newClassForm[key].validation}
								error={newClassForm[key].error}
								info={newClassForm[key].info}
								value={newClassForm[key].value}
								change={({ target }) =>
									handleInput(target, newClassForm[key].id)
								}
							/>
						))}
						<Button disabled={!valid}>
							{loading ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Turma criada com sucesso.'} />
		</>
	);
}

export default NewUnit;
