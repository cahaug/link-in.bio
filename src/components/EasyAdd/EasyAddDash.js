import React, { useState } from 'react'
import axios from 'axios'

// to add new social media option add to choicesDict and then add option in select

const EasyAddDash = () => {
    const [choice, setChoice] = useState('bandcamp')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onChangeUsername = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    const handleAccountType = (event) => {
        event.preventDefault()
        setChoice(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
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
            description = `Add me at my Friend Code: SW-${username}`
            linkTitle = `My Nintendo Friend Code`
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
    }

    const choicesDict = {
        'instagram':{label:'Instagram', form:'instagram.com/', img:'https://imagizer.imageshack.com/img922/6017/SGljDs.png', emoji:'📸🌐'},
        'youtube':{label:'YouTube', form:'youtube.com/', img:'https://imagizer.imageshack.com/img922/8479/NdKJYa.png', emoji:'📹📺'},
        'facebook':{label:'Facebook', form:'facebook.com/', img:'https://imagizer.imageshack.com/img922/6720/SE3PxV.png', emoji:'🙂📖'},
        'twitter':{label:'Twitter', form:'twitter.com/', img:'https://imagizer.imageshack.com/img923/4275/7EMI4o.png', emoji:'🐤🌐'},
        'tiktok':{label:'TikTok', form:'tiktok.com/@', img:'https://imagizer.imageshack.com/img924/5162/GDKl61.png', emoji:'🎥🌐'},
        'reddit':{label:'Reddit', form:'reddit.com/user/', img:'https://imagizer.imageshack.com/img924/21/7kCemT.png', emoji:'🐱🎞'},
        'pinterest':{label:'Pinterest', form:'pinterest.com/', img:'https://imagizer.imageshack.com/img924/4403/9WBdyw.png', emoji:'🧭🗺'},
        'snapchat':{label:'Snap', form:'story.snapchat.com/s/', img:'https://imagizer.imageshack.com/img924/3490/rAtlyJ.png', emoji:'⏱📸'},
        'linkedin':{label:'LinkedIn', form:'linkedin.com/in/', img:'https://imagizer.imageshack.com/img924/2977/dUaUGg.png', emoji:'🎓🕴'},
        'cashapp':{label:'Cash App', form:'cash.app/$', img:'https://imagizer.imageshack.com/img922/2778/ID3PbR.png', emoji:'💸🌐'},
        'telegram':{label:'Telegram', form:'t.me/', img:'https://imagizer.imageshack.com/img922/909/vNZYkL.png', emoji:'🔒✉️'},
        'patreon':{label:'Patreon', form:'patreon.com/', img:'https://imagizer.imageshack.com/img923/9927/yX6oWA.png', emoji:'💸🌐'},
        'gofundme':{label:'GoFundMe', form:'gofundme.com/', img:'https://imagizer.imageshack.com/img923/9072/2nPeOI.png', emoji:'💸🙏'},
        'paypal':{label:'PayPal', form:'paypal.me/', img:'https://imagizer.imageshack.com/img923/6537/UjUIgP.png', emoji:'💳🌐'},
        'playstation':{label:'Playstation Network', form:'Your PSN Gamertag: ', img:'https://imagizer.imageshack.com/img922/7303/mTwffk.png' ,emoji:'🕹️🏷️' },
        'xbox':{label:'Xbox Live', form:'Your Live Gamertag: ', img:'https://imagizer.imageshack.com/img922/4650/OdtJsD.jpg', emoji:'🕹️🏷️'},
        'nintendo':{label:'Nintendo Friend Code', form:'Your Nintendo Friend Code (include dashes): SW-', img:'https://imagizer.imageshack.com/img924/5847/fTqMCQ.png', emoji:'🕹️🏷️'},
        'etsy':{label:'Etsy', form:'etsy.com/shop/', img:'https://imagizer.imageshack.com/img922/8896/7mengW.png', emoji:'🖌📮'},
        'ebay':{label:'Ebay', form:'ebay.com/usr/', img:'https://imagizer.imageshack.com/img923/9052/na6lGQ.png', emoji:'📦🌐'},
        'twitch':{label:'Twitch', form:'twitch.tv/', img:'https://imagizer.imageshack.com/img924/4011/FRXstk.png', emoji:'🕹️📹'},
        'steam':{label:'Steam', form:'steamcommunity.com/id/', img:'https://imagizer.imageshack.com/img922/1269/jaLEjC.jpg', emoji:'🎮'},
        'discord':{label:'Discord', form:'discordapp.com/users/', img:'https://imagizer.imageshack.com/img922/8148/sIBMwf.png', emoji:'🎤🕹️'},
        'imgur':{label:'Imgur', form:'imgur.com/user/', img:'https://imagizer.imageshack.com/img922/944/aj62jA.png', emoji:'📸🌐'},
        'imdb':{label:'IMDB', form:'imdb.me/', img:'https://imagizer.imageshack.com/img923/6572/UNq2ej.png', emoji:'📝🎥'},
        'soundcloud':{label:'SoundCloud', form:'soundcloud.com/', img:'https://imagizer.imageshack.com/img924/5484/VQ5N3V.png', emoji:'🔉☁️'},
        'bandcamp':{label:'Bandcamp', form:'->____.bandcamp.com/ ', img:'https://imagizer.imageshack.com/img924/5015/UfrqPr.png', emoji:'🔉🏕️'},
        'github':{label:'GitHub', form:'github.com/', img:'https://imagizer.imageshack.com/img923/2070/CdhTJ7.png', emoji:'👩‍💻👨‍💻'},
        'vk':{label:'VK', form:'vk.com/', img:'https://imagizer.imageshack.com/img924/9673/LnXxDo.png', emoji:'📸🌐'},
        'onlyfans':{label:'OnlyFans', form:'onlyfans.com/', img:'https://imagizer.imageshack.com/img923/7375/DEREnR.png', emoji:'🔐📸'}
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
                    <option value="discord">Discord</option>
                    <option value="ebay">Ebay</option>
                    <option value="etsy">Etsy</option>
                    <option value="facebook">Facebook</option>
                    <option value="github">GitHub</option>
                    <option value="gofundme">GoFundMe</option>
                    <option value="imdb">IMDB</option>
                    <option value="imgur">Imgur</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="nintendo">Nintendo Friend Code</option>
                    <option value="onlyfans">OnlyFans</option>
                    <option value="patreon">Patreon</option>
                    <option value="paypal">PayPal</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="playstation">Playstation Network Gamertag</option>
                    <option value="reddit">Reddit</option>
                    <option value="snapchat">SnapChat</option>
                    <option value="soundcloud">SoundCloud</option>
                    <option value="steam">Steam</option>
                    <option value="telegram">Telegram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitch">Twitch</option>
                    <option value="twitter">Twitter</option>
                    <option value="vk">VK</option>
                    <option value="xbox">Xbox Live Gamertag</option>
                    <option value="youtube">YouTube</option>
                </select>
                <br />
                {choice == '' ? <p>Choose an Account Type To Add</p> : <form onSubmit={handleFormSubmit}>
                    <br />
                    <label>
                        {choicesDict[`${choice}`]['form']}<input value={username} required name="username" placeholder="username" type="text" onChange={onChangeUsername} />
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