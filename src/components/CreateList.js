import React from 'react'
import { connect } from 'react-redux'
import { createList } from '../actions/index'

class CreateList extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: sessionStorage.getItem('userId'),
            backColor: '#ffffff',
            txtColor: '#000000',
            fontSelection: 'sans-serif',
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
        const token = sessionStorage.getItem('token')
        const { userId, backColor, txtColor, fontSelection } = this.state
        this.props.createList(userId, backColor, txtColor, fontSelection, token)
        this.setState({ userId:'', backColor:'', txtColor:'', fontSelection:'' })
    }

    render() {
        const { userId, backColor, txtColor, fontSelection } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Create A List</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="userId" value={userId} placeholder={sessionStorage.getItem('userId')} onChange={this.handleChange} required /><br />
                    <input type="text" name="backColor" value={backColor} placeholder="Set Background Color" onChange={this.handleChange} required /><br />
                    <input type="text" name="txtColor" value={txtColor} placeholder="Set Text Color" onChange={this.handleChange} required /><br />
                    <input type="text" name="fontSelection" value={fontSelection} placeholder="Set Font" onChange={this.handleChange} required /><br />
                    <button type="submit" className="abutton2">Create List</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = { createList }

export default connect(null, mapDispatchToProps)(CreateList)