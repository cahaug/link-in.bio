import React, { useState, useEffect} from "react"
import { withRouter, Link } from 'react-router-dom'
// import ListEditor from './ListEditor'
import axios from 'axios'
import loadingGif from '../files/loading.gif'
import ListEditor2 from "./ListEditor2"
import libIMG from '../files/libIMG.png'
import CUPicker from '../components/CustomURL/CUPicker'
import EasyAddDash from '../components/EasyAdd/EasyAddDash'
import GraphForEntry from "../components/GraphForEntry"
import AddEntryWithFile from '../components/AddEntryWithFile'




const QRCode = require('qrcode.react')


function Dashboard2 () {
    const [isLoading, setIsLoading] = useState(false)
    const [displayingSettings, setDisplayingSettings] = useState(false)
    const [listViews, setListViews] = useState(null)
    const [qrShowing, setQRShowing] = useState(false)
    const [isEasyAdding, setIsEasyAdding] = useState(false)
    const [isShowingStats, setIsShowingStats] = useState(false)
    const [addingWithFile, setIsAddingWithFile] = useState(false)

    const statsDrawerToggle = () => {
        const statDrawer = document.getElementsByClassName('statsDisplayDiv')
        if(statDrawer[0].style.maxHeight){
            statDrawer[0].style.maxHeight = null;
            setIsShowingStats(false)
        } else {
            statDrawer[0].style.maxHeight = statDrawer[0].scrollHeight + 100 + "px";
            setIsShowingStats(true)
        }
    }

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

    const withFileDrawerToggle = () => {
        const withFileDrawer = document.getElementsByClassName('addwithPhotoDiv')
        if (withFileDrawer[0].style.maxHeight){
            withFileDrawer[0].style.maxHeight = null;
            setIsAddingWithFile(false)
        } else {
            withFileDrawer[0].style.maxHeight = withFileDrawer[0].scrollHeight + 250 + "px";
            setIsAddingWithFile(true)
        }
    }

    const launchIntercom = (email, user_hash) => {
        const scriptsrc = (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ya321a09';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
        //Firefox, Safari, Chrome, and Opera
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptsrc;
        script.onload = function(){
            // alert("Script is ready!");
            window.Intercom("boot", {
                app_id: "ya321a09",
                email: `${email}`,
                user_hash:`${user_hash}`
            });
        };
        document.body.appendChild(script);
    }

    const qrToggle = () => {
        var qrElement = document.getElementsByClassName('qrcode')
        // console.log('qrelement', qrElement)
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
        alert('Logged Out Successfully')
        window.location.reload()
    }

    useEffect(() => {
        const email = sessionStorage.getItem('email')
        // const firstName = sessionStorage.getItem('firstName')
        // const userId = sessionStorage.getItem('userId')
        // const listId = sessionStorage.getItem('listId')
        // const customURL = sessionStorage.getItem('customURL')
        const user_hash = sessionStorage.getItem('user_hash')
        launchIntercom(email, user_hash)
        const token = sessionStorage.getItem('token')
        const useThisURL = `https://www.link-in-bio.app/s/listViews/${sessionStorage.getItem('listId')}`
        axios.get(useThisURL, { headers: {authorization: token} })
        .then(response => {
            setListViews(response.data['listViews'])
            document.title = `Dashboard - ${window.location.host}`
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
                            <QRCode value={`https://link-in.bio/${sessionStorage.getItem('listId')}`} />
                            :
                            <QRCode value={sessionStorage.getItem('customURL')} />
                            }
                        </div>
                    </div>
                    <br /> 
                    {/* <img src={profilePictureURL} alt={profilePictureURL} /> */}
                </header>
                <section className="dashboardInfoSection">
                <div>
                        {/* <p>Your Stats:</p> */}
                        {/* <br /> */}
                        {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Your List Stats  ▼</span>}
                        <div className="statsDisplayDiv">
                            <GraphForEntry />
                            {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Your List Stats  ▼</span>}

                        </div>
                    </div>
                    <br /> <br /> 
                    <br />
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
                    {/* remove */}
                    <p>Views: {listViews ? listViews: <span>Loading...</span>}</p>
                    <br /><br />
                    {/* remove */}
                    {/* <h2>Add Entries to Your List:</h2> */}
                    <br /> <br />
                    {addingWithFile ? <span onClick={withFileDrawerToggle}>Add Link with Image  ▲</span>:<span onClick={withFileDrawerToggle}>Add Link with Image  ▼</span>}
                    <div className="addwithPhotoDiv">
                        <AddEntryWithFile />
                    </div>
                    <br /> <br /><br />
                    {isEasyAdding ? <span onClick={easyAddDrawerToggle}>Easy-Add a Link  ▲</span>:<span onClick={easyAddDrawerToggle}>Easy-Add a Link  ▼</span>}
                    <div className="easyAddInstaDiv">
                        <EasyAddDash />
                    </div>
                    <br /><br />
                    {/* <div>
                        {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Your List Stats  ▼</span>}
                        <div className="statsDisplayDiv">
                            <GraphForEntry />
                            {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Your List Stats  ▼</span>}

                        </div>
                    </div>
                    <br /> <br />  */}
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