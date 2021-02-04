import React from 'react'
import { connect } from 'react-redux'
import { addEntry } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'
import loadingGif from '../files/loading.gif'
import toast from 'react-hot-toast'


class AddEntry extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
        this.handleChangeURL = this.handleChangeURL.bind(this);
        this.handleChangeNoImg = this.handleChangeNoImg.bind(this);

        this.state = {
            userId: sessionStorage.getItem('userId'),
            listId: sessionStorage.getItem('listId'),
            referencingURL: '',
            description: '',
            linkTitle: '',
            imgURL:'',
            isLoading: false,
            noImg:true,
        }
    }

    handleChangeURL = (evt) => {
        evt.preventDefault()
        this.setState({
            referencingURL: evt.target.value,
        })
    }

    handleChangeTitle = (evt) => {
        evt.preventDefault()
        this.setState({
            linkTitle: evt.target.value,
        })
    }

    handleChangeDescription = (evt) => {
        evt.preventDefault()
        this.setState({
            description: evt.target.value,
        })
    }

    handleChangeImg = (evt) => {
        evt.preventDefault()
        this.setState({
            imgURL: evt.target.value,
        })
    }

    handleChangeNoImg = (evt) => {
        evt.preventDefault()
        // console.log("this.state", this.state)
        this.setState({
            noImg:!this.state.noImg
        })
    }

    // handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     const { userId, listId, referencingURL, description, linkTitle, imgURL } = this.state
    //     this.props.addEntry(userId, listId, referencingURL, description, linkTitle, imgURL)
    //     this.setState({ userId: sessionStorage.getItem('userId'), listId: '', referencingURL:'', description: '', linkTitle: '', imgURL:''})
    // }

    handleSubmit = async (evt) => {
        evt.preventDefault()
        const shackImageId = null
        const { userId, listId, referencingURL, description, linkTitle, noImg } = this.state
        var { imgURL } = this.state
        const token = sessionStorage.getItem('token')
        // console.log(userId, listId, referencingURL, description, linkTitle, imgURL, noImg)
        try {
            if(noImg === true){
                imgURL = null
                // console.log('imgurl set to null succ', imgURL)
                this.setState({ userId: sessionStorage.getItem('userId'), referencingURL:'', description: '', linkTitle: '', imgURL:'', isLoading:true})
                await this.props.addEntry(userId, listId, referencingURL, description, linkTitle, imgURL, token, shackImageId)
                // this.props.history.push('./dashboard2')
                // window.location.reload(false)
                this.setState({isLoading:false})
            } else if (noImg === false && imgURL.length > 10){
                this.setState({ userId: sessionStorage.getItem('userId'), referencingURL:'', description: '', linkTitle: '', imgURL:'', isLoading:true})
                await this.props.addEntry(userId, listId, referencingURL, description, linkTitle, imgURL, token, shackImageId)
                // this.props.history.push('../dashboard2')
                // window.location.reload(false)
                this.setState({isLoading:false})
            } else {
                // console.log('image error')
            }
        } catch (err){
            toast.error(err.message)
        }
       
    }

    render() {
        const { referencingURL, description, linkTitle, imgURL, noImg } = this.state
        const isLoading = this.state.isLoading;
        if(isLoading===true){
            return <img src={loadingGif} alt="Loading" style={{width:"200px"}}/>
        } else {
            return (
                <div>
                    {/* {console.log('this.props', this.props)} */}
                    {/* {console.log('this.state', this.state)} */}
                    <h1 className="newpickupheader">Add a Link to Your List</h1>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input type="text" name="userId" value={userId} placeholder="Your User Id" onChange={this.handleChange} required /><br /> */}
                        {/* <input type="text" name="listId" value={listId} placeholder="Your List Id" onChange={this.handleChange} required /><br /> */}
                        <p className="addEntryText">Add a URL in the form http://.../ </p>
                        <p className="addEntryText">Or in the form https://.../ </p>
                        <p className="addEntryText">(starting with http or https and ending in a slash)</p>
                        <p className="addEntryText">Add an Image URL in the form http://.../...jpg </p>
                        <p className="addEntryText">Or in the form https://.../...bmp </p>
                        <p className="addEntryText">(starting with http or https)</p>
                        <p className="addEntryText">(and ending in the file extension of the linked image)</p>
                        <p className="addEntryText">Put a single space in for no description, title or link</p>
                        <input type="text" name="referencingURL" maxLength="498" value={referencingURL} placeholder="Link URL" onChange={this.handleChangeURL} required /><br />
                        <input type="text" name="linkTitle" maxLength="498" value={linkTitle} placeholder="Link Title" onChange={this.handleChangeTitle} required /><br />
                        <input type="text" className="editLinkDescription" maxLength="498" name="description" value={description} placeholder="Link Description" onChange={this.handleChangeDescription} required /><br />
                        <input type="text" name="imgURL" value={imgURL} maxLength="498" placeholder="Image URL" onChange={this.handleChangeImg} /><br />
                        <select value={noImg} onChange={this.handleChangeNoImg}>
                            <option value={true}>No Image on this Entry</option>
                            <option value={false}>Image Link Entered Above</option>
                        </select><br />
                        <button type="submit" className="abutton2">Add Link to List</button>
                    </form>
                    <Link to='/dashboard2'><span className="abutton">Back</span></Link>
    
                </div>
            )
        }
    }
}

const mapDispatchToProps = { addEntry }

export default withRouter(
    connect(
        null, 
        mapDispatchToProps
    )(AddEntry)
)