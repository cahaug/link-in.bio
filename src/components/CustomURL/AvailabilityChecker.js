import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AvailabilityChecker = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [chosenCustom, setChosenCustom] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)
    const [isNotAvailable, setIsNotAvailable] = useState(false)
    const [lastCheckedCURL, setLastCheckedCURL] = useState('')
    const [prefixHost, setPrefixHost] = useState('https://link-in.bio/')

    const handleChange = (event) => {
        event.preventDefault()
        setChosenCustom(event.target.value)
    }

    const setPrefix = (event) => {
        event.preventDefault()
        setPrefixHost(event.target.value)
    }

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

    const submitCheckChosenCustom = (event) => {
        event.preventDefault()
        setIsAvailable(false)
        setIsNotAvailable(false)
        setIsLoading(true)
        let intermediate = chosenCustom.split(" ").join("").toLowerCase()
        // console.log('intermediate', intermediate)
        if(hasNoIllegalChars(intermediate) === true){
            setChosenCustom('')
            const secondaryIntermediate = `${prefixHost}${intermediate}`
            setLastCheckedCURL(`${secondaryIntermediate.slice(8)}`)
            // console.log('secondaryIntermediate', secondaryIntermediate)
            const token = sessionStorage.getItem('token')
            return axios.post('https://link-in-bio.limited/l/checkCustom', {customURL:secondaryIntermediate}, {headers:{authorization:token}})
            .then(res => {
                // console.log('res.data chosenCustom', res.data)
                if(res.data.length === 0){
                    setIsAvailable(true)
                    setIsLoading(false)
                    // alert('Available')
                    toast.success('Available')
                } else {
                    setIsNotAvailable(true)
                    setIsLoading(false)
                    toast.error('Already Taken')
                    // alert('Already Taken')
                }
            })
        }else {
            // alert(`There are illegal characters in your input, please remove them and try again`)
            toast.error(`There are illegal characters in your input, please remove them and try again`)
            // return false
        }
    }

    const submitChangeCustom = (event) => {
        event.preventDefault()
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        const token = sessionStorage.getItem('token')
        const customURL = `https://${lastCheckedCURL}`
        return axios.put('https://link-in-bio.limited/l/putCustom', { userId: userId, listId: listId, customURL:customURL }, { headers: {authorization:token} })
        .then((res) => {
            // console.log('submit change res', res.data)
            if(res.data.resultant == 1){
                // console.log('success message',res.data.message)
                // alert(`Custom URL Updated Successfully to ${customURL}`)
                toast.success(`Custom URL Updated Successfully to ${customURL}`)
            } else {
                // console.log('partial failure')
                // alert('Check Console')
                toast.error('Check Console')
            }
        })
        .catch(err => {
            // console.log('error submit change custom', err)
            // alert('There was an issue updating your CustomURL')
            toast.error('There was an issue updating your CustomURL')
        })

    }


        return (
            <div>
                <br />
                <form onSubmit={submitCheckChosenCustom}>
                    <label>
                        Is Your Name Free? Check Availability:<br />
                        <select onChange={setPrefix}>
                            <option value="https://link-in.bio/">link-in.bio/</option>
                            <option value="https://linkinbio.us/">linkinbio.us/</option>
                            <option value="https://link-in-bio.us/">link-in-bio.us/</option>
                            <option value="https://link-m.ee/">link-m.ee/</option>
                            <option value="https://link-me.ee/">link-me.ee/</option>
                            <option value="https://link-in-profile.co/">link-in-profile.co/</option>
                            <option value="https://link-in-description.co/">link-in-description.co/</option>
                            <option value="https://the-link.is/">the-link.is/</option>
                            <option value="https://this-links.to/">this-links.to/</option>
                            <option value="https://pstd.at/">pstd.at/</option>
                            <option value="https://down.af/">down.af/</option>
                            <option value="https://what-i.lv/">what-i.lv/</option>
                            <option value="https://this.af/">this.af/</option>
                            <option value="https://7zz.ch/">7zz.ch/</option>
                            <option value="https://bio-link.me/">bio-link.me/</option>
                            <option value="https://for-my.art/">for-my.art/</option>
                            <option value="https://for-my.click/">for-my.click/</option>
                            <option value="https://for-my.club/">for-my.club/</option>
                            <option value="https://for-my.design/">for-my.design/</option>
                            <option value="https://for-my.digital/">for-my.digital/</option>
                            <option value="https://for-my.fans/">for-my.fans/</option>
                            <option value="https://for-my.health/">for-my.health/</option>
                            <option value="https://for-my.link/">for-my.link/</option>
                            <option value="https://for-my.network/">for-my.network/</option>
                            <option value="https://for-my.news/">for-my.news/</option>
                            <option value="https://for-my.shop/">for-my.shop/</option>
                            <option value="https://for-my.studio/">for-my.studio/</option>
                            <option value="https://i-am.so/">i-am.so/</option>
                            <option value="https://i-am.name/">i-am.name/</option>
                            <option value="https://i-am.onl/">i-am.onl/</option>
                            <option value="https://i-am.show/">i-am.show/</option>
                            <option value="https://i-am.place/">i-am.place/</option>
                            <option value="https://i-am.directory/">i-am.directory/</option>
                            <option value="https://im-he.re/">im-he.re/</option>
                            <option value="https://listen-he.re/">listen-he.re/</option>
                            <option value="https://look-he.re/">look-he.re/</option>
                            <option value="https://resumelink.me/">resumelink.me/</option>
                            <option value="https://stream-he.re/">stream-he.re/</option>
                            <option value="https://watch-he.re/">watch-he.re/</option>
                        </select>
                        <br /><br />
                        {prefixHost.slice(8)}
                    </label>
                    <input onChange={handleChange} value={chosenCustom} name="CustomURL" type="text" required maxLength="96" placeholder="YourNameHere"  />
                    <br />
                    {isLoading? <p>Searching Database...</p>:<button type="submit">Check CustomURL Availability</button>}
                </form>
                <br />
                {isAvailable ? <div><p>✔️ {lastCheckedCURL} is Available!</p><br /></div> : null}
                {isNotAvailable ? <div><p>❌ {lastCheckedCURL} is already taken, sorry!</p><br /></div> : null}
                {isAvailable ? <button onClick={submitChangeCustom}>Apply this Custom URL</button> : null}
            </div>
        )

}

export default AvailabilityChecker