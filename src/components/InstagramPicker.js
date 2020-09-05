import React, { useState } from 'react'
import axios from 'axios'


const domparser = new DOMParser()

function InstagramPicker(props){
    const [entryData, setEntryData] = useState({
        listId:this.props.match.params.listId,
        referencingURL:'',
        description:'',
        linkTitle: '',
        imgURL:'',
    })

    const getInstagramforAccount = async (account) => {
        const instagramPageDocument = await axios.get(`https://instagram.com/${account}`)
        const parsedDocument = domparser.parseFromString(instagramPageDocument)
        
    }

    return (
        <div>

        </div>
    )
}

export default InstagramPicker