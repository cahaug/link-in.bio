import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import loadingGif from '../files/loading.gif'


function ResetPassword(){
    const [formData, setFormData] = useState({
        email:'',
    })

    const [errors, setErrors] = useState({
        email:'',
    })

    const [messageBack, setMessageBack] = useState({
        message:'',
    })
    
    const [isWaiting, setIsWaiting] = useState(false)

    const formSchema = Yup.object().shape({
        email: Yup
        .string()
        .trim()
        .lowercase()
        .email("Must Be The Email Account for Your Link-in.Bio")
        .required("Cannot Be Empty")
        .min(6, "An Email is at least 6 characters long")
    })

    const validate = (event) => {
        Yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            // console.log('valid',valid)
            setErrors({
                ...errors,
                [event.target.name]:''
            })
        })
        .catch(err => {
            // console.log('err',err)
            setErrors({
                ...errors,
                [event.target.name]:err.errors[0]
            })
        })
    }

    const onInputChange = event => {
        event.persist()
        validate(event)
        setMessageBack({message:''})
        setFormData({
            ...formData,
            [event.target.name]:event.target.value,
        })
    }

    const onFormSubmit = async event => {
        event.preventDefault()
        setIsWaiting(true)
        const cast = formSchema.cast(formData)
        // console.log('cast',cast)
        await formSchema.isValid(cast)
        .then(async function(valid) {
            if(valid===true){
                // console.log('valid formdata good to send '+ formData.email)
                try {
                    const requestResponse = await axios.post('https://link-in-bio.limited/mailer/resetPW', {email:formData.email})
                    // console.log('requestResponse',requestResponse)
                    if (requestResponse.data.hasOwnProperty('infoResponse')){
                        setMessageBack({message:`All Good: ${requestResponse.data.message}`})
                        setIsWaiting(false)
                    } else {
                        setIsWaiting(false)
                        setMessageBack({message:`There was an issue: ${requestResponse.data.message}`})
                    }
                } catch (err) {
                    setIsWaiting(false)
                    setMessageBack({message:`Double Check that you Entered Your Email Correctly.`})
                    // console.log('inner err', err)
                }
            } else {
                setIsWaiting(false)
                alert('error in form submission, try again')
            }
        })
        .catch(err => {
            // console.log('err', err)
            setIsWaiting(false)
            alert('shit fucked up', err)
        })
    }

    return (
        <div>
            <div>
                <h1>Link-in.Bio/</h1>
                <h2>Password Reset Wizard</h2>
                <h3>Request a code here:</h3>
                <br/>
                <span className="wizard" style={{height:"200px"}}>🧙</span>
                <br/>            
            </div>
            <div>
                <form id="passwordResetForm" onSubmit={onFormSubmit}>
                    <label>
                        Email: <input onChange={onInputChange} value={formData.email} name="email" type="text" autocomplete="username" />
                        {errors.email.length>0 ? <p className='error'>{errors.email}</p>:null}
                    </label>
                    <br />
                    <label>
                        Submit Reset Password Request:
                        <input className="abutton" type="submit" />
                    </label>
                </form>
                <br/>
                <h3>{messageBack.message !== '' ? 'The Wizard Says: '+  messageBack.message : null}</h3>
                <div>{isWaiting ? <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/> : null}</div>
            </div>
            <br />
            <div>
                <Link to='/resetpwcode'><span className="abutton">Enter Reset Code</span></Link>
                <br/> <br />
                <Link to='/login'><span className="abutton">Return to Login</span></Link>
            </div>

        </div>
    )
}

export default ResetPassword