import {GET_VIDEOGAMES, FILTER_BY_CREATED} from '../actions'

const initialState = {
    videogames : [],
    allVideogames: []
    
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

        default:
            return state
    }
}

export default rootReducer;