import createReducer from "./../utils/createReducer"
import constants from "../constants"

const { ADD_HTTP_ERROR_RESPOND_STATUS, ADD_RESPOND_ERROR_MESSAGE_AND_CODE } = constants;

const initialState = {
    status: null,
    message: null
};

export default createReducer(initialState, {
    [ADD_HTTP_ERROR_RESPOND_STATUS]: (state, payload) => {
        return Object.assign({}, state, {
            status: payload.status
        })
    },
    [ADD_RESPOND_ERROR_MESSAGE_AND_CODE]: (state, payload) => {
        return Object.assign({}, state, {
            message: payload.message
        })
    }
})