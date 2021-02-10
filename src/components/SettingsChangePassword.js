import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'

const SettingsChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [errors, setErrors] = useState({
        notTheSame:false,
        notLongEnough:false,
        noSymbol:false,
        noNumber:false
    })

    const handlePasswordChange = (event) => {event.preventDefault(); setPassword(event.target.value)}
    const handleNewPassChange = (event) => {event.preventDefault(); setNewPassword(event.target.value)}
    const handleNewPass2Change = (event) => {event.preventDefault(); setNewPassword2(event.target.value)}


    const validate = () => {
        let currentRunErrors = 0
        if(newPassword.length<8){
            currentRunErrors += 1
            setErrors({...errors, notLongEnough:true})
        } 
        if(newPassword != newPassword2){
            currentRunErrors += 1
            setErrors({...errors, notTheSame:true})
        } 
        let symbolCount = 0
        let numCount = 0
        const symbolDict = ['~','!','@','#','$','€','%','^','&','*','(',')','-','_','[',']','{','}','|',':',';',',','.','<','>','"','+','=']
        var i
        for(i=0;i<newPassword.length;i++){
            let currentChar = parseInt(newPassword[i],10)
            // console.log('currentChar', i, newPassword[i])
            if(`${currentChar}` == 'NaN'){
                if(symbolDict.includes(newPassword[i])){
                    // console.log('symbols +1')
                    symbolCount += 1
                }
            } else {
                numCount += 1
            }
        }
        // console.log('final symbolcount', symbolCount)
        // console.log('final numcount', numCount)
        if (symbolCount<1){
            currentRunErrors += 1
            setErrors({...errors, noSymbol:true})
        } 
        if(numCount<1){
            currentRunErrors += 1
            setErrors({...errors, noNumber:true})
            // console.log(errors)
        } 
        if(currentRunErrors===0){
            // alert('password good to go')
            return true
        } else {
            // alert('current run errors #', currentRunErrors)
            // console.log('errors',errors)
            return false
        }
    }


    const submitChange = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const validationRes = await validate()
            // console.log('validation', validationRes)
            if(validationRes === true){
                // console.log('validationRes true')
                const token = sessionStorage.getItem('token')
                const email = sessionStorage.getItem('email')
                const changePwResolved = await axios.put('https://link-in-bio.limited/auth/SettingsCPW', { email:email, password:password, newPassword:newPassword }, {headers:{authorization:token}})
                // console.log('changepwResolved',changePwResolved)
                if(changePwResolved.data.updatedPassword === 1){
                    setPassword('')
                    setNewPassword('')
                    setNewPassword2('')
                    setErrors({
                        notTheSame:false,
                        notLongEnough:false,
                        noSymbol:false,
                        noNumber:false
                    })
                    setIsLoading(false)
                    // alert('Password Changed Successfully')
                    toast.success('Password Changed Successfully')
                } else {
                    setIsLoading(false)
                    // alert('Error Changing Password ')
                    toast.error('Error Changing Password ')
                }
            } else {
                // console.log('validationRes returned false', errors)
                setIsLoading(false)
                // alert('Your new password does not fit the password requirements.')
                toast.error('Your new password does not fit the password requirements.')
            }
        } catch(err){
            // console.log('err',err)
            // alert('There was a problem changing your password.')
            toast.error('There was a problem changing your password.')
        }

    }


    if(isLoading===true){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        return(
            <div>
                <br />
                <form onSubmit={submitChange}>
                    <label>
                        Enter Your Current Password:<br />
                        <input onChange={handlePasswordChange} value={password} name="Password" type="password" required placeholder="Current Password" autocomplete="current-password" /><br />
                    </label>
                    <br />
                    <label>
                        Enter Your New Password:<br />
                        <input onChange={handleNewPassChange} value={newPassword} name="New Password" type="password" required placeholder="New Password" autocomplete="new-password" /><br />
                    </label>
                    <br />
                    <label>
                        Confirm Your New Password:<br />
                        <input onChange={handleNewPass2Change} value={newPassword2} name="Confirm New Password" type="password" required placeholder="Confirm New Password" autocomplete="new-password" /><br />
                    </label>
                    <br />
                    {errors.notTheSame?<p>❌ New Password and Confirm New Password Must Match</p>:null}
                    {errors.notLongEnough?<p>❌ Password Must Be Longer than Eight Characters</p>:null}
                    {errors.noSymbol?<p>❌ New Password Must Contain A Symbol</p>:null}
                    {errors.noNumber?<p>❌ New Password Must Contain a Number</p>:null}
                    <br />
                    <button type="submit">Submit Password Change</button>
                </form>
                <br />
            </div>
        )
    }


}

export default SettingsChangePassword