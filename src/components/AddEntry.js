import React from 'react'
import { connect } from 'react-redux'
import { addEntry } from '../actions/index'

class AddEntry extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: localStorage.getItem('userId'),
            listId: '',
            referencingURL: '',
            description: '',
            linkTitle: '',
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
        const { userId, listId, referencingURL, description, linkTitle } = this.state
        this.props.addEntry(userId, listId, referencingURL, description, linkTitle)
        this.setState({ userId: localStorage.getItem('userId'), listId: '', referencingURL:'', description: '', linkTitle: '', })
    }

    render() {
        const { userId, listId, referencingURL, description, linkTitle } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Add a Link to Your List</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br />
                    <input type="text" name="listId" value={listId} placeholder="Your List Id" onChange={this.handleChange} required /><br />
                    <input type="text" name="referencingURL" value={referencingURL} placeholder="URL to Link" onChange={this.handleChange} required /><br />
                    <input type="text" name="description" value={description} placeholder="Link Description" onChange={this.handleChange} required /><br />
                    <input type="text" name="linkTitle" value={linkTitle} placeholder="Add A Title for Your Link" onChange={this.handleChange} required /><br />
                    <button type="submit" className="abutton2">Add Link to List</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = { addEntry }

export default connect(null, mapDispatchToProps)(AddEntry)