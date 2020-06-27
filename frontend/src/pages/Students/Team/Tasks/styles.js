import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	padding: 30px 20px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 120px;
	grid-auto-rows: min-content;
	gap: 30px;
	background: ${({ theme }) => theme.colors.surface};
	@media (min-width: 768px) {
		padding: 50px;
	}
`;

export const ProgressSection = styled.div`
	display: grid;
	grid-template-rows: 30px auto;
	grid-column: 1 / -1;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	padding: 10px 20px;
	gap: 13px;
	@media (min-width: 768px) {
		padding: 20px 30px;
	}
`;

export const ProgressTitle = styled.div`
	grid-column: 1 / -1;
	display: grid;
	grid-template-columns: 25px auto;
	align-items: center;
	color: ${({ theme }) => theme.colors.text};
	svg {
		font-size: 14px;
	}
	span {
		font-size: 16px;
		font-weight: 700;
	}
	@media (min-width: 768px) {
		svg {
			font-size: 16px;
		}
		span {
			font-size: 18px;
		}
	}
`;

export const ProgressBar = styled.div`
	display: grid;
	grid-template-rows: 8px 20px;
	align-items: center;
	padding: 0 5px;
	div {
		height: 8px;
		width: 100%;
		background: ${({ theme }) => theme.colors.surface};
		border-radius: 4px;
		div {
			transition: width 2s ease;
			height: 100%;
			width: ${({ progress }) => progress};
			background: ${({ theme, type }) => theme.colors[type]};
		}
	}
	span {
		padding: 0 10px;
		font-size: 12px;
		color: ${({ theme }) => theme.colors.secondary_text};
	}
`;

export const MainButton = styled.button`
	margin: 10px 0;
	height: 40px;
	grid-column: 1 / -1;
	display: flex;
	cursor: pointer;
	align-self: center;
	background: ${({ theme }) => theme.colors.success};
	text-decoration: none;
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	justify-content: center;
	align-items: center;
	transition: background 0.3s ease;
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};

	svg {
		margin-right: 15px;
		font-size: 12px;
		margin-top: 2px;
	}
	&:hover {
		background: ${({ theme }) => theme.colors.hover.success};
	}

	@media (min-width: 768px) {
		grid-column: 3;
	}
`;

export const TaskCard = styled.div`
	display: grid;
	grid-template-rows: 40px auto;
	grid-column: 1 / -1;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	padding: 10px 20px 30px;
	gap: 10px;
	form {
		display: grid;
		grid-column: 1 / -1;
	}
	@media (min-width: 768px) {
		box-shadow: none;
		padding: 20px 30px;
		padding-bottom: 40px;
		form {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 30px;
			div:last-of-type {
				grid-column: 1;
			}
		}
	}
	@media (min-width: 1450px) {
		form {
			grid-template-columns: repeat(3, 1fr);
		}
	}
`;

export const NewTaskCard = styled(TaskCard)`
	@media (min-width: 768px) {
		form div:last-of-type {
			grid-column: 1 / -1;
		}
	}
`;

export const TaskTitle = styled.div`
	grid-column: 1 / -1;
	display: grid;
	grid-template-columns: 20px 25px auto 60px;
	align-items: center;
	color: ${({ theme }) => theme.colors.text};
	svg {
		color: ${({ theme, type }) => theme.colors[type || 'text']};
		font-size: 14px;
	}

	input {
		height: 30px;
		font-size: 16px;
		color: ${({ theme }) => theme.colors.text};
		background: ${({ theme }) => theme.colors.background};
		font-weight: 700;
		overflow: hidden;
		max-width: 100%;
		text-overflow: ellipsis;
		transition: all 0.2s ease;
		:enabled {
			margin: 0 5px;
			background: ${({ theme }) => theme.colors.inputs.background};
			padding: 0 10px;
			font-weight: 500;
			border-radius: 5px;
			border: 1px solid ${({ theme }) => theme.colors.inputs.border};
		}
		@media (min-width: 768px) {
			font-size: 18px;
		}
	}

	span {
		font-size: 16px;
		white-space: nowrap;
		font-weight: 700;
		overflow: hidden;
		max-width: 100%;
		text-overflow: ellipsis;
		color: ${({ theme }) => theme.colors.text};
		@media (min-width: 768px) {
			font-size: 18px;
		}
	}
	div {
		width: 60px;
		display: flex;
		justify-content: space-around;
		button {
			cursor: pointer;
			svg {
				color: ${({ theme }) => theme.colors.primary_variant};
				font-size: 18px;
				transition: color 0.3s ease;
			}
			&:hover {
				color: ${({ theme }) => theme.colors.primary};
			}
			:last-child svg {
				color: ${({ theme }) => theme.colors.danger};

				&:hover {
					color: ${({ theme }) => theme.colors.hover.danger};
				}
			}
		}
	}
`;

export const NewTaskTitle = styled(TaskTitle)`
	grid-template-columns: 25px auto 60px;
	svg {
		font-size: 16px;
	}
	div {
		justify-content: flex-end;
		button svg {
			color: ${({ theme }) => theme.colors.danger};
			&:hover {
				color: ${({ theme }) => theme.colors.hover.danger};
			}
		}
	}
`;

export const TagsSection = styled.div`
	display: grid;
	grid-template-rows: repeat(2, 25px) auto;
	grid-template-columns: repeat(1, 1fr);
	gap: 10px;
	@media (min-width: 768px) {
		grid-template-rows: 25px auto;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const Tag = styled.div`
	border-radius: 13px;
	padding: 0 13px;
	display: grid;
	grid-template-columns: 14px auto;
	background: ${({ theme, type }) => theme.colors[type]};
	color: ${({ type }) => (type === 'success' ? '#FFFFFF' : '#333333')};
	font-size: 12px;
	align-items: center;
	justify-items: center;
	font-weight: 600;
`;

export const Button = styled.button`
	height: 40px;
	margin-top: 40px;
	background: ${({ theme }) => theme.colors.primary};
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
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
	&:hover:enabled {
		background: ${({ theme }) => theme.colors.primary_variant};
	}
	& > * {
		margin: 0 10px;
	}
	@media (min-width: 768px) {
		margin-top: 5px;
		width: 50%;
		justify-self: end;
		align-self: center;
	}
	@media (min-width: 1450px) {
		grid-column: 3;
	}
`;
