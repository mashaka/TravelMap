import createReducer from "./../utils/createReducer"
import constants from "../constants";

const { FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_ERROR, FETCH_USER_INFO_SUCCESS,
    CHANGE_USER_PASSWORD_REQUEST, CHANGE_USER_PASSWORD_FAILURE, CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_EMAIL_REQUEST, CHANGE_USER_EMAIL_FAILURE, CHANGE_USER_EMAIL_SUCCESS, RESET_USER_STATE } = constants;

const initialState = {
    isProfileLoading: false,
    isProfileLoaded: false,
    loadingProfileError: false,
    changingPassword: false,
    errorChangingPassword: false,
    changingPasswordSuccess: false,
    changingEmail: false,
    errorChangingEmail: false,
    changingEmailSuccess: false,
    email: null,
    locale: null,
    gender: null,
    age: null
};

export default createReducer( initialState, {
    [RESET_USER_STATE] : (state, payload) => {
        return initialState;
    },
    [FETCH_USER_INFO_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isProfileLoading: true,
            isProfileLoaded: false,
            loadingProfileError: false
        })
    },
    [FETCH_USER_INFO_ERROR]: (state, payload) => {
        return Object.assign({}, state, {
            isProfileLoading: false,
            isProfileLoaded: false,
            loadingProfileError: true
        })
    },
    [FETCH_USER_INFO_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isProfileLoading: false,
            isProfileLoaded: true,
            loadingProfileError: false,
            email: payload.Email,
            locale: payload.Locale,
            gender: payload.Gender,
            age: payload.Age
        })
    },
    [CHANGE_USER_PASSWORD_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            changingPassword: true,
            errorChangingPassword: false,
            changingPasswordSuccess: false
        })
    },
    [CHANGE_USER_PASSWORD_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            changingPassword: false,
            errorChangingPassword: true,
            changingPasswordSuccess: false
        })
    },
    [CHANGE_USER_PASSWORD_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            changingPassword: false,
            errorChangingPassword: false,
            changingPasswordSuccess: true
        })
    },
    [CHANGE_USER_EMAIL_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            changingEmail: true,
            errorChangingEmail: false,
            changingEmailSuccess: false
        })
    },
    [CHANGE_USER_EMAIL_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            changingEmail: false,
            errorChangingEmail: true,
            changingEmailSuccess: false
        })
    },
    [CHANGE_USER_EMAIL_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            changingEmail: false,
            errorChangingEmail: false,
            changingEmailSuccess: true
        })
    }
});