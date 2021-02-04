import React, { useState } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import '../App.css';
import { SketchPicker } from 'react-color'
import toast from "react-hot-toast";

const TextColorPicker = () => {
    const [color, setColor] = useState()
    const [formData, setFormData] = useState({
        txtColor:'',
    })
    const handlethecolorchange = (color) => {setColor(color); setFormData({txtColor:color.hex})}

    const submitTextChange = (event) => {
        event.preventDefault()
        const txtColor = formData.txtColor
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        const userId = sessionStorage.getItem('userId')
        // console.log(listId, userId, txtColor)
        return axios.put('https://link-in-bio.limited/l/setTcolor', {listId:listId, userId:userId, txtColor:txtColor},  { headers: {authorization: token} })
        .then(res => {
            // console.log('txtChangeres', res)
            // alert('Text Color Updated Successfully')
            toast.success('Text Color Updated Successfully')
        })
        .catch(err => {
            // console.log('submit catcherror', err)
            // alert('Error in Changing Text Color')
            toast.error('Error in Changing Text Color')
        })

    }


    return (
        <div>
            <br /> 
            <p>Text Color Picker</p>
            <br />
            <form onSubmit={submitTextChange}>
                <label>
                    Select your main color, then hit submit: <br />
                    {/* <input type="text" value={formData.txtColor} onChange={onInputChange} name="TextColor" /> <br /> */}
                    <div className="colorPickerHolder">
                        <SketchPicker color={color} onChangeComplete={handlethecolorchange} />
                    </div>
                </label>
                <br />
                <button type="submit">Submit Text Color Change</button>
                <br />
            </form>
        </div>
    )
}

export default TextColorPicker