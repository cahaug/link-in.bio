import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'

const UpdateCancelURLs = () => {
    const [updateURL, setUpdateURL] = useState('')
    const [cancelURL, setCancelURL] = useState('')
    
    const getThoseURLs = () => {
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        console.log('token, userId', token, userId)
        return axios.post('https://www.link-in-bio.app/numbers/out', {userId:userId}, {headers:{authorization:token}})
        .then(res => {
            console.log('res.data', res.data)
            setUpdateURL(res.data[0].updateURL)
            setCancelURL(res.data[0].cancelURL)
        })
        .catch(err => {
            console.log('err', err)
            toast.error('Error Locating Your Update & Cancel URLs')
        })
    }

    useEffect(() => {
        getThoseURLs()
    })

    return (
        <div>
            <br />
            <p>{updateURL === ''? 'Loading Your Update URL':<a href={updateURL||'#'}>Click Here to Edit Your Payment Information</a>}</p>
            <br />
            <p>{cancelURL === ''? 'Loading Your Cancel URL':<a href={cancelURL||'#'}>(Warning: cannot be undone) <br /> Click Here to Permanently Delete Your Account</a>}</p>
        </div>
    )
}

export default UpdateCancelURLs