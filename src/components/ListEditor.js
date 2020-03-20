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
            counts: [],
        }
    }

    getCounts(){
        console.log('getCounts running')
        const useThisURL = `https://link-in-bio.herokuapp.com/s/u/${localStorage.getItem('userId')}`
        return axios.get(useThisURL)
        .then(res => {
            console.log('getCounts res', res)
            const linksCounts = res.data
            console.log('linksCounts', linksCounts)
            const newArray = this.state.links.forEach((link) => {
                console.log('foreach link', link)

            })
            console.log('newArray', newArray)
            let merged = {}
            for(let i=0; i<=res.data.length;i++){
                let value = {...this.state.links[i], ...res.data[i]}
                console.log('value', value)
                merged.push(value)
            }
            console.log('merged', merged)
            // for i in range(this.state.links.length) {
            //     this.state.links.forEach(link => {
            //         if(linksCounts[i].entryId == link[i].entryId){
            //             link[i].count = linksCounts[i].count
            //         }
            //         else if(linksCounts[i].entryId == null){
            //             link[i].count = linksCounts[i].count  
            //         }
            //     })
                // i++
            console.log('mapped')
        })
        .catch(err => console.log(err))
    }

    UNSAFE_componentWillMount(props) {
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
                    return (

                            <div className='signup' key={link.linkTitle}>
                                <a href={`${link.referencingURL}`}>{link.linkTitle}</a>
                                <p>{link.description}</p>
                                <p>{link.entryId}</p>
                                <p>View Count: {link.count == null ? <span>{link.count ? link.count : <span>--{link.count}--</span> }</span> : link.count}</p>
                            </div>

                    )
                }))
                // console.log('state', this.state)
                // console.log('links', links)
                this.getCounts()
                this.setState({links: links})
            })
    }

    
    componentDidMount(props){
        const useThisURL = `https://link-in-bio.herokuapp.com/s/u/${localStorage.getItem('userId')}`
        return axios.get(useThisURL)
        .then(res => {
            console.log(res)
            const counts = res.data.map((countVal) => {
                return (
                    <div className="signup" key={countVal.entryId}>
                        <p>{countVal.entryId}</p>
                        <p>{countVal.count}</p>

                    </div>
                )
            })
            this.setState({counts: counts})
        })
        .catch(err => console.log(err))
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
                        <div>
                            {this.state.counts}
                        </div>
                        <button onClick={() => {console.log('clicked'); this.getCounts()}}>Get Counts</button>
                    </div>

                )
            }
        }
        
    }
}


export default ListDisplay