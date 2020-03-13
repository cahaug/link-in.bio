import React from 'react'
import axios from 'axios'
// import ellipsisGif from '../files/ellipsis.gif'
import loadingGif from '../files/loading.gif'

class ListDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [],
            isLoading:true,
            goodId:null,
        }
    }

    componentWillMount(props) {
        // console.log('url', this.props.match.url)
        const useThisURL = `https://link-in-bio.herokuapp.com/${localStorage.getItem('userId')}`
        // console.log('useThisURL', useThisURL)
        return axios.get(useThisURL)
            .then(response => {
                // console.log('response', response)
                return response;
            }).then(data => {
                // console.log('data', data)
                // console.log(this.state)
                this.setState({isLoading: false});
                // console.log(this.state)
                const links = (data.data.map((link) => {
                    const entryId = link.entryId
                    const viewCount = axios.post('https://link-in-bio.herokuapp.com/s/statForItem', {entryId})
                    console.log(viewCount)
                    return (

                            <div className='signup' key={link.linkTitle}>
                                <a href={`${link.referencingURL}`}>{link.linkTitle}</a>
                                <p>{link.description}</p>
                                <p>View Count: {viewCount}</p>
                            </div>

                    )
                }))
                // console.log('state', this.state)
                // console.log('links', links)
                this.setState({links: links})
            })
    }



    render() {
        const isLoading = this.state.isLoading;
            {if(isLoading===true){
                // return <h1>Loading <img src={ellipsisGif} style={{width:"30px", paddingTop:"20px"}}/></h1>
                return <img src={loadingGif} style={{width:"200px"}}/>
            }else{
                return (
                    <div className="linkList">
                        <div>
                            {this.state.links}
                        </div>
                    </div>

                )
            }
        }
        
    }
}


export default ListDisplay