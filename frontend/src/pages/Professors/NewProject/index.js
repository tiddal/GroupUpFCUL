import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Dropzone from '../../../components/Dropzone';

import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';

import {
	Container,
	Sheet,
	Title,
	Form,
	AddStageButton,
	Button,
	DropzoneContainer,
	StageSection,
	StageTitle,
	Separator,
} from './styles';

import Context from '../../../components/Context';
import Notification from '../../../components/Notification';
import { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import { FaProjectDiagram, FaArchive, FaMinusCircle } from 'react-icons/fa';

function NewProject() {
	const initialProject = [
		{
			id: 'name',
			type: 'text',
			label: 'Nome do projeto',
			value: '',
			validation: { required: true, name: true },
			valid: false,
			error: false,
			info: '',
		},
		{
			id: 'description',
			type: 'textarea',
			label: 'Descrição',
			value: '',
			validation: { required: false },
			valid: true,
			error: false,
			info: '',
		},
		{
			id: 'objectives',
			type: 'textarea',
			label: 'Objetivos',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		{
			id: 'min_students',
			type: 'number',
			label: 'Mínimo de alunos por grupo',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		{
			id: 'max_students',
			type: 'number',
			label: 'Máximo de alunos por grupo',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
	];

	const initialStage = {
		inputs: [
			{
				id: 'description',
				type: 'textarea',
				label: 'Descrição',
				value: '',
				validation: { required: true },
				valid: false,
				error: false,
				info: '',
			},
			{
				id: 'start_date',
				type: 'datetime-local',
				label: 'Data de início',
				value: '',
				validation: { required: true },
				valid: false,
				error: false,
				info: '',
			},
			{
				id: 'end_date',
				type: 'datetime-local',
				label: 'Data de fim',
				value: '',
				validation: { required: true },
				valid: false,
				error: false,
				info: '',
			},
			{
				id: 'weight',
				type: 'text',
				label: 'Peso (%)',
				value: '',
				validation: { required: true },
				valid: false,
				error: false,
				info: '',
			},
		],
		number: 1,
		file: '',
	};

	const [unitData, setUnitData] = useState();
	const { user, logout } = useAuth();
	const {
		params: { unit },
	} = useRouteMatch('/projects/:unit/new');
	const [initializng, setInitializing] = useState(true);
	const [formValidity, setFormValidity] = useState(false);
	const [created, setCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [projectForm, setProjectForm] = useState(initialProject);
	const [stagesForm, setStagesForm] = useState([initialStage]);

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

	function evaluateForm(projectForm, stageForm) {
		let validForm = true;
		// Evaluate Project
		for (let key in projectForm) {
			validForm = projectForm[key].valid && validForm;
		}
		// Evaluate Stages
		stageForm.map((stage) => {
			for (let key in stage.inputs) {
				validForm = stage.inputs[key].valid && validForm;
			}
			validForm = stage.file && validForm;
			return stage;
		});
		return validForm;
	}

	function handleProjectInputs({ value }, index) {
		const [valid, info] = validate(value, projectForm[index].validation);
		const updatedForm = [...projectForm];
		updatedForm[index] = {
			...projectForm[index],
			value,
			valid,
			error: !valid,
			info,
		};
		setProjectForm(updatedForm);
		setFormValidity(evaluateForm(updatedForm, stagesForm));
	}

	function handleStageInputs({ value }, stage_index, index) {
		const { inputs: stage_fields } = { ...stagesForm[stage_index] };
		const [valid, info] = validate(value, stage_fields[index].validation);
		const updatedForm = [...stagesForm];
		updatedForm[stage_index].inputs[index] = {
			...updatedForm[stage_index].inputs[index],
			value,
			valid,
			error: !valid,
			info,
		};
		setStagesForm(updatedForm);
		setFormValidity(evaluateForm(projectForm, updatedForm));
	}

	async function handleSubmission(event) {
		event.preventDefault();
		if (!formValidity) return;
		setLoading(true);
		const projectData = {
			project: { stages: [] },
		};

		projectForm.map((field) => (projectData.project[field.id] = field.value));
		projectData.project.assignment_url = 'test.pdf';

		stagesForm.map((stage) => {
			const stageData = {};
			stage.inputs.map((field) => (stageData[field.id] = field.value));
			projectData.project.stages.push(stageData);
			return stage;
		});
		const [, status] = await professorService.create.project(
			unitData.course_code,
			unitData.code,
			projectData
		);
		if (status !== 201) return logout();
		setProjectForm(initialProject);
		setStagesForm([initialStage]);
		setLoading(false);
		setFormValidity(false);
		setCreated(true);
		setTimeout(() => setCreated(false), 2000);
	}

	function handleAddStage() {
		const updatedForm = [...stagesForm];
		updatedForm.push({ ...initialStage, number: updatedForm.length + 1 });
		setStagesForm(updatedForm);
		setFormValidity(evaluateForm(projectForm, updatedForm));
	}

	function removeStage(index) {
		const updatedForm = [...stagesForm];
		updatedForm.pop(index);
		setStagesForm(updatedForm);
		setFormValidity(evaluateForm(projectForm, updatedForm));
	}

	function setStageFile(file, index) {
		const updatedForm = [...stagesForm];
		updatedForm[index].file = file;
		setStagesForm(updatedForm);
		setFormValidity(evaluateForm(projectForm, updatedForm));
	}

	return (
		<>
			{!initializng && (
				<Context
					path={[
						{ tier: `projects/${unit}`, title: unitData.name },
						{ tier: `projects/${unit}/new`, title: 'Novo Projeto' },
					]}
				/>
			)}

			<Container>
				<Sheet>
					<Title>
						<span>
							<FaProjectDiagram />
							Novo Projeto
						</span>
					</Title>
					<Form autoComplete="off" onSubmit={handleSubmission}>
						{projectForm.map((field, index) => (
							<Input
								key={field.id}
								id={field.id}
								type={field.type}
								label={field.label}
								validation={field.validation}
								error={field.error}
								info={field.info}
								value={field.value}
								options={field.options}
								change={({ target }) => handleProjectInputs(target, index)}
							/>
						))}

						<Separator>
							<div>
								<span>Etapas</span>
							</div>
						</Separator>

						<StageSection>
							{stagesForm.map((stage, stage_index) => (
								<React.Fragment key={stage.number}>
									<StageTitle>
										<span>
											<FaArchive />
											Etapa {stage.number} {stage.number === 1 && '*'}
										</span>
										{stage.number !== 1 && (
											<button
												type="button"
												onClick={() => removeStage(stage_index)}
											>
												<FaMinusCircle />
											</button>
										)}
									</StageTitle>

									{stage.inputs.map((key, index) => (
										<Input
											key={key.id}
											id={key.id}
											type={key.type}
											label={key.label}
											validation={key.validation}
											error={key.error}
											info={key.info}
											value={key.value}
											options={key.options}
											change={({ target }) =>
												handleStageInputs(target, stage_index, index)
											}
										/>
									))}

									<DropzoneContainer>
										<label>Enunciado: * </label>
										<Dropzone
											setFile={setStageFile}
											file={stage.file}
											mime="application/pdf"
											supported="PDF"
											index={stage_index}
										/>
									</DropzoneContainer>
								</React.Fragment>
							))}

							<AddStageButton type="button" onClick={handleAddStage}>
								Adicionar Etapa
							</AddStageButton>
						</StageSection>

						<Button type="submit" disabled={!formValidity}>
							{loading ? <ButtonSpinner /> : 'Criar Projeto'}
						</Button>
					</Form>
				</Sheet>
			</Container>
			<Notification popup={created} text={'Projeto criado com sucesso.'} />
		</>
	);
}

export default NewProject;
