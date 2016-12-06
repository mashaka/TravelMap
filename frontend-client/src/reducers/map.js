import createReducer from "./../utils/createReducer"
import constants from "../constants"

const { MAP_FETCH_VISITED_REQUEST,
        MAP_FETCH_VISITED_FAILURE,
        MAP_FETCH_VISITED_SUCCESS,
        MAP_POST_VISITED_REQUEST,
        MAP_POST_VISITED_FAILURE,
        MAP_POST_VISITED_SUCCESS } = constants

const initialState = {
    visited: []
}

export default createReducer(initialState, {
    [MAP_FETCH_VISITED_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            visited: payload.Countries
        })
    }
})