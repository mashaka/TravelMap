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
        MAP_FETCH_RECOMMENDED_REQUEST,
        MAP_FETCH_RECOMMENDED_FAILURE,
        MAP_FETCH_RECOMMENDED_SUCCESS,
        MAP_FETCH_DISTRIBUTION_REQUEST,
        MAP_FETCH_DISTRIBUTION_FAILURE,
        MAP_FETCH_DISTRIBUTION_SUCCESS,
        APIURL } = constants


function authorizedGetRequestFactory(address, token, requestCb, failureCb, successCb) {
    return function(dispatch) {
        requestCb(dispatch)
        return fetch(address, {
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
                failureCb(dispatch)
                dispatch(errorInHttpRequest({ Message: "Error" }))
            } else {
                successCb(dispatch, response)
            }
        })
    }
}

function authorizedPostRequestFactory(address, token, body, requestCb, failureCb, successCb) {
    return function(dispatch) {
        requestCb(dispatch)
        return fetch(address, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": token
            },
            body: body
        }).then(response => {
            if( response.status === 200 ) {
                successCb(dispatch)
                return null
            } else {
                dispatch(addErrorRespondStatus(response.status))
                return response.json()
            }
        }).then(response => {
            if(response) {
                failureCb(dispatch)
                dispatch(errorInHttpRequest(response))
            }
        })
    }
}

export function fetchVisited(token) {
    return authorizedGetRequestFactory(APIURL + "/map", token,
        (dispatch) => { dispatch({ type: MAP_FETCH_VISITED_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_FETCH_VISITED_FAILURE }) },
        (dispatch, response) => { dispatch({ type: MAP_FETCH_VISITED_SUCCESS, payload: response }) })
}

export function postVisited(token, code) {
    return authorizedPostRequestFactory(APIURL + "/map/add", token, JSON.stringify({ Countries: [code] }),
        (dispatch) => { dispatch({ type: MAP_POST_VISITED_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_POST_VISITED_FAILURE }) },
        (dispatch) => { dispatch({ type: MAP_POST_VISITED_SUCCESS })
                        dispatch(fetchVisited(token)) })
}

export function fetchRecommended(token) {
    return authorizedGetRequestFactory(APIURL + "/map/recommended", token,
        (dispatch) => { dispatch({ type: MAP_FETCH_RECOMMENDED_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_FETCH_RECOMMENDED_FAILURE }) },
        (dispatch, response) => { dispatch({ type: MAP_FETCH_RECOMMENDED_SUCCESS, payload: response }) })
}

export function fetchDistribution(token) {
    return authorizedGetRequestFactory(APIURL + "/map/distribution", token,
        (dispatch) => { dispatch({ type: MAP_FETCH_DISTRIBUTION_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_FETCH_DISTRIBUTION_FAILURE }) },
        (dispatch, response) => { dispatch({ type: MAP_FETCH_DISTRIBUTION_SUCCESS, payload: response }) })
}