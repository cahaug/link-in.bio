import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'

const ProfPicUpload = () => {
    const [photoString, setPhotoString] = useState('')
    const [file, setFile] = useState()
    const [imagePreviewURL, setImagePreviewURL] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('myImage', file)
            setImagePreviewURL()
            const token = sessionStorage.getItem('token')
            const userId = sessionStorage.getItem('userId')
            const addingToProfile = await axios.put(`https://link-in-bio.limited/l/uploadProfilePicture/${userId}`, formData, {headers:{'Content-Type': 'multipart/form-data', authorization:token}})
            // console.log('adding to profiel',addingToProfile)
            if(addingToProfile.data.message === 'Successfully Uploaded Profile Picture' || addingToProfile.data.message === 'Successfully Uploaded New Profile Picture No Delete'){
                setIsLoading(false)
                // alert('Profile Picture Updated Successfully')
                toast.success('Profile Picture Updated Successfully')
            }else{
                // alert('Sorry, Something went Wrong')
                toast.error('Sorry, Something went Wrong')
            }
        // }
        
        } catch(err){
            // console.log(err)
            // alert('error uploading profile picture')
            toast.error('error uploading profile picture')
            setIsLoading(false)
        }
    }

    const handleImageChange = (event) => {
        event.preventDefault()
        // console.log('event target',event.target)
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


    return (
        <div>
            <br/>
            <form onSubmit={handleSubmit} >
                <label>
                    Add Your Image (jpg,png,gif,bmp,tiff) Here: <br /> <br />
                    <input type="file" name='myImage' accept="image/*" onChange={handleImageChange} />
                </label>
                {imagePreviewURL?<button type="submit">Upload Profile Picture</button>:null}
            </form>
            <br />

            <canvas id="thecanvas"></canvas>
            {isLoading?<h2>Uploading...</h2>:null}
            <br />
            {/* <img src="" /> */}

            <div>
                {imagePreviewURL?<img id="imgPreview" src={imagePreviewURL} />:<div>Please Select an Image to Upload</div>}
            </div>

        </div>
    )

}

export default ProfPicUpload