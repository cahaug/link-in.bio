import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/index'
import ReCAPTCHA from 'react-google-recaptcha'
import '../App2.css';

class Login extends React.Component {
    constructor() {
        super()
        this.reCap = React.createRef();
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

    handleSubmit = async (evt) => {
        evt.preventDefault()
        const { email, password } = this.state
        const token = await this.reCap.current.executeAsync()
        this.reCap.current.reset()
        this.props.login(email, password, token)
            .then(() => {
                this.props.history.push("./dashboard2")
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
                <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHAPUBLIC} size="invisible" ref={this.reCap} />
                <form onSubmit={this.handleSubmit}>
                    {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
                    <input type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} autocomplete="username" /><br />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} autocomplete="current-password" /><br />
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