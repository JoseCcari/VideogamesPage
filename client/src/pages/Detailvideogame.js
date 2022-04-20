import React, { useState, useEffect } from 'react'
import {Link,useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDetailVideogame} from '../redux/actions'

function Detailvideogame() {
  const videoGameId = useParams()
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDetailVideogame(videoGameId.id))
  },[dispatch])
  const videoGame = useSelector((state) => state.detail)
  return (
    <div>
      {videoGame.length> 0 ? 
        <div>
            <h2>{ videoGame[0].name}</h2>
            <img src={videoGame[0].background_image} 
              alt="image Videogame"
              width="400px"
              height="400px"
            />

            <p> Description: {videoGame[0].description}</p>
            <p> released: {videoGame[0].released}</p>
            <p> rating: {videoGame[0].rating}</p>

        
        </div>: <h3>Loading...</h3>

      } 

      <Link to= '/videogames'> 
        <button>Go back</button>
      </Link>
    </div>
    
  )
}
export default Detailvideogame