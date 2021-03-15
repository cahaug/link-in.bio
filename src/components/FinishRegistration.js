import React, {useRef, useState} from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'
const queryString = require('query-string');
const parameteres = (typeof document === 'undefined') ? {} : queryString.parse(window.location.search)

const FinishRegistration = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [tooken, setToken] = useState(parameteres.to || '')
    const [email, setEmail] = useState(parameteres.em || '')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [succesful, setSuccessful] = useState(false)
    const reRef = useRef()

    const handleChangeEmail = (event) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const handleChangeToken = (event) => {
        event.preventDefault()
        setToken(event.target.value)
    }

    const handleChangePassword = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const validate = () => {
        let littleerrors = []
        if(password.length<8){
            toast.error('Please Select a Longer Password')
            littleerrors.push(` Your Password must be 8 characters or longer. `)
        }
        if(password.toLowerCase() === password || password.toUpperCase() === password){
            toast.error('Please Use Upper and Lower Case Letters')
            littleerrors.push(` Your Password must be include upper AND lower case letters. `)
        }
        let hasNumber = false
        const split = password.split('')
        var i
        for(i=0; i<split.length; i++){
            let thing = parseInt(split[i],10)
            // console.log('typeofsplit[i]', typeof thing)
            if(thing !== 'NaN'){
                hasNumber = true
            }
        }
        if(hasNumber === false){
            littleerrors.push(` Your Password must include a number. `)
        }
        setErrors(JSON.stringify(littleerrors))
        if(littleerrors.length === 0){
            return true
        } else{
            return false
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // perform validation and axios request
        setErrors('')
        const validation = validate()
        if(validation === true){
            //recaptcha code
            const token = await reRef.current.executeAsync()
            reRef.current.reset()
            // console.log('token', token)
            setIsLoading(true)
            return axios.post('https://link-in-bio.limited/numbers/finish', {password:password, tooken:tooken, email:email, token:token})
            .then(res => {
                // console.log('setPasswordResData', res.data)
                setPassword('')
                setSuccessful(true)
                setIsLoading(false)
                toast.success('Password Successfully Set.')
                toast.success('You can now log into your Account from the homepage.')
            })
        } else {
            toast.error('Please Address Password Errors')
        }
    }


    if(tooken.length>15 && email.length>5){
        return (
            <div>
            {isLoading === true?<p>Loading...</p>:<div>
                <br />
                <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHAPUBLIC} size="invisible" ref={reRef} />
                <form onSubmit={handleSubmit}>
                    <p>Your Password Must Be 8 characters long with both at least one capital letter and at least one number.</p>
                    <br />
                    <label>Set Password: <input onChange={handleChangePassword} type="password" name="password" placeholder="Set New Password" required autocomplete="new-password"/></label> 
                    <br />{errors.length>5?<p>{errors}</p>:null}<br />
                    <button type="submit">Set Password</button>
                </form>
                {succesful === true ? <a href='https://link-in.bio/login'>Go To Login</a>:null}
                <br />
            </div>}</div>
        )
    }else{
        return(
            <div>
                <br />
                <p>This page only activates when you link to it from your registration email.</p>
                <br />
            </div>
        )
    }
}

export default FinishRegistration
