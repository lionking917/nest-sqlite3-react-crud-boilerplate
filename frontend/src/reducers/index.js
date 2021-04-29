import { combineReducers } from 'redux';
import { GET_MESSAGES, ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../actions/types';

const initialState = {
    messages: [],
    message: null,
    error: null
}

function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {...state, messages: action.payload.messages, error: action.payload.error}
        case ADD_MESSAGE:
            return {...state, error: action.payload.error};
        case UPDATE_MESSAGE:
            return {...state, message: action.payload.message, error: action.payload.error}
        case DELETE_MESSAGE:
            return {...state, error: action.payload.error}
        default:
            return state;
    }
}

export default combineReducers({
    message: messagesReducer,
});