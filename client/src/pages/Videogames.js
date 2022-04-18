import React , {useState , useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {getVideogames,filterByCreated} from '../redux/actions'
import {Link} from 'react-router-dom'
import  Button from '../modules/Button'
import  Card from '../modules/Card'
import Paginated from '../modules/Paginated'


function Videogames() {
    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> state.videogames)
    useEffect( ()=>{
        dispatch( getVideogames() )
    }, [])

    const [currentPage, setCurrentPage]= useState(1);
    const [videogamesPerPage, setVideogamesPerPage]= useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame);

    const paginated = (numberPage)=>{
        setCurrentPage(numberPage);
    }

    function handleClick(event) {
        event.preventDefault();
        dispatch( getVideogames());
    }
    function handleClickCreated(event) {
        dispatch( filterByCreated(event.target.value));
    }
    
    return (
    <div>
        <Link to= '/CreateVideogame' > Create Videogame</Link>
        <Button nameButton="refresh" handleClick= {handleClick}/>
        {/* input de busqueda por videojuego */}
        <select >
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
        </select>
        <select onChange={ (e)=> handleClickCreated(e)} >
            <option value="All">Todos</option>
            <option value="Created">Creados</option>
            <option value="Api">Api</option>
        </select>

        <div>
            <Paginated
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginated={paginated}
            />
        {
            currentVideogames?.map( (v)=> {
                    return (
                    <Card 
                        key={v.id} 
                        name={v.name} 
                        image_background={v.background_image} 
                        genres= {v.genres.map ((g , index) => (<p key = {index}> {g.name} </p>))}
                    />)
                }
            )
        }
        </div>
    </div>
  )
}

export default Videogames