import styled from 'styled-components';

export const Container = styled.div`
	padding-top: 120px;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: 768px) {
		padding-left: 75px;
	}
	@media (min-width: 1200px) {
		padding-left: 250px;
	}
`;
