import React , {useState , useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {getVideogames,filterByCreated,orderByName} from '../redux/actions'
import {Link} from 'react-router-dom'
//import  Button from '../modules/Button'
import  Card from '../modules/Card'
import Paginated from '../modules/Paginated'
import SearchBar from '../modules/SearchBar.js'
import './Videogames.css'

function Videogames() {
    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> state.videogames)
    //const [loadingVideogames, setLoadingVideogames] = useState(true)
    useEffect( ()=>{
        dispatch( getVideogames() )
    }, [dispatch])

    const [currentPage, setCurrentPage]= useState(1);
    const [videogamesPerPage, setVideogamesPerPage]= useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame);
    const [orden, setOrden] = useState("")
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
    function handleSortVideogames (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    return (
    <div className='Home'>
        <div className='navBar'> 
            
            <button  onClick={handleClick}> Refresh </button>
            {/* input de busqueda por videojuego */}
            <select onChange={ (e)=> handleSortVideogames(e)}>
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
            </select>
            <select onChange={ (e)=> handleClickCreated(e)} >
                <option value="All">Todos</option>
                <option value="Created">Creados</option>
                <option value="Api">Api</option>
            </select>
            <SearchBar/>
            <Link to= '/CreateVideogame' > Create Videogame</Link>
        </div>
        <div className='Paginado'>
            <Paginated
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginated={paginated}
            />
        </div>
        <div className='Cards'>
            
           
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