import React from 'react'
import { connect } from 'react-redux'
import { addEntry } from '../actions/index'

class AddEntry extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: localStorage.getItem('userId'),
            listId: localStorage.getItem('listId'),
            referencingURL: '',
            description: '',
            linkTitle: '',
            imgURL:'',
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
        const { userId, listId, referencingURL, description, linkTitle, imgURL } = this.state
        this.props.addEntry(userId, listId, referencingURL, description, linkTitle, imgURL)
        this.setState({ userId: localStorage.getItem('userId'), listId: '', referencingURL:'', description: '', linkTitle: '', imgURL:''})
    }

    render() {
        const { userId, listId, referencingURL, description, linkTitle, imgURL } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Add a Link to Your List</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br /> */}
                    {/* <input type="text" name="listId" value={listId} placeholder="Your List Id" onChange={this.handleChange} required /><br /> */}
                    <p className="addEntryText">Add a URL in the form http://...../ </p> 
                    <p className="addEntryText">(starting with http and ending in a slash)</p>
                    <input type="text" name="referencingURL" value={referencingURL} placeholder="Link URL" onChange={this.handleChange} required /><br />
                    <input type="text" name="linkTitle" value={linkTitle} placeholder="Link Title" onChange={this.handleChange} required /><br />
                    <input type="text" name="description" value={description} placeholder="Link Description" onChange={this.handleChange} required /><br />
                    <input type="text" name="imgURL" value={imgURL} placeholder="Image URL" onChange={this.handleChange} /><br />
                    <button type="submit" className="abutton2">Add Link to List</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = { addEntry }

export default connect(null, mapDispatchToProps)(AddEntry)