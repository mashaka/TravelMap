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
        "SIGNUP_USER_SUCCESS"
    ),
    {
        // Root api url
        APIURL: null // waiting for backend
    });