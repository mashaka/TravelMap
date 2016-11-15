import constants from "../constants";

let { SIGNUP_CHOOSE_GENDER, SIGNUP_CHOOSE_BIRTHDATE } = constants;

export function chooseGender( value ) {
    return {
        type: SIGNUP_CHOOSE_GENDER,
        payload: {
            gender: value
        }
    }
}

export function chooseBirthDate( value ) {
    return {
        type: SIGNUP_CHOOSE_BIRTHDATE,
        payload: {
            birthdate: value
        }
    }
}