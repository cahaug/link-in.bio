import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'
import ResetPassword from "./ResetPassword"

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
            mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, ${textColor}, ${backgroundColor})`
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
            mainBackgroundElement[0].style.backgroundImage = 'linear-gradient(70deg, #151515, black)'
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

    const deleteEntry = (entryId) => {
        // console.log('entryId',entryId)
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        const token = sessionStorage.getItem('token')
        const useThisURL = `https://link-in-bio.herokuapp.com/e/deleteEntry`
        return axios.post(useThisURL, {entryId: entryId, listId:listId, userId:userId}, {headers:{authorization:token}})
        .then(response => {
            alert('Entry Successfully Deleted')
            console.log('deleteEntryRes',response)
            window.location.reload()
        })
        .catch(err => {
            console.log('error deleting', err)
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
        const useThisURL = `https://link-in-bio.herokuapp.com/s/aio/${sessionStorage.getItem('userId')}`
        axios.get(useThisURL, { headers: {authorization: sessionStorage.getItem('token')} })
        .then(async res => {
            console.log('backend res', res)
            const userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName}`
            const displayName = res.data[0].displayName
            const profilePictureURL = `${res.data[0].profilePictureURL}`
            // const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setDisplayName(displayName)
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            // setDisplayingUserInfo(displayingUserInfo)
            // const incrementedListViews = axios.get(`https://link-in-bio.herokuapp.com/s/ili/${res.data[0].listId}`)
            // console.log(incrementedListViews)
            setIsLoading(false);
            const mt = navigator.maxTouchPoints
            const thelinks = (res.data.map((link) => {
                console.log('link.keys.length', link)
                if(link.hasOwnProperty('entryId')){
                    return (
    
                            <div className='linkSquare' key={link.entryId}>
                                <a className='linkTitle' href={`http://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}&mt=${mt}`}>
                                    {link.imgURL?<img className='image' src={link.imgURL} alt={link.linkTitle} /> : null }
                                    {/* <img className='image' src={link.imgURL} alt={link.linkTitle} />  */}
                                    <h3>{link.linkTitle}</h3>
                                </a>
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
                    console.log('there was an empty')
                }
            }))
            setLinks(thelinks)
            console.log('thelinks',thelinks)
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
            mainBackgroundElement[0].style.backgroundImage = `linear-gradient(70deg, ${res.data[0].txtColor}, ${res.data[0].backColor})`
            let mql = window.matchMedia('(prefers-color-scheme: dark)')
            console.log('mql', mql)            
            if(mql.matches === true ){

                // initialize in dark mode
                var element0 = document.getElementsByClassName('App')
                element0[0].classList.toggle("darkMode")
                setDarkMode(true)
            }
        })
        .catch(err => {console.log('err', err); alert('that site does not exist, yet. or check your connection.')})
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
                            <h4> ©{new Date().getFullYear()} <a href="http://yhy.fi/"><span className="footerLink">YHY Oy:</span></a> <a href="http://link-in.bio/"><span className="footerLink">Link-in.Bio/</span></a></h4>
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