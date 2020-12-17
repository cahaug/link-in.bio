import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import '../App.css'


function ExperimentalListDisplay() {

    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [ourURL] = useState('/1')
    const [profilePictureURL, setProfilePictureURL] = useState()
    const [userFirstNameLastName, setUserFirstNameLastName] = useState()
    const [displayName, setDisplayName] = useState()
    const [displayingUserInfo, setDisplayingUserInfo] = useState()
    const [darkMode, setDarkMode] = useState(false)
    const [drawerPulled, setDrawerPulled] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
    const [textColor, setTextColor] = useState('#000000')
    const [backgroundURL, setBackgroundURL] = useState('')
    const [chosenFont, setChosenFont] = useState()

    // const browserInfoSifter = () => {
    //     // console.log('this navigator', navigator)
    //     if(navigator.maxTouchPoints>0){console.log('this is a touchscreen', navigator.maxTouchPoints)}else{console.log('this is not a touchscreen')}
    //     console.log('current/primary language', navigator.language)
    //     console.log('platform', navigator.platform)
    //     const agten = navigator.userAgent
    //     const chosenFew = ['Firefox','Chrome', 'Edg', '']
        
    // }

    function ColorLuminance(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;
    
        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
    
        return rgb;
    }

    const applyDarkMode = () => {
        // var element = document.body;
        // console.log('backcolor', backgroundColor, 'chosenFont', chosenFont, 'textColor', textColor)
        var element = document.getElementsByClassName('App')
        element[0].classList.toggle("darkMode")
        if(darkMode===true){
            var txtColorElement0 = document.getElementsByClassName('linkDescription')
            var k
            for (k=0; k< txtColorElement0.length; k++){
                txtColorElement0[k].style.color = `${textColor}`
                // txtColorElement[j].style.color = `${res.data[0].backColor}`
            }
            var borderElement0 = document.getElementsByClassName('linkSquare')
            var arrowChangeColor = document.getElementsByClassName('linkDescriptionTag')
            var n
            for (n=0; n< borderElement0.length; n++){
                borderElement0[n].style.border = `2px solid ${textColor}`
                arrowChangeColor[n].style.color = `${textColor}`
                // borderElement0[n].style.backgroundColor = `${backgroundColor}`
            }
            var headerDividerBar = document.getElementsByClassName('linkListDisplayHeader')
            headerDividerBar[0].style.borderBottom = `0.25vh solid ${textColor}`
            // headerDividerBar[0].style.backgroundColor = `${backgroundColor}`
            var headerTextElement = document.getElementById('headerName')
            headerTextElement.style.color = `${textColor}`
            var mainBackgroundElement = document.getElementsByClassName('theMain')
            console.log(mainBackgroundElement[0].style.backgroundColor)
            if(backgroundURL.length<8){
                mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, ${textColor}, ${backgroundColor})`
            }
        } else {
            var txtColorElement0 = document.getElementsByClassName('linkDescription')
            var m
            for (m=0; m< txtColorElement0.length; m++){
                txtColorElement0[m].style.color = 'grey'
                // txtColorElement[j].style.color = `${res.data[0].backColor}`
            }
            var borderElement0 = document.getElementsByClassName('linkSquare')
            var arrowChangeColor = document.getElementsByClassName('linkDescriptionTag')
            var o
            for (o=0; o< borderElement0.length; o++){
                borderElement0[o].style.border = `2px solid grey`
                arrowChangeColor[o].style.color = 'grey'
                // borderElement0[o].style.backgroundColor = '#000000'
            }
            var headerDividerBar = document.getElementsByClassName('linkListDisplayHeader')
            headerDividerBar[0].style.borderBottom = '0.25vh solid black'
            // headerDividerBar[0].style.backgroundColor = '#000000'
            var headerTextElement = document.getElementById('headerName')
            headerTextElement.style.color = 'white'
            var mainBackgroundElement = document.getElementsByClassName('theMain')
            console.log(mainBackgroundElement[0].style.backgroundColor)
            // mainBackgroundElement[0].style.backgroundColor = '#000000'
            if(backgroundURL.length<8){
                mainBackgroundElement[0].style.backgroundImage = 'linear-gradient(70deg, #151515, black)'
            }
        }
        setDarkMode(!darkMode) 
    }

    const drawerToggle = () => {
        const drawer = document.getElementsByClassName('drawer')
        if (drawer[0].style.maxHeight){
            drawer[0].style.maxHeight = null;
            setDrawerPulled(false)
        } else {
            drawer[0].style.maxHeight = drawer[0].scrollHeight + "px";
            setDrawerPulled(true)
        }
    }

    // const revealDescription = () => {
    //     const hiddenDescription = document.get
    // }

    const updateTextFont = (font) => {
        var fontPickerSampleTextArray = document.getElementsByClassName('App')
        var i 
        for (i=0; i<fontPickerSampleTextArray.length; i++){
            fontPickerSampleTextArray[i].classList.toggle(`${font}Font`)
            // fontPickerSampleTextArray[i].style.fontFamily = fontsDict[font]['name']
            // fontPickerSampleTextArray[i].style.fontWeight = fontsDict[font]['weight']
        }
    }

    useEffect(() => {
        const useThisURL = `https://link-in-bio.herokuapp.com${ourURL}`
        axios.get(useThisURL)
        .then(async res => {
            console.log('backend res', res)
            const userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName}`
            const displayName = res.data[0].displayName
            const profilePictureURL = `${res.data[0].profilePictureURL}`
            const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setDisplayName(displayName)
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            setDisplayingUserInfo(displayingUserInfo)
            if(res.data[0].listBackgroundURL !== null){
                const backgroundImageURL = `${res.data[0].listBackgroundURL}`
                setBackgroundURL(backgroundImageURL)
            }
            const mt = navigator.maxTouchPoints
            const incrementedListViews = axios.get(`https://link-in-bio.herokuapp.com/s/ili/${res.data[0].listId}?mt=${mt}`)
            // console.log(incrementedListViews)
            setIsLoading(false);
            document.title = `${window.location.host}${ourURL} - ${displayName}`
            if(displayName===null){
                document.title = `${window.location.host}${ourURL} - ${userFirstLastName}`
            }
            // initialize in dark mode
            // var element0 = document.getElementsByClassName('App')
            // element0[0].classList.toggle("darkMode")
           
            const thelinks = (res.data.map((link) => {
                return (

                        <div className='linkSquare' key={link.entryId}>
                            <a className='linkTitle' href={link.referencingURL} onClick={async (e)=>{
                                e.preventDefault()
                                setIsLoading(true) 
                                console.log('fired', link.referencingURL, link.entryId, mt)
                                const trashRequest = axios.get(`https://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                // const trashRequest = await axios.get(`https://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                console.log('trashRequest', trashRequest)
                                setIsLoading(false)
                                window.location.href = link.referencingURL
                            }}>
                                {link.imgURL?<img className='image' src={link.imgURL} alt={link.linkTitle} /> : null }
                                {/* <img className='image' src={link.imgURL} alt={link.linkTitle} />  */}
                                <h3>{link.linkTitle}</h3>
                            </a>
                            <p className="linkDescriptionTag">▼</p>
                            <p className='linkDescription'>{link.description}</p>
                        </div>

                )
            }))
            setLinks(thelinks)
            console.log('thelinks',thelinks)
            // if 
            console.log(res.data[0])
            if(res.data[0].backColor){
                console.log('backColor Changed Bruh!')
                setBackgroundColor(`${res.data[0].backColor}`)
            }
            if(res.data[0].txtColor){
                console.log('textColor Changed Bruh!')
               setTextColor(`${res.data[0].txtColor}`)
            }
            if(res.data[0].fontSelection){
                setChosenFont(`${res.data[0].fontSelection}`)
                updateTextFont(`${res.data[0].fontSelection}`)
            }
            //css for hiddenDescriptions
            const collapsingDescriptions = document.getElementsByClassName('linkDescriptionTag')
            var i
            for (i=0; i < collapsingDescriptions.length; i++){
                collapsingDescriptions[i].addEventListener("click", function (){
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if(content.style.maxHeight){
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px"
                    }
                })
            }

            // ban right click
            const allTrackedLinks = document.getElementsByClassName('linkTitle')
            for(i=0; i < allTrackedLinks.length; i++){
                allTrackedLinks[i].addEventListener('contextmenu', e => {
                    e.preventDefault();
                });
            }

            // initialize in custom color mode
            var txtColorElement0 = document.getElementsByClassName('linkDescription')
            var k
            for (k=0; k< txtColorElement0.length; k++){
                txtColorElement0[k].style.color = `${res.data[0].txtColor}`
                // txtColorElement[j].style.color = `${res.data[0].backColor}`
            }
            var borderElement0 = document.getElementsByClassName('linkSquare')
            var arrowChangeColor = document.getElementsByClassName('linkDescriptionTag')
            var n
            for (n=0; n< borderElement0.length; n++){
                borderElement0[n].style.border = `2px solid ${res.data[0].txtColor}`
                arrowChangeColor[n].style.color = `${res.data[0].txtColor}`
                // borderElement0[n].style.backgroundColor = `${backgroundColor}`
            }
            var headerDividerBar = document.getElementsByClassName('linkListDisplayHeader')
            headerDividerBar[0].style.borderBottom = `0.25vh solid ${res.data[0].txtColor}`
            // headerDividerBar[0].style.backgroundColor = `${backgroundColor}`
            var headerTextElement = document.getElementById('headerName')
            headerTextElement.style.color = `${res.data[0].txtColor}`
            var mainBackgroundElement = document.getElementsByClassName('theMain')
            console.log(mainBackgroundElement[0].style.backgroundColor)
            if(res.data[0].listBackgroundURL !== null){
                mainBackgroundElement[0].style.backgroundImage = `url("${res.data[0].listBackgroundURL}")`
            } else {
                mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, ${res.data[0].txtColor}, ${res.data[0].backColor})`
            }
            let mql = window.matchMedia('(prefers-color-scheme: dark)')
            console.log('mql', mql)            
            if(mql.matches === true ){
                headerTextElement.style.color = ColorLuminance(`${res.data[0].txtColor}`, 2)
                // initialize in dark mode
                if(`${res.data[0].txtColor}`==='#000000'){
                    headerTextElement.style.color = '#FFFFFF'    
                }
                var element0 = document.getElementsByClassName('App')
                element0[0].classList.toggle("darkMode")
                setDarkMode(true)
            }
        })
        .catch(err => {console.log('err', err); alert('that site does not exist, yet. or check your connection.')})
    }, [])


    if(isLoading===true){
        return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
    } else if (displayingUserInfo === 'false'){
        return (
            <div className="linkList">
                <header className="linkListDisplayHeader"><h2>Welcome to Link-in.Bio/</h2></header>
                <main id="main">
                    {links}
                </main>
                {/* <footer>
                    <h4>{darkMode ? <span onClick={applyDarkMode}>💡</span>:<span>🏮</span>} ©{new Date().getFullYear()} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
                </footer> */}
            </div>

        )
    } else {
        return (
            <div className="linkList">
                <header className="linkListDisplayHeader">
                    {/* <hr/> */}
                    <div className="scroller">
                        <div className="picHolder">
                            <div className="toggleHolder">
                                {darkMode ? <span onClick={applyDarkMode}>💡</span>:<span onClick={applyDarkMode}>🔦</span>}
                                {drawerPulled ? <span onClick={drawerToggle}>💭</span>:<span onClick={drawerToggle}>💬</span>}
                            </div>
                            <br />
                            <h1 id="headerName">{displayName===null?userFirstNameLastName:displayName}</h1>
                            <br /> 
                            <img src={profilePictureURL} alt={profilePictureURL} />
                        </div>
                        {/* <img src={profilePictureURL} alt={profilePictureURL} style={{width:"200px"}}/>  */}
                        <div className="drawer">
                            <h4> ©{new Date().getFullYear()}  <a href="http://link-in.bio/"><span className="footerLink"> Link-in.Bio Ltd</span></a></h4>
                        </div>
                    </div>
                {/* <hr /> */}
                </header>
                <main className="theMain">
                    {links}
                </main>
                {/* <footer>
                    <h4>{darkMode ? <span onClick={applyDarkMode}>💡</span>:<span onClick={applyDarkMode}>🏮</span>} ©{new Date().getFullYear()} <a href="http://yhy.fi/"><span className="footerLink">YHY Oy:</span></a> <a href="http://link-in.bio/"><span className="footerLink">Link-in.Bio/</span></a></h4>
                </footer> */}
                
            </div>

        )
    }
}

export default ExperimentalListDisplay