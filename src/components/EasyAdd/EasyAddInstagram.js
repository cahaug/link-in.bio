import React, { useState } from 'react'
import axios from 'axios'
import loadingGif from '../../files/loading.gif'

const EasyAddInstagram = () => {
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onChangeUsername = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        // console.log()
        const linkTitle = `${username} - ${sessionStorage.getItem('firstName')}'s Instagram`
        const description = `My Instagram Profile 📸`
        const referencingURL = `https://instagram.com/${username}`
        const imgURL = 'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png'
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        return axios.post('https://link-in-bio.limited/e/new', { userId:userId, listId:listId, referencingURL:referencingURL, description:description, linkTitle:linkTitle, imgURL:imgURL }, { headers: {authorization: token} })
        .then(async (res) => {
            // console.log('successful res',res)
            const statForNewEntry = await axios.get(`https://link-in-bio.limited/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`)
            // console.log('statForNewEntry',statForNewEntry)
            setIsLoading(false)
            alert('Link To Instagram Successfully Added to Account')
        })
        .catch((err) => {
            // console.log('error easyadd', err)
            alert('Error EasyAdd Instagram Account')
        })
    }

    return (
        <div>
            {isLoading? <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/> :
            <div>
                <br />
                <h2>Enter your Instagram Handle (Account Name) Here:</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Instagram.com/<input value={username} required name="username" placeholder="username" type="text" onChange={onChangeUsername} />
                    </label>
                    <br />
                    <button type="submit">Add Instagram to Link-in.Bio/</button>
                </form>
            </div>
            }
        </div>
    )
}

export default EasyAddInstagram