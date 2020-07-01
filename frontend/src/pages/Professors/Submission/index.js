import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import { useAuth, useYear } from '../../../hooks';
import professorService from '../../../services/professor';

import {
	Container,
	Sheet,
	Title,
	Form,
	Button,
	Artifacts,
	Artifact,
	Separator,
} from './styles';

import Context from '../../../components/Context';
import Spinner, { ButtonSpinner } from '../../../components/Spinner';
import Input from '../../../components/Input';

import { validate } from '../../../validators';

import {
	FaArchive,
	FaFilePdf,
	FaFileAlt,
	FaFileArchive,
	FaFileCsv,
	FaFileWord,
	FaFilePowerpoint,
	FaFileExcel,
} from 'react-icons/fa';

function Submission() {
	const [unitData, setUnitData] = useState();
	const { user } = useAuth();
	const { selectedYear } = useYear();
	const {
		params: { unit, project, stage, team },
	} = useRouteMatch('/projects/:unit/:project/stages/:stage/submissions/:team');
	const [initializng, setInitializing] = useState(true);
	const [loading, setLoading] = useState(false);
	const [submissionData, setSubmissionData] = useState();

	useEffect(() => {
		async function getInitialState() {
			const classes = await professorService.get.classes(
				user.username,
				selectedYear,
				2
			);
			const [unitData] = classes.filter(
				(class_) => class_.code.toString() === unit
			);
			const stageData = await professorService.get.stage(
				unitData.course_code,
				unitData.code,
				selectedYear,
				project,
				stage
			);
			const submission = await professorService.get.submission(
				unitData.course_code,
				unitData.code,
				selectedYear,
				project,
				stage,
				team
			);
			const submissionData = {};
			submissionData.inputs = [
				{
					id: 'stage_feedback',
					type: 'textarea',
					label: 'Comentários',
					value: submission.stage_feedback || '',
					validation: { required: false },
					valid: false,
					error: false,
					info: '',
				},
				{
					id: 'stage_grade',
					type: 'text',
					label: `Nota (0% - ${stageData.weight}%)`,
					value: submission.stage_grade || '',
					validation: { required: false },
					valid: true,
					error: false,
					info: '',
				},
			];
			submissionData.artifacts = submission.artifacts;
			submissionData.submitted_at = moment(submission.submitted_at).format(
				'DD/MM/YYYY, HH[h]mm'
			);
			setUnitData(unitData);
			setSubmissionData(submissionData);
			setInitializing(false);
		}
		getInitialState();
	}, [user, unit, stage, project, team, selectedYear]);

	function handleProjectInputs({ value }, index) {
		const [valid, info] = validate(
			value,
			submissionData.inputs[index].validation
		);
		const updatedForm = {
			...submissionData,
			inputs: [...submissionData.inputs],
		};
		updatedForm.inputs[index] = {
			...submissionData.inputs[index],
			value,
			valid,
			error: !valid,
			info,
		};
		setSubmissionData(updatedForm);
	}

	async function handleSubmission(event) {
		event.preventDefault();
		setLoading(true);
		const data = {};
		submissionData.inputs.map((field) => (data[field.id] = field.value));
		const [, status] = await professorService.update.submission(
			unitData.course_code,
			unitData.code,
			selectedYear,
			project,
			stage,
			team,
			data
		);
		if (status !== 200) return;
		setLoading(false);
	}

	function fileIconsByType(type) {
		const icons = {
			csv: <FaFileCsv />,
			doc: <FaFileWord />,
			docx: <FaFileWord />,
			pdf: <FaFilePdf />,
			ppt: <FaFilePowerpoint />,
			pptx: <FaFilePowerpoint />,
			txt: <FaFileAlt />,
			xls: <FaFileExcel />,
			xlsx: <FaFileExcel />,
			zip: <FaFileArchive />,
			'7z': <FaFileArchive />,
			rar: <FaFileArchive />,
		};
		return icons[type] || <FaFileAlt />;
	}

	return (
		<>
			{!initializng && (
				<Context
					path={[
						{ tier: `projects/${unit}`, title: unitData.initials },
						{
							tier: `projects/${unit}/${project}/stages`,
							title: `Projeto ${project} - Etapas`,
						},
						{
							tier: `projects/${unit}/${project}/stages/${stage}/submissions`,
							title: `Etapa ${stage} - Submissões`,
						},
						{
							tier: `projects/${unit}/${project}/stages/${stage}/submissions/${team}`,
							title: team,
						},
					]}
				/>
			)}
			{initializng ? (
				<Spinner />
			) : (
				<Container>
					<Sheet>
						<Title>
							<span>
								<FaArchive />
								{team}
								<span> - {submissionData.submitted_at}</span>
							</span>
						</Title>
						<Artifacts>
							<span>
								Artefactos produzidos ({submissionData.artifacts.length}):
							</span>
							{submissionData.artifacts.map((artifact) => (
								<Artifact
									key={artifact.id}
									href={artifact.submission_url}
									rel="noopener noreferrer"
									target="_blank"
									type={artifact.filename.split('.').pop()}
								>
									<span>
										{fileIconsByType(artifact.filename.split('.').pop())}
									</span>
									<span>{artifact.filename}</span>
								</Artifact>
							))}
						</Artifacts>
						<Separator>
							<div>
								<span>Avaliação</span>
							</div>
						</Separator>

						<Form autoComplete="off" onSubmit={handleSubmission}>
							{submissionData.inputs.map((field, index) => (
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

							<Button type="submit">
								{loading ? <ButtonSpinner /> : 'Guardar'}
							</Button>
						</Form>
					</Sheet>
				</Container>
			)}
		</>
	);
}

export default Submission;
