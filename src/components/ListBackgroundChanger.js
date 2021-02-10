import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'

const ListBackgroundChanger = () => {
    const [photoString, setPhotoString] = useState('')
    const [file, setFile] = useState()
    const [imagePreviewURL, setImagePreviewURL] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const deleteBackgroundImage = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        return axios.put('https://link-in-bio.limited/l/deleteListBackground', {listId:listId}, {headers:{authorization:token}})
        .then(res => {
            // console.log('swapped bg to null & deleted old res', res.data)
            setIsLoading(false)
            // alert('Deleted Background Image Successfully')
            toast.success('Deleted Background Image Successfully')
        })
        .catch(err => {
            // console.log('err background image', err)
            setIsLoading(false)
            toast.error('Unsuccessful Deleting Background Image')
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('myImage', file)
            setImagePreviewURL()
            const token = sessionStorage.getItem('token')
            const listId = sessionStorage.getItem('listId')
            const addingToProfile = await axios.put(`https://link-in-bio.limited/l/uploadListBackgroundPhoto/${listId}`, formData, {headers:{'Content-Type': 'multipart/form-data', authorization:token}})
            // console.log('adding to profiel',addingToProfile)
            if(addingToProfile.data.message === 'Successfully Uploaded Background Image' ){
                setIsLoading(false)
                // alert('List Background Image Updated Successfully')
                toast.success('List Background Image Updated Successfully')
            }else{
                // alert('Sorry, Something went Wrong')
                toast.error('Sorry, Something went Wrong')

            }
        // }
        
        } catch(err){
            console.log('err',err)
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
            <p>Hint: Portrait (tall, rectangular) photos will display best.</p><br/>
            <p>But on the real, feel free to express yourself however you please.</p><br/>
            <p>( This is your Link-in.Bio, After All! )</p>
            <br />
            <form onSubmit={handleSubmit} >
                <label>
                    Add Your Background Image (jpg,png,gif,bmp,tiff) Here: <br /> <br />
                    <input type="file" name='myImage' accept="image/*" onChange={handleImageChange} />
                </label>
                {imagePreviewURL?<button type="submit">Upload Background Image</button>:null}
            </form>
            <br />

            <canvas id="thecanvas"></canvas>
            {isLoading?<h2>Uploading...</h2>:null}
            <br />
            {/* <img src="" /> */}

            <div>
                {imagePreviewURL?<img id="imgPreview" src={imagePreviewURL} />:<div>Please Select an Image to Upload</div>}
            </div>
            <br />
            <br />
            <hr />
            <br />
            <h2>Delete Background Image</h2>
            <h2>Warning: This Cannot Be Undone</h2>
            <br />
            <h2>This copy of that photo will be gone forever.</h2>
            <br />
            <button type="abutton" onClick={deleteBackgroundImage}>Delete Background Image</button>
            <br /><br />
            <hr />
            <br />
        </div>
    )

}

export default ListBackgroundChanger