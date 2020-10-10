import React, { useState } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import '../App.css';
import { SketchPicker } from 'react-color'

const BackgroundColorPicker = () => {
  
  const [color, setColor] = useState()
  const [formData, setFormData] = useState({
    backgroundColor:'',
  })
  const handlethecolorchange = (color) => {setColor(color); setFormData({backgroundColor:color.hex})}

  const submitBackgroundChange = (event) => {
    event.preventDefault()
    const backgroundColor = formData.backgroundColor
    const token = sessionStorage.getItem('token')
    const listId = sessionStorage.getItem('listId')
    const userId = sessionStorage.getItem('userId')
    console.log(listId, userId, backgroundColor)
    return axios.put('https://link-in-bio.herokuapp.com/l/setBg', {listId:listId, userId:userId, backColor:backgroundColor},  { headers: {authorization: token} })
    .then(res => {
        console.log('bgChangeres', res)
        alert('Background Color Updated Successfully')
    })
    .catch(err => {
        console.log('submit catcherror', err)
        alert('Error in Changing Background Color')
    })

}


  return (
    <div>
            <br />
            <p>Background Color Picker</p>
            <br />
            <form onSubmit={submitBackgroundChange}>
                <label>
                    Select your accent color, then hit submit: <br />
                    {/* <input type="text" value={formData.backgroundColor} onChange={onInputChange} name="TextColor" /> <br /> */}
                    <div className="colorPickerHolder">
                        <SketchPicker color={color} onChangeComplete={handlethecolorchange} />
                    </div>
                </label>
                <br />
                <button type="submit">Submit Background Color Change</button>
                <br />
            </form>
        </div>
  )
}

export default BackgroundColorPicker