import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'

function SettingsPanel(){
    const [formData, setFormData] = useState({
        textColor:'',
        backgroundColor:'',
        fontSelection:''
    })

    const onInputChange = event => {
        event.preventDefault()
        setFormData({
            textColor:event.target.value
        })
    }

    const submitTextChange = event => {
        event.preventDefault()
        const txtColor = formData.textColor
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        const userId = sessionStorage.getItem('userId')
        console.log(listId, userId, txtColor)
        return axios.put('https://link-in-bio.herokuapp.com/l/setTcolor', {listId:listId, userId:userId, txtColor:txtColor},  { headers: {authorization: token} })
        .then(res => {
            console.log('textChangeres', res)
            alert('TextColor Updated Successfully')
        })
        .catch(err => {
            console.log('submit catcherror', err)
            alert('error')
        })

    }

    return (
        <div>
            <p>Setting Panel</p>
            <br /> <br />
            <form onSubmit={submitTextChange}>
                <label>
                    Input Custom CSS Color Here (hex or word): <br />
                    <input type="text" value={formData.textColor} onChange={onInputChange} name="TextColor" />
                </label>
                <button type="submit">Submit Change</button>
            </form>
            <a href="/dashboard2" alt="Back to Dashboard">Back to Dashboard</a>
        </div>

    )
}

export default SettingsPanel