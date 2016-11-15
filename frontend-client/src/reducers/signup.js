import createReducer from "./../utils/createReducer"
import constants from "../constants"

let { SIGNUP_CHOOSE_GENDER, SIGNUP_CHOOSE_BIRTHDATE } = constants;

const initialState = {
    gender: null,
    birthdate: null
};

export default createReducer( initialState, {
    [SIGNUP_CHOOSE_GENDER]: (state, payload) => {
        return Object.assign({}, state, {
            gender: payload.gender
        });
    },
    [SIGNUP_CHOOSE_BIRTHDATE]: (state, payload) => {
        return Object.assign({}, state, {
            birthdate: payload.birthdate
        });
    }
});
