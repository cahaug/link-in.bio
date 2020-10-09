import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'
import { SketchPicker } from 'react-color'

// thank you github.com/casesandberg for the lovely react color picker

function SettingsPanel(){
    const [formData, setFormData] = useState({
        textColor:'',
        backgroundColor:'',
        fontSelection:''
    })

    const [color, setColor] = useState()

    const handlethecolorchange = (color) => {setColor(color); setFormData({textColor:color.hex})}

    const onInputChange = event => {
        event.preventDefault()
        setFormData({
            ...formData,
            textColor:event.target.value
        })
    }

    const onBGChange = event => {
        event.preventDefault()
        setFormData({...formData, backgroundColor:event.target.value})
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

    const submitNewBackgroundColor = event => {
        event.preventDefault()
        const backColor = formData.backgroundColor
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        const userId = sessionStorage.getItem('userId')
        console.log(listId, userId, backColor)
        return axios.put('https://link-in-bio.herokuapp.com/l/setBg', {listId:listId, userId:userId, backColor:backColor},  { headers: {authorization: token} })
        .then(res => {
            console.log('bg changed res', res)
            alert('Background Color Updated Successfully')
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
                    Input Custom CSS Text Color Here (hex or word): <br />
                    <input type="text" value={formData.textColor} onChange={onInputChange} name="TextColor" /> <br />
                    <div className="colorPickerHolder">
                        <SketchPicker color={color} onChangeComplete={handlethecolorchange} />
                    </div>
                </label>
                <button type="submit">Submit Text Color Change</button>
                <br /><br />
                <label>
                    Input Custom CSS Background Color Here: <br />
                    <input type="color" value={formData.backgroundColor} onChange={onBGChange} name="BackgroundColor" /> <br />
                    <button type="button" onClick={submitNewBackgroundColor}>Submit Background Change</button>
                </label>
            </form>
            <a href="/dashboard2" alt="Back to Dashboard">Back to Dashboard</a>
        </div>

    )
}

export default SettingsPanel