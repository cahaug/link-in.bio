import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/index'
import '../App2.css';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
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
        const { email, password } = this.state

        this.props.login(email, password)
            .then(() => {
                this.props.history.push("./dashboard")
            })
            .catch((err) => { console.error(err) })
    }

    render() {
        const { email, password } = this.state
        const { isLoading } = this.props
        return (
            <div>
                <h1>Log In</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
                    <input type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} /><br />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} /><br />
                    {isLoading
                        ? <p>Logging in...</p>
                        : <button className="abutton" type="submit">Log In</button>}
                </form>
                <br />
                <div>
                    <Link to='/resetpassword'><span className="abutton">Request Password Reset Email</span></Link>
                    <br/> <br />
                    <Link to='/resetpwcode'><span className="abutton">Enter Password Reset Code from Email</span></Link>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    errorMessage: state.errorMessage
})

const mapDispatchToProps = {
    login,
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Login)
)