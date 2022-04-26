import {GET_VIDEOGAMES, FILTER_BY_CREATED, NAME_BY_QUERY,
CREATE_NEW_VIDEOGAME,GET_GENRES,
 GET_DETAIL_VIDEOGAME, ORDER_BY_NAME , 
 ORDER_BY_RATING, FILTER_BY_GENRE} from '../actions'

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
        case ORDER_BY_RATING:
            let ratingVideogames = action.payload === 'major'?
            state.videogames.sort((a,b) => b.rating - a.rating ):
            state.videogames.sort((a,b) => a.rating - b.rating );
            return {
                ...state,
                videogames:ratingVideogames
            }
        case FILTER_BY_GENRE:
            const genresVideo = []
            state.allVideogames.forEach
            (v => v.genres.forEach( g => {
        
                if (g.name === action.payload)
                    genresVideo.push(v)
                }
                ) )
            console.log(genresVideo)
            return {
                ...state,
                videogames:action.payload === "Todos" ?state.allVideogames: genresVideo
            }
        default:
            return state
    }
}

export default rootReducer;