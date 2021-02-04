import React, { useState } from 'react'
import axios from 'axios'

const EasyAddMultiTool = () => {
    const [choice, setChoice] = useState('instagram')
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
        const description = `${username} - Link to my ${choicesDict[`${choice}`]['label']} Account ${choicesDict[`${choice}`]['emoji']}`
        const linkTitle = `${choicesDict[`${choice}`]['label']}`
        const referencingURL = `https://${choicesDict[`${choice}`]['form']}${username}`
        const imgURL = `${choicesDict[`${choice}`]['img']}`
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        const listId = sessionStorage.getItem('listId')
        // console.log('description', description)
        // console.log('linktitle', linkTitle)
        // console.log('referencingURL', referencingURL)
        return axios.post('https://link-in-bio.limited/e/new', { userId:userId, listId:listId, referencingURL:referencingURL, description:description, linkTitle:linkTitle, imgURL:imgURL }, { headers: {authorization: token} })
        .then(async (res) => {
            // console.log('successful res',res)
            const statForNewEntry = await axios.get(`https://link-in-bio.limited/s/?eid=${res.data.result[0].entryId}&ref=${res.data.result[0].referencingURL}&red=f`)
            // console.log('statForNewEntry',statForNewEntry)
            setIsLoading(false)
            alert(`Link To ${choicesDict[`${choice}`]['label']} Successfully Added to Account`)
        })
        .catch((err) => {
            // console.log('error easyadd', err)
            alert('Error EasyAdd Account')
        })
    }

    const choicesDict = {
        'instagram':{label:'Instagram', form:'instagram.com/', img:'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png', emoji:'📸🌐'},
        'youtube':{label:'YouTube', form:'youtube.com/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2880px-YouTube_Logo_2017.svg.png', emoji:'📹📺'},
        'facebook':{label:'Facebook', form:'facebook.com/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2880px-Facebook_Logo_%282019%29.svg.png', emoji:'🙂📖'},
        'twitter':{label:'Twitter', form:'twitter.com/', img:'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/2560px-Twitter_bird_logo_2012.svg.png', emoji:'🐤🌐'},
        'tiktok':{label:'TikTok', form:'tiktok.com/@', img:'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2880px-TikTok_logo.svg.png', emoji:'🎥🌐'},
        'reddit':{label:'Reddit', form:'reddit.com/user/', img:'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/2880px-Reddit_logo_new.svg.png', emoji:'🐱🎞'},
        'pinterest':{label:'Pinterest', form:'pinterest.com/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/2880px-Pinterest_Logo.svg.png', emoji:'🧭🗺'},
        'snapchat':{label:'Snap', form:'story.snapchat.com/s/', img:'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1920px-Snapchat_logo.svg.png', emoji:'⏱📸'},
        'linkedin':{label:'LinkedIn', form:'linkedin.com/in/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/LinkedIn_Logo_2013.svg/2880px-LinkedIn_Logo_2013.svg.png', emoji:'🎓🕴'},
        'cashapp':{label:'Cash App', form:'cash.app/$', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1920px-Square_Cash_app_logo.svg.png', emoji:'💸🌐'},
        'telegram':{label:'Telegram', form:'t.me/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1920px-Telegram_2019_Logo.svg.png', emoji:'🔒✉️'},
        'patreon':{label:'Patreon', form:'patreon.com/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Patreon_wordmark.svg/2880px-Patreon_wordmark.svg.png', emoji:'💸🌐'},
        'paypal':{label:'PayPal', form:'paypal.me/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2880px-PayPal.svg.png', emoji:'💳🌐'},
        'etsy':{label:'Etsy', form:'etsy.com/shop/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2880px-Etsy_logo.svg.png', emoji:'🖌📮'},
        'ebay':{label:'Ebay', form:'ebay.com/usr/', img:'https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png', emoji:'📦🌐'},
        'twitch':{label:'Twitch', form:'twitch.tv/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/1280px-Twitch_logo.svg.png', emoji:'🕹️📹'},
        'steam':{label:'Steam', form:'steamcommunity.com/id/', img:'https://i.pinimg.com/originals/f8/8c/a6/f88ca65aad1daa1c32d8a073fee0d036.jpg', emoji:'🎮'},
        'discord':{label:'Discord', form:'discordapp.com/users/', img:'https://discord.com/assets/94db9c3c1eba8a38a1fcf4f223294185.png', emoji:'🎤🕹️'},
        'imgur':{label:'Imgur', form:'imgur.com/user/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Imgur_logo.svg/1280px-Imgur_logo.svg.png', emoji:'📸🌐'},
        'imdb':{label:'IMDB', form:'imdb.me/', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png', emoji:'📝🎥'},
        'soundcloud':{label:'SoundCloud', form:'soundcloud.com/', img:'https://e7.pngegg.com/pngimages/929/310/png-clipart-soundcloud-logo-music-drawing-streaming-media-others-miscellaneous-orange.png', emoji:'🔉☁️'},
    }

    return (
        <div>
            {isLoading? <p>Loading...</p> :
            <div>
                <br />
                <h2>Choose Which Type of Account to Link:</h2>
                <br />
                <select onChange={handleAccountType}>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="tiktok">TikTok</option>
                    <option value="reddit">Reddit</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="snapchat">SnapChat</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="cashapp">Cash App</option>
                    <option value="telegram">Telegram</option>
                    <option value="patreon">Patreon</option>
                    <option value="paypal">PayPal</option>
                    <option value="etsy">Etsy</option>
                    <option value="ebay">Ebay</option>
                    <option value="twitch">Twitch</option>
                    <option value="steam">Steam</option>
                    <option value="discord">Discord</option>
                    <option value="imgur">Imgur</option>
                    <option value="imdb">IMDB</option>
                    <option value="soundcloud">SoundCloud</option>
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

export default EasyAddMultiTool