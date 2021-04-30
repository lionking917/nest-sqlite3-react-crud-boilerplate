import { GET_MESSAGES, ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from './types'
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const getMessages = () => {
    return async (dispatch) => {
        axios.get(`${apiUrl}/messages`)
        .then(response => {
            return response.data
        })
        .then(data => {
            dispatch({
                type: GET_MESSAGES,
                payload: {
                    messages: data,
                    error: null
                }
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: GET_MESSAGES,
                payload: {
                    messages: [],
                    error
                }
            })
        })
    }
}

export const addMessage = (data) => {
    return async (dispatch) => {
        axios.post(`${apiUrl}/messages`, data)
        .then(response => {
            return response.data
        })
        .then(data => {
            dispatch({
                type: ADD_MESSAGE,
                payload: {
                    error: null
                }
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: ADD_MESSAGE,
                payload: {
                    error
                }
            })
        })
    }
}

export const updateMessage = (id, data) => {
    return async (dispatch) => {
        axios.put(`${apiUrl}/messages/${id}`, data)
        .then(response => {
            return response.data
        })
        .then(data => {
            dispatch({
                type: UPDATE_MESSAGE,
                payload: {
                    message: data,
                    error: null
                }
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: UPDATE_MESSAGE,
                payload: {
                    message: null,
                    error
                }
            })
        })
    }
}

export const deleteMessage = (id) => {
    return async (dispatch) => {
        axios.delete(`${apiUrl}/messages/${id}`)
        .then(response => {
            dispatch({
                type: DELETE_MESSAGE,
                payload: {
                    error: null
                }
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: DELETE_MESSAGE,
                payload: {
                    error
                }
            })
        })
    }
}