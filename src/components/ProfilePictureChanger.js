import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

const ProfilePictureChanger = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [profilePictureURL, setProfilePictureURL] = useState('')
    const handleURLChange = (event) => {
        event.preventDefault()
        setProfilePictureURL(event.target.value)
    }
    const submitProfilePictureURLChange = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        return axios.put('https://link-in-bio.herokuapp.com/l/changeProfilePicture', {userId:userId, profilePictureURL:profilePictureURL}, {headers:{authorization:token}})
        .then(res => {
            console.log('profPicChangeRes', res)
            setProfilePictureURL('')
            setIsLoading(false)
            alert('Profile Picture Updated Successfully')
        })
        .catch(err => {
            console.log('change profilepicURL err',err)
            alert('Error in Changing Profile Picture URL')
        })
    }

    if(isLoading == true){
        return(
            <div>
                <p>Loading...</p>
            </div>
        ) 
    } else {
        return (
            <div>
                <br />
                <form onSubmit={submitProfilePictureURLChange}>
                    <label>
                        Choose an image on the web and open it in a new tab.<br />
                        Copy the URL for that image, and add it below.<br />
                        Only links to valid image files will correctly display. <br /> <br />
                        <input onChange={handleURLChange} value={profilePictureURL} name="ProfilePictureURL" type="url" required maxLength="499" placeholder="https://asdf.com/image.jpg" />
                    </label>
                    <br />
                    <button type="submit">Submit Change to Profile Picture URL</button>
                </form>
                <br />
            </div>
        )
    }
}


export default ProfilePictureChanger