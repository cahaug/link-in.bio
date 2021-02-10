import React, { useState } from "react"
import axios from "axios"
import loadingGif from "../files/loading.gif"
import "../App.css"
import toast from "react-hot-toast"

function AddEntryWithFile(){

    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState()
    const [object, setObject] = useState()
    const [imagePreviewURL, setImagePreviewURL] = useState()
    const [bigdata, setBigData] = useState({
        referencingURL:'',
        description:'',
        linkTitle:'',
        
    })
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        try{
            const formData = new FormData()
            // console.log('wtf is file', typeof file, file)
            formData.append('myImage', file)
            // formData.append('myImage', fs.createReadStream(object))
            // console.log('formData', formData)
            const addingToProfile = await axios.post(`https://link-in-bio.limited/e/uploadPhoto/${userId}`, formData, {headers:{'Content-Type': 'multipart/form-data', authorization:token}, onUploadProgress:
            (progressEvent) => {
                // console.log('progress event', progressEvent)
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                // console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    // console.log('setUploadProgress', progressEvent)
                    setUploadProgress(Math.round( (progressEvent.loaded * 100) / totalLength ));
                }
            }})
            // console.log('addingtoProfile', addingToProfile)
            if(addingToProfile.data.message === 'Successfully Uploaded Picture'){
                const imgURL = addingToProfile.data.pictureURL
                const shackImageId = addingToProfile.data.shackImageId
                const addingEntry = await axios.post('https://link-in-bio.limited/e/new', { userId:userId, listId:listId, referencingURL:bigdata.referencingURL, description:bigdata.description, linkTitle:bigdata.linkTitle, imgURL:imgURL, shackImageId:shackImageId }, { headers: {authorization: token} })
                // console.log('addingEntry', addingEntry)
                if(addingEntry.data.result[0].entryId && addingEntry.data.result[0].referencingURL){
                    const addingStatView = await axios.get(`https://link-in-bio.limited/s/?eid=${addingEntry.data.result[0].entryId}&ref=${addingEntry.data.result[0].referencingURL}&red=f`)
                    // console.log('addingstatview', addingStatView)
                    if(addingStatView.data){
                        setBigData({referencingURL:'',description:'',linkTitle:''})
                        setImagePreviewURL()
                        setIsLoading(false)
                        setUploadProgress(0)
                        toast.success('Upload Successful, Refresh this page to see the change.')
                    } else {
                        setIsLoading(false)
                        toast.error('Error Adding StatView to Entry')
                    }
                } else {
                    setIsLoading(false)
                    toast.error('Error Adding Entry After Photo')
                }
            } else {
                setIsLoading(false)
                toast.error('Error Uploading Photo')
            }
        } catch (err) {
            // console.log('catcherror', err)
            toast.error('Failed Adding Entry With Photo')
            toast.error('Please Try Again with a Smaller Photo, under 15Mb')
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
        // console.log('event target',event.target)
        if(event.target.files.length>0){
            let reader = new FileReader()
            let file = event.target.files[0]
            // setObject(file)
            reader.onloadend = () => {
                setFile(file)
                // setObject(URL.createObjectURL(file))
                // console.log('url thingy', )
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
            <br />
            {uploadProgress!==0 && imagePreviewURL ? <p>Upload Progress: {uploadProgress}% </p>:null}
            <br />
            {uploadProgress===100? <p>Processing Image, Please Wait for Confirmation<p>This may take a minute<p>Wait until the loading indicator disappears</p></p></p>:null}
            <br />
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
                Add Your Image (jpg,png,gif,bmp,tiff) Here: <br /> <br />
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