import React from 'react';
import './Button.css';

function Button({ nameButton }) {
	return <button className='btn'>{nameButton}</button>;
}

export default Button;
