import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import libIMG from '../files/libIMG.png'
import HomepageAvailability from './CustomURL/HomepageAvailability'
import GraphForHomepage from './GraphForHomepage'
import {Helmet} from 'react-helmet'
// import '../App2.css';


const LandingPage = () => {
    const [isShowingStats, setIsShowingStats] = useState(false)
    const [loggedViewNoIP, setLoggedViewNoIP] = useState(false)
    
    const statsDrawerToggle = () => {
        const statDrawer = document.getElementsByClassName('statsDisplayDiv')
        if(statDrawer[0].style.maxHeight){
            statDrawer[0].style.maxHeight = null;
            setIsShowingStats(false)
        } else {
            statDrawer[0].style.maxHeight = statDrawer[0].scrollHeight + 1280 + "px";
            setIsShowingStats(true)
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

    return (
        <div>
            <img src={libIMG} alt="Link-In.Bio Logo" className="landingIMG"/>
            <br />
            <HomepageAvailability />
            <br />
            {isShowingStats ? <span style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>Homepage Stats  ▼</span>}
            <div className="statsDisplayDiv">
                <GraphForHomepage /> <br />
                {isShowingStats ? <span style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span style={{ "cursor": "pointer" }} onClick={statsDrawerToggle}>Homepage Stats  ▼</span>}

            </div>
            <br />
            <div className='signupcards'>
                <div className="signupspcdiv">
                <Link to='/maksaa' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3> I'm here for my own Link-In Bio Account </h3>
                        <p> Let's Begin - Register - </p>
                        {/* remove this later */}
                        <br />
                        {/* end */}
                    </div>
                </Link>
                </div>
                <div className='signupspcdiv'>
                <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3> I already have an account </h3>
                        <p> Welcome Back - Log In - </p>
                    </div>
                </Link>
                </div>
            </div>
            <br />
            <h2>Link-in.Bio Ltd purchases Carbon Offsets to Stay Carbon Neutral. 🍀🍃</h2>
            <br />
            <a alt="Help Center" href="https://intercom.help/link-in-bio-ltd/en/collections/2685643-quick-questions">Help Center - FAQ</a>
            <br /><br />
            <Helmet>
                <meta name="description" content={`${window.location.host} - Welcome - Link-In Bio Ltd`} />
            </Helmet>
            {/* <a href="#!" class="paddle_button" data-product="631279">Subscribe Now!</a> */}
        </div>
    )
}

export default LandingPage