import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getGenres,createNewVideogame} from '../redux/actions'
import Input from '../modules/Input'
import './CreateVideogame.css'
import {Formu,ButonCenter, Button, MessageSuccess, MessageError, Label,CustomError} from '../modules/CreateGame'
function CreateVideogame() {
  const dispatch= useDispatch()
  const genres = useSelector ( (state) => state.genres)

    useEffect( ()=> {
      dispatch(getGenres())
    }, [dispatch])

  const [name, setName] = useState({value:"", validate: null})
  const [description, setDescription] = useState({value:"", validate: null})
  const [releaseDate, setReleaseDate] = useState({value:"", validate: null})
  const [image_background, setImage_background] = useState({value:"", validate: null})
  const [rating, setRating] = useState({value: "", validate: null})
  const [genresVideogame, setGenresVideogame] = useState({value:[], validate: "false"})
  const [formularioValido, setFormularioValido] = useState(null)

  const Regx = {
		description: /^(.|\s)*[a-zA-Z]+(.|\s)*$/, // Letras, numeros, guion y guion_bajo
		name: /^[a-zA-ZÀ-ÿ0-9\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
		rating:  /^([0-4]{1}(\.\d{1,2})?|5(.0{1,2})?)$/,
    image: /.*?(\/[\/\w\.]+)[\s\?]?.*/, //Admite barras 
    date: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/ 
	}

  function handleSelectGenres (e){
    if(!genresVideogame.value.includes(e.target.value)){
      setGenresVideogame({
        ...genresVideogame,
        value: [...genresVideogame.value, e.target.value ],
        validate: genresVideogame.value.length>0 ? "true" : "false" 
      })
      
    }
    

   }

   function handleDeleteGenres (game){
    const myGenereDelete = genresVideogame.value.filter(element => element !== game );
    console.log("antes",myGenereDelete)
    setGenresVideogame({
      validate: genresVideogame.validate,
      value:  myGenereDelete
    })
  }

  // function handleDeleteGenres (index){
  //   console.log("antes",myGenereDelete)
  //   console.log("deleted", index)
  //   const myGenereDelete = genresVideogame.value.splice(index, 1);
  //   setGenresVideogame({
  //     ...genresVideogame,
  //     value:  myGenereDelete
  //   }
  //   )
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if(
      name.validate === "true" &&
      description.validate === "true" &&
      releaseDate.validate === "true" &&
      rating.validate === "true" &&
      image_background.validate === "true" &&
      genresVideogame.validate === "true" 
    ){
      setFormularioValido(true)
      setDescription({value: "" , validate: null})
      setReleaseDate({value: "" , validate: null})
      setRating({value: "" , validate: null})
      setImage_background({value: "" , validate: null})
      setImage_background({value: "" , validate: null})
      setGenresVideogame({value: [], validate: null})
      //dispatch(createNewVideogame(input) )
    }
    else{
      setFormularioValido(false)
    }


    
  }


  return (
    <>
    <div className='botonBack'>
    <Link to="/videogames"> <Button>Volver</Button></Link>
    </div>
    
    <main className='containerForm'>
      
      <h3>Create your Videogame</h3>
      <Formu action="">
        <Input 
          placeholder={"Name videogame"}
          title = {"Name"} 
          type= {"text"}
          stateInput={name}
          name={"name"}
          setStateInput={setName}
          htmlfor={"NameFor"}
          customError={"Solo puede contener letras espacios y números, con un mínimo de 2 letras y un máximo de 50 letras!"}
          expressionReg={Regx.name}
        />
        <Input
          placeholder={"Description videogame"}
          title = {"Description"} 
          type= {"text"}
          stateInput={description}
          name={"description"}
          setStateInput={setDescription}
          htmlfor={"DescriptionFor"}
          customError={"Debe contener al menos una letra"}
          expressionReg={Regx.description}
        />
        <Input
          placeholder={"Release Date videogame"}
          title = {"Release Date:"} 
          type= {"date"}
          stateInput={releaseDate}
          name={"releaseDate"}
          setStateInput={setReleaseDate}
          htmlfor={"releaseDateFor"}
          customError={"Ingrese un Mes/Día/Año válido!"}
          expressionReg={Regx.date}
        />

        <Input
          placeholder={"Rating of videogame"}
          title = {"Rating:"} 
          type= {"number"}
          stateInput={rating}
          name={"rating"}
          setStateInput={setRating}
          htmlfor={"ratingFor"}
          customError={"Solo admite números entre 0 a 5 ,enteros o decimales con hasta dos decimales ejemplo 4.32!!"}
          expressionReg={Regx.rating}
        />
        <Input
          placeholder={"http/mygame.com"}
          title = {"Path of Image:"} 
          type= {"text"}
          stateInput={image_background}
          name={"image_background"}
          setStateInput={setImage_background}
          htmlfor={"image_backgroundFor"}
          customError={"Ingrese un path válido"}
          expressionReg={Regx.image}
        />
        <div>
          <Label>Genres: </Label>
          <select onChange={(e)=> handleSelectGenres(e)}>
            {genres.map((g, index ) => (
              <option key= {index} value={g.name}> {g.name}</option>)
            )}
            
          </select>
          {genresVideogame.validate ==="false" && <p className='errorSelect'>Necesita agregar al menos 1 genero!</p>}
          {genresVideogame.value.map((genre, index) =>  
                (
                  <div className='listGenres' key={index} > 
                    <p>{genre}</p>
                    {/* <button onClick={() => {handleDeleteGenres(index)}}>X</button> */}
                    <button onClick={() => {handleDeleteGenres(genre)}}>X</button>
                  </div>
                )
                )}
        </div>
       {formularioValido === false && 
        <MessageError>
                  <p>Por favor llena todo el formulario correctamente!</p>
          </MessageError>}
        <ButonCenter>
          <Button type='submit' onClick={(e)=>handleSubmit(e)}>Crear</Button>
          {formularioValido === true && <MessageSuccess>El formulario se envió exitosamente!</MessageSuccess>}
        </ButonCenter>
        
        
      </Formu>
      

    </main>

    </>
  )
}

export default CreateVideogame