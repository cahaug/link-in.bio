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
            imgURL: '',
            // successMessage: null,
        }
    }

    handleChange = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        const { entryId, referencingURL, description, linkTitle, imgURL } = this.state
        console.log(linkTitle, description, referencingURL, entryId, imgURL)
        this.props.editEntry( entryId, referencingURL, description, linkTitle, imgURL)
        this.setState({ referencingURL:'', description: '', linkTitle: '', imgURL:''})
    }

    UNSAFE_componentWillMount(props){
        const useThisURL = `https://link-in-bio.herokuapp.com/e${this.props.match.url}`
        return axios.get(useThisURL)
        .then(response => {
            console.log('response', response)
            this.setState({userId:response.data[0].userId})
            this.setState({entryId:response.data[0].entryId})
            this.setState({referencingURL:response.data[0].referencingURL})
            this.setState({description:response.data[0].description})
            this.setState({linkTitle:response.data[0].linkTitle})
            this.setState({imgURL:response.data[0].imgURL})
        })
    }

    

    render(props) {
        const { referencingURL, description, linkTitle, imgURL } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Edit an Entry</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br /> */}
                    {/* <input type="text" name="entryId" value={entryId} placeholder="Your Entry Id" onChange={this.handleChange} required /><br /> */}
                    <p>Link URL:</p>
                    <input type="text" name="referencingURL" value={referencingURL} placeholder="Link URL" onChange={this.handleChange} required /><br />
                    <p>Link Title:</p>
                    <input type="text" name="linkTitle" value={linkTitle} placeholder="Link Title" onChange={this.handleChange} required /><br />
                    <p>Link Description:</p>
                    <input type="text" name="description" value={description} placeholder="Link Description" onChange={this.handleChange} required /><br />
                    <p>Link Image URL:</p>
                    <input type="text" name="imgURL" value={imgURL} placeholder="Link Image URL" onChange={this.handleChange} required /><br />
                    <button type="submit" className="abutton2">Submit Changes to Link</button>
                </form>
                {/* {this.state.successMessage ? <h4>Entry Updated Successfully</h4> : <span></span>} */}
                <Link to='/dashboard'><span className="abutton">Back</span></Link>
            </div>
        )
    }
}

const mapDispatchToProps = { editEntry }

export default connect(null, mapDispatchToProps)(EntryEditor)