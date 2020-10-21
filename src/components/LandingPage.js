import React from 'react'
import { Link } from 'react-router-dom'
import libIMG from '../files/libIMG.png'
// import AvailabilityChecker from './CustomURL/AvailabilityChecker'
// import '../App2.css';


const LandingPage = () => {
    return (
        <div>
            <img src={libIMG} alt="Link-In.Bio Logo" className="landingIMG"/>
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