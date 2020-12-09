import React, { useState } from "react"
import axios from "axios"
import loadingGif from "../files/loading.gif"
import "../App.css"

function AddEntryWithFile(){

    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState()
    const [imagePreviewURL, setImagePreviewURL] = useState()
    const [bigdata, setBigData] = useState({
        referencingURL:'',
        description:'',
        linkTitle:'',
        
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        try{
            const formData = new FormData()
            formData.append('myImage', file)
            const addingToProfile = await axios.post(`https://link-in-bio.herokuapp.com/e/uploadPhoto/${userId}`, formData, {headers:{'Content-Type': 'multipart/form-data', authorization:token}})
            console.log('addingtoProfile', addingToProfile)
            if(addingToProfile.data.message === 'Successfully Uploaded Picture'){
                const imgURL = addingToProfile.data.pictureURL
                const shackImageId = addingToProfile.data.shackImageId
                const addingEntry = await axios.post('https://link-in-bio.herokuapp.com/e/new', { userId:userId, listId:listId, referencingURL:bigdata.referencingURL, description:bigdata.description, linkTitle:bigdata.linkTitle, imgURL:imgURL, shackImageId:shackImageId }, { headers: {authorization: token} })
                console.log('addingEntry', addingEntry)
                if(addingEntry.data.result[0].entryId && addingEntry.data.result[0].referencingURL){
                    const addingStatView = await axios.get(`https://link-in-bio.herokuapp.com/s/?eid=${addingEntry.data.result[0].entryId}&ref=${addingEntry.data.result[0].referencingURL}&red=f`)
                    console.log('addingstatview', addingStatView)
                    if(addingStatView.data){
                        setBigData({referencingURL:'',description:'',linkTitle:''})
                        setIsLoading(false)
                        alert('Upload Successful, Refresh this page to see the change.')
                    } else {
                        setIsLoading(false)
                        alert('Error Adding StatView to Entry')
                    }
                } else {
                    setIsLoading(false)
                    alert('Error Adding Entry After Photo')
                }
            } else {
                setIsLoading(false)
                alert('Error Uploading Photo')
            }
        } catch (err) {
            console.log('catcherror', err)
            alert('Failed Adding Entry With Photo')
            setIsLoading(false)
        }
    }

    const handleChangeText = (event) => {
        event.preventDefault()
        setBigData({
            ...bigdata,
            [event.target.name]:event.target.value
        })
    }

    const handleImageChange = (event) => {
        event.preventDefault()
        console.log('event target',event.target)
        if(event.target.files.length>0){
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onloadend = () => {
                setFile(file)
                // console.log('url thingy', URL.createObjectURL(file))
                // console.log(file)
                // console.log(reader.result, reader.result.length)
                setImagePreviewURL(reader.result)
                // console.log('reader',reader)
            }
            reader.readAsDataURL(file)
        } else {
            setImagePreviewURL()
            return
        }
    }

    if(isLoading === true){
        return (<div>
            <img src={loadingGif} alt="Loading" />
        </div>)
    } else {
        return (<div>
            <hr />
            <br />
            <h2>Add A New Link Below:</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    Link Title: <input type="text" onChange={handleChangeText} name="linkTitle" maxLength="498" placeholder="Link Title" required />
                </label>
                <br />
                <br />
                <label>
                    Link Description: <input type="text" onChange={handleChangeText} name="description" maxLength="498" placeholder="Description" required />
                </label>
                <br />
                <br />
                <label>
                    Website to Link: <input type="url" onChange={handleChangeText} name="referencingURL" maxLength="498" placeholder="Site to Link" required />
                </label>
                <br />
                <br />
                <label>
                Add Your Image Here: <br /> <br />
                <input type="file" name='myImage' accept="image/*" onChange={handleImageChange} />
                </label>

                {imagePreviewURL?<button type="submit">Add to Profile</button>:null}
            </form>
            <br />
            <div>
                {imagePreviewURL?<img id="imgPreview" src={imagePreviewURL} />:<div>Please Select an Image to Upload</div>}
            </div>
            <br />
            <hr />
        </div>)
    }
}

export default AddEntryWithFile