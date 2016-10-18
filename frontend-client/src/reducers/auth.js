import createReducer from "./../utils/createReducer"
import constants from "../constants";

const { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
    SIGNUP_USER_REQUEST, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS}
    = constants;


const initialState = {
    // Main auth information
    token: null,
    nickName: null,
    // Auth status flags for signin/signup components
    isAuthenticating: false,
    isAuthenticated: false,
    // Password update for settings components
    updatingPassword: false,
    updatedPassword: false,
    // Error flag to detect showing error
    errorWhileAuthenticating: false
};

export default createReducer(initialState,
    {
        [LOGIN_USER_REQUEST]: (state, payload) => {
            return Object.assign({}, state, {
                isAuthenticating: true,
                errorWhileAuthenticating: false
            });
        },
        [LOGIN_USER_SUCCESS]: (state, payload) => {
            return Object.assign({}, state, {
                token: payload.token,
                nickName: payload.nickName,
                isAuthenticating: false,
                isAuthenticated: true,
                statusText: null,
                errorWhileAuthenticating: false
            });
        },
        [LOGIN_USER_FAILURE]: (state, payload) => {
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                errorWhileAuthenticating: true
            });
        },
        [LOGOUT_USER]: (state, payload) => {
            return Object.assign({}, state, {
                inAuthenticating: false,
                isAuthenticated: false,
                token: null,
                statusText: null,
                errorWhileAuthenticating: false
            });
        },
        [SIGNUP_USER_REQUEST]: (state, payload) => {
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
                errorWhileAuthenticating: false
            });
        },
        [SIGNUP_USER_SUCCESS]: (state, payload) => {
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                errorWhileAuthenticating: false
            });
        },
        [SIGNUP_USER_FAILURE]: (state, payload) => {
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                errorWhileAuthenticating: true
            });
        }
    }
);