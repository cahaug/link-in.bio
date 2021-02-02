import React from 'react'
import axios from 'axios'
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'


class ListDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [],
            isLoading:true,
            goodId:null,
            counts: [],
            isLoadingListId: true,
        }
    }

    deleteEntry(entryId){
        const useThisURL = `https://link-in-bio.limited/e/deleteEntry/`
        return axios.post(useThisURL, {entryId: entryId})
        .then(response => {
            alert('Entry successfully deleted')
            window.location.reload(false)
        })

    }

    UNSAFE_componentWillMount(props) {
        const useThisURL = `https://link-in-bio.limited/s/aio/${sessionStorage.getItem('userId')}`
        return axios.get(useThisURL)
            .then(response => {
                return response;
            }).then(data => {
                this.setState({isLoading: false});
                const dataNoEmpties = data.data.filter(links => links.hasOwnProperty('linkTitle'))
                let lastValue = 0
                const links = (dataNoEmpties.map((link) => {
                    {if(lastValue === link.listId){
                        lastValue = link.listId
                        return (
                            <div>
                                <div className='signup' key={link.entryId}>
                                    <a className='linkTitle' href={`${link.referencingURL}`}>
                                        <img className='image' src={link.imgURL} alt={link.imgURL} /> <br /> <br />
                                        {link.linkTitle}
                                    </a> <br />
                                    <p>{link.description}</p>
                                    <p>View Count: {link.count}</p> 
                                    <br />
                                    <Link to={`/editEntry/${link.entryId}`}><span className="abutton">Edit Entry</span></Link>
                                    <button className="abutton" onClick={() => {this.deleteEntry(link.entryId)}}>Delete Entry</button>
                                </div>
                            </div>
                        )
                    } else {
                        lastValue = link.listId
                        return (
                            <div>
                                <hr />
                                <h4>List at <a href={`https://link-in.bio/${link.listId}`}>https://link-in.bio/{link.listId}</a></h4>
                                <br />
                                <Link to={`/addEntry/${link.listId}`}><span className="abutton">Add Entry</span></Link>
                                <div className='signup' key={link.entryId}>
                                    <a className='linkTitle' href={`${link.referencingURL}`}>
                                        <img className='image' src={link.imgURL} alt={link.imgURL} /> <br /> <br />
                                        {link.linkTitle}
                                    </a> <br />
                                    <p>{link.description}</p>
                                    <br />
                                    <p>View Count: {link.count}</p> 
                                    <br />
                                    <Link to={`/editEntry/${link.entryId}`}><span className="abutton">Edit Entry</span></Link>
                                    <button className="abutton" onClick={() => {this.deleteEntry(link.entryId)}}>Delete Entry</button>
                                </div>
                            </div>
                        )
                    }}
                }))
                this.setState({links: links})
            })
    }

    render() {
        const isLoading = this.state.isLoading;
            {if(isLoading===true){
                return <img src={loadingGif} alt="Loading" style={{width:"200px"}}/>
            }else{
                return (
                    <div className="linkList">
                        <br />
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