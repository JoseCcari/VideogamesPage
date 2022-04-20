import React from 'react'
import Button from '../modules/Button'
import './InitialPage.css'

function InitialPage() {
  return (
    <div className='initialPage'>
      
      <h1 className='title'>Search your Favorite VideoGame</h1>
      <div className='buttonContainer'>
        <Button nameButton="INICIAR"/>
      </div>
      
    </div>
  )
}

export default InitialPage