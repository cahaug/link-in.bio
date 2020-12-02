import React, { useState } from 'react'
import axios from 'axios'

// to add new social media option add to choicesDict and then add option in select

const EasyAddDash = () => {
    const [choice, setChoice] = useState('bandcamp')
    let [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onChangeUsername = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    const handleAccountType = (event) => {
        event.preventDefault()
        setChoice(event.target.value)
        setUsername('')
    }

    const trimUsername = (usernameToTrim) => {
        const preUser = usernameToTrim.trim()
        return preUser
    }

    const hasNoIllegalChars = (value) => {
        // const stringHasSpaces = value.indexOf(' ')
        const stringHasIllegalSlash1 = value.indexOf(`\\`)
        const stringHasIllegalSlash2 = value.indexOf(`/`)
        const stringHasIllegalQuote1 = value.indexOf(`'`)
        const stringHasIllegalQuote2 = value.indexOf(`"`)
        const stringHasIllegalSemicolon = value.indexOf(`;`)
        const stringHasIllegalColon = value.indexOf(`:`) 
        const stringHasIllegalCaret = value.indexOf(`^`)
        const stringHasIllegalStar = value.indexOf(`*`)
        const stringHasIllegalHTML = value.indexOf(`<`)
        const stringHasIllegalPercent = value.indexOf('%')
        if(
            stringHasIllegalSlash1 === -1 &&
            stringHasIllegalSlash2 === -1 &&
            stringHasIllegalQuote1 === -1 &&
            stringHasIllegalQuote2 === -1 &&
            stringHasIllegalSemicolon === -1 &&
            stringHasIllegalColon === -1 &&
            stringHasIllegalCaret === -1 &&
            stringHasIllegalHTML === -1 &&
            stringHasIllegalStar === -1 &&
            stringHasIllegalPercent === -1
            // stringHasSpaces === -1 && 
        ){
            return true
        } else {
            return false
        }
    }

    const validateForm = (fromForm) => {
        const didtrimUsername =  trimUsername(fromForm)
        setUsername(didtrimUsername)
        console.log('trimmed',didtrimUsername)
        if(hasNoIllegalChars(didtrimUsername) === true){
            return {legal:true, trimmed:didtrimUsername}
        } else {
            alert(`There are illegal characters in your input, please remove them and try again`)
            return false
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const isValidated = await validateForm(username)
        console.log('isvalidated',isValidated)
        username = isValidated.trimmed 
        if(isValidated.legal === true){
            let description = `${username} - Link to my ${choicesDict[`${choice}`]['label']} Account ${choicesDict[`${choice}`]['emoji']}`
            let linkTitle = `${choicesDict[`${choice}`]['label']}`
            let referencingURL = `https://${choicesDict[`${choice}`]['form']}${username}`
            //because needs appending to front of url
            if(choice === 'bandcamp'){
                console.log('chose bandcamp')
                referencingURL = `https://${username}.bandcamp.com/`
            }
            if(choice === 'xbox'){
                console.log('chose xbox')
                referencingURL = `https://live.xbox.com/en-US/Profile?Gamertag=${username}`
                description = `Link to my Xbox Live, ${choicesDict[`${choice}`]['emoji']}: ${username}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'playstation'){
                console.log('chose playstation')
                referencingURL = `https://my.playstation.com/profile/${username}`
                description = `Link to my Playstation Network, ${choicesDict[`${choice}`]['emoji']}: ${username}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'nintendo'){
                console.log('chose nintendo')
                referencingURL = `https://en-americas-support.nintendo.com/app/answers/detail/a_id/22326`
                description = `Add me at my Friend Code: SW-${username.slice(0,4)}-${username.slice(4,8)}-${username.slice(8,12)}`
                linkTitle = `My Nintendo Friend Code`
            }
            if(choice === 'depop'){
                linkTitle = 'depop - My Store'
                description = `Check out what I'm selling at depop.com/{username}`
            }
            if(choice === 'venmo'){
                console.log('chose venmo')
                referencingURL = `https://venmo.com/account/sign-in`
                description = `Venmo me at ${username}  ${choicesDict[`${choice}`]['emoji']}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'email'){
                console.log('chose email')
                referencingURL = `mailto:${username}?subject=Found%20You%20On%20Link-in.Bio/&body=Your%20Message%20Here`
                description = `For inquiries, please send an email to: ${username}`
                linkTitle = `Contact Email ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'phone'){
                console.log('chose phone')
                referencingURL = `tel:${username}`
                description = `Call Us at: ${username} `
                linkTitle = `${choicesDict[`${choice}`]['label']} ${choicesDict[`${choice}`]['emoji']}`
            }
            console.log('refurl', referencingURL)
            const imgURL = `${choicesDict[`${choice}`]['img']}`
            const token = sessionStorage.getItem('token')
            const userId = sessionStorage.getItem('userId')
            const listId = sessionStorage.getItem('listId')
            console.log('description', description)
            console.log('linktitle', linkTitle)
            console.log('referencingURL', referencingURL)
            return axios.post('https://link-in-bio.herokuapp.com/e/new', { userId:userId, listId:listId, referencingURL:referencingURL, description:description, linkTitle:linkTitle, imgURL:imgURL }, { headers: {authorization: token} })
            .then(async (res) => {
                console.log('successful res',res)
                const statForNewEntry = await axios.get(`https://link-in-bio.herokuapp.com/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`)
                console.log('statForNewEntry',statForNewEntry)
                setIsLoading(false)
                alert(`Link To ${choicesDict[`${choice}`]['label']} Successfully Added to Account`)
                window.location.reload()
            })
            .catch((err) => {
                console.log('error easyadd', err)
                alert('Error EasyAdd Account')
            })
        } else {
            setIsLoading(false)
            return
        }
    }

    const choicesDict = {
        'instagram':{label:'Instagram', form:'instagram.com/', img:'https://imagizer.imageshack.com/img922/6017/SGljDs.png', emoji:'📸🌐', type:'text'},
        'youtube':{label:'YouTube', form:'youtube.com/', img:'https://imagizer.imageshack.com/img922/8479/NdKJYa.png', emoji:'📹📺', type:'text'},
        'facebook':{label:'Facebook', form:'facebook.com/', img:'https://imagizer.imageshack.com/img922/6720/SE3PxV.png', emoji:'🙂📖', type:'text'},
        'twitter':{label:'Twitter', form:'twitter.com/', img:'https://imagizer.imageshack.com/img923/4275/7EMI4o.png', emoji:'🐤🌐', type:'text'},
        'tiktok':{label:'TikTok', form:'tiktok.com/@', img:'https://imagizer.imageshack.com/img924/5162/GDKl61.png', emoji:'🎥🌐', type:'text'},
        'reddit':{label:'Reddit', form:'reddit.com/user/', img:'https://imagizer.imageshack.com/img924/21/7kCemT.png', emoji:'🐱🎞', type:'text'},
        'pinterest':{label:'Pinterest', form:'pinterest.com/', img:'https://imagizer.imageshack.com/img924/4403/9WBdyw.png', emoji:'🧭🗺', type:'text'},
        'snapchat':{label:'Snap', form:'story.snapchat.com/s/', img:'https://imagizer.imageshack.com/img924/3490/rAtlyJ.png', emoji:'⏱📸', type:'text'},
        'linkedin':{label:'LinkedIn', form:'linkedin.com/in/', img:'https://imagizer.imageshack.com/img924/2977/dUaUGg.png', emoji:'🎓🕴', type:'text'},
        'cashapp':{label:'Cash App', form:'cash.app/$', img:'https://imagizer.imageshack.com/img922/2778/ID3PbR.png', emoji:'💸🌐', type:'text'},
        'venmo':{label:'Venmo', form:'Enter Your Venmo Username: ', img:'https://imagizer.imageshack.com/img922/8315/KKDAzH.png', emoji:'💸🌐', type:'text'},
        'telegram':{label:'Telegram', form:'t.me/', img:'https://imagizer.imageshack.com/img922/909/vNZYkL.png', emoji:'🔒✉️', type:'text'},
        'patreon':{label:'Patreon', form:'patreon.com/', img:'https://imagizer.imageshack.com/img923/9927/yX6oWA.png', emoji:'💸🌐', type:'text'},
        'gofundme':{label:'GoFundMe', form:'gofundme.com/', img:'https://imagizer.imageshack.com/img923/9072/2nPeOI.png', emoji:'💸🙏', type:'text'},
        'depop':{label:'depop', form:'depop.com/', img:'https://imagizer.imageshack.com/img923/9610/O5VVkS.png', emoji:'👜💸', type:'text'},
        'paypal':{label:'PayPal', form:'paypal.me/', img:'https://imagizer.imageshack.com/img923/6537/UjUIgP.png', emoji:'💳🌐', type:'text'},
        'playstation':{label:'Playstation Network', form:'Your PSN Gamertag: ', img:'https://imagizer.imageshack.com/img922/7303/mTwffk.png' ,emoji:'🕹️🏷️', type:'text' },
        'xbox':{label:'Xbox Live', form:'Your Live Gamertag (include suffix if you have one): ', img:'https://imagizer.imageshack.com/img922/4650/OdtJsD.jpg', emoji:'🕹️🏷️', type:'text'},
        'nintendo':{label:'Nintendo Friend Code', form:'Your Nintendo Friend Code (without dashes): SW-', img:'https://imagizer.imageshack.com/img924/5847/fTqMCQ.png', emoji:'🕹️🏷️', type:'tel'},
        'etsy':{label:'Etsy', form:'etsy.com/shop/', img:'https://imagizer.imageshack.com/img922/8896/7mengW.png', emoji:'🖌📮', type:'text'},
        'ebay':{label:'Ebay', form:'ebay.com/usr/', img:'https://imagizer.imageshack.com/img923/9052/na6lGQ.png', emoji:'📦🌐', type:'text'},
        'twitch':{label:'Twitch', form:'twitch.tv/', img:'https://imagizer.imageshack.com/img924/4011/FRXstk.png', emoji:'🕹️📹', type:'text'},
        'steam':{label:'Steam', form:'steamcommunity.com/id/', img:'https://imagizer.imageshack.com/img922/1269/jaLEjC.jpg', emoji:'🎮', type:'text'},
        'discord':{label:'Discord', form:'discordapp.com/users/', img:'https://imagizer.imageshack.com/img922/8148/sIBMwf.png', emoji:'🎤🕹️', type:'text'},
        'imgur':{label:'Imgur', form:'imgur.com/user/', img:'https://imagizer.imageshack.com/img922/944/aj62jA.png', emoji:'📸🌐', type:'text'},
        'imdb':{label:'IMDB', form:'imdb.me/', img:'https://imagizer.imageshack.com/img923/6572/UNq2ej.png', emoji:'📝🎥', type:'text'},
        'soundcloud':{label:'SoundCloud', form:'soundcloud.com/', img:'https://imagizer.imageshack.com/img924/5484/VQ5N3V.png', emoji:'🔉☁️', type:'text'},
        'bandcamp':{label:'Bandcamp', form:'->____.bandcamp.com/ ', img:'https://imagizer.imageshack.com/img924/5015/UfrqPr.png', emoji:'🔉🏕️', type:'text'},
        'github':{label:'GitHub', form:'github.com/', img:'https://imagizer.imageshack.com/img923/2070/CdhTJ7.png', emoji:'👩‍💻👨‍💻', type:'text'},
        'vk':{label:'VK', form:'vk.com/', img:'https://imagizer.imageshack.com/img924/9673/LnXxDo.png', emoji:'📸🌐', type:'text'},
        'nebula':{label:'Nebula', form:'watchnebula.com/', img:'https://imagizer.imageshack.com/img924/3839/fgFVLI.jpg', emoji:'🎥🌐', type:'text'},
        'flickr':{label:'Flickr', form:'flickr.com/photos/', img:'https://imagizer.imageshack.com/img923/8778/JytgsJ.png', emoji:'📸🌐', type:'text'},
        'imageshack':{label:'ImageShack', form:'imageshack.com/user/', img:'https://imagizer.imageshack.com/img924/5308/wNfQLy.png', emoji:'📸🌐', type:'text'},
        'startengine':{label:'StartEngine', form:'startengine.com/', img:'https://imagizer.imageshack.com/img924/3169/lW3Q7T.png', emoji:'💸🌐', type:'text'},
        'kickstarter':{label:'Kickstarter', form:'kickstarter.com/profile/', img:'https://imagizer.imageshack.com/img924/368/ZyT9Ts.png', emoji:'💸🌐', type:'text'},
        'email':{label:'Contact Email', form:'Enter Your Contact Email Here: ', img:'https://imagizer.imageshack.com/img923/5410/AmQrEf.jpg', emoji:'📧📥', type:'email'},
        'phone':{label:'Contact Phone', form:'Enter Your Contact Phone Number Here: ', img:'https://imagizer.imageshack.com/img922/3903/H262eI.jpg', emoji:'📱☎️', type:'tel'},
        'onlyfans':{label:'OnlyFans', form:'onlyfans.com/', img:'https://imagizer.imageshack.com/img923/7375/DEREnR.png', emoji:'🔐📸', type:'text'}
    }

    return (
        <div>
            <hr />
            {isLoading? <p>Loading...</p> :
            <div>
                <br />
                <h2>Choose Which Type of Account to Link:</h2>
                <br />
                <select onChange={handleAccountType}>
                    <option value="bandcamp">Bandcamp</option>
                    <option value="cashapp">Cash App</option>
                    <option value="depop">Depop</option>
                    <option value="discord">Discord</option>
                    <option value="ebay">Ebay</option>
                    <option value="email">Email Address</option>
                    <option value="etsy">Etsy</option>
                    <option value="facebook">Facebook</option>
                    <option value="flickr">Flickr</option>
                    <option value="github">GitHub</option>
                    <option value="gofundme">GoFundMe</option>
                    <option value="imageshack">ImageShack</option>
                    <option value="imdb">IMDB</option>
                    <option value="imgur">Imgur</option>
                    <option value="instagram">Instagram</option>
                    <option value="kickstarter">Kickstarter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="nintendo">Nintendo Friend Code</option>
                    <option value="nebula">Nebula</option>
                    <option value="onlyfans">OnlyFans</option>
                    <option value="patreon">Patreon</option>
                    <option value="paypal">PayPal</option>
                    <option value="phone">Phone Number</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="playstation">Playstation Network Gamertag</option>
                    <option value="reddit">Reddit</option>
                    <option value="snapchat">SnapChat</option>
                    <option value="soundcloud">SoundCloud</option>
                    <option value="startengine">StartEngine</option>
                    <option value="steam">Steam</option>
                    <option value="telegram">Telegram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitch">Twitch</option>
                    <option value="twitter">Twitter</option>
                    <option value="venmo">Venmo</option>
                    <option value="vk">VK</option>
                    <option value="xbox">Xbox Live Gamertag</option>
                    <option value="youtube">YouTube</option>
                </select>
                <br />
                {choice == '' ? <p>Choose an Account Type To Add</p> : <form onSubmit={handleFormSubmit}>
                    <br />
                    <img src={choicesDict[`${choice}`]['img']} alt={choicesDict[`${choice}`]['label']} className="addLinkPreviewImage" /> 
                    <br /> <br />
                    <label>
                        {choicesDict[`${choice}`]['form']}<input value={username} required name="username" placeholder={choicesDict[`${choice}`]['label']} type={choicesDict[`${choice}`]['type']} onChange={onChangeUsername} pattern={choicesDict[`${choice}`]['pattern'] ? choicesDict[`${choice}`]['pattern']:null} />
                    </label>
                    <br /> <br />
                    <button type="submit">Add {choicesDict[`${choice}`]['label']} to Link-in.Bio/</button>
                </form>}
            </div>
            }
        </div>
    )
}

export default EasyAddDash