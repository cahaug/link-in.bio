import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import '../App.css'
import toast from "react-hot-toast"
import {Helmet} from 'react-helmet'
import DOMPurify from 'dompurify'


function ListDisplayHooks(match) {

    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [ourURL] = useState(match.match.url)
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
    const [lightbox, setLightbox] = useState([])
    const [thumbs, setThumbs] = useState([])

    // const browserInfoSifter = () => {
    //     // console.log('this navigator', navigator)
    //     if(navigator.maxTouchPoints>0){console.log('this is a touchscreen', navigator.maxTouchPoints)}else{console.log('this is not a touchscreen')}
    //     console.log('current/primary language', navigator.language)
    //     console.log('platform', navigator.platform)
    //     const agten = navigator.userAgent
    //     const chosenFew = ['Firefox','Chrome', 'Edg', '']
        
    // }

    const smokeCannabisEveryday = {
        'http://xn--4caa.cc/':'ää.cc::',
        'http://xn--1caa.net/':'áá.net:',
        'http://xn--5caa.co/':'åå.co::',
        'http://xn--f1aa.cc/':'жж.cc::',
        'http://xn--b1ali.me/':'лив.me:',
        'http://xn--b1ali.cc/':'лив.cc:',
        'http://xn--b1ali.com/':'лив.com',
        'http://xn--90ani.me/':'либ.me:',
        'http://xn--90ani.cc/':'либ.cc:',
        'http://xn--90ani.com/':'либ.com',
        'http://xn--4caa.cc':'ää.cc::',
        'http://xn--1caa.net':'áá.net:',
        'http://xn--5caa.co':'åå.co::',
        'http://xn--f1aa.cc':'жж.cc::',
        'http://xn--b1ali.me':'лив.me:',
        'http://xn--b1ali.cc':'лив.cc:',
        'http://xn--b1ali.com':'лив.com',
        'http://xn--90ani.me':'либ.me:',
        'http://xn--90ani.cc':'либ.cc:',
        'http://xn--90ani.com':'либ.com',
        'https://xn--4caa.cc/':'ää.cc::',
        'https://xn--1caa.net/':'áá.net:',
        'https://xn--5caa.co/':'åå.co::',
        'https://xn--f1aa.cc/':'жж.cc::',
        'https://xn--b1ali.me/':'лив.me:',
        'https://xn--b1ali.cc/':'лив.cc:',
        'https://xn--b1ali.com/':'лив.com',
        'https://xn--90ani.me/':'либ.me:',
        'https://xn--90ani.cc/':'либ.cc:',
        'https://xn--90ani.com/':'либ.com',
        'https://xn--4caa.cc':'ää.cc::',
        'https://xn--1caa.net':'áá.net:',
        'https://xn--5caa.co':'åå.co::',
        'https://xn--f1aa.cc':'жж.cc::',
        'https://xn--b1ali.me':'лив.me:',
        'https://xn--b1ali.cc':'лив.cc:',
        'https://xn--b1ali.com':'лив.com',
        'https://xn--90ani.me':'либ.me:',
        'https://xn--90ani.cc':'либ.cc:',
        'https://xn--90ani.com':'либ.com',
        'http://lib.ltd':'lib.ltd',
        'https://lib.ltd':'lib.ltd',
        'http://lib.ltd/':'lib.ltd',
        'https://lib.ltd/':'lib.ltd',
        ' ':' ',
        '':''
    }

    const dontDrinkEthanolIsSustainableFuel = {
        'ää.cc::':true,
        'áá.net:':true,
        'åå.co::':true,
        'жж.cc::':true,
        'лив.me:':true,
        'лив.cc:':true,
        'лив.com':true,
        'либ.me:':true,
        'либ.cc:':true,
        'либ.com':true,
        'lib.ltd':true
    }

    var urlShower;
    var imagesArray = []
    var slideIndex = 1

    function showSlides(n) {
        var i;
        if(isLoading==false){var slides = document.getElementsByClassName("imageSlide");
        var dots = document.getElementsByClassName("thumb");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active2", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active2";}
        captionText.innerHTML = dots[slideIndex-1].alt;
    }

    function currentSlide(n) {showSlides(slideIndex = n);}

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
                // arrowChangeColor[n].style.color = `${textColor}`
                // borderElement0[n].style.backgroundColor = `${backgroundColor}`
            }for(n=0;n<arrowChangeColor.length;n++){
                arrowChangeColor[n].style.color = `${textColor}`
            }
            var headerDividerBar = document.getElementsByClassName('linkListDisplayHeader')
            headerDividerBar[0].style.borderBottom = `0.25vh solid ${textColor}`
            // headerDividerBar[0].style.backgroundColor = `${backgroundColor}`
            var headerTextElement = document.getElementById('headerName')
            headerTextElement.style.color = `${textColor}`
            var mainBackgroundElement = document.getElementsByClassName('theMain')
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
                // arrowChangeColor[o].style.color = 'grey'
                // borderElement0[o].style.backgroundColor = '#000000'
            }
            for (o=0; o< arrowChangeColor.length; o++){
                // borderElement0[o].style.border = `2px solid grey`
                arrowChangeColor[o].style.color = 'grey'
                // borderElement0[o].style.backgroundColor = '#000000'
            }
            var headerDividerBar = document.getElementsByClassName('linkListDisplayHeader')
            headerDividerBar[0].style.borderBottom = '0.25vh solid black'
            // headerDividerBar[0].style.backgroundColor = '#000000'
            var headerTextElement = document.getElementById('headerName')
            headerTextElement.style.color = 'white'
            var mainBackgroundElement = document.getElementsByClassName('theMain')
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
        // window.Intercom("boot", {
        //     app_id: "ya321a09"
        //   });
        console.log('document reefer', document.referrer)
        console.log('reefer', smokeCannabisEveryday[`${document.referrer}`])
        console.log('injectedReefer', sessionStorage.getItem('injectedReefer'))
        const useThisURL = `https://link-in-bio.limited${ourURL}`
        axios.get(useThisURL)
        .then(async res => {
            // console.log('backend res', res.data)
            let userFirstLastName; let displayName; let profilePictureURL; let displayingUserInfo;
            if(res.data.length !== 0){
                userFirstLastName = `${DOMPurify.sanitize(res.data[0].firstName)} ${DOMPurify.sanitize(res.data[0].lastName)}`
                displayName = DOMPurify.sanitize(res.data[0].displayName)
                profilePictureURL = `${DOMPurify.sanitize(res.data[0].profilePictureURL)}`
                displayingUserInfo = `${DOMPurify.sanitize(res.data[0].displayUserInfo)}`
                imagesArray.push({imgurl:DOMPurify.sanitize(profilePictureURL),tit:'Profile Picture'})
                setDisplayName(displayName)
                setProfilePictureURL(profilePictureURL)
                setUserFirstNameLastName(userFirstLastName)
                setDisplayingUserInfo(displayingUserInfo)
            } else {
                userFirstLastName = `Empty Link-In Bio`
                displayName = `Empty Link-In Bio`
                profilePictureURL = `https://imagizer.imageshack.com/img924/128/aacWe9.jpg`
                displayingUserInfo = ` `
                imagesArray.push({imgurl:profilePictureURL,tit:'Profile Picture'})
                setDisplayName(displayName)
                setProfilePictureURL(profilePictureURL)
                setUserFirstNameLastName(userFirstLastName)
                setDisplayingUserInfo(displayingUserInfo)
            }
            if(res.data.length>0&&res.data[0].listBackgroundURL !== null){
                const backgroundImageURL = `${DOMPurify.sanitize(res.data[0].listBackgroundURL)}`
                setBackgroundURL(backgroundImageURL)
            }
            if(res.data.length>0&&res.data[0].listBackgroundURL !== null){imagesArray.push({imgurl:DOMPurify.sanitize(res.data[0].listBackgroundURL), tit:'Background Image'})}
            const mt = navigator.maxTouchPoints
            let incrementedListViews
            if(res.data.length>0){incrementedListViews = axios.get(`https://link-in-bio.limited/s/ili/${res.data[0].listId}?mt=${mt}`)}
            // console.log(incrementedListViews)
            setIsLoading(false);
            document.title = `${window.location.host}${ourURL} - ${displayName}`
            if(displayName===null){
                document.title = `${window.location.host}${ourURL} - ${userFirstLastName}`
            }
            let mql = window.matchMedia('(prefers-color-scheme: dark)')
            // initialize in dark mode
            // var element0 = document.getElementsByClassName('App')
            // element0[0].classList.toggle("darkMode")
            if(res.data.length>0){
                var z
                for(z = 0;z<res.data.length;z++){
                    if(res.data[z].referencingURL.indexOf('Redirect:') === 0){
                        if(dontDrinkEthanolIsSustainableFuel[smokeCannabisEveryday[`${document.referrer}`]] && res.data[z].referencingURL.slice(9,16)===smokeCannabisEveryday[`${document.referrer}`]){
                            if(sessionStorage.getItem(`libViewID:${res.data[z].entryId}`) == null){
                                const correctedLink = res.data[z].referencingURL.slice(17) 
                                console.log('correctedLink', correctedLink)
                                res.data[z].referencingURL = correctedLink
                                const trashRequest3 = axios.get(`https://link-in-bio.limited/s/?eid=${res.data[z].entryId}&ref=${DOMPurify.sanitize(res.data[z].referencingURL.slice(17))}&mt=${mt}&red=f`)
                                sessionStorage.setItem(`libViewID:${res.data[z].entryId}`, true)
                                window.location.href = DOMPurify.sanitize(res.data[z].referencingURL)
                            }
                        } else {
                            const correctedLink = res.data[z].referencingURL.slice(17) 
                            console.log('correctedLink', correctedLink)
                            res.data[z].referencingURL = correctedLink
                        }
                    }
                }
                const thelinks = (res.data.map((link) => {
                if(link.imgURL){imagesArray.push({imgurl:DOMPurify.sanitize(link.imgURL), tit:DOMPurify.sanitize(link.linkTitle)})}
                return (

                        <div className='linkSquare' key={link.entryId}>
                            {
                                link.referencingURL === ' '?<a className='linkTitle' href='#' onClick={async (e)=>{
                                    e.preventDefault()
                                    // console.log('fired', link.referencingURL, link.entryId, mt)
                                    const trashRequest = axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                    // const trashRequest = await axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                    // console.log('trashRequest', trashRequest)
                                }}>
                                {link.imgURL?<img className='image' src={DOMPurify.sanitize(link.imgURL)} alt={DOMPurify.sanitize(link.linkTitle)} /> : null }
                                {/* <img className='image' src={link.imgURL} alt={link.linkTitle} />  */}
                                <h3>{DOMPurify.sanitize(link.linkTitle)}</h3>
                                </a>:<a className='linkTitle' href={DOMPurify.sanitize(link.referencingURL)} onClick={async (e)=>{
                                e.preventDefault()
                                setIsLoading(true) 
                                // console.log('fired', link.referencingURL, link.entryId, mt)
                                const trashRequest = axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${DOMPurify.sanitize(link.referencingURL)}&mt=${mt}&red=f`)
                                // const trashRequest = await axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                // console.log('trashRequest', trashRequest)
                                setIsLoading(false)
                                toast((t)=>(<span>Directing You To:<br /><b>{DOMPurify.sanitize(link.referencingURL)}</b><br /><button onClick={() => {clearTimeout(urlShower); toast.dismiss(t.id)}}>Cancel/Stay Here</button></span>))
                                urlShower = setTimeout(function(){clearTimeout(urlShower);window.location.href = DOMPurify.sanitize(link.referencingURL)}, 3000)
                                }}>
                                {link.imgURL?<img className='image' src={DOMPurify.sanitize(link.imgURL)} alt={DOMPurify.sanitize(link.linkTitle)} /> : null }
                                {/* <img className='image' src={link.imgURL} alt={link.linkTitle} />  */}
                                <h3>{DOMPurify.sanitize(link.linkTitle)}</h3>
                            </a>}
                            {link.description !== ' '?<span><p className="linkDescriptionTag">▼</p>
                            <p className='linkDescription'>{DOMPurify.sanitize(link.description)}</p></span> :null}
                        </div>

                )
            }))
            setLinks(thelinks)}
            // console.log('res.data', res.data.length)
            if(res.data.length == 0){
                const emptyList = {0:true}
                const emptiedList = emptyList.map((x) => {
                    console.log('x', "\n[Object object]", x)
                    return (
                        <div className='linkSquare'>
                            <a className='linkTitle' href='#' onClick={(e)=>{e.preventDefault()}}>
                                <h3>This List Is Empty</h3>
                            </a>
                            <br />
                            <div className="linkSquareButtonHolder"><br /></div>
                            <p className="linkDescriptionTag">▼</p>
                            <p className='linkDescription'><br />This entry automatically disappears once an entry is added to this list.<br /></p>
                        </div>
                    )
                })
                setLinks(emptiedList)
            }
            // console.log('thelinks',thelinks)
            // if 
            // console.log(res.data[0])
            if(res.data.length>0&&res.data[0].backColor){
                // console.log('backColor Changed Bruh!')
                setBackgroundColor(`${res.data[0].backColor}`)
            }
            if(res.data.length>0&&res.data[0].txtColor){
                // console.log('textColor Changed Bruh!')
               setTextColor(`${res.data[0].txtColor}`)
            }
            if(res.data.length>0&&res.data[0].fontSelection){
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
                        content.style.maxHeight = content.scrollHeight + 100 + "px"
                    }
                })
            }
            // for each imgURL string in the array map out a corresponding lightbox component 
            const thePics = imagesArray.map((daimage, index) => {
                return (
                    <div className="imageSlide">
                        <div className="numbertxt">{parseInt(index,10)+1} / {imagesArray.length}</div>
                        <img src={daimage.imgurl} alt={daimage.tit} style={{width:"100%"}}/>
                    </div>
                )
            })
            const theThumbs = imagesArray.map((daimage, index) => {
                return (
                    <div className="imgcolumn">
                        <img src={daimage.imgurl} alt={daimage.tit} className="thumb" />
                    </div>
                )
            })
            setLightbox(thePics)
            setThumbs(theThumbs)
            const allImageThumbs = document.getElementsByClassName('thumb')
            for(i=0;i<allImageThumbs.length;i++){
                const indexplusone = i+1
                allImageThumbs[i].addEventListener('click', function (){
                    console.log('fired', indexplusone)
                    currentSlide(n = indexplusone)
                    // showSlides(slideIndex = indexplusone)
                })
            }
            // ban right click
            const allTrackedLinks = document.getElementsByClassName('linkTitle')
            for(i=0; i < allTrackedLinks.length; i++){
                allTrackedLinks[i].addEventListener('contextmenu', function (e) { 
                    // do something here... BAN
                    e.preventDefault(); 
                }, false);
                // allTrackedLinks[i].addEventListener('oncontextmenu', e => {
                    //     e.preventDefault();
                    // });
                }
                
                // initialize in custom color mode
                if(res.data.length>0&&mql===false){var txtColorElement0 = document.getElementsByClassName('linkDescription')
                var k
                for (k=0; k< txtColorElement0.length; k++){
                    txtColorElement0[k].style.color = `${res.data[0].txtColor}`
                    // txtColorElement[j].style.color = `${res.data[0].backColor}`
                }}
                if(res.data.length>0){
                    var borderElement0 = document.getElementsByClassName('linkSquare')
                    var arrowChangeColor = document.getElementsByClassName('linkDescriptionTag')
                    var n
                    for (n=0; n< borderElement0.length; n++){
                        borderElement0[n].style.border = `2px solid ${res.data[0].txtColor}`
                        // arrowChangeColor[n].style.color = `${res.data[0].txtColor}`
                        // borderElement0[n].style.backgroundColor = `${backgroundColor}`
                    }
                    for(n=0;n<arrowChangeColor.length;n++){
                        arrowChangeColor[n].style.color = `${res.data[0].txtColor}`
                    }
                }
                if(res.data.length>0){
                var headerDividerBar = document.getElementsByClassName('linkListDisplayHeader')
                headerDividerBar[0].style.borderBottom = `0.25vh solid ${res.data[0].txtColor}`
                // headerDividerBar[0].style.backgroundColor = `${backgroundColor}`
                var headerTextElement = document.getElementById('headerName')
                headerTextElement.style.color = `${res.data[0].txtColor}`
                var mainBackgroundElement = document.getElementsByClassName('theMain')
                // console.log(mainBackgroundElement[0].style.backgroundColor)
                if(res.data.length>0&&res.data[0].listBackgroundURL !== null){
                    mainBackgroundElement[0].style.backgroundImage = `url("${res.data[0].listBackgroundURL}")`
                } else {
                    if(res.data.legth>0){
                        mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, ${res.data[0].txtColor}, ${res.data[0].backColor})`
                    } else{
                        mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, #FFFFFF, #000000)`
                    }
                }}
                // console.log('mql', mql)            
                if(mql.matches === true && res.data.length>0 ){
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
        .catch(err => {console.log('err', err); toast.error('that site does not exist, yet. or check your connection.')})
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
                            <h1 id="headerName">{displayName===null?DOMPurify.sanitize(userFirstNameLastName):DOMPurify.sanitize(displayName)}</h1>
                            <br /> 
                            <img src={profilePictureURL} className="hover-shadow" alt={profilePictureURL} onClick={()=>{document.getElementById("theBox").style.display = "block";currentSlide(1)}} />
                        </div>
                        {/* <img src={profilePictureURL} alt={profilePictureURL} style={{width:"200px"}}/>  */}
                        <div className="drawer">
                            <h2> ©{new Date().getFullYear()}  <a href="https://link-in.bio/"><span className="footerLink"> Link-in.Bio Ltd</span></a></h2>
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
                <Helmet>
                    <meta name="description" content={`${window.location.host}${ourURL} - ${displayName===null?DOMPurify.sanitize(userFirstNameLastName):DOMPurify.sanitize(displayName)}'s Link-In Bio Account`} />
                </Helmet>
                <div id="theBox" className="modal">
                    <span className="close cursor" onClick={()=>{document.getElementById("theBox").style.display = "none";}}>&times;</span>
                    <div className="modal-content">
                        {lightbox}
                        <a className="prev" onClick={()=>{showSlides(slideIndex += -1);}}>&#10094;</a>
                        <a className="next" onClick={()=>{showSlides(slideIndex += 1);}}>&#10095;</a>
                        <div class="caption-container">
                            <p id="caption"></p>
                        </div>
                        {thumbs}
                    </div>
                </div>
            </div>
        )
    }
}

export default ListDisplayHooks