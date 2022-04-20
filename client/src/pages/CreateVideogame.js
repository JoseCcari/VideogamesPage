import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getGenres,createNewVideogame} from '../redux/actions'
function CreateVideogame() {
  const dispatch= useDispatch()
  const genres = useSelector ( (state) => state.genres)
  const [input, setInput] = useState( {
    name: "",
    description: "",
    releaseDate: "",
    image_background: "",
    rating: "",
    genres: []
  }) 

  useEffect( ()=> {
    dispatch(getGenres())
  }, [])

  function handleChangeForm(e){
    setInput(
      {
        ...input,
        [e.target.name]: e.target.value
      }
    )
  }

  function handleSelectGenres (e){
    setInput({
      ...input,
      genres:[...input.genres,e.target.value]
    })
  }
  function handleDeleteGenres (g){
    setInput({
      ...input,
      genres: input.genres.filter(el => el !== g)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createNewVideogame(input) )
  }
  return (
    <div>
      <Link to="/videogames"> <button>Volver</button></Link>

      <h1>Create your Videogame</h1>
      <form action="">
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={input.name}
            name= "name"
            onChange={handleChangeForm}  
          />
        </div>

        <div>
          <label>Description:</label>
          <input 
            type="text" 
            value={input.description}
            name= "description"
            onChange={handleChangeForm}  
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input 
            type="date" 
            value={input.releaseDate}
            name= "releaseDate"  
            onChange={handleChangeForm} 
          />
        </div>
        <div>
          <label>Rating:</label>
          <input 
            type="number" 
            value={input.rating}
            name= "rating"
            onChange={handleChangeForm}  
          />
        </div>
        <div>
          <label>Path of Image:</label>
          <input 
            type="number" 
            value={input.image_background}
            name= "image_background"
            onChange={handleChangeForm}  
          />
        </div>
        <select onChange={(e)=> handleSelectGenres(e)}>
          {genres.map((g ,i) => (<option key={i} value = {g.name}> {g.name}</option>))}
        </select>
        {input.genres.map((genre,index) =>  
              (
                <div key= {index}> 
                  <p>{genre}</p>
                  <button onClick={(e) => handleDeleteGenres(genre)}>X</button>
                </div>
              )
              )}
            


        <button onClick={(e)=>handleSubmit(e)}>Crear</button>
      </form>
      

    </div>
  )
}

export default CreateVideogame