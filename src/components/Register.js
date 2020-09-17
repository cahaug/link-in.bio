import React from 'react'
import Recaptcha from 'react-recaptcha'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../actions'

class Register extends React.Component {
    constructor(props) {
        super(props)
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            profilePictureURL: '',
            referredBy:'from_Cale',
            isVerified:false,
        }
    }

    handleChange2 = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    handleChange3 = (evt) => {
        evt.preventDefault()
        // console.log(this.state.referredBy)
        this.setState({
            referredBy: evt.target.value,
        })
    }

    // handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     const { email, password, firstName, lastName } = this.state
    //     this.props.register(email, password, firstName, lastName)
    //     this.setState({ email: '', password: '', firstName: '', lastName: '', })
    //     if(typeof sessionStorage.getItem('listId') == 'number'){
    //         this.props.history.push('./dashboard')
    //     }
    // }

    recaptchaLoaded(){
        console.log('catcha successfully loaded');
    }

    verifyCallback(response){
        // console.log('response',response)
        if (response){
            this.setState({isVerified:true})
        }
        // console.log(this.state.isVerified)
    }

    handleSubmit = event => {
        event.preventDefault()
        alert('Sorry, We are not accepting new users at this moment, check back soon.')
    }

    // renamed fn so no registrations happen rn

    RENAMEDhandleSubmit = async (evt) => {
        evt.preventDefault()
        if(this.state.isVerified){
            // alert('success')
            const { email, password, firstName, lastName, profilePictureURL, referredBy } = this.state
            try {
                this.setState({ email: '', password: '', firstName: '', lastName: '', profilePictureURL:'', referredBy:'' })
                await this.props.register(email, password, firstName, lastName, profilePictureURL, referredBy)
                this.props.history.push('./dashboard')
            } catch (err){
                alert(err.message)
            }
        } else {
            alert('Please check the box to indicate you are a human!')
        }
       
    }

    render() {
        const { email, password, firstName, lastName, profilePictureURL } = this.state
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
                    <input type="text" name="profilePictureURL" placeholder="Profile Picture URL" value={profilePictureURL} onChange={this.handleChange2}  /><br/>
                    {/*need to confirm password here*/}
                    <label>
                        Where Did You Hear About Link-In.bio/ ?
                        <select value={this.state.referredBy} onChange={this.handleChange3}>
                            <option value="from_Cale">From Cale</option>
                            <option value="by_chance">By Chance</option>
                            <option value="influencer1">Influencer #1 Name</option>
                            <option value="influencer2">Influencer #2 Name</option>
                        </select>
                    </label>
                    <Recaptcha
                        sitekey="6Lf5n-cUAAAAACjg7VIXj2fUkfGK-zkeQ2mSXNGX"
                        render="explicit"
                        onloadCallback={this.recaptchaLoaded}
                        verifyCallback={this.verifyCallback}
                    />
                    <br />
                    <button className="abutton" type="submit">Sign Up</button>
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