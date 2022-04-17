import React from 'react'

function Card({name , image_background , genres}) {
  return (
    <div>
        <h3>{name}</h3>
        <h5>{genres}</h5>
        <img 
            src= {image_background} 
            alt="image Videogame"
            width="400px"
            height="400px"
         />
    </div>
  )
}

export default Card