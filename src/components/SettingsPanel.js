import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'
// import CUPicker from '../components/CustomURL/CUPicker'
import BackgroundColorPicker from '../components/BackgroundColorPicker'
import TextColorPicker from '../components/TextColorPicker'
import EasyAddInstagram from '../components/EasyAdd/EasyAddInstagram'

// thank you github.com/casesandberg for the lovely react color pickers
console.log('thank you github.com/casesandberg for the lovely react color pickers')


function SettingsPanel(){
    const [modifyingTextColor, setModifyingTextColor] = useState(false)
    const [modifyingBackColor, setModifyingBackColor] = useState(false)
    const [easyAddingInsta, setEasyAddingInsta] = useState(false)
    
    const textColorDrawerToggle = () => {
        const textColorDrawer = document.getElementsByClassName('textColorPickerDiv')
        if (textColorDrawer[0].style.maxHeight){
            textColorDrawer[0].style.maxHeight = null;
            setModifyingTextColor(false)
        } else {
            textColorDrawer[0].style.maxHeight = textColorDrawer[0].scrollHeight + "px";
            setModifyingTextColor(true)
        }
    }

    const backColorDrawerToggle = () => {
        const backColorDrawer = document.getElementsByClassName('backColorPickerDiv')
        if (backColorDrawer[0].style.maxHeight){
            backColorDrawer[0].style.maxHeight = null;
            setModifyingBackColor(false)
        } else {
            backColorDrawer[0].style.maxHeight = backColorDrawer[0].scrollHeight + "px";
            setModifyingBackColor(true)
        }
    }

    const instaDrawerToggle = () => {
        const instaDrawer = document.getElementsByClassName('easyAddInstaDiv')
        if (instaDrawer[0].style.maxHeight){
            instaDrawer[0].style.maxHeight = null;
            setEasyAddingInsta(false)
        } else {
            instaDrawer[0].style.maxHeight = instaDrawer[0].scrollHeight + "px";
            setEasyAddingInsta(true)
        }
    }


    useEffect(()=>{
        var elelist = document.getElementsByTagName("input"); for(var i = 0; i < elelist.length; i++){
            elelist[i].style.fontSize = '16px'
        }
    })

    return (
        <div>
            <p>Setting Panel</p>
            <br /> <br />
            {/* <form onSubmit={submitTextChange}>
                <label>
                    Input Custom CSS Text Color Here (hex or word): <br />
                    <input type="text" value={formData.textColor} onChange={onInputChange} name="TextColor" /> <br />
                    <div className="colorPickerHolder">
                        <SketchPicker color={color} onChangeComplete={handlethecolorchange} />
                    </div>
                </label>
                <button type="submit">Submit Text Color Change</button>
                <br /><br />
            </form> */}
            {modifyingTextColor ? <span onClick={textColorDrawerToggle}>Modify Text Color ▲</span>:<span onClick={textColorDrawerToggle}>Modify Text Color	▼</span>}

            <div className="textColorPickerDiv">
                <TextColorPicker />
            </div>
            <br />
            {modifyingBackColor ? <span onClick={backColorDrawerToggle}>Modify Background Color ▲</span>:<span onClick={backColorDrawerToggle}>Modify Background Color ▼</span>}
            <div className="backColorPickerDiv">
                <BackgroundColorPicker />
            </div>
            <br />
            {easyAddingInsta ? <span onClick={instaDrawerToggle}>Easily Add Instagram Account ▲</span>:<span onClick={instaDrawerToggle}>Easily Add Instagram Account ▼</span>}
            <div className="easyAddInstaDiv">
                <EasyAddInstagram />
            </div>

            <br />
            <a href="/dashboard2" alt="Back to Dashboard">Back to Dashboard</a>
        </div>

    )
}

export default SettingsPanel