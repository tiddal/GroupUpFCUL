import styled from 'styled-components';

export const Container = styled.div`
	padding: 20px;
	display: grid;
	grid-auto-rows: min-content;
	gap: 75px;
	padding-bottom: 40px;
	@media (min-width: 768px) {
		padding: 50px;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const Section = styled.div`
	grid-column: 1/-1;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 20px 50px;
	grid-auto-rows: 50px;
	align-items: center;
	gap: 20px;
	span {
		font-size: 14px;
		grid-column: 1 / -1;
		color: ${({ theme }) => theme.colors.text};
		font-weight: 600;
	}
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const Member = styled.div`
	display: grid;
	grid-template-columns: 50px auto 50px;
	grid-template-rows: 100%;
	span {
		grid-column: unset;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50px;
		background: orange;
		color: #ffffff;
		font-size: 24px;
		font-weight: 700;
		box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
	}
	@media (min-width: 1450px) {
		grid-template-columns: 50px 275px 50px;
	}
`;

export const MemberInfo = styled.div`
	padding: 0 15px;
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	grid-template-columns: 100%;
	align-items: center;
	p {
		:first-child {
			font-weight: 700;
		}
		:nth-child(2) {
			font-size: 10px;
			color: ${({ theme }) => theme.colors.secondary_text};
			font-weight: 600;
		}
		color: ${({ theme }) => theme.colors.text};
		font-size: 12px;
		svg {
			color: #f2b01e;
		}
	}
`;

export const MembersOptions = styled.div`
	justify-self: center;
	align-self: center;
	display: flex;
	width: 100%;
	height: 20px;
	justify-content: space-around;
	button,
	div {
		font-size: 16px;
		color: ${({ theme }) => theme.colors.secondary_text};
	}
	button {
		transition: color 0.3s ease;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.danger};
		:hover {
			color: ${({ theme }) => theme.colors.hover.danger};
		}
	}
`;

export const PendingUsersOptions = styled(MembersOptions)`
	button {
		:nth-child(1) {
			color: ${({ theme }) => theme.colors.success};
			:hover {
				color: ${({ theme }) => theme.colors.hover.success};
			}
		}
	}
`;

export const RateMember = styled(MemberInfo)`
	span {
		all: unset;
		color: ${({ theme }) => theme.colors.secondary_text};
		font-weight: 600;
	}
	div {
		display: inline-flex;
		grid-row: 2 / -1;
		font-size: 18px;
	}
`;

export const LeaveButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	font-weight: 700;
	color: #fff;
	border-radius: 5px;
	transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;
	&:disabled {
		color: ${({ theme }) => theme.colors.disabled_text};
		background: ${({ theme }) => theme.colors.disabled_background};
		box-shadow: none;
		cursor: not-allowed;
	}
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.danger};
	height: 40px;
	&:hover:enabled {
		background: ${({ theme }) => theme.colors.hover.danger};
	}
	& > * {
		margin: 0 10px;
	}
	@media (min-width: 768px) {
		grid-column: 2;
	}
	@media (min-width: 1450px) {
		grid-column: 3;
	}
`;
