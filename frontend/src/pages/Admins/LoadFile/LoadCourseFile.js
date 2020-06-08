import React, { useState } from 'react';
import adminService from '../../../services/admin';

import {
	Container,
	Sheet,
	Title,
	UploadSection,
	NotificationSection,
	InfoSection,
} from './styles';
import Context from '../../../components/Context';
import Dropzone from '../../../components/Dropzone';
import { Submit } from '../../../components/Button';
import { ButtonSpinner } from '../../../components/Spinner';

import {
	FaFileUpload,
	FaUpload,
	FaInfoCircle,
	FaCheckCircle,
	FaTimesCircle,
} from 'react-icons/fa';

function LoadAdminFile() {
	const [courseFile, setCourseFile] = useState();
	const [loading, setLoading] = useState(false);
	const [uploadMessage, setUploadMessage] = useState({
		msg: '',
		createdCourses: [],
		type: '',
	});

	async function handleUpload(event) {
		event.preventDefault();
		setLoading(true);
		const [response, status] = await adminService.loadFile.courses(courseFile);
		const createdCourses = [];
		let msg = '';
		let type = 'error';
		console.log(response);
		switch (status) {
			case 409:
				Object.keys(response.created).map((key) =>
					createdCourses.push(...response.created[key])
				);
				if (response.error.key === 'code') {
					msg = `O codigo ${response.error.instance} já existe. ${
						createdCourses.length
					} curso${createdCourses.length !== 1 ? 's criados' : ' criado'}${
						createdCourses.length ? ':' : '.'
					}`;
					break;
				}
				msg = `O curso ${response.error.instance} já existe. ${
					createdCourses.length
				} curso${createdCourses.length !== 1 ? 's criados' : ' criado'}${
					createdCourses.length ? ':' : '.'
				}`;
				break;
			case 400:
				msg =
					'Garanta que todos os campos referidos abaixo estão presentes e são válidos. 0 cursos criados.';
				break;
			case 0:
				msg = response;
				break;
			default:
				response.map((course) => createdCourses.push(course));
				msg = `Sucesso! ${createdCourses.length} curso${
					createdCourses.length > 1 ? 's criados' : ' criado'
				}:`;
				type = 'success';
				break;
		}
		setUploadMessage({ msg, createdCourses, type });
		setLoading(false);
		setCourseFile();
	}

	return (
		<>
			<Context
				path={[
					{ tier: 'courses', title: 'cursos' },
					{ tier: 'courses/file', title: 'carregar ficheiro' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaFileUpload />
						<span>Carregar Ficheiro</span>
					</Title>
					<UploadSection onSubmit={handleUpload}>
						<Dropzone
							setFile={setCourseFile}
							file={courseFile}
							mime="application/json"
							supported="JSON"
						/>
						<Submit disabled={!courseFile}>
							{loading ? (
								<ButtonSpinner />
							) : (
								<>
									<span>Carregar</span>
									<FaUpload />
								</>
							)}
						</Submit>
					</UploadSection>
					{uploadMessage.msg && (
						<NotificationSection type={uploadMessage.type}>
							<span>
								{uploadMessage.type !== 'error' ? (
									<FaCheckCircle />
								) : (
									<FaTimesCircle />
								)}
							</span>
							<div>
								<p>{uploadMessage.msg}</p>
								{uploadMessage.createdCourses.length > 0 && (
									<ul>
										{uploadMessage.createdCourses.map((course) => (
											<li key={course.name}>{course.name}</li>
										))}
									</ul>
								)}
							</div>
						</NotificationSection>
					)}

					<InfoSection>
						<span>
							<FaInfoCircle />
						</span>

						<div>
							Para evitar problemas no processamento do ficheiro garanta que os
							seguintes campos estão presentes em todos os cursos que pretende
							registar:
							<ul>
								<li> - Código</li>
								<li> - Nome</li>
								<li> - Cíclo</li>
								<li> - Sigla</li>
							</ul>
							<br></br>
							Se estiverem presentes cadeiras associadas ao curso, garante que
							os seguintes campos estão presentes:
							<ul>
								<li> - Código da cadeira</li>
								<li> - Nome</li>
								<li> - Semestre</li>
								<li> - Sigla</li>
								<li> - Número de ECTS</li>
							</ul>
						</div>
					</InfoSection>
				</Sheet>
			</Container>
		</>
	);
}

export default LoadAdminFile;
