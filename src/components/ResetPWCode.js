import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'

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
        .min(6, "Passwords must be at least six (6) characters long.")
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
            console.log('valid',valid)
            setErrors({
                ...errors,
                [event.target.name]:''
            })
        })
        .catch(err => {
            console.log('err',err)
            setErrors({
                ...errors,
                [event.target.name]:err.errors[0]
            })
        })
    }

    const onInputChange = event => {
        event.persist()
        validate(event)
        setFormData({
            ...formData,
            [event.target.name]:event.target.value,
        })
    }

    const onFormSubmit = async event => {
        event.preventDefault()
        const cast = formSchema.cast(formData)
        console.log('cast',cast)
        await formSchema.isValid(cast)
        .then(async function(valid) {
            if(valid===true){
                alert('valid email good to send '+ formData.email)
                try {
                    alert('message sent')
                } catch (err) {
                    console.log('inner err', err)
                }
            } else {
                alert('error in form submission, try again')
            }
        })
        .catch(err => {
            console.log('err', err)
            alert('shit fucked up', err)
        })
    }

    return (
        <div>
            <div>
                <h1>Link-in.Bio/</h1>
                <h2>Password Reset Wizard</h2>
                {/* <img wizard image /> */}
                <h3>Enter your Email, New Password and Reset Code here:</h3>
            </div>
            <div>
                <form id="passwordResetForm" onSubmit={onFormSubmit}>
                    <label>
                        Email: <input onChange={onInputChange} value={formData.email} name="email" type="text" />
                        {errors.email.length>0 ? <p className='error'>{errors.email}</p>:null}
                    </label>
                    <br />
                    <label>
                        New Password: <input onChange={onInputChange} value={formData.newPassword} name="newPassword" type="password" />
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
            </div>
            
        </div>
    )
}

export default ResetPWCode