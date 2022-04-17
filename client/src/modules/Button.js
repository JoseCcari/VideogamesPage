import React from 'react'
import './Button.css'
import {Link} from 'react-router-dom'
function Button( {nameButton }) {
  return (
    <button  className='btn'>
      <Link 
        to='/videogames'
        style={{paddingLeft: 13, textDecoration: 'none'}}>
          {nameButton}
      </Link>
    </button>
  )
}

export default Button