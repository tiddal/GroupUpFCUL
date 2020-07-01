import styled from 'styled-components';
import { Wrapper } from '../../components/Wrapper';
import { NavLink } from 'react-router-dom';

export const Container = styled(Wrapper)`
	padding-top: 145px;
	height: 100vh;
	@media (min-width: 768px) {
		padding-top: 200px;
		padding-bottom: 100px;
		height: auto;
		display: flex;
		justify-content: center;
	}
`;

export const Sheet = styled.div`
	position: relative;
	height: 100%;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 20px 20px 0 0;
	display: grid;
	grid-template-rows: 62.5px;
	grid-template-columns: 100%;
	grid-auto-rows: min-content;
	box-shadow: ${({ theme }) => theme.box_shadow.primary};
	padding: 0 40px;
	gap: 15px;
	justify-content: center;
	@media (min-width: 768px) {
		padding: 0 40px 60px 40px;
		width: 660px;
		border-radius: 10px;
	}
	@media (min-width: 1450px) {
		width: 960px;
	}
`;

export const Picture = styled.div`
	display: grid;
	margin-top: -62.5px;
	img {
		width: 125px;
		height: 125px;
		border-radius: 50%;
		justify-self: center;
	}
	span {
		justify-self: center;
		width: 125px;
		height: 125px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background: orange;
		color: #ffffff;
		font-size: 48px;
		font-weight: 700;
		box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	}
	@media (min-width: 768px) {
		grid-column: 1 / -1;
	}
`;

export const ProfileInfoSection = styled.section`
	display: grid;
	grid-template-rows: 35px 20px 30px;
	gap: 5px;
`;

export const ProfileName = styled.span`
	font-size: 24px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
`;

export const ProfileUsername = styled.span`
	font-size: 14px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.secondary_text};
	text-align: center;
`;

export const ProfileSocials = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 30px);
	gap: 15px;
	justify-items: center;
	justify-content: center;
	align-content: center;
`;

const social_colors = {
	fb: '#4267B2',
	gh: '#333333',
	tt: '#1DA1F2',
	ig: '#E1306C',
	disabled: '#ccc',
};

export const A = styled.a`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	color: ${({ type }) => social_colors[type || 'disabled']};
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	cursor: pointer;

	svg {
		font-size: 20px;
	}
	:hover {
		svg {
			font-size: 22px;
		}
	}
`;

export const NoLink = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	color: ${({ theme }) => theme.colors.secondary_text};
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	svg {
		font-size: 20px;
	}
`;

export const AboutSection = styled.section`
	margin-top: 20px;
	align-self: start;
	display: grid;
	grid-template-rows: 20px auto;
	span {
		font-size: 14px;
		color: ${({ theme }) => theme.colors.text};
		padding: 0 10px;
	}
	div {
		height: 280px;
		background: ${({ theme }) => theme.colors.inputs.background};
		padding: 10px 15px;
		border: 1px solid ${({ theme }) => theme.colors.inputs.border};
		border-radius: 5px;
		color: ${({ theme }) => theme.colors.text};
	}
`;

export const RatingSection = styled.section`
	margin-top: 20px;
	align-self: start;
	display: grid;
	grid-template-rows: 20px auto;
	gap: 10px;
	span {
		font-size: 14px;
		color: ${({ theme }) => theme.colors.text};
		padding: 0 10px;
	}
	div {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		font-size: 28px;
		align-self: center;
		justify-self: center;
		gap: 15px;
		color: #ffc107;
		@media (min-width: 768px) {
			padding-left: 10px;
			justify-self: start;
		}
	}
`;

export const EditButton = styled(NavLink)`
	position: absolute;
	right: 20px;
	top: 20px;
	color: ${({ theme }) => theme.colors.primary_variant};
	font-size: 18px;
`;
