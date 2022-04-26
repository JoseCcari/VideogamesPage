import React from 'react'

import {Label, GrupoInput, InputForm, CustomError} from './CreateGame'
function Input({title,placeholder, type, stateInput, name, setStateInput,htmlfor,customError,expressionReg}) {
  
  function handleChangeInput(e){
    setStateInput(
      {
        ...stateInput,
        value: e.target.value
      }
    )
  }

  const validationInput = ()=>{
    if (expressionReg){
      if(expressionReg.test(stateInput.value)){
        setStateInput({...stateInput, validate: "true"})

      }
      else {
        setStateInput({...stateInput, validate: "false"})

      }
    }
  }
  
  
  return (
    <div>
          <Label htmlFor={htmlfor} valido={stateInput.validate}>{title}</Label>
          <GrupoInput >
            <InputForm 
              placeholder={placeholder}
              type={type} 
              value={stateInput.value}
              name= {name}
              onChange={handleChangeInput}  
              id={htmlfor} 
              onKeyUp={validationInput}
              onBlur={validationInput}
              valido= {stateInput.validate}
            />
            
            <CustomError valido= {stateInput.validate}>{customError}</CustomError>
          </GrupoInput>
        </div>
  )
}

export default Input


