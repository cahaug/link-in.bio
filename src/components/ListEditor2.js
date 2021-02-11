import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'
import ResetPassword from "./ResetPassword"
import toast from "react-hot-toast"

function ListEditor2(){
    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [profilePictureURL, setProfilePictureURL] = useState()
    const [userFirstNameLastName, setUserFirstNameLastName] = useState()
    const [displayName, setDisplayName] = useState()
    const [ourURL] = useState(sessionStorage.getItem('listId'))
    const [darkMode, setDarkMode] = useState(false)
    const [drawerPulled, setDrawerPulled] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
    const [textColor, setTextColor] = useState('#000000')
    const [chosenFont, setChosenFont] = useState()
    const [backgroundURL, setBackgroundURL] = useState('')


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
            // console.log(mainBackgroundElement[0].style.backgroundColor)
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
            // console.log(mainBackgroundElement[0].style.backgroundColor)
            // mainBackgroundElement[0].style.backgroundColor = '#000000'
            if(backgroundURL.length<8){
                mainBackgroundElement[0].style.backgroundImage = 'linear-gradient(70deg, #151515, black)'
            }        }
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

    const deleteEntry = (entryId) => {
        // console.log('entryId',entryId)
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        const token = sessionStorage.getItem('token')
        const useThisURL = `https://link-in-bio.limited/e/deleteEntry`
        return axios.post(useThisURL, {entryId: entryId, listId:listId, userId:userId}, {headers:{authorization:token}})
        .then(response => {
            // alert('Entry Successfully Deleted')
            toast.success('Entry Successfully Deleted')
            // console.log('deleteEntryRes',response)
            window.location.reload()
        })
        .catch(err => {
            // console.log('error deleting', err)
            toast.error('Error Deleting Entry')
        })
    }

    const monthsDict = {'01':'January', '02':'February', '03':'March', '04':'April', '05':'May', '06':'June', '07':'July', '08':'August', '09':'September', '10':'October', '11':'November', '12':'December'}

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
        const useThisURL = `https://link-in-bio.limited/s/aio/${sessionStorage.getItem('userId')}`
        axios.get(useThisURL, { headers: {authorization: sessionStorage.getItem('token')} })
        .then(async res => {
            // console.log('backend res', res)
            const normalList = await axios.get(`https://link-in-bio.limited/${sessionStorage.getItem('listId')}`)
            // console.log('normal list', normalList)
            let userFirstLastName; let displayName; let profilePictureURL;
            if(res.data.length !== 0){
                userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName}`
                displayName = res.data[0].displayName
                profilePictureURL = `${res.data[0].profilePictureURL}`
            }else{
                userFirstLastName = `Empty Link-In Bio`
                displayName = `Empty Link-In Bio`
                profilePictureURL = `https://imagizer.imageshack.com/img924/128/aacWe9.jpg`
            }
            // const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setDisplayName(displayName)
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            if(normalList.data.length>0&&normalList.data[0].listBackgroundURL !== null){
                const backgroundImageURL = `${normalList.data[0].listBackgroundURL}`
                setBackgroundURL(backgroundImageURL)
            }
            // setDisplayingUserInfo(displayingUserInfo)
            // const incrementedListViews = axios.get(`https://link-in-bio.limited/s/ili/${res.data[0].listId}`)
            // console.log(incrementedListViews)
            setIsLoading(false);
            const mt = navigator.maxTouchPoints
            if(res.data.length>0){
            const thelinks = (res.data.map((link) => {
                // console.log('link.keys.length', link)
                if(link.hasOwnProperty('entryId')){
                    return (
    
                            <div className='linkSquare' key={link.entryId}>
                                {link.referencingURL === ' '?<a className='linkTitle' href='#' onClick={async (e)=>{
                                        e.preventDefault()
                                        // console.log('fired', link.referencingURL, link.entryId, mt)
                                        const trashRequest = axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                        // const trashRequest = await axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                        // console.log('trashRequest', trashRequest)
                                    }}>
                                    {link.imgURL?<img className='image' src={link.imgURL} alt={link.linkTitle} /> : null }
                                    {/* <img className='image' src={link.imgURL} alt={link.linkTitle} />  */}
                                    <h3>{link.linkTitle}</h3>
                                    </a>:<a className='linkTitle' href={link.referencingURL} onClick={async (e)=>{
                                        e.preventDefault()
                                        setIsLoading(true) 
                                        // console.log('fired', link.referencingURL, link.entryId, mt)
                                        const trashRequest = axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                        // const trashRequest = await axios.get(`https://link-in-bio.limited/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}&red=f`)
                                        // console.log('trashRequest', trashRequest)
                                        setIsLoading(false)
                                        window.location.href = link.referencingURL
                                    }}>
                                    {link.imgURL?<img className='image' src={link.imgURL} alt={link.linkTitle} /> : null }
                                    {/* <img className='image' src={link.imgURL} alt={link.linkTitle} />  */}
                                    <h3>{link.linkTitle}</h3>
                                </a>}
                                <br />
                                <p>Views: {link.count}</p>
                                <div className="linkSquareButtonHolder">
                                    {/* <Link className="squareButton" to={`/editEntry/${link.entryId}`}><button className="squareButton">Edit Entry</button></Link> */}
                                    <a href={`/editEntry/${link.entryId}`}><button className="squareButton">Edit Entry</button></a>
                                    <br />
                                    <button className="sqaureButton" onClick={() => {deleteEntry(link.entryId)}}>Delete Entry</button>
                                </div>
                                <p className="linkDescriptionTag">▼</p>
                                <p className='linkDescription'>{link.description} <br /> <br />Added: {monthsDict[`${link.creationDate.slice(5,7)}`]} {link.creationDate.slice(8,10)}, at {link.creationDate.slice(11,16)} UTC</p>
                            </div>
    
                    )

                } else {
                    console.log(' ')
                }
            }))
            setLinks(thelinks)
            }else{
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

            // initialize in custom color mode
            if(res.data.length>0){
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
            // console.log(mainBackgroundElement[0].style.backgroundColor)
            if(normalList.data.length>0&&normalList.data[0].listBackgroundURL !== null){
                mainBackgroundElement[0].style.backgroundImage = `url("${normalList.data[0].listBackgroundURL}")`
            } else {
                if(normalList.data.length>0){
                    mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, ${res.data[0].txtColor}, ${res.data[0].backColor})`
                }else{
                    mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, #FFFFFF, #000000)`
                }
            }
            let mql = window.matchMedia('(prefers-color-scheme: dark)')
            // console.log('mql', mql)            
            if(mql.matches === true ){
                headerTextElement.style.color = ColorLuminance(`${res.data[0].txtColor}`, 2)
                // initialize in dark mode
                if(`${res.data[0].txtColor}`==='#000000'){
                    headerTextElement.style.color = '#FFFFFF'    
                }
                var element0 = document.getElementsByClassName('App')
                element0[0].classList.toggle("darkMode")
                setDarkMode(true)
            }}
        })
        .catch(err => {console.log('err')})
    }, [])

    if(isLoading===true){
        return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
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
                            <h4> ©{new Date().getFullYear()}  <a href="https://link-in.bio/"><span className="footerLink"> Link-in.Bio Ltd</span></a></h4>
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

export default ListEditor2