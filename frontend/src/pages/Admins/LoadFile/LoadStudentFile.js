import React, { useState } from 'react';
import Dropzone from '../../../components/Dropzone';
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
import { ButtonSpinner } from '../../../components/Spinner';
import { Submit } from '../../../components/Button';

import {
	FaFileUpload,
	FaUpload,
	FaInfoCircle,
	FaCheckCircle,
	FaTimesCircle,
} from 'react-icons/fa';

function LoadStudentFile() {
	const [studentFile, setStudentFile] = useState();
	const [loading, setLoading] = useState(false);
	const [uploadMessage, setUploadMessage] = useState({
		msg: '',
		createdUsers: [],
		type: '',
	});

	async function handleUpload(event) {
		event.preventDefault();
		setLoading(true);
		const [response, status] = await adminService.loadFile.users(studentFile);
		const createdUsers = [];
		let msg = '';
		let type = 'error';

		switch (status) {
			case 409:
				Object.keys(response.created).map((key) =>
					createdUsers.push(...response.created[key])
				);
				if (response.error.key === 'email') {
					msg = `O email ${response.error.instance} já se encontra registado. ${
						createdUsers.length
					} utilizador${createdUsers.length !== 1 ? 'es criados' : ' criado'}${
						createdUsers.length ? ':' : '.'
					}`;
					break;
				}
				msg = `O utilizador ${
					response.error.instance
				} já se encontra registado. ${createdUsers.length} utilizador${
					createdUsers.length !== 1 ? 'es criados' : ' criado'
				}${createdUsers.length ? ':' : '.'}`;
				break;
			case 400:
				msg =
					'Garanta que todos os campos referidos abaixo estão presentes e são válidos. 0 utilizadores criados.';
				break;
			case 0:
				msg = response;
				break;
			default:
				Object.keys(response).map((key) => createdUsers.push(...response[key]));
				msg = `Sucesso! ${createdUsers.length} utilizador${
					createdUsers.length > 1 ? 'es criados' : ' criado'
				}:`;
				type = 'success';
				break;
		}
		setUploadMessage({ msg, createdUsers, type });
		setLoading(false);
		setStudentFile();
	}

	return (
		<>
			<Context
				path={[
					{ tier: 'students', title: 'alunos' },
					{ tier: 'students/file', title: 'carregar ficheiro' },
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
							setFile={setStudentFile}
							file={studentFile}
							mime="application/json"
							supported="JSON"
						/>
						<Submit disabled={!studentFile}>
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
								{uploadMessage.createdUsers.length > 0 && (
									<ul>
										{uploadMessage.createdUsers.map((user) => (
											<li key={user.username}>{user.username}</li>
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
							seguintes campos estão presentes em todos os alunos que pretende
							registar:
							<ul>
								<li> - Número de aluno</li>
								<li> - Nome próprio</li>
								<li> - Apelido</li>
								<li> - Email</li>
								<li> - Password</li>
								<li>- Tipo de utilizador (aluno, admin ou professor)</li>
							</ul>
						</div>
					</InfoSection>
				</Sheet>
			</Container>
		</>
	);
}

export default LoadStudentFile;
