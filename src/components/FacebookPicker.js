import React, { useState } from 'react'
import axios from 'axios'


const domparser = new DOMParser()

function FacebookPicker(props){
    const [entryData, setEntryData] = useState({
        listId:this.props.match.params.listId,
        referencingURL:'',
        description:'',
        linkTitle: '',
        imgURL:'',
    })

    const getFacebookforAccount = async (account) => {
        const facebookPageDocument = await axios.get(`https://facebook.com/${account}`)
        const parsedDocument = domparser.parseFromString(facebookPageDocument)
        
    }

    return (
        <div>

        </div>
    )
}

export default FacebookPicker