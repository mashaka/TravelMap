import constants from "../constants"
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import * as errorActions from "./errorsActions"

const {addErrorRespondStatus, errorInHttpRequest} = errorActions;

const { APIURL, LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
    SIGNUP_USER_REQUEST, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS, UPDATE_USER_INFO_PASSWORD_REQUEST,
    UPDATE_USER_INFO_PASSWORD_FAILURE, UPDATE_USER_INFO_PASSWORD_SUCCESS } = constants;

export function loginUserSuccess( token, nickName ) {
    localStorage.setItem( "auth", JSON.stringify({ "token": token, "nickName": nickName }) );
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            nickName: nickName
        }
    }
}

export function loginUserFailure() {
    localStorage.removeItem( "auth" );
    return {
        type: LOGIN_USER_FAILURE
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function logout() {
    localStorage.clear();
    return {
        type: LOGOUT_USER
    }
}


export function loginUser( login, password ) {
    return function( dispatch ) {
        dispatch( loginUserRequest() );
        fetch(APIURL + "/tokens/access", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({login: login, password: password})
        })
            .then(response => {
                if( response.status !== 201 ) {
                    dispatch(addErrorRespondStatus(response.status));
                }
                return response;
            })
            .then(response => response.json())
            .then(response => {
                if( response["accessToken"] ) {
                    dispatch( push("/") );
                } else {
                    dispatch( loginUserFailure() );
                    dispatch( errorInHttpRequest(response) );
                }
            });
    }
}

export function signUpUserRequest() {
    return {
        type: SIGNUP_USER_REQUEST
    }
}

export function signUpUserSuccess() {
    return {
        type: SIGNUP_USER_SUCCESS
    }
}

export function signUpUserFailure() {
    return {
        type: SIGNUP_USER_FAILURE
    }
}

export function signUpUser( nickName, eMail, password ) {
    return function( dispatch ) {
        dispatch( signUpUserRequest() );
        return fetch(APIURL + "/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({username: nickName, email: eMail, password: password})
        })
        .then(response => {
            if( response.status === 201 ) {
                dispatch( signUpUserSuccess() );
                return null;
            } else {
                dispatch(addErrorRespondStatus(response.status));
                return response.json();
            }
        })
        .then(response => {
            if( response && response["accessToken"] ) {
                dispatch( signUpUserFailure() );
                dispatch( errorInHttpRequest(response) );
            }
        });
    }
}
