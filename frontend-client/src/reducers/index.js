import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from "./auth"
import errors from "./errors"
import user from "./user"
import signup from "./signup"

export default combineReducers({
    routing: routerReducer,
    auth: auth,
    errors: errors,
    user: user,
    signup: signup
});
