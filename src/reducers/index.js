//Action Imports
import {
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    CREATE_LIST_START,
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAILED,
    ADD_ENTRY_START,
    ADD_ENTRY_SUCCESS,
    ADD_ENTRY_FAILED,
    EDIT_ENTRY_START,
    EDIT_ENTRY_SUCCESS,
    EDIT_ENTRY_FAILED,
    UPDATE_ENTRY_START,
    UPDATE_ENTRY_SUCCESS,
    UPDATE_ENTRY_FAILED,
    DELETE_ENTRY_START,
    DELETE_ENTRY_SUCCESS,
    DELETE_ENTRY_FAILED,
    GET_LIST_ID_START,
    GET_LIST_ID_SUCCESS,
    GET_LIST_ID_FAILED
} from '../actions/'

//Initial State Object
const initialState = {

}

//The Single Reducer for the Whole Application
export const reducer = (state=initialState, action) => {
    switch(action.type){
        case REGISTER_USER_START:
            return {
                ...state,
                isLoading:true,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                payload: action.payload,
                // payload2:action.payload2,
                errorMessage: null,
            }
        case REGISTER_USER_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload,
            }
        case LOGIN_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                payload: action.payload,
                errorMessage: null,
                loggedUser: action.payload
            }
        case LOGIN_USER_FAILED:
            return {
                ...state, 
                isLoading:false,
                errorMessage: action.payload,
            }
        case CREATE_LIST_START:
            return {
                ...state,
                isLoading:true,
        }
        case CREATE_LIST_SUCCESS:
            return {
                ...state,
                isLoading:false,
                errorMessage: null,
            }
        case CREATE_LIST_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload,
        }
        case ADD_ENTRY_START:
            return {
                ...state,
                isLoading:true,
        }
        case ADD_ENTRY_SUCCESS:
            return {
                ...state,
                isLoading:false,
                errorMessage: null,
            }
        case ADD_ENTRY_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload,
            }
        case EDIT_ENTRY_START:
            return {
                ...state,
                isLoading:true,
            }
        case EDIT_ENTRY_SUCCESS:
            return {
                ...state,
                isLoading:false,
                errorMessage:null,
                successMessage:action.payload,
            }
        case EDIT_ENTRY_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage:action.payload,
            }
        case UPDATE_ENTRY_START:
            return {
                ...state,
                isLoading:true,
            }
        case UPDATE_ENTRY_SUCCESS:
            return {
                ...state,
                isLoading:false,
                errorMessage:null,
                successMessage:action.payload,
            }
        case UPDATE_ENTRY_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload
            }
        case DELETE_ENTRY_START:
            return {
                ...state,
                isLoading:true,
            }
        case DELETE_ENTRY_SUCCESS:
            return {
                ...state,
                isLoading:false,
            }
        case DELETE_ENTRY_FAILED:
            return {
                ...state,
                isLoading:false,
                error: action.payload,
            }
        case GET_LIST_ID_START:
            return {
                ...state,
                isLoading:true,
            }
        case GET_LIST_ID_SUCCESS:
            return {
                ...state,
                isLoading:false,
                payload: action.payload
            }
        case GET_LIST_ID_FAILED:
            return {
                ...state,
                isLoading:false,
                error: action.payload
            }
        default:
            return state
    }
}