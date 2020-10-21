import React, { useState } from 'react'
import axios from 'axios'

const AvailabilityChecker = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [chosenCustom, setChosenCustom] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)
    const [isNotAvailable, setIsNotAvailable] = useState(false)
    const [lastCheckedCURL, setLastCheckedCURL] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        setChosenCustom(event.target.value)
    }

    const submitCheckChosenCustom = (event) => {
        event.preventDefault()
        setIsAvailable(false)
        setIsNotAvailable(false)
        setIsLoading(true)
        const intermediate = chosenCustom.split(" ").join("").toLowerCase()
        setLastCheckedCURL(intermediate)
        console.log('intermediate', intermediate)
        setChosenCustom('')
        return axios.post('https://link-in-bio.herokuapp.com/l/checkCustom', {customURL:intermediate})
        .then(res => {
            console.log('res.data chosenCustom', res.data)
            if(res.data.length === 0){
                setIsAvailable(true)
                setIsLoading(false)
                // alert('Available')
            } else {
                setIsNotAvailable(true)
                setIsLoading(false)
                // alert('Already Taken')
            }
        })
    }

    const submitChangeCustom = (event) => {
        event.preventDefault()
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        const token = sessionStorage.getItem('token')
        const customURL = lastCheckedCURL
        return axios.put('https://link-in-bio.herokuapp.com/l/putCustom', { userId: userId, listId: listId, customURL:customURL }, { headers: {authorization:token} })
        .then((res) => {
            console.log('submit change res', res.data)
            if(res.data.resultant == 1){
                console.log('success message',res.data.message)
                alert(`Custom URL Updated Successfully to ${customURL}`)
            } else {
                console.log('partial failure')
                alert('Check Console')
            }
        })
        .catch(err => {
            console.log('error submit change custom', err)
            alert('There was an issue updating your CustomURL')
        })

    }


        return (
            <div>
                <br />
                <form onSubmit={submitCheckChosenCustom}>
                    <label>
                        Is Your Name Free? Check Availability:<br />
                        link-in.bio/<input onChange={handleChange} value={chosenCustom} name="CustomURL" type="text" required maxLength="127" placeholder="YourNameHere"  />
                    </label>
                    <br />
                    {isLoading? <p>Searching Database...</p>:<button type="submit">Check CustomURL Availability</button>}
                </form>
                <br />
                {isAvailable ? <div><p>✔️ {lastCheckedCURL} is Available!</p><br /></div> : null}
                {isNotAvailable ? <div><p>❌ {lastCheckedCURL} is already taken, sorry!</p><br /></div> : null}
                {isAvailable ? <button onClick={submitChangeCustom}>Apply this Custom URL</button> : null}
            </div>
        )

}

export default AvailabilityChecker