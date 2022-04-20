import {GET_VIDEOGAMES, FILTER_BY_CREATED, NAME_BY_QUERY,
CREATE_NEW_VIDEOGAME,GET_GENRES,
 GET_DETAIL_VIDEOGAME, ORDER_BY_NAME} from '../actions'

const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: []
    
}

function rootReducer( state = initialState , action){
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload

            }
        case FILTER_BY_CREATED:
            const filterCreated = action.payload === 'Created'? 
            state.allVideogames.filter(v => v.createInDatabase):
            state.allVideogames.filter(v => !v.createInDatabase)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames: filterCreated
            }
        case NAME_BY_QUERY:
            return {
                ...state ,
                videogames: action.payload
            }
        case CREATE_NEW_VIDEOGAME:
            return {
                ...state
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_DETAIL_VIDEOGAME:
            return {
                ...state,
                detail: action.payload
            }
        case ORDER_BY_NAME:
            let sortedVideogames = action.payload === "asc"?
            state.videogames.sort((a,b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0

            }):
            state.videogames.sort((a,b) => {
                if (a.name > b.name) return -1
                if (a.name < b.name) return 1
                return 0
            })
        
            return {
                ...state,
                videogames:sortedVideogames

            }
        default:
            return state
    }
}

export default rootReducer;