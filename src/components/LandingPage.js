import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import libIMG from '../files/libIMG.png'
import HomepageAvailability from './CustomURL/HomepageAvailability'
import GraphForHomepage from './GraphForHomepage'
// import '../App2.css';


const LandingPage = () => {
    const [isShowingStats, setIsShowingStats] = useState(false)
    const [loggedViewNoIP, setLoggedViewNoIP] = useState(false)
    
    const launchIntercom = () => {
        const scriptsrc = (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ya321a09';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
        //Firefox, Safari, Chrome, and Opera
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptsrc;
        script.onload = function(){
            alert("Script is ready!");
            window.Intercom("boot", {
                app_id: "ya321a09"
            });
        };
        document.body.appendChild(script);
    }

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

    useEffect(() => {
        if(loggedViewNoIP === false){
            const mt = navigator.maxTouchPoints
            axios.get(`https://www.link-in-bio.app/s/hpA1?mt=${mt}`)
            .then(res => {
                console.log(res.data.message)
                setLoggedViewNoIP(true)
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
            {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Homepage Stats  ▼</span>}
            <div className="statsDisplayDiv">
                <GraphForHomepage /> <br />
                {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Homepage Stats  ▼</span>}

            </div>
            <br />
            <div className='signupcards'>
                <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3>I'm here for my own LinkList</h3>
                        <p>Let's Begin - Register - </p>
                        {/* remove this later */}
                        <br />
                        <p>--ARRIVING  2021--</p>
                        {/* end */}
                    </div>
                </Link>
                <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3>I already have an account</h3>
                        <p>I want to modify my LinkList</p>
                    </div>
                </Link>
            </div>
            <br />
            <button className="abutton" onClick={launchIntercom}>Click for Customer Service</button>
            <br />
            <h2>Link-in.Bio Ltd purchases Carbon Offsets to Stay Carbon Neutral. 🍀🍃</h2>
            <br />
            {/* <a href="#!" class="paddle_button" data-product="631279">Subscribe Now!</a> */}
        </div>
    )
}

export default LandingPage