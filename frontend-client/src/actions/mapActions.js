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

function authorizedRequestFactory(type, address, token, requestCb, failureCb, successCb, body) {
    return function(dispatch) {
        requestCb(dispatch)
        return fetch(address, {
            method: type,
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": token
            },
            body: body
        }).then(response => {
            if (response.status === 200) {
                response.text().then(function(text) {
                    let data = text === '' ? null : JSON.parse(text)
                    console.log(address, data)
                    successCb(dispatch, data)
                })
            } else {
                failureCb(dispatch)
                dispatch(addErrorRespondStatus(response.status))
                dispatch(errorInHttpRequest({ Message: "Error" }))
            }
        })
    }
}

export function fetchVisited(token) {
    return authorizedRequestFactory("GET", APIURL + "/map", token,
        (dispatch) => { dispatch({ type: MAP_FETCH_VISITED_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_FETCH_VISITED_FAILURE }) },
        (dispatch, response) => { dispatch({ type: MAP_FETCH_VISITED_SUCCESS, payload: response }) })
}

export function postVisited(token, code) {
    return authorizedRequestFactory("POST", APIURL + "/map/add", token,
        (dispatch) => { dispatch({ type: MAP_POST_VISITED_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_POST_VISITED_FAILURE }) },
        (dispatch) => { dispatch({ type: MAP_POST_VISITED_SUCCESS })
                        dispatch(fetchVisited(token)) }, JSON.stringify({ Countries: [code] }))
}

export function fetchRecommended(token) {
    return authorizedRequestFactory("GET", APIURL + "/map/recommended", token,
        (dispatch) => { dispatch({ type: MAP_FETCH_RECOMMENDED_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_FETCH_RECOMMENDED_FAILURE }) },
        (dispatch, response) => { dispatch({ type: MAP_FETCH_RECOMMENDED_SUCCESS, payload: response }) })
}

export function fetchDistribution(token, filter) {
    let convertSex = () => {
        if(filter.male && filter.female) {
            return "ANY"
        } else if(filter.male) {
            return "male"
        } else if(filter.female) {
            return "female"
        } else {
            return null
        }
    }
    let sex = convertSex()
    let body = {
        StartAge: filter.age[0],
        FinishAge: filter.age[1],
        Gender: sex
    }
    return authorizedRequestFactory("POST", APIURL + "/map/distribution", token,
        (dispatch) => { dispatch({ type: MAP_FETCH_DISTRIBUTION_REQUEST }) },
        (dispatch) => { dispatch({ type: MAP_FETCH_DISTRIBUTION_FAILURE }) },
        (dispatch, response) => { dispatch({ type: MAP_FETCH_DISTRIBUTION_SUCCESS, payload: response }) }, JSON.stringify(body))
}