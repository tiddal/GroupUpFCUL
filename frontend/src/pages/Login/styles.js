import styled from 'styled-components';
import background from '../../assets/fcul_landscape.jpg';

export const Background = styled.div`
	height: 100vh;
	width: 100vw;
	background-image: url(${background});
	background-position: 70% 50%;
	background-size: auto 812px;
	background-repeat: no-repeat;
	position: absolute;
	text-align: center;

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		background-position: left center;
		background-size: cover;
	}

	/* Large devices (desktops, 992px and up) */
	@media (min-width: 1450px) {
		background-position: center center;
		background-size: cover;
	}
`;

export const Container = styled.div`
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		width: 65vw;
		height: 100vh;
		background-color: #fff;
		position: absolute;
		right: 0;
		box-shadow: -10px 0px 10px rgba(0, 0, 0, 0.25);
	}

	/* Large devices (desktops, 992px and up) */
	@media (min-width: 1450px) {
		width: 35vw;
		height: 100vh;
		background-color: #fff;
		position: absolute;
		right: 0;
		box-shadow: -10px 0px 10px rgba(0, 0, 0, 0.25);
	}
`;

export const Logo = styled.div`
	width: 90%;
	height: 115px;
	background-color: #fff;
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin: 45px auto 0 auto;
	img {
		height: 65px;
		margin-top: 25px;
	}
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		box-shadow: none;
		margin-top: 100px;
		img {
			height: 75px;
		}
	}
`;

export const Form = styled.form`
	width: 90%;
	height: 300px;
	background: #ffffff;
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin: 85px auto 0 auto;
	& > input:first-child {
		margin-top: 40px;
	}
	& > input {
		margin-top: 30px;
	}
	& > button {
		margin-top: 60px;
	}
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		box-shadow: none;
		width: 100%;
	}
`;

export const Input = styled.input`
	font-family: inherit;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 5px;
	height: 50px;
	width: 80%;
	padding: 0 20px 0 20px;
	font-size: 1rem;
	transition: all 0.25s ease-in;
	&&::placeholder {
		color: #ccc;
	}
	&:focus,
	&:hover {
		border-color: #8bafde;
	}
`;

export const Button = styled.button`
	font-family: inherit;
	font-weight: 600;
	border: none;
	text-align: center;
	text-transform: capitalize;
	color: white;
	background-color: #0c4da2;
	width: 80%;
	height: 32px;
	border-radius: 5px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	transition: all 0.25s ease-in;

	&:hover,
	&:disabled {
		cursor: pointer;
		background-color: #8bafde;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;

export const Error = styled.div`
	position: absolute;
	width: 80%;
	color: #f77268;
	left: 0;
	right: 0;
	margin: 20px auto 0 auto;
`;

export const Spinner = styled.div`
	display: inline-block;
	margin-top: 3px;
	&::after {
		content: '';
		display: block;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
