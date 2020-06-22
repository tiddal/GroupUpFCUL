import styled from 'styled-components';

export const Container = styled.div`
	display: inline-flex;
	grid-template-columns: repeat(5, 1fr);
	label {
		cursor: pointer;
		input[type='radio'] {
			display: none;
		}
		svg {
			transition: color 0.3s ease;
			font-size: 20px;
		}
	}
`;
