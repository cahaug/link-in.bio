import React from 'react'
import { connect } from 'react-redux'
import { register } from '../actions'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    }

    handleChange2 = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const { email, password, firstName, lastName } = this.state
        this.props.register(email, password, firstName, lastName)
        this.setState({ email: '', password: '', firstName: '', lastName: '', })
        this.props.history.push('./Dashboard')
    }

    render() {
        const { email, password, firstName, lastName } = this.state
        return (
            <div>
                <div className='signupheader'>
                    <h1>LinkList Sign Up</h1>
                    <p>Thanks for your interest!</p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange2} required /><br/>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange2} required /><br/>
                    <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange2} required /><br/>
                    <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange2} required /><br/>
                    {/*need to confirm password here*/}

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    register
}

export default connect(null, mapDispatchToProps)(Register)