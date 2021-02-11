import React from 'react'
import { connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import CreateList from './CreateList'
// import AddEntry from './AddEntry'
// import GetListId from './GetListId'
import ListEditor from './ListEditor'
import axios from 'axios'
import '../App2.css';

const QRCode = require('qrcode.react')


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listId: null,
            isLoadingListId: true,
            isLoadingListViews: true,
            listViews:null
        }
    }

    logout(){
        localStorage.removeItem('listId');
        localStorage.removeItem('email');
        localStorage.removeItem('firstName');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        sessionStorage.removeItem('listId');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        return
    }

    componentDidMount(props) {
        const useThisURL = `https://link-in-bio.limited/l/list4user/${sessionStorage.getItem('userId')}`
        return axios.get(useThisURL)
            .then(response => {
                console.log('dashboard cdm', response.data)
                // sessionStorage.setItem('listId', response.data[0].listId)
                this.setState({isLoadingListId: false})
                sessionStorage.setItem('listId', response.data[0].listId)
                this.setState({listId: response.data[0].listId})
            })
            .then(stuff => {
                console.log('stuff', stuff)
                const listId = sessionStorage.getItem('listId')
                // console.log('listid', listId)
                const useThisURL = `https://link-in-bio.limited/s/listViews/${listId}`
                return axios.get(useThisURL, { headers: {authorization: sessionStorage.getItem('token')} })
                .then(response => {
                    console.log('successfully viewing listViews')
                    console.log('response.data', response.data['listViews'])
                    this.setState({ listViews: response.data['listViews'] })
                    this.setState({ isLoadingListViews: false })
                    console.log('listViews updated')
                    console.log('this.state', this.state)
                })
                .catch(error => console.log(error))

            })
    }
    // const {loggedUser} = props
    // console.log(loggedUser)
    render() {
        const today = new Date();
        const year = today.getFullYear();
        return (
            <div>
                <br />
                <Link onClick={this.logout} to='/'><span className="abutton">Log Out</span></Link>            
                <br /><br />
                <h4>©{new Date().getFullYear()} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
                <br />
                
                <h1>Dashboard</h1>
                <p>Welcome {sessionStorage.getItem('firstName')}!</p>
                <p>Your User Id is {sessionStorage.getItem('userId')}</p>
                {/* <p>Your List Id is {localStorage.getItem('listId')}</p> */}
                <p>Your List Id is {sessionStorage.getItem('listId')}</p>
                <p>Your List Views is {this.state.isLoadingListViews ? <span> Loading...</span> : this.state.listViews}</p>
                <p>To get started, create a list, then add your entries!</p>
                <p>Your LinkList will be hosted at: <a alt="Your LinkList" href={`https://link-in.bio/${sessionStorage.getItem('listId')}`}>http://link-in.bio/{sessionStorage.getItem('listId')}</a></p>
                <br />
                <p>Your QRCode is:</p>
                <br />
                <QRCode value={`https://link-in.bio/${sessionStorage.getItem('listId')}`} />
                <br />
                
                {/* <a href="#neworder" className="abutton" role="button">Create a New List</a>
                <div className="modal" id="neworder">
                    <div className="modal-container">
                        <CreateList />
                        eslint-disable-next-line
                        <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div> */}

                <br />
                {/* <a href="#neworder2" className="abutton" role="button">Get List Id</a>
                <div className="modal" id="neworder2">
                    <div className="modal-container">
                        <GetListId />
                        {/* eslint-disable-next-line */}
                        {/* <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div>
                <br /><br /> */} 
                {/* <a href="#neworder3" className="abutton" role="button" id="createNewEntry">Create a New Entry</a>
                <div className="modal" id="neworder3">
                    <div className="modal-container">
                        <AddEntry /> */}
                        {/* eslint-disable-next-line */}
                        {/* <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div> */}
                
                <div>
                    <ListEditor />
                </div>
                {/* <button type="button" className="abutton">Log Out</button> */}
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
