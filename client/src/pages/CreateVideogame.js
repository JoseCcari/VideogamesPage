import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getGenres,createNewVideogame} from '../redux/actions'
import Input from '../modules/Input'
import './CreateVideogame.css'

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
    <>
    <div className='botonBack'>
    <Link to="/videogames"> <button>Volver</button></Link>
    </div>
    
    
    <main className='containerForm'>
      
      <h3>Create your Videogame</h3>
      <form action="">
        <Input 

          title = {"Name"} 
          type= {"text"}
          value={input.name}
          name={"name"}
          onchange={handleChangeForm}
          htmlfor={"NameFor"}
          customError={""}
        />
        <Input
          title = {"Description"} 
          type= {"text"}
          value={input.description}
          name={"description"}
          onchange={handleChangeForm}
          htmlfor={"DescriptionFor"}
          customError={""}
        />
        <Input
          title = {"Release Date:"} 
          type= {"text"}
          value={input.releaseDate}
          name={"releaseDate"}
          onchange={handleChangeForm}
          htmlfor={"releaseDateFor"}
          customError={""}
        />

        <Input
          title = {"Rating:"} 
          type= {"text"}
          value={input.rating}
          name={"rating"}
          onchange={handleChangeForm}
          htmlfor={"ratingFor"}
          customError={""}
        />
        <Input
          title = {"Path of Image:"} 
          type= {"text"}
          value={input.image_background}
          name={"image_background"}
          onchange={handleChangeForm}
          htmlfor={"image_backgroundFor"}
          customError={""}
        />
        <div>
          <label>Genres: </label>
          <select onChange={(e)=> handleSelectGenres(e)}>
            {genres.map((g ,i) => (<option key={i} value = {g.name}> {g.name}</option>))}
          </select>
          {input.genres.map((genre,index) =>  
                (
                  <div  key= {index}> 
                    <p>{genre}</p>
                    <button onClick={(e) => handleDeleteGenres(genre)}>X</button>
                  </div>
                )
                )}
        </div>
       {false && <div className="messageError">
                <p>Por favor llena el formulario correctamente!</p>
        </div>}
        <div className='botonCenter'>
          <button type='submit' onClick={(e)=>handleSubmit(e)}>Crear</button>
          <p className='messageSuccess'>El formulario se envió exitosamente!</p>
        </div>
        
        
      </form>
      

    </main>

    </>
  )
}

export default CreateVideogame