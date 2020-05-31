import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Dropzone from 'react-dropzone';

import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';

import {
	Container,
	Sheet,
	Title,
	Form,
	Button,
	DropzoneContainer,
	DropzoneFieldset,
	DropzoneInput,
	UploadMessage,
	Separator,
	StageSection,
	StageTitle,
	StageInputs,
} from './styles';

import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import { FaProjectDiagram } from 'react-icons/fa';

function NewProject() {
	const initialState = {
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
		description: {
			id: 'description',
			type: 'textarea',
			label: 'Descrição',
			value: '',
			validation: { required: false },
			valid: false,
			error: false,
			info: '',
		},
		objectives: {
			id: 'objectives',
			type: 'textarea',
			label: 'Objetivos',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		min_students: {
			id: 'min_students',
			type: 'number',
			label: 'Mínimo de alunos por grupo',
			value: '',
			validation: { required: true, max: 9 },
			valid: true,
			error: false,
			info: '',
		},
		max_students: {
			id: 'max_students',
			type: 'number',
			label: 'Máximo de alunos por grupo',
			value: '',
			validation: { required: true, max: 9 },
			valid: true,
			error: false,
			info: '',
		},
	};

	const initialStage = {
		description: {
			id: 'description',
			type: 'textarea',
			label: 'Descrição',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		start_date: {
			id: 'start_date',
			type: 'datetime-local',
			label: 'Data de início',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		end_date: {
			id: 'end_date',
			type: 'datetime-local',
			label: 'Data de fim',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		weight: {
			id: 'weight',
			type: 'text',
			label: 'Peso (%)',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
	};

	const [unitData, setUnitData] = useState();
	const { user, logout } = useAuth();
	const {
		params: { unit },
	} = useRouteMatch('/projects/:unit/new');
	const [initializng, setInitializing] = useState(true);
	const [valid, setValid] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newForm, setNewForm] = useState(initialState);
	const [stages, setStages] = useState([initialStage]);
	const [assignmentFile, setAssignmentFile] = useState();

	useEffect(() => {
		async function getInitialState() {
			const classes = await professorService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const [unitData] = classes.filter(
				(class_) => class_.code.toString() === unit
			);
			setUnitData(unitData);
			setInitializing(false);
		}
		getInitialState();
	}, [user, unit]);

	function handleInput(target, inputKey) {
		const [valid, info] = validate(target.value, newForm[inputKey].validation);
		const updatedForm = {
			...newForm,
			[inputKey]: {
				...newForm[inputKey],
				value: target.value,
				valid,
				error: !valid,
				info,
			},
		};
		setNewForm(updatedForm);
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
		Object.keys(newForm).map((key) => (classData[key] = newForm[key].value));
		classData.academic_year = '2019-2020';
		const [response, status] = [1, 2];
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
			setNewForm({
				...newForm,
				[error.key]: {
					...newForm[error.key],
					info: error.msg,
					valid: false,
					error: true,
				},
			});
			setValid(false);
		} else {
			setNewForm(initialState);
			setCreated(true);
			setTimeout(() => setCreated(false), 2000);
		}
		setLoading(false);
	}

	function onDrag(isDragActive, isDragReject) {
		if (!isDragActive)
			return assignmentFile ? (
				<UploadMessage type="filled">{assignmentFile.name}</UploadMessage>
			) : (
				<UploadMessage>
					Arraste ou clique para selecionar um ficheiro
				</UploadMessage>
			);
		if (isDragReject)
			return (
				<UploadMessage type="error">
					Tipo de ficheiro não suportado
				</UploadMessage>
			);
		return <UploadMessage type="success">Solte o ficheiro aqui</UploadMessage>;
	}

	return (
		<>
			{!initializng && (
				<Context
					path={[
						{ tier: '', title: 'projetos' },
						{ tier: `projects/${unit}`, title: unitData.initials },
						{ tier: `projects/${unit}/new`, title: 'Novo' },
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<FaProjectDiagram />
						<span>Novo Projeto</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{Object.keys(newForm).map((key) => (
							<Input
								key={newForm[key].id}
								id={newForm[key].id}
								type={newForm[key].type}
								label={newForm[key].label}
								validation={newForm[key].validation}
								error={newForm[key].error}
								info={newForm[key].info}
								value={newForm[key].value}
								options={newForm[key].options}
								change={({ target }) => handleInput(target, newForm[key].id)}
							/>
						))}
						<DropzoneContainer>
							<Dropzone
								accept="application/pdf"
								onDropAccepted={(file) => setAssignmentFile(file[0])}
							>
								{({
									getRootProps,
									getInputProps,
									isDragActive,
									isDragReject,
								}) => (
									<DropzoneFieldset
										isDragActive={isDragActive}
										isDragReject={isDragReject}
									>
										<legend>Enunciado: (*)</legend>
										<DropzoneInput
											{...getRootProps()}
											isDragActive={isDragActive}
											isDragReject={isDragReject}
										>
											<input {...getInputProps()} />

											{onDrag(isDragActive, isDragReject)}
										</DropzoneInput>
									</DropzoneFieldset>
								)}
							</Dropzone>

							<label>Ficheiros suportados: PDF</label>
						</DropzoneContainer>
						<Separator>
							<div>
								<span>Etapas</span>
							</div>
						</Separator>
						<StageSection>
							<StageTitle>
								<FaProjectDiagram />
								<span>Etapa 1</span>
							</StageTitle>
							<StageInputs>
								{stages.map((stage) =>
									Object.keys(stage).map((key) => (
										<Input
											key={stage[key].id}
											id={stage[key].id}
											type={stage[key].type}
											label={stage[key].label}
											validation={stage[key].validation}
											error={stage[key].error}
											info={stage[key].info}
											value={stage[key].value}
											options={stage[key].options}
											change={({ target }) =>
												handleInput(target, stage[key].id)
											}
										/>
									))
								)}
							</StageInputs>
						</StageSection>

						<Button disabled={!valid}>
							{loading ? <ButtonSpinner /> : 'Submeter'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Projeto criado com sucesso.'} />
		</>
	);
}

export default NewProject;
