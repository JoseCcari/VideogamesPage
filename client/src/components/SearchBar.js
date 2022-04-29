import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../redux/actions';
import './SearchBar.css';
function SearchBar({ setPage }) {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	function handleInputChange(event) {
		event.preventDefault();

		setName(event.target.value);
	}
	/* 	function handleKeyDown(e) {
		if (e.keyCode === 13 && name.length !== 0) {
			dispatch(getNameVideogames(name));
			setPage(1);
			setName('');
		}
		if (name.length == 0) alert('La barra no puede estar vacia');
	} */
	function handleSubmit(e) {
		e.preventDefault();
		if (name.length !== 0) {
			dispatch(getNameVideogames(name));
			setPage(1);
		}
		if (name.length == 0) alert('La barra no puede estar vacia');
	}

	return (
		<div className='search'>
			<form className='formSearch' action=''>
				<label htmlFor='search'>SEARCH:</label>
				<input
					value={name}
					type='text'
					placeholder='Buscar videogame ...'
					onChange={(e) => handleInputChange(e)}
				/>
				<button
					className='searchButton'
					type='submit'
					onClick={(e) => handleSubmit(e)}
				>
					{' '}
					Buscar{' '}
				</button>
			</form>
		</div>
	);
}

export default SearchBar;
