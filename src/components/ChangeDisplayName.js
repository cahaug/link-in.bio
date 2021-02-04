import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'

const ChangeDisplayName = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [displayName, setDisplayName] = useState('')
    
    const handleChange = (event) => {
        event.preventDefault()
        setDisplayName(event.target.value)
    }
    const submitDisplayNameChange = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        return axios.put('https://link-in-bio.limited/l/setDisplayName', {userId:userId, listId:listId, displayName:displayName}, {headers:{authorization:token}})
        .then(res => {
            // console.log('display Name change res', res)
            setDisplayName('')
            setIsLoading(false)
            toast.success('Display Name Updated Successfully')
        })
        .catch(err => {
            // console.log('change display name err',err)
            toast.error('Error in Changing Display Name')
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
                <form onSubmit={submitDisplayNameChange}>
                    <label>
                        Your Display Name Lives at the Top of Your Page.<br />
                        Change Your Display Name Below. <br /> <br />
                        <input onChange={handleChange} value={displayName} name="DisplayName" type="text" required maxLength="127" placeholder="Your Display Name Here" />
                    </label>
                    <br />
                    <button type="submit">Submit Change to Display Name</button>
                </form>
                <br />
            </div>
        )
    }
}


export default ChangeDisplayName