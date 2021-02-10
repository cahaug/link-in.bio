import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CUPicker = () => {
    const [currentCustom, setCurrentCustom] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const getValue = async () => {
        try {
            const token = sessionStorage.getItem('token')
            const listId = sessionStorage.getItem('listId')
            const urlDataValue = await axios.post('https://link-in-bio.limited/l/resolveCustom', {listId:listId}, {headers:{authorization:token}})
            // console.log('urlDataValue',urlDataValue)
            // alert(`https://link-in.bio/${urlDataValue.data[0].customURL}`)
            setCurrentCustom(urlDataValue.data[0].customURL)
            setIsLoading(false)

        } catch(err){
            // console.log('err',err)
        }
    }

    useEffect(() => {
        if(currentCustom){
            return
        } else {
            getValue()
        }
    })

    if(isLoading===true){
        return (
            <div>
                {/* <p>Your Current CustomURL is:</p> */}
                <p>Loading...</p>
            </div>
        )
    } else {
        if(currentCustom !== null){
            return (
                <div>
                    {/* <p>Your Current CustomURL is:</p> */}
                    <p><a alt="Your Custom URL" href={currentCustom}>{currentCustom}</a></p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You Don't Have A Custom URL Yet</p>
                </div>
            )
        }
    }
}

export default CUPicker