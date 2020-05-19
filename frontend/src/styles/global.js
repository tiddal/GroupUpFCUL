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
	width: 100%;
	height: 100%;

}

button {
	border: none;
	font-family: inherit;
	background: none;
}

input{
	font-family: inherit;
	border: none;
}

`;
