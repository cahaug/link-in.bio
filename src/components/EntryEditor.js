import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { editEntry } from '../actions/index'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'


class EntryEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            entryId: '',
            referencingURL: '',
            description: '',
            linkTitle: '',
            imgURL2: '',
            shackImageId:'',
            protectedInput:false
            // successMessage: null,
        }
    }

    choicesDict = {
        'instagram':'https://imagizer.imageshack.com/img924/5446/9TX8ig.png',
        'youtube':'https://imagizer.imageshack.com/img922/8479/NdKJYa.png',
        'facebook':'https://imagizer.imageshack.com/img922/6720/SE3PxV.png',
        'twitter':'https://imagizer.imageshack.com/img923/4275/7EMI4o.png',
        'tiktok':'https://imagizer.imageshack.com/img924/5162/GDKl61.png',
        'reddit':'https://imagizer.imageshack.com/img924/21/7kCemT.png',
        'pinterest':'https://imagizer.imageshack.com/img924/4403/9WBdyw.png',
        'snapchat':'https://imagizer.imageshack.com/img924/3490/rAtlyJ.png',
        'linkedin':'https://imagizer.imageshack.com/img924/2977/dUaUGg.png',
        'cashapp':'https://imagizer.imageshack.com/img922/2778/ID3PbR.png',
        'venmo':'https://imagizer.imageshack.com/img922/8315/KKDAzH.png',
        'telegram':'https://imagizer.imageshack.com/img922/909/vNZYkL.png',
        'patreon':'https://imagizer.imageshack.com/img923/9927/yX6oWA.png',
        'gofundme':'https://imagizer.imageshack.com/img923/9072/2nPeOI.png',
        'depop':'https://imagizer.imageshack.com/img923/9610/O5VVkS.png',
        'paypal':'https://imagizer.imageshack.com/img923/6537/UjUIgP.png',
        'playstation':'https://imagizer.imageshack.com/img922/7303/mTwffk.png',
        'xbox':'https://imagizer.imageshack.com/img922/4650/OdtJsD.jpg',
        'nintendo':'https://imagizer.imageshack.com/img924/5847/fTqMCQ.png',
        'etsy':'https://imagizer.imageshack.com/img922/8896/7mengW.png',
        'ebay':'https://imagizer.imageshack.com/img923/9052/na6lGQ.png',
        'twitch':'https://imagizer.imageshack.com/img924/4011/FRXstk.png',
        'steam':'https://imagizer.imageshack.com/img922/1269/jaLEjC.jpg',
        'discord':'https://imagizer.imageshack.com/img922/8148/sIBMwf.png',
        'imgur':'https://imagizer.imageshack.com/img922/944/aj62jA.png',
        'imdb':'https://imagizer.imageshack.com/img923/6572/UNq2ej.png',
        'soundcloud':'https://imagizer.imageshack.com/img924/5484/VQ5N3V.png',
        'bandcamp':'https://imagizer.imageshack.com/img924/5015/UfrqPr.png',
        'github':'https://imagizer.imageshack.com/img923/2070/CdhTJ7.png',
        'vk':'https://imagizer.imageshack.com/img924/9673/LnXxDo.png',
        'nebula':'https://imagizer.imageshack.com/img924/3839/fgFVLI.jpg',
        'flickr':'https://imagizer.imageshack.com/img923/8778/JytgsJ.png',
        'imageshack':'https://imagizer.imageshack.com/img924/5308/wNfQLy.png',
        'startengine':'https://imagizer.imageshack.com/img924/3169/lW3Q7T.png',
        'kickstarter':'https://imagizer.imageshack.com/img924/368/ZyT9Ts.png',
        'email':'https://imagizer.imageshack.com/img923/5410/AmQrEf.jpg',
        'phone':'https://imagizer.imageshack.com/img922/3903/H262eI.jpg',
        'onlyfans':'https://imagizer.imageshack.com/img923/7375/DEREnR.png',
        'poshmark':'https://imagizer.imageshack.com/img923/8699/2ov1wB.png',
        'inprnt':'https://imagizer.imageshack.com/img922/4316/Drqa4B.jpg',
        'behance':'https://imagizer.imageshack.com/img923/7082/EgwMvY.png',
        'tumblr':'https://imagizer.imageshack.com/img922/6862/scQdRH.png',
        'amazonmusic':'https://imagizer.imageshack.com/img922/313/r61KwD.png',
        'deezer':'https://imagizer.imageshack.com/img923/7159/DYfWbG.png',
        'applemusic':'https://imagizer.imageshack.com/img923/7135/WaXX3v.png',
        'spotify':'https://imagizer.imageshack.com/img922/9761/3HcN7o.png',
        'kik':'https://imagizer.imageshack.com/img922/5820/HgFrU4.png',
        'whatsapp':'https://imagizer.imageshack.com/img924/4369/v8LUWb.png',
        'tidal':'https://imagizer.imageshack.com/img922/4056/eJz3yR.jpg',
        'parler':'https://imagizer.imageshack.com/img923/7476/LdQcTG.jpg',
        'bandsintown':'https://imagizer.imageshack.com/img922/733/La7FSI.png',
        'mixcloud':'https://imagizer.imageshack.com/img923/5218/GmKv69.png',
        'zelle':'https://imagizer.imageshack.com/img924/2998/gYOvQh.jpg',
        'toptal':'https://imagizer.imageshack.com/img922/9965/LFSZpa.png',
        'upwork':'https://imagizer.imageshack.com/img922/4/Rg1Irf.png',
        'odysee':'https://imagizer.imageshack.com/img923/6384/JLvydT.png',
        'textEntry':'https://imagizer.imageshack.com/img922/1971/ZoevxG.jpg',
        'bitcoin':'https://imagizer.imageshack.com/img922/893/M2YC8X.png',
        'ethereum':'https://imagizer.imageshack.com/img923/2998/c27O4p.jpg',
        'dogecoin':'https://imagizer.imageshack.com/img923/7307/efzU3u.png',
        'monero':'https://imagizer.imageshack.com/img924/4135/U0zNc4.png',
        'sponsus':'https://imagizer.imageshack.com/img922/1434/8gkFop.png',
        'floatplane':'https://imagizer.imageshack.com/img923/2084/0e51nC.png'
    }

    handleChange = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    deleteHostedImage = async (evt) => {
        evt.preventDefault()
        const {shackImageId, entryId} = this.state
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        const userId = sessionStorage.getItem('userId')
        const deletedHostedImage = await axios.post('https://link-in-bio.limited/e/deleteImage', {userId:userId, listId:listId, shackImageId:shackImageId, entryId:entryId}, {headers:{authorization:token}})
        if (deletedHostedImage.data.message==='Successfully Deleted ShackImage'){
            this.setState({imgURL2:''})
            this.setState({shackImageId:null})
            toast.success('Photo Deleted Forever.')
        } else {
            toast.error('There Was An Issue Deleting Your Photo')
        }
    }

    noImg = (evt) => {
        evt.preventDefault()
        this.setState({
            imgURL2:""
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        const { entryId, referencingURL, description, linkTitle } = this.state
        const { imgURL2 } = this.state
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        // console.log(linkTitle, description, referencingURL, entryId, imgURL2)
        if(imgURL2===""){
            const imgURL = null
            // console.log(imgURL)
            this.props.editEntry( entryId, referencingURL, description, linkTitle, imgURL, token, listId)
            this.setState({ referencingURL:'', description: '', linkTitle: '', imgURL2:''})
        } else {
            const imgURL = imgURL2
            // console.log(imgURL)
            this.props.editEntry( entryId, referencingURL, description, linkTitle, imgURL, token, listId)
            this.setState({ referencingURL:'', description: '', linkTitle: '', imgURL2:''})
        }
    }

    UNSAFE_componentWillMount(props){
        // console.log('props', props)
        // console.log('curpath', props.curPath)
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        // console.log('token, listId', token, listId)
        const useThisURL = `https://link-in-bio.limited/e${this.props.match.url}`
        return axios.post(useThisURL, {listId:listId}, {headers:{authorization:token}})
        .then(response => {
            if(Object.values(this.choicesDict).indexOf(response.data[0].imgURL) > -1){
                this.setState({protectedInput:true})
            }
            // console.log('response', response)
            this.setState({userId:response.data[0].userId})
            this.setState({entryId:response.data[0].entryId})
            this.setState({referencingURL:response.data[0].referencingURL})
            this.setState({description:response.data[0].description})
            this.setState({linkTitle:response.data[0].linkTitle})
            this.setState({imgURL2:response.data[0].imgURL})
            this.setState({shackImageId:response.data[0].shackImageId})
        })
        .catch(err => {console.log('err',err)})
    }

    

    render(props) {
        const { referencingURL, description, linkTitle, imgURL2, shackImageId, protectedInput } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Edit an Entry</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br /> */}
                    {/* <input type="text" name="entryId" value={entryId} placeholder="Your Entry Id" onChange={this.handleChange} required /><br /> */}
                    {protectedInput === false ? <div><p>Link URL:</p><input type="url" name="referencingURL" value={referencingURL} placeholder="Link URL"  maxLength="498" onChange={this.handleChange} required /><br /></div>:<div><br /><p>Linked URL:</p><p>{referencingURL}</p><br /></div>}
                    <p>Link Title:</p>
                    <input type="text" name="linkTitle" value={linkTitle} placeholder="Link Title"  maxLength="498" onChange={this.handleChange} required /><br />
                    <p>Link Description (put a single space for no description):</p>
                    <input className="editLinkDescription" type="text" name="description" value={description} placeholder="Link Description" maxLength="498" onChange={this.handleChange} required /><br />
                    {protectedInput === false ? <div><p>Link Image URL:</p>{shackImageId === null?<div><input type="text" name="imgURL2" value={imgURL2} placeholder="Link Image URL"  maxLength="498" onChange={this.handleChange} /><button onClick={this.noImg}>Click for No Image</button></div>:<div><p>Link-in.Bio administrates this photo for You.</p><br /><img id="imgPreview" src={imgURL2} alt={imgURL2} /><br /><button onClick={this.deleteHostedImage} type="button">Delete This Image</button></div>}<br /></div>:null}
                    <button type="submit" className="abutton2">Submit Changes to Link</button>
                </form>
                {/* {this.state.successMessage ? <h4>Entry Updated Successfully</h4> : <span></span>} */}
                <Link to='/dashboard2'><span className="abutton">Back</span></Link>
            </div>
        )
    }
}

const mapDispatchToProps = { editEntry }

export default connect(null, mapDispatchToProps)(EntryEditor)