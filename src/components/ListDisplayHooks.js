import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useParams } from 'react-router-dom'
import axios from "axios"
import loadingGif from '../files/loading.gif'


function ListDisplayHooks(match) {
    // console.log('props1', props)
    // super(props)
    // console.log('match', match.match.url)
    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [ourURL, setourURL] = useState(match.match.url)
    const [profilePictureURL, setProfilePictureURL] = useState()
    const [userFirstNameLastName, setUserFirstNameLastName] = useState()
    const [displayingUserInfo, setDisplayingUserInfo] = useState()
    // const ourURL = props.location.pathname
    // let { ourURL } = useParams("/:id")
    console.log('oURL', ourURL)
    useEffect(() => {
        // console.log('this.props', props)
        // console.log('ourURL2', ourURL)
        const useThisURL = `https://link-in-bio.herokuapp.com${ourURL}`
        console.log('thisURL',useThisURL)
        axios.get(useThisURL)
        // setourURL(ourURL)
        .then(res => {
            console.log('the data', res);
            const userFirstLastName = `${res.data[0].firstName} ${res.data[0].lastName[0].slice(0,1)}.`
            const profilePictureURL = `${res.data[0].profilePictureURL}`
            const displayingUserInfo = `${res.data[0].displayUserInfo}`
            setProfilePictureURL(profilePictureURL)
            setUserFirstNameLastName(userFirstLastName)
            setDisplayingUserInfo(displayingUserInfo)
            setIsLoading(false);
            const thelinks = (res.data.map((link) => {
                // localStorage.setItem('listId', link.listId)
                return (

                        <div className='signup' key={link.entryId}>
                            <a className='linkTitle' href={`http://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}`}>
                                <img className='image' src={link.imgURL} alt={link.imgURL} /> <br /> <br />
                                {link.linkTitle}
                            </a> <br />
                            <p>{link.description}</p>
                        </div>

                )
            }))
            setLinks(thelinks)
        })
        .catch(err => alert(err))
    }, [])

    const today = new Date();
    const year = today.getFullYear();

    // return (
    //     <div>
            
    //         {isLoading?
    //         <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>:
    //         <div>
    //             <section>
    //                 {links}
    //             </section>
    //             <h4>©{year} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
    //         </div>
    //         }
    //     </div>
    // )

    // {
        if(isLoading===true){
        // return <h1>Loading <img src={ellipsisGif} style={{width:"30px", paddingTop:"20px"}}/></h1>
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
    } else{
        return (
            <div className="linkList">
                <header>
                    <h3>
                        <img src={profilePictureURL} alt={profilePictureURL} style={{width:"200px"}}/> 
                        <br />
                        {userFirstNameLastName}
                    </h3>
                    {/* <p>~List Creator~</p> */}
                </header>
                <br /><hr /><br />
                <section>
                    {links}
                </section>
                <h4>©{year} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
            </div>

        )
    }
}

export default ListDisplayHooks