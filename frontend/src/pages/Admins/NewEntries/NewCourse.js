import React, { useState } from 'react';
import adminService from '../../../services/admin';

import { Container, Sheet, Title, Form, Button } from './styles';

import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import { FaUniversity } from 'react-icons/fa';
import { useAuth } from '../../../hooks';

function NewCourse() {
	const initialState = {
		code: {
			id: 'code',
			type: 'text',
			label: 'Código do curso',
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
		initials: {
			id: 'initials',
			type: 'text',
			label: 'Sigla',
			value: '',
			validation: { required: true, max: 3 },
			valid: false,
			error: false,
			info: '',
		},
		cycle: {
			id: 'cycle',
			type: 'select',
			label: 'Ciclo',
			value: 1,
			validation: { required: true, cycle: true },
			valid: false,
			error: false,
			info: '',
			options: [
				{ value: 1, text: 'Licenciatura' },
				{ value: 2, text: 'Mestrado' },
				{ value: 3, text: 'Doutoramento' },
			],
		},
	};
	const { logout } = useAuth();
	const [valid, setValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newCourseForm, setNewCourseForm] = useState(initialState);

	function handleInput(target, inputKey) {
		const [valid, info] = validate(
			target.value,
			newCourseForm[inputKey].validation
		);
		const updatedForm = {
			...newCourseForm,
			[inputKey]: {
				...newCourseForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		console.log(updatedForm);
		setNewCourseForm(updatedForm);
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
		const courseData = {};
		Object.keys(newCourseForm).map(
			(key) => (courseData[key] = newCourseForm[key].value)
		);
		courseData.units = [];
		const [response, status] = await adminService.create.course(courseData);
		const error = {};
		switch (status) {
			case 409:
				error.key = 'code';
				error.msg = 'Já existe um curso com este código.';
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
			setNewCourseForm({
				...newCourseForm,
				[error.key]: {
					...newCourseForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid(false);
		} else {
			setNewCourseForm(initialState);
			setCreated(true);
			setTimeout(() => setCreated(false), 2000);
		}
		setLoading(false);
	}

	return (
		<>
			<Context
				path={[
					{ tier: 'courses', title: 'cursos' },
					{ tier: 'courses/new', title: 'novo' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaUniversity />
						<span>Novo Curso</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(newCourseForm).map((key) => (
							<Input
								key={newCourseForm[key].id}
								id={newCourseForm[key].id}
								type={newCourseForm[key].type}
								label={newCourseForm[key].label}
								validation={newCourseForm[key].validation}
								error={newCourseForm[key].error}
								info={newCourseForm[key].info}
								value={newCourseForm[key].value}
								options={newCourseForm[key].options}
								change={({ target }) =>
									handleInput(target, newCourseForm[key].id)
								}
							/>
						))}
						<Button disabled={!valid}>
							{loading ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Curso criado com sucesso.'} />
		</>
	);
}

export default NewCourse;
