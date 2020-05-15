import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

*{
	margin: 0;
	padding: 0;
	outline: none;
	box-sizing: border-box;
}

body{
	font-family: 'Open Sans', sans-serif, 'Gilroy', -apple-system, BlinkMacSystemFont,
		'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
		'Droid Sans', 'Helvetica Neue', sans-serif;
	background: ${({ theme }) => theme.colors.surface};
}

button {
	border: none;
	font-family: inherit;
	background: none;
}

`;
