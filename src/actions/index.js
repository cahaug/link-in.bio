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
export function register(email, password, firstName, lastName, profilePictureURL, referredBy){
    return (dispatch) => {
        dispatch({type: REGISTER_USER_START})
        return axios.post('https://link-in-bio.limited/auth/register', { email, password, firstName, lastName, profilePictureURL, referredBy} )
        .then((res) => {
            const payload = res.data
            // localStorage.setItem('token', res.data.token)
            sessionStorage.setItem('token', res.data.token)
            const token = res.data.token
            // localStorage.setItem('userId', res.data.userId)
            // localStorage.setItem('email', res.data.email)
            // localStorage.setItem('firstName', res.data.firstName)
            // localStorage.setItem('profilePictureURL', res.data.profilePictureURL)
            sessionStorage.setItem('userId', res.data.userId)
            sessionStorage.setItem('email', res.data.email)
            sessionStorage.setItem('firstName', res.data.firstName)
            sessionStorage.setItem('profilePictureURL', res.data.profilePictureURL)
            return axios.post('https://link-in-bio.limited/l/new', {'userId':res.data.userId, 'backColor':'#ffffff','txtColor':'#000000', 'fontSelection':'Roboto',}, { headers: {authorization: res.data.token} })
            .then((res) => {
                // localStorage.setItem('listId', res.data[res.data.length - 1].listId)
                sessionStorage.setItem('listId', res.data[res.data.length - 1].listId)
                const standardEntry = {
                    userId: sessionStorage.getItem('userId'),
                    listId: res.data[res.data.length - 1].listId,
                    referencingURL:'https://link-in.bio/dashboard',
                    description:`Thank You for Choosing Link-In.bio/, Let's Get Started!  Click Add Entry to Add Your First Entry! You can delete this entry after you have added another one to your List.`,
                    linkTitle:'Welcome to Your New List!',
                    imgURL:null,
                }
                const { userId, listId, referencingURL, description, linkTitle, imgURL } = standardEntry
                return axios.post('https://link-in-bio.limited/e/new', { userId, listId, referencingURL, description, linkTitle, imgURL }, { headers: {authorization: token} })
                .then((res) => {
                    console.log('create newList Std Entry', res.data)
                    const useThisURL = `https://link-in-bio.limited/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`
                    return axios.get(useThisURL)
                    .then((res) => {
                        alert('User Registration Complete, Try Logging in now!')
                        dispatch({type:REGISTER_USER_SUCCESS, payload})
                    })
                })
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

export function login(email, password, token){
    return (dispatch) => {
        dispatch({type: LOGIN_USER_START})
        return axios.post('https://link-in-bio.limited/auth/login', { email, password, token })
        .then(async (res) => {
            const payload = res.data
            // localStorage.setItem('token', res.data.token)
            // localStorage.setItem('userId', res.data.userId)
            // localStorage.setItem('email', res.data.email)
            // localStorage.setItem('firstName', res.data.firstName)
            sessionStorage.setItem('user_hash', res.data.userHash)
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('userId', res.data.userId)
            sessionStorage.setItem('email', res.data.email)
            sessionStorage.setItem('firstName', res.data.firstName)
            sessionStorage.setItem('customURL', res.data.customURL)
            const listIdHolder = await axios.get(`https://link-in-bio.limited/l/list4user/${res.data.userId}`)
            sessionStorage.setItem('listId', listIdHolder.data[0].listId)
            dispatch({type: LOGIN_USER_SUCCESS, payload})
        })
        .catch((res) => {
            const payload = res.response ? res.response.data : res
            dispatch({type: LOGIN_USER_FAILED, payload})
        })
    }
}

export function createList(userId, backColor, txtColor, fontSelection, token){
    return (dispatch) => {
        dispatch({type: CREATE_LIST_START})
        return axios.post('https://link-in-bio.limited/l/new', { userId, backColor, txtColor, fontSelection }, { headers: {authorization: token} })
        .then((res) => {
            const savedReturnList = res.data
            // localStorage.setItem('listId', res.data[res.data.length - 1].listId)
            sessionStorage.setItem('listId', res.data[res.data.length - 1].listId)
            const standardEntry = {
                userId: sessionStorage.getItem('userId'),
                listId: res.data[res.data.length - 1].listId,
                referencingURL:'https://link-in.bio/dashboard',
                description:`Thank You for Choosing Link-In.bio/, Let's Get Started!  Click Add Entry to Add Your First Entry! You can delete this entry after you have added another one to your List.`,
                linkTitle:'Welcome to Your New List!',
                imgURL:null,
            }
            const { userId, listId, referencingURL, description, linkTitle, imgURL } = standardEntry
            return axios.post('https://link-in-bio.limited/e/new', { userId, listId, referencingURL, description, linkTitle, imgURL }, { headers: {authorization: token}})
            .then((res) => {
                const useThisURL = `https://link-in-bio.limited/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`
                return axios.get(useThisURL)
                .then((res) => {
                    alert('List Created Successfully, Try Returning to Your Dashboard and Refreshing the Page')
                    // dispatch({type: ADD_ENTRY_SUCCESS, payload:res.data})
                    dispatch({type: CREATE_LIST_SUCCESS, payload: savedReturnList})
                })
            })
        })
        .catch((err) => {
            dispatch({type: CREATE_LIST_FAILED, payload:err})
        })
    }
}

export function addEntry(userId, listId, referencingURL, description, linkTitle, imgURL, token, shackImageId){
    return (dispatch) => {
        dispatch({type: ADD_ENTRY_START})
        return axios.post('https://link-in-bio.limited/e/new', { userId, listId, referencingURL, description, linkTitle, imgURL, shackImageId }, { headers: {authorization: token} })
        .then((res) => {
            const useThisURL = `https://link-in-bio.limited/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`
            return axios.get(useThisURL)
            .then((res) => {
                alert('Success')
                dispatch({type: ADD_ENTRY_SUCCESS, payload:res.data})
            })
        })
        .catch((err) => {
            dispatch({type: ADD_ENTRY_FAILED, payload:err})
        })
    }
}

export function editEntry(entryId, referencingURL, description, linkTitle, imgURL, token, listId){
    return (dispatch) => {
        dispatch({type: EDIT_ENTRY_START})
        return axios.put('https://link-in-bio.limited/e/replaceEntry', {entryId, referencingURL, description, linkTitle, imgURL, listId}, { headers: {authorization: token}})
        .then((res) => {
            alert('Success')
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
        return axios.get(`https://link-in-bio.limited/l/${userId}`)
        .then((res) => {
            dispatch({type:GET_LIST_ID_SUCCESS, payload: res.data})
        })
        .catch((err) => {
            dispatch({type:GET_LIST_ID_FAILED, payload:err})
        })
    }
}