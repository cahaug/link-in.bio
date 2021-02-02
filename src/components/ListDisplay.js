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
            profilePictureURL:null,
            displayingUserInfo:null,
            userFirstLastName:null,
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
                const profilePictureURL = `${data.data[0].profilePictureURL}`
                const displayingUserInfo = `${data.data[0].displayUserInfo}`
                this.setState({listId:listId})
                this.setState({profilePictureURL:profilePictureURL})
                this.setState({userFirstLastName:userFirstLastName})
                this.setState({displayingUserInfo:displayingUserInfo})
                console.log('this.state', this.state)
                // console.log(this.state)
                const links = (data.data.map((link) => {
                    // sessionStorage.setItem('listId', link.listId)
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
                const useThisURL = `https://link-in-bio.limited/s/ili/${this.state.listId}`
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
        const displayingUserInfo = this.state.displayingUserInfo
        const today = new Date();
        const year = today.getFullYear();
            {if(isLoading===true){
                // return <h1>Loading <img src={ellipsisGif} style={{width:"30px", paddingTop:"20px"}}/></h1>
                return <img src={loadingGif} alt="Loading..." style={{width:"200px"}}/>
            } else if (displayingUserInfo === 'false'){
                return (
                    <div className="linkList">
                        <section>
                            {this.state.links}
                        </section>
                        <h4>©{year} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
                    </div>

                )
            } else{
                return (
                    <div className="linkList">
                        <header>
                            <h3>
                                <img src={this.state.profilePictureURL} alt={this.state.profilePictureURL} style={{width:"200px"}}/> 
                                <br />
                                {this.state.userFirstLastName}
                            </h3>
                            {/* <p>~List Creator~</p> */}
                        </header>
                        <br /><hr /><br />
                        <section>
                            {this.state.links}
                        </section>
                        <h4>©{year} <a href="http://yhy.fi/">YHY Oy:</a> <a href="http://link-in.bio/">Link-In.bio/</a></h4>
                    </div>

                )
            }
        }
        
    }
}


export default ListDisplay