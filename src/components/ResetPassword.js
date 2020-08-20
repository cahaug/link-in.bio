import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'

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
                <h3>Request a code here:</h3>
                {/* <img wizard image /> */}
            </div>
            <div>
                <form id="passwordResetForm" onSubmit={onFormSubmit}>
                    <label>
                        Email: <input onChange={onInputChange} value={formData.email} name="email" type="text" />
                        {errors.email.length>0 ? <p className='error'>{errors.email}</p>:null}
                    </label>
                    <br />
                    <label>
                        Submit Reset Password Request:
                        <input className="abutton" type="submit" />
                    </label>
                </form>
            </div>
            
        </div>
    )
}

export default ResetPassword