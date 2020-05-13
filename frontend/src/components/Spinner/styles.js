import styled from 'styled-components';

export const Container = styled.div`
	display: inline-block;
	margin-top: 3px;
	&::after {
		content: '';
		display: block;
		width: ${({ size }) => size}px;
		height: ${({ size }) => size}px;
		border-radius: 50%;
		border: 2px solid ${({ color }) => color};
		border-color: ${({ color }) => color} transparent ${({ color }) => color}
			transparent;
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
