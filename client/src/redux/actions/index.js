import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'


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