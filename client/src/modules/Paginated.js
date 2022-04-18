import React from 'react'

function Paginated({videogamesPerPage, allVideogames, paginated}) {
    const numberPages = [];
    const totalPage = Math.ceil(allVideogames/videogamesPerPage)
    for (let i=0 ; i<totalPage; i++){
        numberPages.push(i+1)
    }
    return (
    <nav>
        <ul className='paginated'>
            {
                numberPages?.map( n => (
                    <li className='number' key={n}>
                        <a onClick={paginated}>{n}</a>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Paginated