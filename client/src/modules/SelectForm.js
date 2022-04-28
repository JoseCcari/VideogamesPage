import React from 'react';
import { Label } from '../modules/CreateGame';
function SelectForm({ title, state, setState, data }) {
	function handleSelect(e) {
		if (!state.value.includes(e.target.value)) {
			setState({
				...state,
				value: [...state.value, e.target.value],
				validate: state.value,
			});
		}
	}

	function handleDelete(game) {
		if (state.value.includes(game)) {
			setState({
				...state,
				value: state.value.filter((element) => element !== game),
				validate: state.value,
			});
		}
	}

	return (
		<div>
			<Label>{`${title}:`} </Label>
			<select onChange={(e) => handleSelect(e)}>
				<option selected disabled>
					Select a {title}
				</option>
				{data.map((g, index) => (
					<option key={index} value={g.name}>
						{' '}
						{g.name}
					</option>
				))}
			</select>
			{state.validate === 'false' && (
				<p className='errorSelect'>Necesita agregar al menos 1 genero!</p>
			)}
			{state.value?.map((g, index) => (
				<div className='listGenres' key={index}>
					<p>{g}</p>

					<button
						onClick={(e) => {
							e.preventDefault();
							handleDelete(g);
						}}
					>
						X
					</button>
				</div>
			))}
		</div>
	);
}

export default SelectForm;
