import React from 'react';
import { Label } from '../components/CreateGame';
function SelectForm({ title, state, setState, data }) {
	function handleSelect(e) {
		if (!state.value.includes(e.target.value)) {
			const value = [...state.value, e.target.value];
			setState({
				...state,
				value: value,
				validate: value.length > 0 ? 'true' : 'false',
			});
		}
	}

	function handleDelete(game) {
		if (state.value.includes(game)) {
			const NewValue = state.value.filter((element) => element !== game);
			setState({
				...state,
				value: NewValue,
				validate: NewValue.length > 0 ? 'true' : 'false',
			});
		}
	}

	return (
		<div>
			<Label>{`${title}:`} </Label>
			<select defaultValue={'DEFAULT'} onChange={(e) => handleSelect(e)}>
				<option value={'DEFAULT'} disabled>
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
