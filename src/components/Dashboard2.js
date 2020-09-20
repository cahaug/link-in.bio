import React, { useState, useEffect} from "react"
import { withRouter, Link } from 'react-router-dom'
// import ListEditor from './ListEditor'
import axios from 'axios'
import loadingGif from '../files/loading.gif'
import ListEditor2 from "./ListEditor2"
import libIMG from '../files/libIMG.png'



const QRCode = require('qrcode.react')


function Dashboard2 () {
    const [isLoading, setIsLoading] = useState(false)
    const [displayingSettings, setDisplayingSettings] = useState(false)
    const [listViews, setListViews] = useState(null)
    const [qrShowing, setQRShowing] = useState(false)

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
        window.location.reload()
    }

    useEffect(() => {
        const useThisURL = `https://link-in-bio.herokuapp.com/s/listViews/${sessionStorage.getItem('listId')}`
        axios.get(useThisURL)
        .then(response => {
            setListViews(response.data['listViews'])
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
                            <QRCode value={`http://link-in.bio/${sessionStorage.getItem('listId')}`} />
                        </div>
                    </div>
                    <br /> 
                    {/* <img src={profilePictureURL} alt={profilePictureURL} /> */}
                </header>
                <section className="dashboardInfoSection">
                    <p>Views: {listViews ? listViews: <span>Loading...</span>}</p><br />
                    <table>
                        <tr>
                            <td>Your Spaces:</td>
                            <td><a href={`https://link-in.bio/${sessionStorage.getItem('listId')}`} >https://link-in.bio/{sessionStorage.getItem('listId')}</a></td>
                        </tr>
                        <tr>
                            <td>Custom URL:</td>
                            {/* fix this right here (below) */}
                            <td>Link to CustomURL Picker || Display custom link / edit choice button</td>
                        </tr>
                    </table>
                </section>
                <section className="dashboardInfoSection">
                    <h2>Your List:</h2>
                    <br />
                    <Link to={`/addEntry/${sessionStorage.getItem('listId')}`}><span className="abutton">Add Entry</span></Link>
                    <br />
                    <hr />
                    <ListEditor2 />
                </section>
            </div>
        )
    }
}

export default withRouter(Dashboard2)