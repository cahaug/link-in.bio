import axios from 'axios'

//Action Types
export const REGISTER_USER_START = 'REGISTER_USER_START'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'

export const LOGIN_USER_START = 'LOGIN_USER_START'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'

export const CREATE_LIST_START = 'CREATE_LIST_START'
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS'
export const CREATE_LIST_FAILED = 'CREATE_LIST_FAILED'

export const ADD_ENTRY_START = 'ADD_ENTRY_START'
export const ADD_ENTRY_SUCCESS = 'ADD_ENTRY_SUCCESS'
export const ADD_ENTRY_FAILED = 'ADD_ENTRY_FAILED'

export const EDIT_ENTRY_START = 'EDIT_ENTRY_START'
export const EDIT_ENTRY_SUCCESS = 'EDIT_ENTRY_SUCCESS'
export const EDIT_ENTRY_FAILED = 'EDIT_ENTRY_FAILED'

export const UPDATE_ENTRY_START = 'UPDATE_ENTRY_START'
export const UPDATE_ENTRY_SUCCESS = 'UPDATE_ENTRY_SUCCESS'
export const UPDATE_ENTRY_FAILED = 'UPDATE_ENTRY_FAILED'

export const DELETE_ENTRY_START = 'DELETE_ENTRY_START'
export const DELETE_ENTRY_SUCCESS = 'DELETE_ENTRY_SUCCESS'
export const DELETE_ENTRY_FAILED = 'DELETE_ENTRY_FAILED'

export const GET_LIST_ID_START = 'GET_LIST_ID_START'
export const GET_LIST_ID_SUCCESS = 'GET_LIST_ID_SUCCESS'
export const GET_LIST_ID_FAILED = 'GET_LIST_ID_FAILED'

//Action Creators
export function register(email, password, firstName, lastName, profilePictureURL){
    return (dispatch) => {
        dispatch({type: REGISTER_USER_START})
        return axios.post('https://link-in-bio.herokuapp.com/auth/register', { email, password, firstName, lastName, profilePictureURL} )
        .then((res) => {
            const payload = res.data
            console.log('registration payload', payload)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('firstName', res.data.firstName)
            localStorage.setItem('profilePictureURL', res.data.profilePictureURL)
            return axios.post('https://link-in-bio.herokuapp.com/l/new', {'userId':res.data.userId, 'backColor':'#ffffff','txtColor':'#000000', 'fontSelection':'Roboto',})
            .then((res) => {
                console.log('res after create list after register', res)
                localStorage.setItem('listId', res.data.listId)
                console.log('getting saved item?', localStorage.getItem('listId'))
                console.log('listId', res.data.listId)
                console.log('typeof listId', typeof res.data['listId'])
                // const payload2 = {...payload, listId: res.data.listId}
                alert('User Registration Complete, Try Logging in now!')
                dispatch({type:REGISTER_USER_SUCCESS, payload})
                // const newURL = 'https://link-in.bio/dashboard'
                // window.location.href(newURL)
                console.log('end of code')
            })
            .catch((err) => {
                dispatch({type:REGISTER_USER_FAILED, payload:err})
            })
        })    
        .catch((err) => {
            dispatch({type:REGISTER_USER_FAILED, payload:err})
        })
    }
}

export function login(email, password){
    return (dispatch) => {
        dispatch({type: LOGIN_USER_START})
        return axios.post('https://link-in-bio.herokuapp.com/auth/login', { email, password })
        .then((res) => {
            const payload = res.data
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('firstName', res.data.firstName)
            // console.log(res.data.token,'LOG IS HERE <---')
            dispatch({type: LOGIN_USER_SUCCESS, payload})
        })
        .catch((res) => {
            const payload = res.response ? res.response.data : res
            dispatch({type: LOGIN_USER_FAILED, payload})
            console.log(res,'LOG IS HERE <---')
        })
    }
}

export function createList(userId, backColor, txtColor, fontSelection){
    return (dispatch) => {
        dispatch({type: CREATE_LIST_START})
        return axios.post('https://link-in-bio.herokuapp.com/l/new', { userId, backColor, txtColor, fontSelection })
        .then((res) => {
            localStorage.setItem('listId', res.data.listId)
            dispatch({type: CREATE_LIST_SUCCESS, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: CREATE_LIST_FAILED, payload:err})
        })
    }
}

export function addEntry(userId, listId, referencingURL, description, linkTitle, imgURL){
    return (dispatch) => {
        dispatch({type: ADD_ENTRY_START})
        return axios.post('https://link-in-bio.herokuapp.com/e/new', { userId, listId, referencingURL, description, linkTitle, imgURL })
        .then((res) => {
            console.log('addEntry res.data.message', res.data.message);
            console.log('addEntry res.data', res.data);

            const useThisURL = `https://link-in-bio.herokuapp.com/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`
            return axios.get(useThisURL)
            .then((res) => {
                console.log('statsRes', res)
                alert('Entry added successfully, Try Returning to Your Dashboard and Refreshing the Page')
                dispatch({type: ADD_ENTRY_SUCCESS, payload:res.data})
            })
        })
        .catch((err) => {
            dispatch({type: ADD_ENTRY_FAILED, payload:err})
        })
    }
}

export function editEntry(entryId, referencingURL, description, linkTitle, imgURL){
    return (dispatch) => {
        dispatch({type: EDIT_ENTRY_START})
        return axios.put('https://link-in-bio.herokuapp.com/e/replaceEntry', {entryId, referencingURL, description, linkTitle, imgURL})
        .then((res) => {
            console.log('editEntry res.data', res.data)
            alert('Entry Edited Successfully')
            dispatch({type: EDIT_ENTRY_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            dispatch({type: EDIT_ENTRY_FAILED, payload:err})
        })
    }
}

export function getListId(userId){
    return (dispatch) => {
        dispatch({type: GET_LIST_ID_START})
        return axios.get(`https://link-in-bio.herokuapp.com/l/${userId}`)
        .then((res) => {
            dispatch({type:GET_LIST_ID_SUCCESS, payload: res.data})
        })
        .catch((err) => {
            dispatch({type:GET_LIST_ID_FAILED, payload:err})
        })
    }
}