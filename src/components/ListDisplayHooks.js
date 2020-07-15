import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'


function ListDisplayHooks(match) {

    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [ourURL] = useState(match.match.url)
    const [profilePictureURL, setProfilePictureURL] = useState()
    const [userFirstNameLastName, setUserFirstNameLastName] = useState()
    const [displayingUserInfo, setDisplayingUserInfo] = useState()

    useEffect(() => {
        const useThisURL = `https://link-in-bio.herokuapp.com${ourURL}`
        axios.get(useThisURL)
        .then(res => {
            const userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName[0].slice(0,1)}.`
            const profilePictureURL = `${res.data[0].profilePictureURL}`
            const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            setDisplayingUserInfo(displayingUserInfo)
            setIsLoading(false);
            const thelinks = (res.data.map((link) => {
                return (

                        <div className='signup' key={link.entryId}>
                            <a className='linkTitle' href={`http://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}`}>
                                <img className='image' src={link.imgURL} alt={link.imgURL} /> <br /> <br />
                                {link.linkTitle}
                            </a> <br />
                            <p className='linkDescription'>{link.description}</p>
                        </div>

                )
            }))
            setLinks(thelinks)
        })
        .catch(err => {console.log('err', err); alert('that site does not exist, yet. or check your connection.')})
    }, [])

    const today = new Date();
    const year = today.getFullYear();

    if(isLoading===true){
        return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
    } else if (displayingUserInfo === 'false'){
        return (
            <div className="linkList">
                <section>
                    {links}
                </section>
                <h4>©{year} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
            </div>

        )
    } else {
        return (
            <div className="linkList">
                <header className="linkListDisplayHeader">
                    <hr/><br />
                    <h3>
                        <img src={profilePictureURL} alt={profilePictureURL} style={{width:"200px"}}/> 
                        <br />
                        {userFirstNameLastName}
                    </h3>
                <br /><hr />
                </header>
                <section>
                    {links}
                </section>
                <h4>©{year} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
            </div>

        )
    }
}

export default ListDisplayHooks