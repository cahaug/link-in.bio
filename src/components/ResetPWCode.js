import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import loadingGif from '../files/loading.gif'


function ResetPWCode(){
    const [formData, setFormData] = useState({
        email:'',
        newPassword:'',
        resetCode:''
    })

    const [errors, setErrors] = useState({
        email:'',
        newPassword:'',
        resetCode:''
    })

    const [isWaiting, setIsWaiting] = useState(false)

    const [messageBack, setMessageBack] = useState({
        message:'',
    })

    const formSchema = Yup.object().shape({
        email: Yup
        .string()
        .trim()
        .lowercase()
        .email("Must Be The Email Account for Your Link-in.Bio")
        .required("The Field Cannot Be Empty")
        .min(6, "An Email is at Least 6 Chars Long"),
        newPassword: Yup
        .string()
        .min(8, "Passwords must be at least eight (8) characters long.")
        .required("A New Password is Required"),
        resetCode: Yup
        .string()
        .trim()
        .min(6, "Your Reset Code is Six Digits")
        .max(6, "Your Reset Code is Six Digits")


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
                    const requestResponse = await axios.post('https://link-in-bio.limited/mailer/checkCode', {email:formData.email, newPassword:formData.newPassword, resetCode:formData.resetCode})
                    // console.log('requestResponse', requestResponse)
                    if (requestResponse.data.successfulDeletion === 1){
                        setIsWaiting(false)
                        setFormData({ email:'', newPassword:'', resetCode:''})
                        setMessageBack({message:`All Good: ${requestResponse.data.message}`})
                    } else {
                        setIsWaiting(false)
                        setMessageBack({message:`There was an issue: ${requestResponse.data.message}`})
                    }
                } catch (err) {
                    setIsWaiting(false)
                    // console.log('inner err', err)
                }
            } else {
                setIsWaiting(false)
                setMessageBack('error in form submission, try again')
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
                <br/>
                <span className="wizard" style={{height:"200px"}}>🧙</span>
                <br/>
                <h3>Enter your Email, New Password and Reset Code here:</h3>
            </div>
            <div>
                <form id="passwordResetForm" onSubmit={onFormSubmit}>
                    <label>
                        Email: <input onChange={onInputChange} value={formData.email} name="email" type="text" autocomplete="username" />
                        {errors.email.length>0 ? <p className='error'>{errors.email}</p>:null}
                    </label>
                    <br />
                    <label>
                        New Password: <input onChange={onInputChange} value={formData.newPassword} name="newPassword" type="password" autocomplete="new-password" />
                        {errors.newPassword.length>0 ? <p className='error'>{errors.newPassword}</p>:null}
                    </label>
                    <br />
                    <label>
                        Code: <input onChange={onInputChange} value={formData.resetCode} name="resetCode" type="text" />
                        {errors.resetCode.length>0 ? <p className='error'>{errors.resetCode}</p>:null}
                    </label>
                    <br />
                    <label>
                        Submit New Password:
                        <input className="abutton" type="submit" />
                    </label>
                </form>
                <br/>
                <h3>{messageBack.message !== '' ? 'The Wizard Says: '+ messageBack.message : null}</h3>
                <div>{isWaiting ? <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/> : null}</div>
            </div>

            <br />
            <div>
                <Link to='/resetpassword'><span className="abutton">Request New Email</span></Link>
                <br/> <br />
                <Link to='/login'><span className="abutton">Return to Login</span></Link>
            </div>

        </div>
    )
}

export default ResetPWCode