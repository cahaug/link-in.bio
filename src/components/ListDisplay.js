import React from 'react'
import axios from 'axios'
// import ellipsisGif from '../files/ellipsis.gif'
import loadingGif from '../files/loading.gif'

class ListDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [],
            rawLinks:null,
            isLoading:true,
            goodId:null,
            listId:null,
            profilePicture:null,
            displayingUserInfo:null,
            userFirstLastName:null
        }
    }

    UNSAFE_componentWillMount(props) {
        // console.log('url', this.props.match.url)
        const useThisURL = `https://link-in-bio.herokuapp.com${this.props.match.url}`
        // console.log('useThisURL', useThisURL)
        return axios.get(useThisURL)
            .then(response => {
                // console.log('response', response)
                return response;
            }).then(data => {
                console.log('data', data)
                // console.log(this.state)
                this.setState({isLoading: false});
                console.log('data.data.listid', data.data[0].listId)
                const listId = data.data[0].listId
                const userFirstLastName = `${data.data[0].firstName} ${data.data[0].lastName[0].slice(0,1)}.`
                // const profilePicture = `${data.data[0].profilePicture}`
                this.setState({listId:listId})
                // this.setState({profilePicture:profilePicture})
                this.setState({userFirstLastName:userFirstLastName})
                console.log('this.state', this.state)
                // console.log(this.state)
                const links = (data.data.map((link) => {
                    // localStorage.setItem('listId', link.listId)
                    return (

                            <div className='signup' key={link.entryId}>
                                <a className='linkTitle' href={`http://link-in-bio.herokuapp.com/s/?eid=${link.entryId}&ref=${link.referencingURL}`}>
                                    <img className='image' src={link.imgURL} alt={link.imgURL} /> <br /> <br />
                                    {link.linkTitle}
                                </a> <br />
                                <p>{link.description}</p>
                            </div>

                    )
                }))
                // console.log('state', this.state)
                // console.log('links', links)
                this.setState({links: links})
                const useThisURL = `https://link-in-bio.herokuapp.com/s/ili/${this.state.listId}`
                return axios.get(useThisURL)
                .then(response => {
                    console.log('response', response)
                    console.log('list visit successfully logged')
                })
                .catch(error => console.log(error))
            })
    }

    // componentDidMount(props) {

    // }

    render() {
        const isLoading = this.state.isLoading;
            {if(isLoading===true){
                // return <h1>Loading <img src={ellipsisGif} style={{width:"30px", paddingTop:"20px"}}/></h1>
                return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
            }else{
                return (
                    <div className="linkList">
                        <div>
                            {this.state.links}
                        </div>
                        <div>
                            <h3>
                                {this.state.profilePicture !== null ? <img src={this.state.profilePicture} alt={this.state.userFirstLastName} /> : <span></span> }
                                {this.state.userFirstLastName}
                            </h3>
                            <p>~List Creator~</p>
                        </div>
                        <h4>©2020 <a href="http://link-in.bio/">Link-In.bio/</a></h4>
                    </div>

                )
            }
        }
        
    }
}


export default ListDisplay