import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import '../App.css';


function ListDisplayHooks(match) {

    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [ourURL] = useState(match.match.url)
    const [profilePictureURL, setProfilePictureURL] = useState()
    const [userFirstNameLastName, setUserFirstNameLastName] = useState()
    const [displayingUserInfo, setDisplayingUserInfo] = useState()
    const [darkMode, setDarkMode] = useState(true)

    const applyDarkMode = () => {
        // var element = document.body;
        var element = document.getElementsByClassName('App')
        element[0].classList.toggle("darkMode")
        setDarkMode(!darkMode) 
    }

    useEffect(() => {
        const useThisURL = `https://link-in-bio.herokuapp.com${ourURL}`
        axios.get(useThisURL)
        .then(async res => {
            const userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName}`
            const profilePictureURL = `${res.data[0].profilePictureURL}`
            const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            setDisplayingUserInfo(displayingUserInfo)
            const incrementedListViews = axios.get(`https://link-in-bio.herokuapp.com/s/ili/${res.data[0].listId}`)
            // console.log(incrementedListViews)
            setIsLoading(false);
            var element0 = document.getElementsByClassName('App')
            element0[0].classList.toggle("darkMode")
            const thelinks = (res.data.map((link) => {
                return (

                        <div className='linkSquare' key={link.entryId}>
                            <a className='linkTitle' href={`http://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}`}>
                                <img className='image' src={link.imgURL} alt={link.linkTitle} /> 
                                <h3>{link.linkTitle}</h3>
                            </a>
                            <p className='linkDescription'>{link.description}</p>
                        </div>

                )
            }))
            setLinks(thelinks)
            // mobile vh/innerHeight fix to display footer onload across all mobile browsers
            const domComponents = document.getElementsByClassName('linkList')
            domComponents[0].style.height = `${window.innerHeight}px`;
            // We listen to the resize event
            window.addEventListener("resize", () => {
            // We execute the same script as before
            domComponents[0].style.height = `${window.innerHeight}px`;
            });
            window.scrollTo(0, window.innerHeight)

        })
        .catch(err => {console.log('err', err); alert('that site does not exist, yet. or check your connection.')})
    }, [])


    if(isLoading===true){
        return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
    } else if (displayingUserInfo === 'false'){
        return (
            <div className="linkList">
                <header className="linkListDisplayHeader"><h2>Welcome to Link-in.Bio/</h2></header>
                <main>
                    {links}
                </main>
                <footer>
                    <h4>{darkMode ? <span onClick={applyDarkMode}>☀️</span>:<span>🌙</span>} ©{new Date().getFullYear()} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
                </footer>
            </div>

        )
    } else {
        return (
            <div className="linkList">
                <header className="linkListDisplayHeader">
                    {/* <hr/> */}
                    <div>
                        <img src={profilePictureURL} alt={profilePictureURL} /> 
                        {/* <img src={profilePictureURL} alt={profilePictureURL} style={{width:"200px"}}/>  */}
                        <h1>
                            {userFirstNameLastName}
                        </h1>
                    </div>
                {/* <hr /> */}
                </header>
                <main>
                    {links}
                </main>
                <footer>
                    <h4>{darkMode ? <span onClick={applyDarkMode}>☀️</span>:<span onClick={applyDarkMode}>🌙</span>} ©{new Date().getFullYear()} <a href="http://yhy.fi/"><span className="footerLink">YHY Oy:</span></a> <a href="http://link-in.bio/"><span className="footerLink">Link-in.Bio/</span></a></h4>
                </footer>
                
            </div>

        )
    }
}

export default ListDisplayHooks