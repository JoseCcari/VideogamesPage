import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../redux/actions';
import './SearchBar.css';
function SearchBar() {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	function handleInputChange(event) {
		event.preventDefault();
		setName(event.target.value);
	}
	function handleKeyDown(e) {
		if (e.keyCode === 13) {
			dispatch(getNameVideogames(name));
			setName('');
		}
	}
	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getNameVideogames(name));
	}

	return (
		<div className='search'>
			<label htmlFor='search'>SEARCH:</label>
			<input
				value={name}
				type='text'
				placeholder='Buscar videogame ...'
				onChange={(e) => handleInputChange(e)}
				onKeyDown={(e) => handleKeyDown(e)}
			/>
			<button
				className='searchButton'
				type='submit'
				onClick={(e) => handleSubmit(e)}
			>
				{' '}
				Buscar{' '}
			</button>
		</div>
	);
}

export default SearchBar;
