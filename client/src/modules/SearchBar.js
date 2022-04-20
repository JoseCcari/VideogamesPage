import React ,{useState } from 'react'
import {useDispatch} from 'react-redux'
import {getNameVideogames} from '../redux/actions'

function SearchBar() {

    const [name, setName] = useState("");
    const dispatch = useDispatch()

    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogames(name));
    }

  return (
    <div>
        <input 
            type="text" 
            placeholder='Buscar videogame ...'
            onChange={(e) => handleInputChange(e)}
        />
        <button 
            type='submit'
            onClick={(e)=> handleSubmit(e)}   
        >Buscar </button>
    </div>
  )
}

export default SearchBar