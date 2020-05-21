import styled from 'styled-components';

export const Container = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 40px;
	margin: auto;
	z-index: 200;
	width: 300px;
	height: auto;
	padding: 5px 15px;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 5px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.1),
		0 -1px 4px rgba(0, 0, 0, 0.1), 0 -1px 4px rgba(0, 0, 0, 0.1);
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
	font-size: 14px;
	transition: transform 0.3s ease;
	transform: ${({ popup }) => {
		if (popup) return 'translateY(0)';
		return 'translateY(70px)';
	}};

	@media (min-width: 768px) {
		top: 75px;
		bottom: unset;
		left: 75px;
		transform: ${({ popup }) => {
			if (popup) return 'translateY(0)';
			return 'translateY(-110px)';
		}};
	}

	@media (min-width: 1450px) {
		top: 85px;
		left: 250px;
		transform: ${({ popup }) => {
			if (popup) return 'translateY(0)';
			return 'translateY(-120px)';
		}};
	}
`;
