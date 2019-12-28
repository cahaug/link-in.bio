import React from 'react'
import axios from 'axios'

class ListDisplay extends React.Component {
    constructor() {
        super()
        this.state = {
            links: [],
        }
    }

    componentDidMount() {
        return axios.get(`https:/link-in-bio.herokuapp.com/3`)
            .then(response => {
                console.log(response)
                return response.data;
            }).then(data => {
                console.log(data)
                const links = data.map((link) => {
                    return (

                            <div>
                                <p>Working</p>
                                <a href={`${link.referencingURL}`}>{link.linkTitle}</a>
                                <p>{link.description}</p>
                            </div>

                    )
                })
                this.setState({links: links})
            })
    }



    render() {
        return (
            <div>
                <div>
                    {this.state.links}
                </div>
            </div>
        )
    }
}


export default ListDisplay