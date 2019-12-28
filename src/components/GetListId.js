import React from 'react'
import { connect } from 'react-redux'
import { getListId } from '../actions/index'
import axios from 'axios'

class GetListId extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: localStorage.getItem('userId'),
            listId: '',
            // loading: '',
        }
    }


    // getListId = (evt) => {
    //     evt.preventDefault();
    //     console.log('this far')
    //     const { userId } = this.state
    //     return axios.get(`https://link-in-bio.herokuapp.com/l/${userId}`)
    //     .then(res => {
    //         console.log(res)
    //         const listId = res.data.listId
    //         this.setState({listId})        
    //         this.setState({loading: false})

    //     })
    //     .catch(err => console.log(err))

    // }

    handleClick2 = (evt) => {
        evt.preventDefault();
        const userId = localStorage.getItem('userId')
        getListId(userId)
        // this.setState({loading: true})
    }
    handleSubmit = (evt) => {
        evt.preventDefault()
        const { userId, backColor, txtColor, fontSelection } = this.state
        this.props.createList(userId, backColor, txtColor, fontSelection)
        this.setState({ userId:'', backColor:'', txtColor:'', fontSelection:'' })
    }

    render() {

        return (
            <div>
                <h3>Your List Id:</h3>

                <button type="submit">Click Here</button>
            </div>
        )
    }
}

const mapDispatchToProps = { getListId }

export default connect(null, mapDispatchToProps)(GetListId)