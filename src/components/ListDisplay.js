import React from 'react'
import axios from 'axios'

class ListDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [],
            isLoading:true,
            goodId:null,
        }
    }

    componentDidMount(props) {
        return axios.get(`https:/link-in-bio.herokuapp.com${this.props.match.url}`)
            .then(response => {
                console.log(response)
                return response.data;
            }).then(data => {
                console.log(data)
                console.log(this.state)
                this.setState({isLoading: false});
                console.log(this.state)
                const links = data.map((link) => {
                    return (

                            <div className='signup' key={link.linkTitle}>
                                <a href={`${link.referencingURL}`}>{link.linkTitle}</a>
                                <p>{link.description}</p>
                            </div>

                    )
                })
                this.setState({links: links})
            })
    }



    render() {
        const isLoading = this.state.isLoading;
            {if(isLoading===true){
                return <h1>Loading...</h1>
            }else{
                return (
                    <div>
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