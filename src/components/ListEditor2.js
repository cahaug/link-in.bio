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
    const [ourURL] = useState(sessionStorage.getItem('listId'))
    const [darkMode, setDarkMode] = useState(true)
    const [drawerPulled, setDrawerPulled] = useState(false)

    const applyDarkMode = () => {
        // var element = document.body;
        var element = document.getElementsByClassName('App')
        element[0].classList.toggle("darkMode")
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
        const useThisURL = `https://link-in-bio.herokuapp.com/e/deleteEntry`
        return axios.post(useThisURL, {entryId: entryId})
        .then(response => {
            alert('Entry Successfully Deleted')
            window.location.reload()
        })
    }

    useEffect(() => {
        const useThisURL = `https://link-in-bio.herokuapp.com/s/aio/${sessionStorage.getItem('listId')}`
        axios.get(useThisURL, { headers: {authorization: sessionStorage.getItem('token')} })
        .then(async res => {
            console.log('backend res', res)
            const userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName}`
            const profilePictureURL = `${res.data[0].profilePictureURL}`
            // const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            // setDisplayingUserInfo(displayingUserInfo)
            // const incrementedListViews = axios.get(`https://link-in-bio.herokuapp.com/s/ili/${res.data[0].listId}`)
            // console.log(incrementedListViews)
            setIsLoading(false);
            // initialize in dark mode
            var element0 = document.getElementsByClassName('App')
            element0[0].classList.toggle("darkMode")
            const thelinks = (res.data.map((link) => {
                console.log('link.keys.length', link)
                if(link.hasOwnProperty('entryId')){
                    return (
    
                            <div className='linkSquare' key={link.entryId}>
                                <a className='linkTitle' href={`http://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}`}>
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
                                    <button className="sqaureButton" onClick={()=>{deleteEntry(link.entryId)}}>Delete Entry</button>
                                </div>
                                <p className="linkDescriptionTag">▼</p>
                                <p className='linkDescription'>{link.description}</p>
                            </div>
    
                    )

                } else {
                    console.log('there was an empty')
                }
            }))
            setLinks(thelinks)
            console.log('thelinks',thelinks)
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
                    <div>
                        <div className="picHolder">
                            <div className="toggleHolder">
                                {darkMode ? <span onClick={applyDarkMode}>💡</span>:<span onClick={applyDarkMode}>🔦</span>}
                                {drawerPulled ? <span onClick={drawerToggle}>💭</span>:<span onClick={drawerToggle}>💬</span>}
                            </div>
                            <br />
                            <h1>{userFirstNameLastName}</h1>
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
                <main>
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