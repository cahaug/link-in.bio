import React, { useState } from 'react'
import axios from 'axios'


const domparser = new DOMParser()

function InstagramPicker(){
    const [formData, setFormData] = useState({
        // listId:this.props.match.params.listId,
        referencingURL:'',
        description:'',
        linkTitle: '',
        imgURL:'',
        accountName:'',
        isReady:false,
    })

    const getInstagramforAccount = async (event) => {
        event.preventDefault()
        setFormData({...formData, isReady:true})
        const instagramPageDocument = await axios.get(`https://instagram.com/${formData.accountName}`)
        const parsedDocument = domparser.parseFromString(instagramPageDocument.data, 'application/xhtml+xml')
        const imageTagFromDocument = parsedDocument.querySelector('img.FFVAD')
        // console.log('instagramPageDocument',instagramPageDocument.data)
        // console.log('parsedDocument', parsedDocument)
        // console.log('imageTagFromDocument', imageTagFromDocument)
    }

    const onInputChange = event => {
        event.preventDefault()
        setFormData({
            ...formData,
            accountName:event.target.value,
        })
    }

    return (
        <div>
            <p>Hi</p>
            <form onSubmit={getInstagramforAccount}>
                <label>
                    <input onChange={onInputChange} value={formData.accountName} name="accountName" type="text" />
                </label>
            </form>
            <button onClick={getInstagramforAccount}>Click Me</button>
            {formData.isReady?<iframe src={`https://instagram.com/${formData.accountName}`} ></iframe>:null}
            {/* <iframe src="hello.html" style="width: 400px; height: 200px;"></iframe> */}
        </div>
    )
}

export default InstagramPicker