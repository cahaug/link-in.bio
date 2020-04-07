import React from 'react'
import Recaptcha from 'react-recaptcha'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../actions'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            isVerified:false,
        }
    }

    handleChange2 = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    // handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     const { email, password, firstName, lastName } = this.state
    //     this.props.register(email, password, firstName, lastName)
    //     this.setState({ email: '', password: '', firstName: '', lastName: '', })
    //     if(typeof localStorage.getItem('listId') == 'number'){
    //         this.props.history.push('./dashboard')
    //     }
    // }

    recaptchaLoaded(){
        console.log('catcha successfully loaded');
    }

    verifyCallback(response){
        // console.log('response',response)
        this.setState({isVerified:true})
        // console.log(this.state.isVerified)
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()
        if(this.state.isVerified){
            alert('success')
            const { email, password, firstName, lastName } = this.state
            try {
                await this.props.register(email, password, firstName, lastName)
                this.setState({ email: '', password: '', firstName: '', lastName: '', })
                this.props.history.push('./dashboard')
            } catch (err){
                alert(err.message)
            }
        } else {
            alert('Please check the box to indicate you are a human!')
        }
       
    }

    render() {
        const { email, password, firstName, lastName } = this.state
        return (
            <div>
                <div className='signupheader'>
                    <h1>LinkList Sign Up</h1>
                    <p>Thanks for your interest!</p>
                </div>
                <form id="registrationForm" onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange2} required /><br/>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange2} required /><br/>
                    <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange2} required /><br/>
                    <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange2} required /><br/>
                    {/*need to confirm password here*/}
                    <Recaptcha
                        sitekey="6Lf5n-cUAAAAACjg7VIXj2fUkfGK-zkeQ2mSXNGX"
                        render="explicit"
                        onloadCallback={this.recaptchaLoaded}
                        verifyCallback={this.verifyCallback}
                    />
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    register
}
export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(Register)
)
// export default connect(null, mapDispatchToProps)(Register)