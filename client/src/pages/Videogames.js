import React , {useState , useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {getVideogames} from '../redux/actions'
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
    const [videogamesPerPage, setVideogamesPerPage]= useState(6);
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
    
    return (
    <div>
        <Link to= '/CreateVideogame' > Create Videogame</Link>
        <Button nameButton="refresh" handleClick= {handleClick}/>
        {/* input de busqueda por videojuego */}
        <select name="sorting" id="">
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
        </select>
        <select name="getters" id="">
            <option value="all">Todos</option>
            <option value="created">Creados</option>
            <option value="get">Api</option>
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