import React from 'react'
import ex from '../assets/borrar.png'
import check from '../assets/comprobado.png'
function Input({title, type, value, name, onchange,htmlfor,customError}) {
  return (
    <div>
          <label htmlFor={htmlfor}>{title}</label>
          <div className='grupoInput'>
            <input 
              type={type} 
              value={value}
              name= {name}
              onChange={onchange}  
              id={htmlfor} 
            />
            <p className='customError'>{customError}</p>
          </div>
        </div>
  )
}

export default Input


