import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		display: block;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 2px solid ${({ color }) => color};
		border-color: ${({ theme }) => theme.colors.primary_variant} transparent
			${({ theme }) => theme.colors.primary_variant} transparent;
		animation: lds-dual-ring 1.2s linear infinite;
		@media (min-width: 768px) {
			left: 75px;
		}
		@media (min-width: 1450px) {
			left: 250px;
		}
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

export const MiniContainer = styled.div`
	display: inline-block;
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
