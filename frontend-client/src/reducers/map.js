import createReducer from "./../utils/createReducer"
import constants from "../constants"

const { MAP_FETCH_VISITED_REQUEST,
        MAP_FETCH_VISITED_FAILURE,
        MAP_FETCH_VISITED_SUCCESS,
        MAP_POST_VISITED_REQUEST,
        MAP_POST_VISITED_FAILURE,
        MAP_POST_VISITED_SUCCESS,
        MAP_FETCH_RECOMMENDED_REQUEST,
        MAP_FETCH_RECOMMENDED_FAILURE,
        MAP_FETCH_RECOMMENDED_SUCCESS,
        MAP_FETCH_DISTRIBUTION_REQUEST,
        MAP_FETCH_DISTRIBUTION_FAILURE,
        MAP_FETCH_DISTRIBUTION_SUCCESS } = constants

const initialState = {
    visited: [],
    recommended: {},
    distribution: {}
}

export default createReducer(initialState, {
    [MAP_FETCH_VISITED_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            visited: payload.Countries
        })
    },
    [MAP_FETCH_RECOMMENDED_SUCCESS]: (state, payload) => {
        console.log('MAP_FETCH_RECOMMENDED_SUCCESS', payload)
        return Object.assign({}, state, {
            recommended: payload.Countries
        })
    },
    [MAP_FETCH_DISTRIBUTION_SUCCESS]: (state, payload) => {
        console.log('MAP_FETCH_DISTRIBUTION_SUCCESS', payload)
        return Object.assign({}, state, {
            distribution: payload
        })
    }
})