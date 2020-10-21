import React, { useState, useEffect} from "react"
import { withRouter, Link } from 'react-router-dom'
// import ListEditor from './ListEditor'
import axios from 'axios'
import loadingGif from '../files/loading.gif'
import ListEditor2 from "./ListEditor2"
import libIMG from '../files/libIMG.png'
import CUPicker from '../components/CustomURL/CUPicker'
import EasyAddDash from '../components/EasyAdd/EasyAddDash'




const QRCode = require('qrcode.react')


function Dashboard2 () {
    const [isLoading, setIsLoading] = useState(false)
    const [displayingSettings, setDisplayingSettings] = useState(false)
    const [listViews, setListViews] = useState(null)
    const [qrShowing, setQRShowing] = useState(false)
    const [isEasyAdding, setIsEasyAdding] = useState(false)


    const easyAddDrawerToggle = () => {
        const easyAddDrawer = document.getElementsByClassName('easyAddInstaDiv')
        if (easyAddDrawer[0].style.maxHeight){
            easyAddDrawer[0].style.maxHeight = null;
            setIsEasyAdding(false)
        } else {
            easyAddDrawer[0].style.maxHeight = easyAddDrawer[0].scrollHeight + "px";
            setIsEasyAdding(true)
        }
    }

    const qrToggle = () => {
        var qrElement = document.getElementsByClassName('qrcode')
        console.log('qrelement', qrElement)
        if (qrShowing){
            qrElement[0].style.display = 'none';
            setQRShowing(false)
        } else {
            qrElement[0].style.display = 'block';
            setQRShowing(true)
        }
    }

    const logout = () => {
        sessionStorage.removeItem('listId')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('firstName')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('customURL')
        window.location.reload()
    }

    useEffect(() => {
        const useThisURL = `https://link-in-bio.herokuapp.com/s/listViews/${sessionStorage.getItem('listId')}`
        axios.get(useThisURL, { headers: {authorization: sessionStorage.getItem('token')} })
        .then(response => {
            setListViews(response.data['listViews'])
            document.title = 'Dashboard - Link-in.bio/'
        })
        .catch(err =>  {
            console.log(err)
        })
    })

    if (isLoading === true){
        return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
    } else {
        return (
            <div className="dashboard2">
                <header className="linkListDashboardHeader">
                    <div><img src={libIMG} alt="Link-in.Bio/ Logo" /></div>
                    <div className="dashboardToggleHolder">
                        <p onClick={qrToggle}>Your QRCode</p>    
                        <p><a href="/settingsPanel" alt="Settings Panel">Account Settings</a></p>
                        <p onClick={logout}>Logout User</p>
                    </div>
                    <br />
                    <div className="qrcode">
                        <div>
                            {sessionStorage.getItem('customURL')==null?
                            <QRCode value={`http://link-in.bio/${sessionStorage.getItem('listId')}`} />
                            :
                            <QRCode value={`http://link-in.bio/${sessionStorage.getItem('customURL')}`} />
                            }
                        </div>
                    </div>
                    <br /> 
                    {/* <img src={profilePictureURL} alt={profilePictureURL} /> */}
                </header>
                <section className="dashboardInfoSection">
                    <p>Views: {listViews ? listViews: <span>Loading...</span>}</p><br />
                    <table>
                        <tr>
                            <td>Your Default Space:</td>
                            <td><a href={`https://link-in.bio/${sessionStorage.getItem('listId')}`} >https://link-in.bio/{sessionStorage.getItem('listId')}</a></td>
                        </tr>
                        <tr>
                            <td>Custom URL:</td>
                            {/* fix this right here (below) */}
                            {/* <td>Link to CustomURL Picker || Display custom link / edit choice button</td> */}
                            <td><CUPicker /></td>
                        </tr>
                    </table>
                </section>
                <section className="dashboardInfoSection">
                    <h2>Add Entries to Your List:</h2>
                    <br /> <br />
                    <Link to={`/addEntry/${sessionStorage.getItem('listId')}`}><span className="abutton">Add Custom Entry</span></Link>
                    <br /> <br />
                    {isEasyAdding ? <span onClick={easyAddDrawerToggle}>Easy-Add Social Account  ▲</span>:<span onClick={easyAddDrawerToggle}>Easy-Add Social Account  ▼</span>}
                    <div className="easyAddInstaDiv">
                        <EasyAddDash />
                    </div>
                    <br /> <br /> 
                    <hr />
                    <br />
                    <h2>List Editor:</h2>
                    <br />
                    <hr />
                    <ListEditor2 />
                </section>
            </div>
        )
    }
}

export default withRouter(Dashboard2)