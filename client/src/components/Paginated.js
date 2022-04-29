import React from 'react';
import './Paginated.css';
function Paginated({
	videogamesPerPage,
	allVideogames,
	paginated,
	currentPage,
}) {
	const numberPages = [];
	const totalPage = Math.ceil(allVideogames / videogamesPerPage);
	for (let i = 0; i < totalPage; i++) {
		numberPages.push(i + 1);
	}
	return (
		<nav className='data-pagination'>
			<ul>
				{numberPages?.map((n) => (
					<li className='number' key={n}>
						<button
							className={currentPage === n ? 'pageActive' : 'pageNormal'}
							onClick={() => paginated(n)}
						>
							{n}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Paginated;
