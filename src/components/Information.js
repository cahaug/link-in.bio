import React from 'react'
import imgLiteMode from '../files/litemode.png'
import imgDarkMode from '../files/dark.png'

const Information = () => {
    return (
        <div>
            <br />
            <h3>When You Get a Link-in.Bio, You Get a Customizable Webpage, publicly hosted on the internet, that you can control completely from your mobile phone or desktop computer.<br /><br /> You get a number to link to your list across any and all of the website URL's in the dropdown in the Name-Picker,<br /><br /> You also get one custom URL you can set to almost anything-- even emoji's, and change as frequently as you choose.<br /><br /></h3>
            <br />
            <div className="homepageImageHolder">
                <img src={imgLiteMode} alt="Light Mode Profile" className="homepageImagePhoto"/>
                <img src={imgDarkMode} alt="Dark Mode Profile" className="homepageImagePhoto" />
            </div>
            <br />
            <p>Your Link-In Bio is versatile, and can be used for anything from linking up your socials with your gamertags,<br/> to launching an online business from nothing.</p><br />
            <p>$5 a Month, 5 Minutes to Set Up</p><br />
            <p>Easily add 60+ commonly used social networks and online services with our EasyAdd Link Feature</p><br />
            <p>Add Links and Images already on the Internet with our Manual Entry Feature.</p><br />
            <p>Upload Your Own Photos with our Add Link with Photo Feature.</p><br />
            <p>Link-In Bio provides you with a QR Code for sharing your Link-In Bio.</p>
            <br />
            <p>Control Your Own Location Data, With Link-In.Bio!</p> <br/><p>Link-in.Bio logs anonymous information for you about your page viewers, so you can better know your audience.</p><br/>
            <p>Link-in.Bio is PCI, CCPA and GDPR Compliant, and is based in Scottsdale, Arizona.</p><br/><p>Link-in.Bio uses industry-leading practices to safeguard your data as well as reCAPTCHA to protect against robot attack.</p><br/>
            <p>We will never give or sell any of your information to anyone.</p><br/><p>You won't ever see a cookie disclaimer on our website ❌🍪❌,<br />because we only use legitimate interest cookies for registration and replying to customer messages, <br />not our core functionalities. 👍 </p><br/>
            <br/>
        </div>
    )
}

export default Information