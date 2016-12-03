import constants from "../constants";
import fetch from "isomorphic-fetch"
import * as errorActions from "./errorsActions"

const {addErrorRespondStatus, errorInHttpRequest} = errorActions;

const { FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_ERROR, FETCH_USER_INFO_SUCCESS, APIURL,
    CHANGE_USER_PASSWORD_REQUEST, CHANGE_USER_PASSWORD_FAILURE, CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_EMAIL_REQUEST, CHANGE_USER_EMAIL_FAILURE, CHANGE_USER_EMAIL_SUCCESS, RESET_USER_STATE } = constants;

export function loadUserInfo(token) {
    return function( dispatch ) {
        dispatch( { type: FETCH_USER_INFO_REQUEST } );
        return fetch(APIURL + "/information", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: {
                "Id": token
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    dispatch(addErrorRespondStatus(response.status));
                    return null;
                }
                return response.json();
            })
            .then(response => {
                if (!response) {
                    dispatch( { type: FETCH_USER_INFO_ERROR } );
                    dispatch(errorInHttpRequest({Message: "Error"}));
                } else {
                    console.log( response );
                    dispatch( {type: FETCH_USER_INFO_SUCCESS, payload: response })
                }
            });
    }
}

export function changePassword( token, oldPassword, newPassword ) {
    return function( dispatch ) {
        dispatch( { type: CHANGE_USER_PASSWORD_REQUEST } );
        return fetch(APIURL + "/password", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({old: oldPassword, new: newPassword})
        })
            .then(response => {
                if( response.status === 201 ) {
                    dispatch( { type: CHANGE_USER_PASSWORD_SUCCESS } );
                    return null;
                } else {
                    dispatch(addErrorRespondStatus(response.status));
                    return response.json();
                }
            })
            .then(response => {
                if( response && response["accessToken"] ) {
                    dispatch( { type: CHANGE_USER_PASSWORD_FAILURE } );
                    dispatch( errorInHttpRequest(response) );
                }
            });
    }
}

export function changeEmail( token, newEmail ) {
    return function( dispatch ) {
        dispatch( { type: CHANGE_USER_EMAIL_REQUEST } );
        return fetch(APIURL + "/password", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({email: newEmail})
        })
            .then(response => {
                if( response.status === 201 ) {
                    dispatch( { type: CHANGE_USER_EMAIL_SUCCESS } );
                    return null;
                } else {
                    dispatch(addErrorRespondStatus(response.status));
                    return response.json();
                }
            })
            .then(response => {
                if( response && response["accessToken"] ) {
                    dispatch( { type: CHANGE_USER_EMAIL_FAILURE } );
                    dispatch( errorInHttpRequest(response) );
                }
            });
    }
}

export function resetState() {
    return {
        type: RESET_USER_STATE
    }
}