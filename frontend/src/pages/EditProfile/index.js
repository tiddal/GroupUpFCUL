import React, { useEffect, useState } from 'react';
import Dropzone from '../../components/Dropzone';

import { useAuth } from '../../hooks';
import generalService from '../../services/general';

import {
	Container,
	Sheet,
	Title,
	Form,
	Picture,
	Button,
	DropzoneContainer,
	Separator,
} from './styles';

import Spinner, { ButtonSpinner } from '../../components/Spinner';
import Input from '../../components/Input';

import { FaEdit } from 'react-icons/fa';

function EditProfile() {
	const { user, setUser } = useAuth();
	const [userData, setUserData] = useState();
	const [initializng, setInitializing] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getInitialState() {
			let userData = {};
			switch (user.role) {
				case 'student':
					const [studentData] = await generalService.get.student(user.username);
					userData = {
						about: studentData.about || '',
						avatar_url: studentData.avatar_url,
						first_name: studentData.first_name,
						last_name: studentData.last_name,
						inputs: [
							{
								id: 'facebook',
								type: 'text',
								label: 'Facebook',
								value: studentData.facebook_url
									? studentData.facebook_url.split('/').pop()
									: '',
							},
							{
								id: 'github',
								type: 'text',
								label: 'GitHub',
								value: studentData.github_url
									? studentData.github_url.split('/').pop()
									: '',
							},
							{
								id: 'twitter',
								type: 'text',
								label: 'Twitter',
								value: studentData.twitter_url
									? studentData.twitter_url.split('/').pop()
									: '',
							},
							{
								id: 'instagram',
								type: 'text',
								label: 'Instagram',
								value: studentData.instagram_url
									? studentData.instagram_url.split('/').pop()
									: '',
							},
						],
					};
					setUserData(userData);
					setInitializing(false);
					break;
				case 'professor':
					const [professorData] = await generalService.get.professor(
						user.username
					);
					userData = {
						about: professorData.about || '',
						avatar_url: professorData.avatar_url,
						first_name: professorData.first_name,
						last_name: professorData.last_name,
					};
					setUserData(userData);
					setInitializing(false);
					break;
				case 'admin':
					const [adminData] = await generalService.get.admin(user.username);
					userData = {
						about: adminData.about || '',
						avatar_url: adminData.avatar_url,
						first_name: adminData.first_name,
						last_name: adminData.last_name,
					};
					setUserData(userData);
					setInitializing(false);
					break;
				default:
					return;
			}
		}
		getInitialState();
	}, [user]);

	function handleInputs({ value }, index) {
		const updatedInputs = [...userData.inputs];
		updatedInputs[index] = {
			...userData.inputs[index],
			value,
		};
		setUserData({ ...userData, inputs: updatedInputs });
	}

	async function handleSubmission(event) {
		event.preventDefault();
		setLoading(true);
		const data = new FormData();
		if (userData.file) {
			data.append('file', userData.file);
		}
		data.append('about', userData.about);
		let [response, status] = await generalService.update.user(
			user.username,
			data
		);
		if (status !== 200) return;

		if (user.role === 'student') {
			const student = {};
			userData.inputs.map((field) => (student[field.id] = field.value));
			[, status] = await generalService.update.student(user.username, {
				student,
			});
			if (status !== 200) return;
		}
		setUser({ ...user, avatar: response.avatar_url });
		localStorage.setItem(
			'@GroupUpAuth:user',
			JSON.stringify({ ...user, avatar: response.avatar_url })
		);
		setLoading(false);
	}

	function handleFile(file) {
		setUserData({
			...userData,
			avatar_url: URL.createObjectURL(file),
			file: file,
		});
	}

	return initializng ? (
		<Spinner />
	) : (
		<Container>
			<Sheet>
				<Title>
					<span>
						<FaEdit />
						{`${userData.first_name} ${userData.last_name}`}
					</span>
				</Title>
				<Form autoComplete="off" onSubmit={handleSubmission}>
					<Picture>
						{userData.avatar_url ? (
							<img src={userData.avatar_url} alt="profile" />
						) : (
							<span>{userData.first_name.charAt(0)}</span>
						)}
					</Picture>
					<DropzoneContainer>
						<label>Alterar imagem de perfil:</label>
						<Dropzone
							setFile={handleFile}
							file={userData.file || null}
							mime="image/jpeg,image/png,image/gif"
							supported="JPEG, PNG e GIF"
						/>
					</DropzoneContainer>
					<Input
						key={'about'}
						id={'about'}
						type={'textarea'}
						label={'Sobre'}
						validation={{ required: false }}
						value={userData.about || ''}
						change={({ target }) =>
							setUserData({ ...userData, about: target.value })
						}
					/>
					{user.role === 'student' && (
						<>
							<Separator>
								<div>
									<span>Redes Sociais</span>
								</div>
							</Separator>
							{userData.inputs.map((field, index) => (
								<Input
									key={field.id}
									id={field.id}
									type={field.type}
									label={field.label}
									validation={{ required: false }}
									value={field.value}
									change={({ target }) => handleInputs(target, index)}
								/>
							))}
						</>
					)}

					<Button type="submit">
						{loading ? <ButtonSpinner /> : 'Guardar'}
					</Button>
				</Form>
			</Sheet>
		</Container>
	);
}

export default EditProfile;
