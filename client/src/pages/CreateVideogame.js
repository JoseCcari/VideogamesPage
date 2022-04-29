import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, createNewVideogame } from '../redux/actions';
import Input from '../components/Input';
import SelectForm from '../components/SelectForm';
import './CreateVideogame.css';
import {
	Formu,
	ButonCenter,
	Button,
	MessageSuccess,
	MessageError,
} from '../components/CreateGame';
function CreateVideogame() {
	const dispatch = useDispatch();
	const genres = useSelector((state) => state.genres);

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const [name, setName] = useState({ value: '', validate: null });
	const [description, setDescription] = useState({ value: '', validate: null });
	const [releaseDate, setReleaseDate] = useState({ value: '', validate: null });
	const [image_background, setImage_background] = useState({
		value: '',
		validate: null,
	});
	const [rating, setRating] = useState({ value: '', validate: null });
	const [genresVideogame, setGenresVideogame] = useState({
		value: [],
		validate: 'false',
	});
	const [platformsVideogame, setPlatformsVideogame] = useState({
		value: [],
		validate: 'false',
	});
	const [formularioValido, setFormularioValido] = useState(null);

	const Regx = {
		description: /^(.|\s)*[a-zA-Z]+(.|\s)*$/, // Letras, numeros, guion y guion_bajo
		name: /^[a-zA-ZÀ-ÿ0-9\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
		rating: /^([0-4]{1}(\.\d{1,2})?|5(.0{1,2})?)$/,
		image: /.*?(\/[\/\w\.]+)[\s\?]?.*/, //Admite barras
		date: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
	};

	const Plataformas = [
		'PC',
		'PlayStation 5',
		'PlayStation 4',
		'Xbox One',
		'Xbox Series S/X',
		'Nintendo Switch',
		'iOS',
		'Android',
		'Nintendo 3DS',
		'Nintendo DS',
		'Nintendo DSi',
		'macOS',
		'Linux',
		'Xbox 360',
		'Xbox',
		'PlayStation 3',
		'PlayStation 2',
		'PlayStation',
		'PS Vita',
		'PSP',
		'Wii U',
		'Wii',
		'GameCube',
		'Nintendo 64',
		'Game Boy Advance',
		'Game Boy Color',
		'Game Boy',
		'SNES',
		'NES',
		'Classic Macintosh',
		'Apple II',
		'Commodore / Amiga',
		'Atari 7800',
		'Atari 5200',
		'Atari 2600',
		'Atari Flashback',
		'Atari 8-bit',
		'Atari ST',
		'Atari Lynx',
		'Atari XEGS',
		'Genesis',
		'SEGA Saturn',
		'SEGA CD',
		'SEGA 32X',
		'SEGA Master System',
		'Dreamcast',
		'3DO',
		'Jaguar',
		'Game Gear',
		'Neo Geo',
	];

	const Plataforms = Plataformas.map((p) => ({ name: p }));

	function handleSubmit(e) {
		e.preventDefault();
		if (
			name.validate === 'true' &&
			description.validate === 'true' &&
			releaseDate.validate === 'true' &&
			rating.validate === 'true' &&
			image_background.validate === 'true' &&
			genresVideogame.validate === 'true'
		) {
			setFormularioValido(true);
			const formSuccessful = {
				name: name.value,
				description: description.value,
				background_image: image_background.value,
				platforms: platformsVideogame.value,
				rating: rating.value,
				releaseDate: releaseDate.value,
				genres: genresVideogame.value,
			};

			setName({ value: '', validate: null });
			setDescription({ value: '', validate: null });
			setReleaseDate({ value: '', validate: null });
			setRating({ value: '', validate: null });
			setImage_background({ value: '', validate: null });
			setGenresVideogame({ value: [], validate: false });
			setPlatformsVideogame({ value: [], validate: false });
			dispatch(createNewVideogame(formSuccessful));
		} else {
			setFormularioValido(false);
		}
	}

	return (
		<>
			<div className='botonBack'>
				<Link to='/videogames'>
					{' '}
					<Button>Volver</Button>
				</Link>
			</div>

			<main className='containerForm'>
				<h3 className='titleCreated'>CREATE YOUR VIDEOGAME</h3>
				<Formu action=''>
					<Input
						placeholder={'Name videogame'}
						title={'Name'}
						type={'text'}
						stateInput={name}
						name={'name'}
						setStateInput={setName}
						htmlfor={'NameFor'}
						customError={
							'Solo puede contener letras espacios y números, con un mínimo de 2 letras y un máximo de 50 letras!'
						}
						expressionReg={Regx.name}
					/>
					<Input
						placeholder={'Description videogame'}
						title={'Description'}
						type={'text'}
						stateInput={description}
						name={'description'}
						setStateInput={setDescription}
						htmlfor={'DescriptionFor'}
						customError={'Debe contener al menos una letra'}
						expressionReg={Regx.description}
					/>
					<Input
						placeholder={'Release Date videogame'}
						title={'Release Date:'}
						type={'date'}
						stateInput={releaseDate}
						name={'releaseDate'}
						setStateInput={setReleaseDate}
						htmlfor={'releaseDateFor'}
						customError={'Ingrese un Mes/Día/Año válido!'}
						expressionReg={Regx.date}
					/>

					<Input
						placeholder={'Rating of videogame'}
						title={'Rating:'}
						type={'number'}
						stateInput={rating}
						name={'rating'}
						setStateInput={setRating}
						htmlfor={'ratingFor'}
						customError={
							'Solo admite números entre 0 a 5 ,enteros o decimales con hasta dos decimales ejemplo 4.32!!'
						}
						expressionReg={Regx.rating}
					/>
					<Input
						placeholder={'http/mygame.com'}
						title={'Path of Image:'}
						type={'text'}
						stateInput={image_background}
						name={'image_background'}
						setStateInput={setImage_background}
						htmlfor={'image_backgroundFor'}
						customError={'Ingrese un path válido'}
						expressionReg={Regx.image}
					/>
					<SelectForm
						title={'Genres'}
						state={genresVideogame}
						setState={setGenresVideogame}
						data={genres}
					/>
					<SelectForm
						title={'Platforms'}
						state={platformsVideogame}
						setState={setPlatformsVideogame}
						data={Plataforms}
					/>

					{formularioValido === false && (
						<MessageError>
							<p>Por favor llena todo el formulario correctamente!</p>
						</MessageError>
					)}
					<ButonCenter>
						<Button type='submit' onClick={(e) => handleSubmit(e)}>
							Crear
						</Button>
						{formularioValido === true && (
							<MessageSuccess>
								El formulario se envió exitosamente!
							</MessageSuccess>
						)}
					</ButonCenter>
				</Formu>
			</main>
		</>
	);
}

export default CreateVideogame;
