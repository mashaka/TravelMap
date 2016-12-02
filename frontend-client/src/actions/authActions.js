import constants from "../constants"
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import * as errorActions from "./errorsActions"

const {addErrorRespondStatus, errorInHttpRequest} = errorActions;

const { APIURL, LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
    SIGNUP_USER_REQUEST, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS } = constants;

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

export function signUpUser( nickName, eMail, password, locale, gender, birthday, birthmonth, birthyear ) {
    return function( dispatch ) {
        dispatch( signUpUserRequest() );
        return fetch(APIURL + "/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({Login: nickName, Email: eMail, Password: password, Locale: locale, Gender: gender,
                BirthDay: birthday, BirthMonth: birthmonth, BirthYear: birthyear })
        })
        .then(response => {
            if( response.status === 200 ) {
                dispatch( signUpUserSuccess() );
            } else {
                dispatch(addErrorRespondStatus(response.status));
            }
            return response.json();
        })
        .then(response => {
            if( response["Id"] ) {
                dispatch( loginUserSuccess( response["Id"], nickName ) );
                dispatch( push("/map") );
            } else {
                dispatch( signUpUserFailure() );
                dispatch( errorInHttpRequest( response ) );
            }
        });
    }
}
