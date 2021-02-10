import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'

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
        const shackImageId = null
        return axios.put('https://link-in-bio.limited/l/changeProfilePicture', {userId:userId, profilePictureURL:profilePictureURL, shackImageId:shackImageId}, {headers:{authorization:token}})
        .then(res => {
            // console.log('profPicChangeRes', res)
            setProfilePictureURL('')
            setIsLoading(false)
            // alert('Profile Picture Updated Successfully')
            toast.success('Profile Picture Updated Successfully')
        })
        .catch(err => {
            // console.log('change profilepicURL err',err)
            setIsLoading(false)
            // alert('Error in Changing Profile Picture URL')
            toast.error('Error in Changing Profile Picture URL')
        })
    }
    const deleteProfilePicture = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        const profilePictureURL = 'https://imagizer.imageshack.com/img924/128/aacWe9.jpg'
        const shackImageId = null
        return axios.put('https://link-in-bio.limited/l/changeProfilePicture', {userId:userId, profilePictureURL:profilePictureURL, shackImageId:shackImageId}, {headers:{authorization:token}})
        .then(res => {
            // console.log('swapped prof to anon & deleted old res', res.data)
            setIsLoading(false)
            // alert('Deleted Profile Picture Successfully')
            toast.success('Deleted Profile Picture Successfully')
        })
        .catch(err => {
            // console.log('err deleting profile picture', err)
            setIsLoading(false)
            // alert('Unsuccessful Deleting Profile Picture')
            toast.error('Unsuccessful Deleting Profile Picture')
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
                        Only links to valid image files will correctly display. <br />
                        Alternatively, Upload a Profile Picture in the bottom tab.<br /> <br />
                        <input onChange={handleURLChange} value={profilePictureURL} name="ProfilePictureURL" type="url" required maxLength="499" placeholder="https://asdf.com/image.jpg" />
                    </label>
                    <br />
                    <button type="submit">Submit Change to Profile Picture URL</button>
                </form>
                <br />
                <hr />
                <br />
                <h2>Delete Profile Picture</h2>
                <h2>Warning: This Cannot Be Undone</h2>
                <br />
                <h2>This copy of that photo will be gone forever.</h2>
                <br />
                <button type="abutton" onClick={deleteProfilePicture}>Delete Profile Picture</button>
                <br /><br />
                <hr />
                <br />
            </div>
        )
    }
}


export default ProfilePictureChanger