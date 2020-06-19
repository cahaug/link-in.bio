import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
function ListDisplayHooks(props) {
    // console.log('props1', props)
    // super(props)
    const [isLoading, setIsLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [ourURL, setourURL] = useState(props.location.pathname)
    // const ourURL = props.location.pathname
    // console.log('oURL', ourURL)
    useEffect(() => {
        // console.log('this.props', props)
        // console.log('ourURL2', ourURL)
        const useThisURL = `https://link-in-bio.herokuapp.com${ourURL}`
        axios.get(useThisURL)
        .then(res => {
            // console.log('the data', res.data);
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

    return (
        <div>
            
            {isLoading?
            <h1>at least she's loading</h1>:
            <div><h1>done loading</h1><p>{links}</p></div>}
        </div>
    )
}

export default ListDisplayHooks