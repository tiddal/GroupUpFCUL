import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.secondary_text};
	font-weight: 700;
	grid-template-rows: 500px;
	align-content: center;
	align-items: center;
	justify-items: center;
	fill: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.primary};
	div {
		width: 450px;
		height: 450px;
		border-radius: 50%;
		display: grid;
		grid-template-rows: 200px 50px;
		gap: 10px;
		padding: 50px;
		background: ${({ theme }) => theme.colors.surface};
		box-shadow: ${({ theme }) => theme.box_shadow.primary};
		align-content: center;
		align-items: center;
		justify-items: center;
		svg {
			width: 200px;
		}
		p {
			font-size: 20px;
		}
	}
`;
