import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import loadingGif from '../files/loading.gif'
import toast from 'react-hot-toast'
import {softwareLicense} from './SoftwareLicense'

function Maksaa(){
    const [isLoading, setIsLoading] = useState(false)
    const [emailAddress, setEmailAddress] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [referredBy, setReferredBy] = useState('organic')
    const [agreed, setAgreed] = useState(false)
    const recapRef = useRef()
    const rpk = '6LcdDdoZAAAAAH8I2TC1gEREIep33Me2lEzwijhv'
    const hasNoIllegalChars = (value) => {
        // const stringHasSpaces = value.indexOf(' ')
        const stringHasIllegalSlash1 = value.indexOf(`\\`)
        const stringHasIllegalSlash2 = value.indexOf(`/`)
        const stringHasIllegalQuote1 = value.indexOf(`'`)
        const stringHasIllegalQuote2 = value.indexOf(`"`)
        const stringHasIllegalSemicolon = value.indexOf(`;`)
        const stringHasIllegalColon = value.indexOf(`:`) 
        const stringHasIllegalCaret = value.indexOf(`^`)
        const stringHasIllegalStar = value.indexOf(`*`)
        const stringHasIllegalHTML = value.indexOf(`<`)
        const stringHasIllegalPercent = value.indexOf('%')
        if(
            stringHasIllegalSlash1 === -1 &&
            stringHasIllegalSlash2 === -1 &&
            stringHasIllegalQuote1 === -1 &&
            stringHasIllegalQuote2 === -1 &&
            stringHasIllegalSemicolon === -1 &&
            stringHasIllegalColon === -1 &&
            stringHasIllegalCaret === -1 &&
            stringHasIllegalHTML === -1 &&
            stringHasIllegalStar === -1 &&
            stringHasIllegalPercent === -1
            // stringHasSpaces === -1 && 
        ){
            return true
        } else {
            return false
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(agreed === true){
            setIsLoading(true)
            //verify valid email
            // console.log('haschars', hasNoIllegalChars(emailAddress))
            if(hasNoIllegalChars(emailAddress) == true && hasNoIllegalChars(firstName) == true && hasNoIllegalChars(lastName) == true){
                const token = await recapRef.current.executeAsync()
                recapRef.current.reset()
                // console.log('token', token)
                const validEmail = await axios.post('https://link-in-bio.limited/mailer/checkValid', {email:emailAddress, token:token})
                // console.log('validEmail', validEmail)
                if(validEmail.status === 200 && validEmail.data.message === 'valid'){
                    const passthroughObj = {firstName:firstName.trim(), lastName:lastName.trim(), referredBy:referredBy}
                    const passthroughString = JSON.stringify(passthroughObj)
                    const trimmedEmail = emailAddress.trim()
                    // console.log('passed through', passthroughString, trimmedEmail)
                    //activate paddle
                    setLastName('')
                    setFirstName('')
                    setEmailAddress('')
                    setReferredBy('organic')
                    setIsLoading(false)
                    return Paddle.Checkout.open({
                        product: 631279,
                        email: trimmedEmail,
                        passthrough:passthroughString,
                        success:'https://link-in.bio/'
                    });
                }
            } else{
                setIsLoading(false)
                // console.log('illegalChar')
                return toast.error('You have illegal characters in your input')
            }
        } else {
            return toast.error('You must endorse the agreement to continue.')
        }
    }
    const handleChangeEmail = (evt) => {
        evt.preventDefault()
        setEmailAddress(evt.target.value)
    }
    const handleCheckbox = (evt) => {
        // evt.preventDefault()
        setAgreed(evt.target.checked)
    }
    const handleOptionChange = (evt) => {
        evt.preventDefault()
        setReferredBy(evt.target.value)
    }
    const handleChangeFirstName = (evt) => {
        evt.preventDefault()
        setFirstName(evt.target.value)
    }
    const handleChangeLastName = (evt) => {
        evt.preventDefault()
        setLastName(evt.target.value)
    }
    
    return (<div>
        <br /><label>
        Software License Agreement: <br /> <br />
        {isLoading===true?<div><br/><img src={loadingGif} alt="Loading" /><br /></div>:<textarea disabled rows="20" cols="50" value={softwareLicense}></textarea>}
        </label>
        <br />
        <form onSubmit={handleSubmit}>
            <label>
                I read and agree to the terms : <input value={agreed} type="checkbox" onChange={handleCheckbox}/>
            </label>
            <br />
            <label>
                Your Email Address: <input value={emailAddress} type="email" name="email" onChange={handleChangeEmail} required maxLength="125" placeholder="Email Address" autocomplete="email" />
            </label>
            <br />
            <label>
                Legal First Name: <input value={firstName} name="firstName" type="text" onChange={handleChangeFirstName} required maxLength="125" placeholder="First Name" autocomplete="given-name" />
            </label>
            <br />
            <label>
                Legal Last Name: <input value={lastName} name="lastName" type="text" onChange={handleChangeLastName} required maxLength="125" placeholder="Last Name" autocomplete="family-name"/>
            </label>
            <br />
            <label>
                How Did You Hear About Us? <br />
                <select onChange={handleOptionChange}>
                    <option value="organic">Organically</option>
                    <option value="influencer">Influencer</option>
                    <option value="media">News/Media</option>
                    <option value="meme">Meme</option>
                </select>
            </label>
            <br />
            {agreed === true ?<div><p>After completing signup, Please check your Email.</p><br /><button type="submit">Subscribe for <span className="paddle-gross" data-product="631279">$5</span>/mo</button></div> :null}
        </form>
        <ReCAPTCHA sitekey={rpk} size="invisible" ref={recapRef} />
    </div>)
    
}

export default Maksaa