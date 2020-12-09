import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import libIMG from '../files/libIMG.png'
import HomepageAvailability from './CustomURL/HomepageAvailability'
import GraphForHomepage from './GraphForHomepage'
// import '../App2.css';


const LandingPage = () => {
    const [isShowingStats, setIsShowingStats] = useState(false)
    
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

    return (
        <div>
            <img src={libIMG} alt="Link-In.Bio Logo" className="landingIMG"/>
            <br />
            <HomepageAvailability />
            <br />
            {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Your List Stats  ▼</span>}
            <div className="statsDisplayDiv">
                <GraphForHomepage />
                {isShowingStats ? <span onClick={statsDrawerToggle}>Hide Statistics  ▲</span>:<span onClick={statsDrawerToggle}>Your List Stats  ▼</span>}

            </div>
            <br />
            <div className='signupcards'>
                <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>
                        <h3>I'm here for my own LinkList</h3>
                        <p>Let's Begin - Register - </p>
                        {/* remove this later */}
                        <br />
                        <p>--TEMPORARILY UNAVAILABLE--</p>
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
        </div>
    )
}

export default LandingPage