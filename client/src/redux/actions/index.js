import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const NAME_BY_QUERY = 'NAME_BY_QUERY'
export const CREATE_NEW_VIDEOGAME = 'CREATE_NEW_VIDEOGAME'
export const GET_GENRES = 'GET_GENRES'
export const GET_DETAIL_VIDEOGAME= 'GET_DETAIL_VIDEOGAME'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'

export const getVideogames = () => {
    return  async (dispatch) => {
        const allData = await axios.get("http://localhost:3001/videogames")
            return dispatch(
                {
                    type: GET_VIDEOGAMES,
                    payload: allData.data
                }
            )
    }
}  

export const filterByCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export const getNameVideogames = (name) => {
    return async (dispatch) => {
       try{ 
            const allNames = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type : NAME_BY_QUERY,
                payload: allNames.data
            })
        }
        catch(error){
            console.log(error)
        }
    }   
}

export const getGenres = () => {
    return async (dispatch) => {
       try{ 
            const allGenres = await axios.get("http://localhost:3001/genres")
            return dispatch({
                type : GET_GENRES,
                payload: allGenres.data
            })
        }
        catch(error){
            console.log(error)
        }
    }   
}

export const createNewVideogame = (payload) => {
    return async (dispatch) => {
       try{ 
            const response = await axios.post('http://localhost:3001/videogame',payload)
            return response
        }
        catch(error){
            console.log(error)
        }
    }   
}

export const getDetailVideogame = (id) => {
    return async (dispatch) => {
       try{ 
            const response = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type : GET_DETAIL_VIDEOGAME,
                payload: response.data
            })
        }
        catch(error){
            console.log(error)
        }
    }   
}

export const orderByName= (payload) => {
    return {
        type:ORDER_BY_NAME,
        payload 
    }
}