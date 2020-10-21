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
        const intermediate = chosenCustom.split(" ").join("")
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
                {isAvailable ? <p>✔️ {lastCheckedCURL} is Available!</p> : null}
                {isNotAvailable ? <p>❌ {lastCheckedCURL} is already taken, sorry!</p> : null}
            </div>
        )

}

export default AvailabilityChecker