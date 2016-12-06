import constants from "../constants"
import fetch from "isomorphic-fetch"
import * as errorActions from "./errorsActions"

const {addErrorRespondStatus, errorInHttpRequest} = errorActions

const { MAP_FETCH_VISITED_REQUEST,
        MAP_FETCH_VISITED_FAILURE,
        MAP_FETCH_VISITED_SUCCESS,
        MAP_POST_VISITED_REQUEST,
        MAP_POST_VISITED_FAILURE,
        MAP_POST_VISITED_SUCCESS,
        APIURL } = constants

export function fetchVisited(token) {
    return function(dispatch) {
        dispatch({ type: MAP_FETCH_VISITED_REQUEST });
        return fetch(APIURL + "/map", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": token
            }
        }).then(response => {
            if (response.status !== 200) {
                dispatch(addErrorRespondStatus(response.status))
                return null
            }
            return response.json()
        }).then(response => {
            if (!response) {
                dispatch({ type: MAP_FETCH_VISITED_FAILURE })
                dispatch(errorInHttpRequest({ Message: "Error" }))
            } else {
                dispatch({ type: MAP_FETCH_VISITED_SUCCESS, payload: response })
            }
        })
    }
}

export function postVisited(token, code) {
    return function(dispatch) {
        dispatch({ type: MAP_POST_VISITED_REQUEST });
        return fetch(APIURL + "/map/add", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ Countries: [code] })
        }).then(response => {
            if( response.status === 200 ) {
                dispatch({ type: MAP_POST_VISITED_SUCCESS })
                dispatch(fetchVisited(token))
                return null
            } else {
                dispatch(addErrorRespondStatus(response.status))
                return response.json()
            }
        }).then(response => {
            if(response) {
                dispatch({ type: MAP_POST_VISITED_FAILURE });
                dispatch(errorInHttpRequest(response))
            }
        })
    }
}