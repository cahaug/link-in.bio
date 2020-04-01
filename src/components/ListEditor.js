import React from 'react'
import axios from 'axios'
// import ellipsisGif from '../files/ellipsis.gif'
import loadingGif from '../files/loading.gif'
import EditEntry from './EntryEditor'
import { withRouter, Redirect, Link } from 'react-router-dom'


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

    // getCounts(){
    //     console.log('getCounts running')
    //     const useThisURL = `https://link-in-bio.herokuapp.com/s/st/${localStorage.getItem('userId')}`
    //     return axios.get(useThisURL)
    //     .then(res => {
    //         console.log('getCounts res', res)
    //         const linksCounts = res.data
    //         console.log('linksCounts', linksCounts)
    //         const newArray = this.state.links.forEach((link) => {
    //             console.log('foreach link', link)

    //         })
    //         console.log('newArray', newArray)
    //         let mergedLinks = []
    //         for(let i=0; i<=res.data.length;i++){
    //             let value = {...this.state.links[i], ...res.data[i]}
    //             console.log('value', value)
    //             mergedLinks.push(value)
    //         }
    //         console.log('merged', mergedLinks)
    //         // for i in range(this.state.links.length) {
    //         //     this.state.links.forEach(link => {
    //         //         if(linksCounts[i].entryId == link[i].entryId){
    //         //             link[i].count = linksCounts[i].count
    //         //         }
    //         //         else if(linksCounts[i].entryId == null){
    //         //             link[i].count = linksCounts[i].count  
    //         //         }
    //         //     })
    //             // i++
    //         console.log('mapped')
    //     })
    //     .catch(err => console.log(err))
    // }

    deleteEntry(entryId){
        console.log('entryId',entryId)
        const useThisURL = `https://link-in-bio.herokuapp.com/e/deleteEntry/`
        return axios.post(useThisURL, {entryId: entryId})
        .then(response => {
            console.log(response)
            alert('Entry successfully deleted')
            window.location.reload(false)
        })

    }

    UNSAFE_componentWillMount(props) {
        // console.log('url', this.props.match.url)
        // const useThisURL = `https://link-in-bio.herokuapp.com/${localStorage.getItem('userId')}`
        const useThisURL = `https://link-in-bio.herokuapp.com/s/aio/${localStorage.getItem('userId')}`
        // console.log('useThisURL', useThisURL)
        return axios.get(useThisURL)
            .then(response => {
                // console.log('response', response)
                return response;
            }).then(data => {
                console.log('data', data)
                // console.log(this.state)
                this.setState({isLoading: false});
                // console.log(this.state)
                const dataNoEmpties = data.data.filter(links => links.hasOwnProperty('linkTitle'))
                console.log('dataNoEmpties', dataNoEmpties)
                const links = (dataNoEmpties.map((link) => {
                    // const entryValues = {entryId:link.entryId, listId:link.listId, referencingURL:link.referencingURL, description:link.description, linkTitle:link.linkTitle}
                    // console.log('entryValues', entryValues)
                    return (

                            <div className='signup' key={link.referencingURL}>
                                <a href={`${link.referencingURL}`}>{link.linkTitle}</a>
                                <p>{link.description}</p>
                                {/* <p>{link.entryId}</p> */}
                                <br />
                                {/* <p>View Count: {link.count == null ? <span>{link.count ? link.count : <span>--{link.count}--</span> }</span> : link.count}</p> */}
                                <p>View Count: {link.count}</p> 
                                <br />
                                {/* <a href="#neworder3" className="abutton" role="button">Create a New Entry</a> */}
                                {/* <div className="modal" id="neworder3"> */}
                                {/* <div className="modal-container"> */}
                                        {/* <EditEntry entryId={link.entryId} listId={link.listId} referencingURL={link.referencingURL} description={link.description} linkTitle={link.linkTitle}/> */}
                                        {/* eslint-disable-next-line */}
                                        {/* <a href="#" className="abutton2" role="button">Close</a> */}
                                    {/* </div> */}
                                {/* </div> */}
                                {/* <button onClick={(entryValues) => {this.editEntry(entryValues)}}>Edit Entry</button> */}
                                <Link to={`/editEntry/${link.entryId}`}><span className="abutton">Edit Entry</span></Link>
                                <button className="abutton" onClick={() => {this.deleteEntry(link.entryId)}}>Delete Entry</button>
                            </div>

                    )
                }))
                // console.log('state', this.state)
                // console.log('links', links)
                // this.getCounts()
                this.setState({links: links})
            })
    }

    
    // componentDidMount(props){
    //     const useThisURL = `https://link-in-bio.herokuapp.com/s/u/${localStorage.getItem('userId')}`
    //     return axios.get(useThisURL)
    //     .then(res => {
    //         console.log(res)
    //         const counts = res.data.map((countVal) => {
    //             return (
    //                 <div className="signup" key={countVal.entryId}>
    //                     <p>{countVal.entryId}</p>
    //                     <p>{countVal.count}</p>

    //                 </div>
    //             )
    //         })
    //         this.setState({counts: counts})
    //     })
    //     .catch(err => console.log(err))
    // }



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
                        {/* <div>
                            {this.state.counts}
                        </div> */}
                        {/* <button onClick={() => {console.log('clicked'); this.getCounts()}}>Get Counts</button> */}
                    </div>

                )
            }
        }
        
    }
}


export default ListDisplay