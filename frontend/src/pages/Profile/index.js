import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks';
import generalService from '../../services/general';

import {
	Container,
	Sheet,
	Picture,
	ProfileInfoSection,
	ProfileName,
	ProfileUsername,
	ProfileSocials,
	AboutSection,
	RatingSection,
	EditButton,
	A,
	NoLink,
} from './styles';

import Spinner from '../../components/Spinner';

import {
	FaFacebook,
	FaGithub,
	FaTwitter,
	FaInstagram,
	FaStar,
	FaStarHalf,
	FaEdit,
} from 'react-icons/fa';

import { useRouteMatch } from 'react-router-dom';

function Profile() {
	const {
		params: { user },
	} = useRouteMatch('/profile/:user');
	const { user: self } = useAuth();
	const [userData, setUserData] = useState();
	const [initializng, setInitializing] = useState(true);

	useEffect(() => {
		async function getInitialState() {
			const [response] = await generalService.get.user(user);
			let userData = {
				avatar_url: response.avatar_url,
				first_name: response.first_name,
				last_name: response.last_name,
				role: response.role,
				about: response.about,
				username: response.username,
			};
			if (response.role === 'student') {
				const [student] = await generalService.get.student(user);
				userData = {
					...userData,
					rating: student.rating,
					number_of_ratings: student.number_of_ratings,
					facebook_url: student.facebook_url,
					github_url: student.github_url,
					instagram_url: student.instagram_url,
					twitter_url: student.twitter_url,
				};
			}
			setUserData(userData);
			setInitializing(false);
		}
		getInitialState();
	}, [user]);

	function renderRate(rate) {
		if (!rate)
			return [...Array(5)].map((star, i) => (
				<FaStar key={i} color={'#AAAAAA'} />
			));
		const decimalPart = parseInt((rate % 1).toFixed(1).substring(2));
		const integerPart = parseInt(rate);
		const stars = [...Array(integerPart)];
		if (decimalPart === 0)
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
				</React.Fragment>
			);
		if (decimalPart <= 5) {
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
					<FaStarHalf />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
					<FaStar />
				</React.Fragment>
			);
		}
	}

	return initializng ? (
		<Spinner />
	) : (
		<Container>
			<Sheet>
				{self.username === user && (
					<EditButton to="/profile/edit">
						<FaEdit />
					</EditButton>
				)}

				<Picture>
					{userData.avatar_url ? (
						<img src={userData.avatar_url} alt="profile" />
					) : (
						<span>{userData.first_name.charAt(0)}</span>
					)}
				</Picture>
				<ProfileInfoSection>
					<ProfileName>{`${userData.first_name} ${userData.last_name}`}</ProfileName>
					<ProfileUsername>{userData.username}</ProfileUsername>
					{userData.role === 'student' && (
						<ProfileSocials>
							{userData.facebook_url ? (
								<A type={'fb'} href={userData.facebook_url} target="_blank">
									<FaFacebook />
								</A>
							) : (
								<NoLink>
									<FaFacebook />
								</NoLink>
							)}
							{userData.github_url ? (
								<A type={'gh'} href={userData.github_url} target="_blank">
									<FaGithub />
								</A>
							) : (
								<NoLink>
									<FaGithub />
								</NoLink>
							)}
							{userData.twitter_url ? (
								<A type={'tt'} href={userData.twitter_url} target="_blank">
									<FaTwitter />
								</A>
							) : (
								<NoLink>
									<FaTwitter />
								</NoLink>
							)}
							{userData.instagram_url ? (
								<A type={'ig'} href={userData.instagram_url} target="_blank">
									<FaInstagram />
								</A>
							) : (
								<NoLink>
									<FaInstagram />
								</NoLink>
							)}
						</ProfileSocials>
					)}
				</ProfileInfoSection>
				<AboutSection>
					<span>Sobre:</span>
					<div>{userData.about}</div>
				</AboutSection>
				{userData.role === 'student' && (
					<RatingSection>
						<span>Avaliações ({userData.number_of_ratings}):</span>
						<div>{renderRate(userData.rating)}</div>
					</RatingSection>
				)}
			</Sheet>
		</Container>
	);
}

export default Profile;
