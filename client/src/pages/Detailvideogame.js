import React, { useState, useEffect } from 'react'
import {Link,useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDetailVideogame} from '../redux/actions'
import './DetailVideogame.css'
function Detailvideogame() {
  const videoGameId = useParams()
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDetailVideogame(videoGameId.id))
  },[dispatch])
  
  const videoGame = useSelector((state) => state.detail)
  function matchReg(str){
    let reg=/<\/?.+?\/?>/g;
    console.log(videoGame)
    return str.replace(reg,'')
  }



  return (
    <div className='Container'>
    <div className='overlay' >
      {videoGame.length> 0 ? 
        <div className='overlay__inner'>
            <h1 className='overlay__title'>{ videoGame[0].name}</h1>
            <div className='imageContainer'>
            <img  className='imageVideoGame' src={videoGame[0].background_image} 
              alt="image Videogame"
            />
            </div>
            <span><strong>Description:</strong> </span>
            <p className='overlay__description'>  {matchReg(videoGame[0].description)}</p>
            
            <span> <strong>Released: </strong> </span>
            <p> { videoGame[0].released}</p>
            {/* <span class="text-gradient">Rating</span> */}
            <span> <strong>Rating:</strong> </span>
            <p >  {videoGame[0].rating}</p>
            
            {videoGame[0].id.length < 15 ?  
              <p > <strong>Genres:</strong> { videoGame[0].genres.map((g,index) => (<p key={index } >{g}</p>) ) }</p> 
              :  <p > <strong>Genres:</strong> { videoGame[0].genres.map((g,index) => (<p key={index } >{g.name}</p>) ) }</p> }

            <p > <strong>Platforms:</strong> {videoGame[0].platforms.map((p,index) => (<p key={index } >{p}</p>) )}</p>
            <div className='overlay__btns'>
              <Link to= '/videogames'> 
                <button className='overlay__btn ' >Go back</button>
              </Link>
            </div>
        
        </div>: <h3>Loading...</h3>

      } 
      
    </div>
    </div>
    
  )
}
export default Detailvideogame