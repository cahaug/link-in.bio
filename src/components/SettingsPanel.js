import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
// import axios from "axios"
// import loadingGif from '../files/loading.gif'
// import { Link } from 'react-router-dom'
// import CUPicker from '../components/CustomURL/CUPicker'
import BackgroundColorPicker from '../components/BackgroundColorPicker'
import TextColorPicker from '../components/TextColorPicker'
import FontPicker from '../components/FontPicker'
// import EasyAddInstagram from '../components/EasyAdd/EasyAddInstagram'
// import EasyAddMultiTool from '../components/EasyAdd/EasyAddMultiTool'
import ProfilePictureChanger from '../components/ProfilePictureChanger'
import AvailabilityChecker from './CustomURL/AvailabilityChecker'
import ChangeDisplayName from '../components/ChangeDisplayName'
import SettingsChangePassword from "./SettingsChangePassword"
import ProfPicUpload from './ProfPicUpload'
import ListBackgroundChanger from './ListBackgroundChanger'
import UpdateCancelURLs from './UpdateCancelURLs'


// thank you github.com/casesandberg for the lovely react color pickers
console.log('thank you github.com/casesandberg for the lovely react color pickers')


function SettingsPanel(){
    const [modifyingTextColor, setModifyingTextColor] = useState(false)
    const [modifyingBackColor, setModifyingBackColor] = useState(false)
    const [changingFont, setChangingFont] = useState(false)
    const [easyAddingInsta, setEasyAddingInsta] = useState(false)
    const [changingProfilePic, setChangingProfilePic] = useState(false)
    const [settingDisplayName, setSettingDisplayName] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [uploadingPhoto, setUploadingPhoto] = useState(false)
    const [uploadingBackground, setUploadingBackground] = useState(false)
    const [showingURLs, setShowingURLs] = useState(false)
    
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

    const showingURLDrawerToggle = () => {
        const showingURLdrawer = document.getElementsByClassName('showingURLDiv')
        if (showingURLdrawer[0].style.maxHeight){
            showingURLdrawer[0].style.maxHeight = null;
            setShowingURLs(false)
        } else {
            showingURLdrawer[0].style.maxHeight = showingURLdrawer[0].scrollHeight + "px";
            setShowingURLs(true)
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

    const fontDrawerToggle = () => {
        const fontDrawer = document.getElementsByClassName('fontPickerDiv')
        if (fontDrawer[0].style.maxHeight){
            fontDrawer[0].style.maxHeight = null;
            setChangingFont(false)
        } else {
            fontDrawer[0].style.maxHeight = fontDrawer[0].scrollHeight + "px";
            setChangingFont(true)
        }
    }

    const instaDrawerToggle = () => {
        const instaDrawer = document.getElementsByClassName('easyAddInstaDiv')
        if (instaDrawer[0].style.maxHeight){
            instaDrawer[0].style.maxHeight = null;
            setEasyAddingInsta(false)
        } else {
            instaDrawer[0].style.maxHeight = instaDrawer[0].scrollHeight + 60 + "px";
            setEasyAddingInsta(true)
        }
    }

    const profPicDrawerToggle = () => {
        const profPicChangerDrawer = document.getElementsByClassName('profPicChangerDiv')
        if (profPicChangerDrawer[0].style.maxHeight){
            profPicChangerDrawer[0].style.maxHeight = null;
            setChangingProfilePic(false)
        } else {
            profPicChangerDrawer[0].style.maxHeight = profPicChangerDrawer[0].scrollHeight + "px";
            setChangingProfilePic(true)
        }
    }

    const uploadingPhotoDrawerToggle = () => {
        const profPicUploadDrawer = document.getElementsByClassName('profPicUploadDiv')
        if (profPicUploadDrawer[0].style.maxHeight){
            profPicUploadDrawer[0].style.maxHeight = null;
            setUploadingPhoto(false)
        } else {
            profPicUploadDrawer[0].style.maxHeight = profPicUploadDrawer[0].scrollHeight + 275 + "px";
            setUploadingPhoto(true)
        }
    }

    const displayNameDrawerToggle = () => {
        const displayNameChangerDrawer = document.getElementsByClassName('displayNameChangerDiv')
        if (displayNameChangerDrawer[0].style.maxHeight){
            displayNameChangerDrawer[0].style.maxHeight = null;
            setSettingDisplayName(false)
        } else {
            displayNameChangerDrawer[0].style.maxHeight = displayNameChangerDrawer[0].scrollHeight + "px";
            setSettingDisplayName(true)
        }
    }

    const changePasswordDrawerToggle = () => {
        const passwordChangerDrawer = document.getElementsByClassName('passwordChangerDiv')
        if (passwordChangerDrawer[0].style.maxHeight){
            passwordChangerDrawer[0].style.maxHeight = null;
            setChangingPassword(false)
        } else {
            passwordChangerDrawer[0].style.maxHeight = passwordChangerDrawer[0].scrollHeight + 120 + "px";
            setChangingPassword(true)
        }
    }

    const uploadingBackgroundDrawerToggle = () => {
        const bgPicUploadDrawer = document.getElementsByClassName('bgPicUploadDiv')
        if (bgPicUploadDrawer[0].style.maxHeight){
            bgPicUploadDrawer[0].style.maxHeight = null;
            setUploadingBackground(false)
        } else {
            bgPicUploadDrawer[0].style.maxHeight = bgPicUploadDrawer[0].scrollHeight + 325 + "px";
            setUploadingBackground(true)
        }
    }

    useEffect(()=>{
        var elelist = document.getElementsByTagName("input"); for(var i = 0; i < elelist.length; i++){
            elelist[i].style.fontSize = '16px'
        }
        document.title = `Settings Panel - ${window.location.host}`
    })

    return (
        <div className="settingsPanel">
            <br />
            <p>Settings Panel</p>
            <br /> <hr /><br />
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
            {changingFont ? <span onClick={fontDrawerToggle}>Modify Font ▲</span>:<span onClick={fontDrawerToggle}>Modify Font ▼</span>}
            <div className="fontPickerDiv">
                <FontPicker />
            </div>
            <br />
            {changingPassword ? <span onClick={changePasswordDrawerToggle}>Change Password ▲</span>:<span onClick={changePasswordDrawerToggle}>Change Password ▼</span>}
            <div className="passwordChangerDiv">
                <SettingsChangePassword />
            </div>
            <br />
            {easyAddingInsta ? <span onClick={instaDrawerToggle}>CustomURL Picker ▲</span>:<span onClick={instaDrawerToggle}>CustomURL Picker ▼</span>}
            <div className="easyAddInstaDiv">
                <AvailabilityChecker />
            </div>
            <br />
            {settingDisplayName ? <span onClick={displayNameDrawerToggle}>Set Display Name ▲</span>:<span onClick={displayNameDrawerToggle}>Set Display Name ▼</span>}
            <div className="displayNameChangerDiv">
                <ChangeDisplayName />
            </div>
            <br />
            {changingProfilePic ? <span onClick={profPicDrawerToggle}>Set Profile Pic To Online Image <br /> {`&`} Delete Profile Pic ▲</span>:<span onClick={profPicDrawerToggle}>Set Profile Pic To Online Image <br /> {`&`} Delete Profile Pic ▼</span>}
            <div className="profPicChangerDiv">
                <ProfilePictureChanger />
            </div>
            <br />
            {uploadingPhoto ? <span onClick={uploadingPhotoDrawerToggle}>Upload a Profile Picture ▲</span>:<span onClick={uploadingPhotoDrawerToggle}>Upload a Profile Picture ▼</span>}
            <div className="profPicUploadDiv">
                <ProfPicUpload />
            </div>
            <br/>
            {uploadingBackground ? <span onClick={uploadingBackgroundDrawerToggle}>Upload/Delete a List Background ▲</span>:<span onClick={uploadingBackgroundDrawerToggle}>Upload/Delete a List Background ▼</span>}
            <div className="bgPicUploadDiv">
                <ListBackgroundChanger />
            </div>
            <br/>
            {showingURLs ? <span onClick={showingURLDrawerToggle}>Update Payment/Cancel Account ▲</span>:<span onClick={showingURLDrawerToggle}>Update Payment/Cancel Account ▼</span>}
            <div className="showingURLDiv">
                <UpdateCancelURLs />
            </div>
            <br/>
            <br/>
            <Link to={`/addEntry/`}><span className="abutton">Add Entry Manually</span></Link>
            <br/>
            <br/>
            <Link to='/dashboard2'><span className="abutton">Back to Dash</span></Link>
            <br/>
            <br/>
          
            
            {/* <a href="/dashboard2" alt="Back to Dashboard">Back to Dashboard</a> */}
        </div>

    )
}

export default SettingsPanel