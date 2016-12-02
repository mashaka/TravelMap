import constants from "../constants"

const { ADD_HTTP_ERROR_RESPOND_STATUS, ADD_RESPOND_ERROR_MESSAGE_AND_CODE } = constants;

export function addErrorRespondStatus( status ) {
    return {
        type: ADD_HTTP_ERROR_RESPOND_STATUS,
        payload: {
            status: status
        }
    }
}

export function errorInHttpRequest( error ) {

    return {
        type: ADD_RESPOND_ERROR_MESSAGE_AND_CODE,
        payload: {
            message: error["Message"]
        }
    }
}