import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (min-width: 768px) {
		padding-left: 75px;
	}
	@media (min-width: 1450px) {
		padding-left: 250px;
	}
	&::after {
		content: '';
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 2px solid ${({ color }) => color};
		border-color: ${({ theme }) => theme.colors.primary_variant} transparent
			${({ theme }) => theme.colors.primary_variant} transparent;
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

export const CardContainer = styled(MiniContainer)`
	&::after {
		border: 2px solid ${({ color }) => color};
		border-color: ${({ theme }) => theme.colors.primary_variant} transparent
			${({ theme }) => theme.colors.primary_variant} transparent;
	}
`;
