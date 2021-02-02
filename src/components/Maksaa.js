import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import loadingGif from '../files/loading.gif'
import toast from 'react-hot-toast'

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

const softwareLicense = `To use Link-In Bio’s hardware & software:

I agree to respect Link-In Bio Ltd and its online software & hardware. 

I agree to not attempt to hack, deface, or otherwise reverse engineer the hardware or software.

I understand that usage of this software is a privilege and can be revoked under the provisions outlined in our help center.  If my Link-In Bio account is deleted for abuse, I agree that I will not receive a refund.

I understand that Link-In Bio Ltd makes no warranties or claims to warranty for this product at the current time.

I understand Link-In Bio Ltd is a small and growing business, and I promise to keep my payment information current, and fulfill my agreed-upon payment obligations.  Should I wish to discontinue my account, I acknowledge I can do so myself through the Link-In Bio website. If at any point in a calendar month pay period I decide to cancel, I agree to be only refunded the payment of the most recent calendar month.

I understand that my monthly subscription payment pays for an exclusive, transferable, assignable right and license to use the software for one calendar month.  I understand that if my subscription payment fails, the account will be deleted.  I may access the website from any internet-connected device which can support it.

I agree to indemnify Link-In Bio Ltd and its direct affiliates of any damages which may arise from use of the software.

I agree that Link-In Bio Ltd reserves the right to amend this agreement, and will notify me by email if something changes.

I agree that Link-In Bio Ltd is real people and can be reached in real life or from our homepage.  I agree to attempting to resolve my disputes prior to taking legal action.  This agreement is governed by the state of Arizona, and I agree to resolve my dispute, should one arise, in the applicable state or federal courts of Arizona, in the United States of America. I understand that there is no waiving this agreement, and if any provision of this agreement is deemed invalid or unenforceable by a court of competent jurisdiction, such invalidity shall not affect the validity or operation of any other provision, and such invalid provisions shall be deemed to be severed from this agreement. This agreement constitutes the entire understanding between Link-In Bio Ltd and its customers, and revokes or supersedes all prior arrangements between the Link-In Bio Ltd, its affiliates, and any of its users.`


function Maksaa(){
    const [isLoading, setIsLoading] = useState(false)
    const [emailAddress, setEmailAddress] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [referredBy, setReferredBy] = useState('organic')
    const [agreed, setAgreed] = useState(false)
    const reRef = useRef()
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(agreed === true){
            setIsLoading(true)
            //verify valid email
            if(hasNoIllegalChars(emailAddress) && hasNoIllegalChars(firstName) && hasNoIllegalChars(lastName) && hasNoIllegalChars(referredBy)){
                const token = await reRef.current.executeAsync()
                reRef.current.reset()
                const validEmail = await axios.post('https://link-in-bio.limited/mailer/checkValid', {email:validEmail, token:token})
                console.log('validEmail', validEmail)
                if(validEmail.data.length > 0 && validEmail.data[0].message === 'valid'){
                    const passthroughObj = {firstName:firstName, lastName:lastName, referredBy:referredBy}
                    const passthroughString = JSON.stringify(passthroughObj)
                    //activate paddle
                    Paddle.Checkout.open({
                        product: 631279,
                        email: emailAddress,
                        passthrough:passthroughString
                    });
                }
            } else{
                setIsLoading(false)
                toast.error('You have illegal characters in your input')
            }
        } else {
            toast.error('You must endorse the agreement to continue.')
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
    
    if(isLoading===true){
        return (<div>
            <img src={loadingGif} alt="Loading" />
        </div>)
    } else {
        return (<div>
            <br /><label>
            Software License Agreement: <br /> <br />
            <textarea disabled rows="20" cols="50" value={softwareLicense}>
            </textarea>
            </label>
            <br />
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHAPUBLIC} size="invisible" ref={reRef} />
            <form onSubmit={handleSubmit}>
                <label>
                    I agree to the terms : <input value={agreed} type="checkbox" onChange={handleCheckbox}/>
                </label>
                <br />
                <label>
                    Your Email Address: <input value={emailAddress} type="text" name="email" onChange={handleChangeEmail} required maxLength="125" placeholder="Email Address" />
                </label>
                <br />
                <label>
                    Legal First Name: <input value={firstName} name="firstName" type="text" onChange={handleChangeFirstName} required maxLength="125" placeholder="First Name" />
                </label>
                <br />
                <label>
                    Legal Last Name: <input value={lastName} name="lastName" type="text" onChange={handleChangeLastName} required maxLength="125" placeholder="Last Name"/>
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
                {agreed === true ? <button type="submit">Subscribe for $5/mo</button> :null}
            </form>
        </div>)
    }
}

export default Maksaa