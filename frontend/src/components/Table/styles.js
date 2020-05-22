import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	div {
		display: grid;
		grid-template-columns: ${({ columns_width }) =>
			columns_width.map(
				(column_width) => `${column_width}%`
			)}; /* 335px -> 100% */
		justify-items: center;
		align-items: center;
		grid-template-rows: 30px;
		@media (min-width: 768px) {
			grid-template-rows: 40px;
		}
	}
`;

export const TableHeader = styled.div`
	background: ${({ theme }) => theme.colors.background};
	font-size: 10px;
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
	& > span svg {
		font-size: 8px;
	}
	@media (min-width: 768px) {
		font-size: 14px;
		& > span svg {
			font-size: 12px;
		}
	}
	@media (min-width: 1450px) {
		font-size: 16px;
		& > span svg {
			font-size: 14px;
		}
	}
`;

export const TableLine = styled.div`
	display: grid;
	background: transparent;
	font-size: 8px;
	color: ${({ theme }) => theme.colors.text};
	&:nth-child(odd) {
		background: ${({ theme }) => theme.colors.surface};
	}
	@media (min-width: 768px) {
		font-size: 12px;
	}
	@media (min-width: 1450px) {
		font-size: 14px;
	}
`;

export const TableLineInfo = styled(TableLine)`
	grid-template-columns: 100% !important;
	color: ${({ theme }) => theme.colors.secondary_text};
`;

export const TableCell = styled.span`
	padding: 0 5px;
	width: 100%;
	text-align: ${({ align }) => (align ? align : 'center')};
`;
