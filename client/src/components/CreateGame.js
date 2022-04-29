import styled, { css } from 'styled-components';
/* import ex from '../assets/borrar.png'
import check from '../assets/comprobado.png'
 */
const colors = {
	borde: '#0075FF',
	error: '#bb2929',
	exito: '#1ed1d2',
};

const Formu = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	@media (max-width: 800px) {
		.containerForm form {
			grid-template-columns: 1fr;
		}
	}
`;

const Label = styled.label`
	display: block;
	font-weight: 700;
	padding: 10px;
	min-height: 40px;
	cursor: pointer;
	${(props) =>
		props.valido === 'false' &&
		css`
			color: ${colors.error};
		`}
`;
const GrupoInput = styled.div`
	position: relative;
	z-index: 90;
`;

const InputForm = styled.input`
	width: 100%;
	background: #fff;
	border-radius: 3px;
	height: 45px;
	line-height: 45px;
	padding: 0 40px 0 10px;
	transition: 0.3s ease all;
	border: 3px solid transparent;
	&:focus {
		border: 3px solid #0075ff;
		outline: none;
		box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
	}

	${(props) =>
		props.valido === 'true' &&
		css`
			border: 3px solid transparent;
		`}

	${(props) =>
		props.valido === 'false' &&
		css`
			border: 3px solid brown !important;
		`}
`;
const CustomError = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: #bb2929;
	display: none;
	${(props) =>
		props.valido === 'true' &&
		css`
			display: none;
		`}
	${(props) =>
		props.valido === 'false' &&
		css`
			display: block;
			margin-top: 2px;
		`}
`;

const ButonCenter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	grid-column: span 2;
	@media (max-width: 800px) {
		grid-column: span 1;
	}
`;

const Button = styled.button`
	height: 40px;
	line-height: 40px;
	width: 20%;
	background-color: #000;
	color: #fff;
	font-weight: bold;
	border: none;
	border-radius: 3px;
	&:hover {
		box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.5);
	}
`;

const MessageSuccess = styled.p`
	font-size: 22px;
	color: rgb(60, 199, 71);
`;

const MessageError = styled.div`
	height: 45px;
	line-height: 45px;
	background-color: rgb(177, 37, 37);
	padding: 0px 15px;
	border-radius: 3px;
	grid-column: span 2;
	font-weight: bold;
	p {
		margin: 0;
	}
	@media (max-width: 800px) {
		grid-column: span 1;
	}
`;

export {
	Formu,
	Label,
	GrupoInput,
	InputForm,
	CustomError,
	ButonCenter,
	Button,
	MessageSuccess,
	MessageError,
};
