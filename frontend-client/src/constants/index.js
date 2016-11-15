import createConstants from "../utils/createConstants"

export default Object.assign({},
    createConstants(
        // Login actions
        "LOGIN_USER_REQUEST",
        "LOGIN_USER_FAILURE",
        "LOGIN_USER_SUCCESS",
        "LOGOUT_USER",

        //Signup actings
        "SIGNUP_USER_REQUEST",
        "SIGNUP_USER_FAILURE",
        "SIGNUP_USER_SUCCESS",

        // User profile actions
        "FETCH_USER_INFO_REQUEST",
        "FETCH_USER_INFO_ERROR",
        "FETCH_USER_INFO_SUCCESS",
        "CHANGE_USER_PASSWORD_REQUEST",
        "CHANGE_USER_PASSWORD_FAILURE",
        "CHANGE_USER_PASSWORD_SUCCESS",
        "CHANGE_USER_EMAIL_REQUEST",
        "CHANGE_USER_EMAIL_FAILURE",
        "CHANGE_USER_EMAIL_SUCCESS",
        "RESET_USER_STATE",

        //Signup form actions
        "SIGNUP_CHOOSE_GENDER",
        "SIGNUP_CHOOSE_BIRTHDATE"
    ),
    {
        // Root api url
        APIURL: null // waiting for backend
    });