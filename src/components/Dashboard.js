import React from 'react'
import { connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import CreateList from './CreateList'
import AddEntry from './AddEntry'
import GetListId from './GetListId'
import ListEditor from './ListEditor'
import axios from 'axios'



class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listId: null,
            isLoadingListId: true,
        }
    }

    componentDidMount(props) {
        const useThisURL = `https://link-in-bio.herokuapp.com/l/list4user/${localStorage.getItem('userId')}`
        return axios.get(useThisURL)
            .then(response => {
                // console.log('dashboard cdm', response.data)
                this.setState({isLoadingListId: false})
                this.setState({listId: response.data[0].listId})
            })
    }
    // const {loggedUser} = props
    // console.log(loggedUser)
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome {localStorage.getItem('firstName')}!</p>
                <p>Your User Id is {localStorage.getItem('userId')}</p>
                {/* <p>Your List Id is {localStorage.getItem('listId')}</p> */}
                <p>Your List Id is {this.state.isLoadingListId ? <span> Loading...</span> : this.state.listId}</p>
                <p>To get started, create a list, then add your entries!</p>
                <p>Your LinkList will be hosted at: <a alt="Your LinkList" href={`http://link-in.bio/${localStorage.getItem('userId')}`}>http://link-in.bio/{localStorage.getItem('userId')}</a></p>
                <a href="#neworder" className="abutton" role="button">Create a New List</a>
                <div className="modal" id="neworder">
                    <div className="modal-container">
                        <CreateList />
                        {/* eslint-disable-next-line */}
                        <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div>
                <br /><br />
                {/* <a href="#neworder2" className="abutton" role="button">Get List Id</a>
                <div className="modal" id="neworder2">
                    <div className="modal-container">
                        <GetListId />
                        {/* eslint-disable-next-line */}
                        {/* <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div>
                <br /><br /> */} 
                <a href="#neworder3" className="abutton" role="button">Create a New Entry</a>
                <div className="modal" id="neworder3">
                    <div className="modal-container">
                        <AddEntry />
                        {/* eslint-disable-next-line */}
                        <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div>
                <div>
                    <ListEditor />
                </div>
                <br /><br />
                {/* <button type="button" className="abutton">Log Out</button> */}
                <Link to='/'><span className="abutton">Log Out</span></Link>            
                {/* <MyRequestsBusiness /> */}
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {loggedUser: state.loggedUser}
}



export default withRouter(
    connect(
        mapStateToProps,
    )(Dashboard)
)
