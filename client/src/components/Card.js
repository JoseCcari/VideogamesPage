import React from 'react';
import './Card.css';
function Card({ name, image_background, genres, rating }) {
	return (
		<figure className='card'>
			<img src={image_background} alt='image Videogame' />
			<figcaption>{name}</figcaption>
			<h4>{genres}</h4>
			<h6>Rating: {rating}</h6>
		</figure>
	);
}

export default Card;
