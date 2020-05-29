import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 1px;
	display: flex;
	div {
		width: 100%;
		height: 1px;
		background: ${({ theme }) => theme.colors.disabled_background};
		display: flex;
		justify-content: center;
		align-items: center;
		span {
			background: ${({ theme }) => theme.colors.surface};
			color: ${({ theme }) => theme.colors.secondary_text};
			border: 1px solid ${({ theme }) => theme.colors.disabled_background};
			border-radius: 15px;
			font-weight: 700;
			font-size: 10px;
			text-transform: uppercase;
			padding: 3px 30px;
		}
	}
`;
