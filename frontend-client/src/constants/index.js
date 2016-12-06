import createConstants from "../utils/createConstants"

export default Object.assign({},
    createConstants(
        //Global errors
        "ADD_HTTP_ERROR_RESPOND_STATUS",
        "ADD_RESPOND_ERROR_MESSAGE_AND_CODE",

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
        "SIGNUP_CHOOSE_BIRTHDATE",

        // Map actions.
        "MAP_FETCH_VISITED_REQUEST",
        "MAP_FETCH_VISITED_FAILURE",
        "MAP_FETCH_VISITED_SUCCESS",
        "MAP_POST_VISITED_REQUEST",
        "MAP_POST_VISITED_FAILURE",
        "MAP_POST_VISITED_SUCCESS"
    ),
    {
        // Root api url
        APIURL: "http://travel-map.azurewebsites.net/api"
    });