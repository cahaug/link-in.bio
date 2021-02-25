import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import libIMG from '../files/libIMG.png'
import Information from './Information'
import HomepageAvailability from './CustomURL/HomepageAvailability'
import GraphForHomepage from './GraphForHomepage'
import CarbonAgree from './CarbonAgree'
import {Helmet} from 'react-helmet'
// import '../App2.css';


const LandingPage = () => {
    const [loggedViewNoIP, setLoggedViewNoIP] = useState(false)
    const [isShowingStats, setIsShowingStats] = useState(false)
    const [isShowingInfo, setIsShowingInfo] = useState(false)
    const [isShowingAvailability, setIsShowingAvailability] = useState(false)
    const [isShowingCarbon, setIsShowingCarbon] = useState(false)
    
    const infoDrawerToggle = () => {
        const infoDrawer = document.getElementsByClassName('infoDisplayDiv')
        if(infoDrawer[0].style.maxHeight){
            infoDrawer[0].style.maxHeight = null;
            setIsShowingInfo(false)
        } else {
            infoDrawer[0].style.maxHeight = infoDrawer[0].scrollHeight + 1280 + "px";
            setIsShowingInfo(true)
        }
    }

    const availabilityDrawerToggle = () => {
        const availabilityDrawer = document.getElementsByClassName('availabilityDisplayDiv')
        if(availabilityDrawer[0].style.maxHeight){
            availabilityDrawer[0].style.maxHeight = null;
            setIsShowingAvailability(false)
        } else {
            availabilityDrawer[0].style.maxHeight = availabilityDrawer[0].scrollHeight + 1280 + "px";
            setIsShowingAvailability(true)
        }
    }

    const statsDrawerToggle = () => {
        const statDrawer = document.getElementsByClassName('statsHPDisplayDiv')
        if(statDrawer[0].style.maxHeight){
            statDrawer[0].style.maxHeight = null;
            setIsShowingStats(false)
        } else {
            statDrawer[0].style.maxHeight = statDrawer[0].scrollHeight + 1280 + "px";
            setIsShowingStats(true)
        }
    }

    const carbonDrawerToggle = () => {
        const carbonDrawer = document.getElementsByClassName('carbonDisplayDiv')
        if(carbonDrawer[0].style.maxHeight){
            carbonDrawer[0].style.maxHeight = null;
            setIsShowingCarbon(false)
        } else {
            carbonDrawer[0].style.maxHeight = carbonDrawer[0].scrollHeight + 1280 + "px";
            setIsShowingCarbon(true)
        }
    }

    useEffect(() => {
        if(loggedViewNoIP === false){
            const mt = navigator.maxTouchPoints
            axios.get(`https://link-in-bio.limited/s/hpA1?mt=${mt}`)
            .then(res => {
                console.log(res.data.message)
                setLoggedViewNoIP(true)
                window.Intercom("boot", {
                    app_id: "ya321a09"
                });
            })
            .catch(err => {
                console.log('error', err)
                setLoggedViewNoIP(true)
            })
        } else{
            window.Intercom("update");
            return
        }
    })

    const maxTouchPts = navigator.maxTouchPoints
    const currentTime = `${Date.now()}`

    return (
        <div>
            <img src={libIMG} alt="Link-In.Bio Ltd" className="landingIMG"/>
            <br />
            <h1 className="semiSpecialText">Link-In Bio Ltd</h1>
            <br />
            {['1','2','3'].includes(currentTime[currentTime.length - 1])? <h2 className="specialText">Your Links.<br />Your Bio.<br/> Your Way.</h2>:null}
            {['4','5','6'].includes(currentTime[currentTime.length - 1])? <h2 className="specialText">Social<br/>Networking,<br/>Reinvented</h2>:null}
            {['7','8','9','0'].includes(currentTime[currentTime.length - 1])? <h2 className="specialText">Big Data<br/>with a<br/>Small Price</h2>:null}
            <br />
            {isShowingInfo ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={infoDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} What's Link-In.Bio?  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={infoDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} What's Link-In.Bio?  ▼</span>}
            <div className="infoDisplayDiv">
                <Information /> <br />
                {isShowingInfo ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={infoDrawerToggle}>{maxTouchPts===0?<span>Click</span>:<span>Tap</span>} to Hide Section  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={infoDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} What's Link-In.Bio?  ▼</span>}<br /><br />
            </div>
            <br />
            {isShowingAvailability ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={availabilityDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Is My Name Available?  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={availabilityDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Is My Name Available?  ▼</span>}
            <div className="availabilityDisplayDiv">
                <HomepageAvailability /> <br />
                {isShowingAvailability ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={availabilityDrawerToggle}>{maxTouchPts===0?<span>Click</span>:<span>Tap</span>} to Hide Section  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={availabilityDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Is My Name Available?  ▼</span>}<br /><br />
            </div>
            <br />
            {isShowingStats ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Statistics Suite  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Statistics Suite  ▼</span>}
            <div className="statsHPDisplayDiv">
                <GraphForHomepage /> <br />
                {isShowingStats ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>{maxTouchPts===0?<span>Click</span>:<span>Tap</span>} to Hide Section  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Statistics Suite  ▼</span>}<br /><br />
            </div>
            <br />
            {isShowingCarbon ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={carbonDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Carbon Neutrality  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={carbonDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Carbon Neutrality  ▼</span>}
            <div className="carbonDisplayDiv">
                <CarbonAgree /> <br />
                {isShowingCarbon ? <span className="landingPanel" style={{ "cursor": "pointer" }} onClick={carbonDrawerToggle}>{maxTouchPts===0?<span>Click</span>:<span>Tap</span>} to Hide Section  ▲</span>:<span className="landingPanel" style={{ "cursor": "pointer" }} onClick={carbonDrawerToggle}>{maxTouchPts===0?<span>Click - </span>:<span>Tap - </span>} Carbon Neutrality  ▼</span>}<br /><br />
            </div>
            <br />
            <div className='signupcards'>
                <div className="signupspcdiv">
                <Link to='/maksaa' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3>Register <br /> <span className="paddle-gross" data-product="631279">$5</span>/mo</h3>
                    </div>
                </Link>
                </div>
                <div className='signupspcdiv'>
                <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3>Welcome Back <br/>Log In</h3>
                    </div>
                </Link>
                </div>
            </div>
            <a alt="Help Center" href="https://intercom.help/link-in-bio-ltd/en/collections/2685643-quick-questions">Frequently Asked Questions - FAQ</a>
            <br /><br />
            <div><h4> ©{new Date().getFullYear()}  Link-In.Bio Ltd</h4></div>
            <br />
            <Helmet>
                <meta name="description" content={`${window.location.host} - Link-In.Bio Ltd Homepage`} />
            </Helmet>
            {/* <a href="#!" class="paddle_button" data-product="631279">Subscribe Now!</a> */}
        </div>
    )
}

export default LandingPage