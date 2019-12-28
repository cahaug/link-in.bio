import React from 'react'
import { connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import CreateList from './CreateList'
// import MyRequestsBusiness from './MyRequestsBusiness'

const Dashboard = (props) => {
    
    // const {loggedUser} = props
    // console.log(loggedUser)
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {localStorage.getItem('firstName')}!</p>
            <p>Your User Id is {localStorage.getItem('userId')}</p>
            <p>To get started, create a list, then add your entries!</p>
            <p>Your LinkList will be hosted at: <a alt="Your LinkList" href="https://link-in.bio/">https://link-in.bio/{localStorage.getItem('userId')}</a></p>
            <a href="#neworder" className="abutton" role="button">Create a New List</a>
            <div className="modal" id="neworder">
                <div className="modal-container">
                    <CreateList />
                    <a href="#" className="abutton2" role="button">Close</a>
                </div>
            </div>
            <br />
            {/* <Link to='/UpdateFoodItem'><span className="abutton">Update/Delete a Food Item</span></Link> */}
            <br /><br />
            {/* <button type="button" className="abutton">Log Out</button> */}
            <Link to='/'><span className="abutton">Log Out</span></Link>            
            {/* <MyRequestsBusiness /> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {loggedUser: state.loggedUser}
}



export default withRouter(
    connect(
        mapStateToProps,
    )(Dashboard)
)
