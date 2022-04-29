import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getVideogames,
	filterByCreated,
	orderByName,
	orderByRating,
	filterByGenre,
} from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Paginated from '../components/Paginated';
import SearchBar from '../components/SearchBar.js';
import './Videogames.css';

function Videogames() {
	const dispatch = useDispatch();
	const allVideogames = useSelector((state) => state.videogames);
	//const [loadingVideogames, setLoadingVideogames] = useState(true)

	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage, setVideogamesPerPage] = useState(15);
	const indexOfLastVideogame = currentPage * videogamesPerPage;
	const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
	const currentVideogames = allVideogames.slice(
		indexOfFirstVideogame,
		indexOfLastVideogame
	);
	const [orden, setOrden] = useState('');
	const [ordenRating, setOrdenRating] = useState('');
	const [filterGneres, setFilterGneres] = useState('');
	const paginated = (numberPage) => {
		setCurrentPage(numberPage);
	};

	useEffect(() => {
		dispatch(getVideogames());
	}, [dispatch]);

	/*     function handleClick(event) {
        event.preventDefault();
        dispatch( getVideogames());
    } */
	function handleClickCreated(event) {
		setCurrentPage(1);
		dispatch(filterByCreated(event.target.value));
	}
	function handleSortByName(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`);
	}

	function handleSortByRating(e) {
		e.preventDefault();
		dispatch(orderByRating(e.target.value));
		setCurrentPage(1);
		setOrdenRating(`Ordenado ${e.target.value}`);
	}
	function handleFilterByGenre(e) {
		e.preventDefault();
		dispatch(filterByGenre(e.target.value));
		setCurrentPage(1);
		setFilterGneres(`Ordenado ${e.target.value}`);
	}
	return (
		<div className='Home'>
			<div className='navBar'>
				<div className='filters'>
					<h3>Sorted: </h3>
					<div className='select'>
						<select
							defaultValue={'DEFAULT'}
							id='format'
							onChange={(e) => handleSortByName(e)}
						>
							<option value={'DEFAULT'} disabled>
								alphabetic
							</option>
							<option value='asc'>Ascendente</option>
							<option value='des'>Descendente</option>
						</select>
					</div>
					<div className='select'>
						<select
							defaultValue={'DEFAULT'}
							id='format'
							onChange={(e) => handleSortByRating(e)}
						>
							<option value={'DEFAULT'} disabled>
								Rating
							</option>
							<option value='major'>Major</option>
							<option value='minor'>Minor</option>
						</select>
					</div>
				</div>

				<div className='filters'>
					<h3>Filters: </h3>

					<div className='select'>
						<select
							defaultValue={'DEFAULT'}
							id='format'
							onChange={(e) => handleClickCreated(e)}
						>
							<option value={'DEFAULT'} disabled>
								Origen
							</option>
							<option value='All'>All</option>
							<option value='Created'>Creados</option>
							<option value='Api'>Api</option>
						</select>
					</div>
					<div className='select'>
						<select
							defaultValue={'DEFAULT'}
							id='format2'
							onChange={(e) => handleFilterByGenre(e)}
						>
							<option value={'DEFAULT'} disabled>
								Genres
							</option>
							<option value='All'>All</option>
							<option value='Action'>Action</option>
							<option value='Shooter'>Shooter</option>
							<option value='Platformer'>Platformer</option>
							<option value='Fighting'>Fighting</option>
							<option value='Strategy'>Strategy</option>
							<option value='Arcade'>Arcade</option>
							<option value='Board Games'>Board Games</option>
							<option value='Indie'>Indie</option>
							<option value='Simulation'>Simulation</option>
							<option value='Massively Multiplayer'>
								Massively Multiplayer
							</option>
							<option value='Educational'>Educational</option>
							<option value='RPG'>RPG</option>
							<option value='Casual'>Casual</option>
							<option value='Racing'>Racing</option>
							<option value='Family'>Family</option>
							<option value='Adventure'>Adventure</option>
							<option value='Puzzle'>Puzzle</option>
							<option value='Sports'>Sports</option>
							<option value='Card'>Card</option>
						</select>
					</div>
				</div>

				<div className='wrap'>
					<SearchBar setPage={setCurrentPage} />
				</div>
				<Link to='/CreateVideogame' style={{ textDecoration: 'none' }}>
					<div className='create'>Create</div>
				</Link>
			</div>

			<div className='Paginado'>
				<Paginated
					videogamesPerPage={videogamesPerPage}
					allVideogames={allVideogames.length}
					paginated={paginated}
					currentPage={currentPage}
				/>
			</div>

			{allVideogames.length > 0 ? (
				<div className='wrapper'>
					<h2>
						<strong>
							All Videogames<span>({allVideogames.length})</span>
						</strong>
					</h2>
					<div className='cards'>
						{currentVideogames?.map((v, index) => {
							return (
								<Link to={`/videogames/${v.id}`} key={`videogame-${index}`}>
									<Card
										key={v.id}
										name={v.name}
										image_background={v.background_image}
										rating={v.rating}
										genres={v.genres.map((g, index) => (
											<p key={`genere-${index}`}> {g.name} </p>
										))}
									/>
								</Link>
							);
						})}
					</div>
					<div className='Paginado'>
						<Paginated
							videogamesPerPage={videogamesPerPage}
							allVideogames={allVideogames.length}
							paginated={paginated}
						/>
					</div>
				</div>
			) : (
				<div className='loading'>
					<p className='loadingp'>Loading...</p>
				</div>
			)}
		</div>
	);
}

export default Videogames;
