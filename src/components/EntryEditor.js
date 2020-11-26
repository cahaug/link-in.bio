import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { editEntry } from '../actions/index'
import { Link } from 'react-router-dom'


class EntryEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            entryId: '',
            referencingURL: '',
            description: '',
            linkTitle: '',
            imgURL2: '',
            shackImageId:''
            // successMessage: null,
        }
    }

    handleChange = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    deleteHostedImage = async (evt) => {
        evt.preventDefault()
        const {shackImageId, entryId} = this.state
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        const userId = sessionStorage.getItem('userId')
        const deletedHostedImage = await axios.post('https://link-in-bio.herokuapp.com/e/deleteImage', {userId:userId, listId:listId, shackImageId:shackImageId, entryId:entryId}, {headers:{authorization:token}})
        if (deletedHostedImage.data.message==='Successfully Deleted ShackImage'){
            this.setState({imgURL2:''})
            this.setState({shackImageId:null})
            alert('Photo Deleted Forever.')
        } else {
            alert('There Was An Issue Deleting Your Photo')
        }
    }

    noImg = (evt) => {
        evt.preventDefault()
        this.setState({
            imgURL2:""
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        const { entryId, referencingURL, description, linkTitle } = this.state
        const { imgURL2 } = this.state
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        // console.log(linkTitle, description, referencingURL, entryId, imgURL2)
        if(imgURL2===""){
            const imgURL = null
            console.log(imgURL)
            this.props.editEntry( entryId, referencingURL, description, linkTitle, imgURL, token, listId)
            this.setState({ referencingURL:'', description: '', linkTitle: '', imgURL2:''})
        } else {
            const imgURL = imgURL2
            console.log(imgURL)
            this.props.editEntry( entryId, referencingURL, description, linkTitle, imgURL, token, listId)
            this.setState({ referencingURL:'', description: '', linkTitle: '', imgURL2:''})
        }
    }

    UNSAFE_componentWillMount(props){
        // console.log('props', props)
        // console.log('curpath', props.curPath)
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        // console.log('token, listId', token, listId)
        const useThisURL = `https://link-in-bio.herokuapp.com/e${this.props.match.url}`
        return axios.post(useThisURL, {listId:listId}, {headers:{authorization:token}})
        .then(response => {
            // console.log('response', response)
            this.setState({userId:response.data[0].userId})
            this.setState({entryId:response.data[0].entryId})
            this.setState({referencingURL:response.data[0].referencingURL})
            this.setState({description:response.data[0].description})
            this.setState({linkTitle:response.data[0].linkTitle})
            this.setState({imgURL2:response.data[0].imgURL})
            this.setState({shackImageId:response.data[0].shackImageId})
        })
    }

    

    render(props) {
        const { referencingURL, description, linkTitle, imgURL2, shackImageId } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Edit an Entry</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br /> */}
                    {/* <input type="text" name="entryId" value={entryId} placeholder="Your Entry Id" onChange={this.handleChange} required /><br /> */}
                    <p>Link URL:</p>
                    <input type="url" name="referencingURL" value={referencingURL} placeholder="Link URL"  maxLength="498" onChange={this.handleChange} required /><br />
                    <p>Link Title:</p>
                    <input type="text" name="linkTitle" value={linkTitle} placeholder="Link Title"  maxLength="498" onChange={this.handleChange} required /><br />
                    <p>Link Description:</p>
                    <input className="editLinkDescription" type="text" name="description" value={description} placeholder="Link Description" maxLength="498" onChange={this.handleChange} required /><br />
                    <p>Link Image URL:</p>
                    {shackImageId === null?<div><input type="text" name="imgURL2" value={imgURL2} placeholder="Link Image URL"  maxLength="498" onChange={this.handleChange} /><button onClick={this.noImg}>Click for No Image</button></div>:<div><p>Link-in.Bio administrates this photo for You.</p><br /><img id="imgPreview" src={imgURL2} alt={imgURL2} /><br /><button onClick={this.deleteHostedImage} type="button">Delete This Image</button></div>}<br />
                    <button type="submit" className="abutton2">Submit Changes to Link</button>
                </form>
                {/* {this.state.successMessage ? <h4>Entry Updated Successfully</h4> : <span></span>} */}
                <Link to='/dashboard2'><span className="abutton">Back</span></Link>
            </div>
        )
    }
}

const mapDispatchToProps = { editEntry }

export default connect(null, mapDispatchToProps)(EntryEditor)