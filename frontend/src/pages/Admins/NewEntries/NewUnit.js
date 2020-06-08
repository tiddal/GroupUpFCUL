import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import adminService from '../../../services/admin';

import { Container, Sheet, Title, Form, Button } from './styles';

import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import { FaBook } from 'react-icons/fa';
import { useAuth } from '../../../hooks';

function NewUnit() {
	const initialState = {
		code: {
			id: 'code',
			type: 'text',
			label: 'Código da cadeira',
			value: '',
			validation: { required: true, max: 5 },
			valid: false,
			error: false,
			info: '',
		},
		name: {
			id: 'name',
			type: 'text',
			label: 'Nome',
			value: '',
			validation: { required: true, name: true },
			valid: false,
			error: false,
			info: '',
		},
		semester: {
			id: 'semester',
			type: 'select',
			label: 'Semestre',
			value: 1,
			validation: { required: true, semester: true },
			valid: true,
			error: false,
			info: '',
			options: [
				{ value: 1, text: '1º Semestre' },
				{ value: 2, text: '2º Semestre' },
			],
		},
		initials: {
			id: 'initials',
			type: 'text',
			label: 'Iniciais',
			value: '',
			validation: { required: true, max: 3 },
			valid: false,
			error: false,
			info: '',
		},
		ects: {
			id: 'ects',
			type: 'text',
			label: 'ECTS',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
	};
	const match = useRouteMatch('/courses/:course/units/new');
	const [initializng, setInitializing] = useState(true);
	const [courseData, setCourseData] = useState({ initials: '', code: '' });
	const { logout } = useAuth();
	const [valid, setValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newUnitForm, setNewUnitForm] = useState(initialState);

	useEffect(() => {
		async function getCourse() {
			const [{ initials, code }] = await adminService.get.courseByCode(
				match.params.course
			);
			setInitializing(false);
			setCourseData({ initials, code });
		}
		getCourse();
	}, [match.params.course]);

	function handleInput(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			newUnitForm[inputKey].validation
		);
		const updatedForm = {
			...newUnitForm,
			[inputKey]: {
				...newUnitForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setNewUnitForm(updatedForm);
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
		const unitData = {};
		Object.keys(newUnitForm).map(
			(key) => (unitData[key] = newUnitForm[key].value)
		);
		const [response, status] = await adminService.create.unit(
			unitData,
			courseData.code
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
			setNewUnitForm({
				...newUnitForm,
				[error.key]: {
					...newUnitForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid(false);
		} else {
			setNewUnitForm(initialState);
			setCreated(true);
			setTimeout(() => setCreated(false), 2000);
		}
		setLoading(false);
	}

	return (
		<>
			{!initializng && (
				<Context
					path={[
						{ tier: 'courses', title: 'cursos' },
						{
							tier: `courses/${courseData.code}`,
							title: `${courseData.initials}`,
						},
						{
							tier: `courses/${courseData.code}/units/new`,
							title: `nova cadeira`,
						},
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaBook />
						<span>Nova Cadeira</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(newUnitForm).map((key) => (
							<Input
								key={newUnitForm[key].id}
								id={newUnitForm[key].id}
								type={newUnitForm[key].type}
								label={newUnitForm[key].label}
								validation={newUnitForm[key].validation}
								error={newUnitForm[key].error}
								info={newUnitForm[key].info}
								value={newUnitForm[key].value}
								options={newUnitForm[key].options}
								change={({ target }) =>
									handleInput(target, newUnitForm[key].id)
								}
							/>
						))}
						<Button disabled={!valid}>
							{loading ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Cadeira criado com sucesso.'} />
		</>
	);
}

export default NewUnit;
