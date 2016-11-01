import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from "./auth"
import errors from "./errors"
import user from "./user"

export default combineReducers({
    routing: routerReducer,
    auth: auth,
    errors: errors,
    user: user
});
