import React from 'react'
import Button from '../modules/Button'
import './InitialPage.css'
import {Link} from 'react-router-dom'
function InitialPage() {
  return (
    <div className='initialPage'>
      
      <h1 className='title'>Dkary VideoGames</h1>
      <Link 
        to='/videogames'
        style={{paddingLeft: 13, textDecoration: 'none'}}>
      <div className='buttonContainer'>
        <Button nameButton="INICIAR"/>
      </div>
      </Link>
    </div>
  )
}

export default InitialPage