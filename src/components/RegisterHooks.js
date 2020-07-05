import React, { useState } from 'react'
import Recaptcha from 'react-recaptcha'
// import loadingGif from '../files/loading.gif'
import * as Yup from "yup"

function RegisterHooks(){
    // const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        profilePictureURL: '',
        referredBy: 'from_Cale',
        terms: false,
        isVerified:false,
        isRecaptchaLoaded:false,
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        profilePictureURL: '',
        terms: '',
        isVerified:'',
    })

    const formSchema = Yup.object().shape({
        email: Yup
            .string()
            .trim()
            .lowercase()
            .email("Must be a valid email address.")
            .required("Must include an email address."),
        password: Yup
            .string()
            .min(6, "Passwords must be at least six (6) characters long.")
            .required("Password is Required"),
        firstName: Yup
            .string()
            .trim()
            .required("Please Enter your First Name")
            .min(2, "First name is tofo short")
            .max(20, "First name is longer than 20 characters"),
        lastName: Yup
            .string()
            .trim()
            .required("Please Enter your Last Name")
            .min(2, "Last name is too short")
            .max(20, "Last name is longer than 20 characters"),
        profilePictureURL: Yup
            .string()
            .trim()
            .url("Please Enter a Valid Image URL"),
        terms: Yup
            .string()
            .oneOf(['on', 'true'], "You must accept the Terms and Conditions"),
        isVerified: Yup
            .boolean()
            .oneOf([true], "Please complete the RECAPTCHA to verify you are human"),
        isRecaptchaLoaded: Yup
            .boolean()
            .oneOf([true, false], "Please refreshe the page")
    })

    const recaptchaLoaded = (event) => {
        setFormData({
            ...formData,
            isRecaptchaLoaded: true
        })
    }

    const verifyCallback = (event) => {
        setFormData({
            ...formData,
            isVerified: true
        })
    }

    const validate = (event) => {
        Yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]:""
                })
            })
            .catch(err => {
                console.log(err)
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                })
            })
    }

    const onInputChange = event => {
        event.persist()
        validate(event)
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
        setFormData({
            ...formData,
            [event.target.name]: value,
        })
    }


    const onFormSubmit = async event => {
        event.preventDefault()
        const cast =  formSchema.cast(formData)
        await formSchema.isValid(cast)
        .then(function(valid) {
            if (valid===true){
                alert(
                    'valid to submit'
                )
            }
            else {
                alert(
                    'There is an Error in Your Form Entry, Please Look Back and Try Again'
                )
            }
        })
        .catch(err => {
            console.log(err)
            alert('Form Could Not Be Validated')
        })
    }

    return (
        <div>
        <div className='signupheader'>
            <h1>LinkList Sign Up</h1>
            <p>Thanks for your interest!</p>
        </div>
        <form id="registrationForm" onSubmit={onFormSubmit}>
            <label>
                Email: <input onChange={onInputChange} value={formData.email} name="email" type="text" />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p>:null}
            </label>
            <label>
                Password: <input onChange={onInputChange} value={formData.password} name="password" type="password" />
                {errors.password.length > 0 ? <p className="error">{errors.password}</p>:null}
            </label>
            <label>
                First Name: <input onChange={onInputChange} value={formData.firstName} name="firstName" type="text" />
                {errors.firstName.length > 0 ? <p className="error">{errors.firstName}</p>:null}
            </label>
            <label>
                Last Name: <input onChange={onInputChange} value={formData.lastName} name="lastName" type="text" />
                {errors.lastName.length > 0 ? <p className="error">{errors.lastName}</p>:null}
            </label>
            <label>
                Profile Picture URL: <input onChange={onInputChange} value={formData.profilePictureURL} name="profilePictureURL" type="text" />
                {errors.profilePictureURL.length > 0 ? <p className="error">{errors.profilePictureURL}</p>:null}
            </label>
            <label>
                Terms And Conditions: <input name="terms" type="checkbox" checked={formData.terms} onChange={onInputChange} />
                {errors.terms.length > 0 ? <p className="error">{errors.terms}</p>:null}
            </label>
            <label>
                Where Did You Hear About Link-In.Bio/ ? 
                <select>
                    <option value="from_Cale">From Cale</option>
                    <option value="by_chance">By Chance</option>
                    <option value="influencer1">Influencer #1 Name</option>
                    <option value="influencer2">Influencer #2 Name</option>
                </select>
            </label>
            <Recaptcha
                sitekey="6Lf5n-cUAAAAACjg7VIXj2fUkfGK-zkeQ2mSXNGX"
                render="explicit"
                onloadCallback={recaptchaLoaded}
                verifyCallback={verifyCallback}
                theme="dark"
            />
            <br />
            {errors.isVerified.length > 0 ? <p className="error">{errors.isVerified}</p>:null}
            <br />
            <label>
                Submit Registration:
                <input className="abutton" type="submit" />
            </label>
        </form>
        </div>
    )
}

export default RegisterHooks