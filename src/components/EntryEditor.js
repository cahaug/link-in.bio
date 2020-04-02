import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { editEntry } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'


class EntryEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            entryId: '',
            referencingURL: '',
            description: '',
            linkTitle: '',
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

        const { entryId, referencingURL, description, linkTitle } = this.state
        console.log(linkTitle, description, referencingURL, entryId)
        this.props.editEntry( entryId, referencingURL, description, linkTitle)
        this.setState({ referencingURL:'', description: '', linkTitle: '', })
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
        })
    }

    

    render(props) {
        const { entryId, referencingURL, description, linkTitle } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Edit an Entry</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br /> */}
                    {/* <input type="text" name="entryId" value={entryId} placeholder="Your Entry Id" onChange={this.handleChange} required /><br /> */}
                    <input type="text" name="referencingURL" value={referencingURL} placeholder="URL to Link" onChange={this.handleChange} required /><br />
                    <input type="text" name="description" value={description} placeholder="Link Description" onChange={this.handleChange} required /><br />
                    <input type="text" name="linkTitle" value={linkTitle} placeholder="Add A Title for Your Link" onChange={this.handleChange} required /><br />
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