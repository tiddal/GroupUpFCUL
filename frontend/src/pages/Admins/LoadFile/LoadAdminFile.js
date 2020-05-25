import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

import {
	Container,
	Sheet,
	Title,
	DropContainer,
	UploadMessage,
	UploadSection,
	Button,
	NotificationSection,
	InfoSection,
} from './styles';
import Navigation from '../../../components/Navigation';
import Context from '../../../components/Context';

import {
	FaUserGraduate,
	FaUserTie,
	FaUserShield,
	FaUniversity,
	FaFileUpload,
	FaUpload,
	FaInfoCircle,
	FaCheckCircle,
} from 'react-icons/fa';

function LoadAdminFile() {
	const [adminFile, setAdminFile] = useState();

	function handleUpload(event) {
		event.preventDefault();
		console.log(adminFile);
	}

	function onDrop(file) {
		setAdminFile(file[0]);
	}

	function onDrag(isDragActive, isDragReject) {
		if (!isDragActive)
			return adminFile ? (
				<UploadMessage type="filled">{adminFile.name}</UploadMessage>
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
			<Navigation
				items={[
					{ icon: <FaUserGraduate />, name: 'Alunos', path: '/students' },
					{ icon: <FaUserTie />, name: 'Professores', path: '/professors' },
					{ icon: <FaUserShield />, name: 'Admins', path: '/admins' },
					{ icon: <FaUniversity />, name: 'Cursos', path: '/courses' },
				]}
			/>
			<Context
				path={[
					{ tier: 'admins', title: 'admins' },
					{ tier: 'admins/file', title: 'carregar ficheiro' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaFileUpload />
						<span>Carregar Ficheiro</span>
					</Title>
					<UploadSection onSubmit={handleUpload}>
						<Dropzone accept="application/json" onDropAccepted={onDrop}>
							{({
								getRootProps,
								getInputProps,
								isDragActive,
								isDragReject,
							}) => (
								<DropContainer
									{...getRootProps()}
									isDragActive={isDragActive}
									isDragReject={isDragReject}
								>
									<input {...getInputProps()} />

									{onDrag(isDragActive, isDragReject)}
								</DropContainer>
							)}
						</Dropzone>
						<label>Ficheiros suportados: JSON</label>
						<Button disabled={!adminFile}>
							<span>Carregar</span>
							<FaUpload />
						</Button>
					</UploadSection>
					<NotificationSection type="success">
						<span>
							<FaCheckCircle />
						</span>
						<div>
							<p>Sucesso! 2 utilizadores criados:</p>
							<ul>
								<li>fc49049</li>
							</ul>
						</div>
					</NotificationSection>
					<InfoSection>
						<span>
							<FaInfoCircle />
						</span>

						<div>
							Para evitar problemas no processamento do ficheiro garanta que os
							seguintes campos estão presentes em todos os administradores que
							pretende registar:
							<ul>
								<li> - Número de administrador</li>
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

export default LoadAdminFile;
