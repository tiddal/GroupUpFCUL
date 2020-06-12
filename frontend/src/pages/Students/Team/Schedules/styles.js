import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.secondary_text};
	font-weight: 700;
	grid-template-rows: 100%;
`;
