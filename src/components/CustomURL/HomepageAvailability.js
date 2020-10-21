import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

const HomepageAvailability = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [chosenCustom, setChosenCustom] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)
    const [isNotAvailable, setIsNotAvailable] = useState(false)
    const [lastCheckedCURL, setLastCheckedCURL] = useState('')
    const reRef = useRef()

    const handleChange = (event) => {
        event.preventDefault()
        setChosenCustom(event.target.value)
    }

    const submitCheckChosenCustom = async (event) => {
        event.preventDefault()
        //recaptcha code
        const token = await reRef.current.executeAsync()
        reRef.current.reset()
        console.log('token', token)
        setIsAvailable(false)
        setIsNotAvailable(false)
        setIsLoading(true)
        const intermediate = chosenCustom.split(" ").join("").toLowerCase()
        setLastCheckedCURL(intermediate)
        console.log('intermediate', intermediate)
        setChosenCustom('')
        return axios.post('https://link-in-bio.herokuapp.com/l/checkCHomepage', {customURL:intermediate, token:token})
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
                <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHAPUBLIC} size="invisible" ref={reRef} />
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
            </div>
        )

}

export default HomepageAvailability