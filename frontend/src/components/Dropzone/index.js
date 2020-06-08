import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Container, UploadMessage, Zone } from './styles';

function Dropzone({ setFile, file, mime, supported }) {
	const onDrop = useCallback(
		(acceptedFiles) => {
			const droppedFile = acceptedFiles[0];
			setFile(droppedFile);
		},
		[setFile]
	);
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
	} = useDropzone({ onDrop, accept: mime });

	function onDrag(isDragActive, isDragReject) {
		if (!isDragActive)
			return file ? (
				<UploadMessage type="filled">{file.name}</UploadMessage>
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
		<Container>
			<Zone
				{...getRootProps()}
				isDragActive={isDragActive}
				isDragReject={isDragReject}
			>
				<input {...getInputProps()} />

				{onDrag(isDragActive, isDragReject)}
			</Zone>
			<label>Ficheiros suportados: {supported}</label>
		</Container>
	);
}

export default Dropzone;
