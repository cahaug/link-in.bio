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
        return
    }

    componentDidMount(props) {
        const useThisURL = `https://link-in-bio.herokuapp.com/l/list4user/${localStorage.getItem('userId')}`
        return axios.get(useThisURL)
            .then(response => {
                console.log('dashboard cdm', response.data)
                // localStorage.setItem('listId', response.data[0].listId)
                this.setState({isLoadingListId: false})
                localStorage.setItem('listId', response.data[0].listId)
                this.setState({listId: response.data[0].listId})
            })
            .then(stuff => {
                console.log('stuff', stuff)
                const listId = localStorage.getItem('listId')
                // console.log('listid', listId)
                const useThisURL = `https://link-in-bio.herokuapp.com/s/listViews/${listId}`
                return axios.get(useThisURL)
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
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome {localStorage.getItem('firstName')}!</p>
                <p>Your User Id is {localStorage.getItem('userId')}</p>
                {/* <p>Your List Id is {localStorage.getItem('listId')}</p> */}
                <p>Your List Id is {localStorage.getItem('listId')}</p>
                <p>Your List Views is {this.state.isLoadingListViews ? <span> Loading...</span> : this.state.listViews}</p>
                <p>To get started, create a list, then add your entries!</p>
                <p>Your LinkList will be hosted at: <a alt="Your LinkList" href={`http://link-in.bio/${localStorage.getItem('userId')}`}>http://link-in.bio/{localStorage.getItem('userId')}</a></p>
                {/* <a href="#neworder" className="abutton" role="button">Create a New List</a>
                <div className="modal" id="neworder">
                    <div className="modal-container">
                        <CreateList />
                        eslint-disable-next-line
                        <a href="#" className="abutton2" role="button">Close</a>
                    </div>
                </div>
                <br /> */}
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
                <a href="#neworder3" className="abutton" role="button" id="createNewEntry">Create a New Entry</a>
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
                <Link onClick={this.logout} to='/'><span className="abutton">Log Out</span></Link>            
                <h4>©2020 Link-In.bio/</h4>
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
