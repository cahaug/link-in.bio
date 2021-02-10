import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

// to add new social media option add to choicesDict and then add option in select

const EasyAddDash = () => {
    const [choice, setChoice] = useState('amazonmusicartist')
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

    const hasNoIllegalCharsAPL = (value) => {
        // const stringHasSpaces = value.indexOf(' ')
        const stringHasIllegalSlash1 = value.indexOf(`\\`)
        // const stringHasIllegalSlash2 = value.indexOf(`/`)
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
            // stringHasIllegalSlash2 === -1 &&
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
        // console.log('trimmed',didtrimUsername)
        if(hasNoIllegalChars(didtrimUsername) === true){
            return {legal:true, trimmed:didtrimUsername}
        } else if(choice === 'applemusic' && hasNoIllegalCharsAPL(didtrimUsername) === true){
            return {legal:true, trimmed:didtrimUsername}
        } else {
            // alert(`There are illegal characters in your input, please remove them and try again`)
            toast.error(`There are illegal characters in your input, please remove them and try again`)
            return false
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const isValidated = await validateForm(username)
        // console.log('isvalidated',isValidated)
        username = isValidated.trimmed 
        if(isValidated.legal === true){
            let description = `${username} - My ${choicesDict[`${choice}`]['label']} Account ${choicesDict[`${choice}`]['emoji']}`
            let linkTitle = `${choicesDict[`${choice}`]['label']}`
            let referencingURL = `https://${choicesDict[`${choice}`]['form']}${username}`
            //because needs appending to front of url
            if(choice === 'bandcamp'){
                referencingURL = `https://${username}.bandcamp.com/`
            }
            if(choice === 'tumblr'){
                referencingURL = `https://${username}.tumblr.com/`
            }
            if(choice === 'bandsintown'){
                description = `Link to my ${choicesDict[`${choice}`]['label']} Artist Page ${choicesDict[`${choice}`]['emoji']} `
            }
            if(choice === 'bitcoin'){
                description = `My Bitcoin Public Key ${choicesDict[`${choice}`]['emoji']}: ${username} `
                referencingURL = ' '
            }
            if(choice === 'dogecoin'){
                description = `My Dogecoin Public Key ${choicesDict[`${choice}`]['emoji']}: ${username} `
                referencingURL = ' '
            }
            if(choice === 'ethereum'){
                description = `My Ethereum Public Key ${choicesDict[`${choice}`]['emoji']}: ${username} `
                referencingURL = ' '
            }
            if(choice === 'monero'){
                description = `My Monero Public Key ${choicesDict[`${choice}`]['emoji']}: ${username} `
                referencingURL = ' '
            }
            if(choice === 'textEntry'){
                description = `${username}`
                referencingURL = ' '
                linkTitle = `${choicesDict[`${choice}`]['emoji']} Please Read:`
            }
            if(choice === 'zelle'){
                referencingURL = `https://www.zellepay.com/`
                description = `To support me on ${choicesDict[`${choice}`]['label']} ${choicesDict[`${choice}`]['emoji']}, Add me at ${username} `
            }
            if(choice === 'spotifyartist'){
                description = `Link to my ${choicesDict[`${choice}`]['label']} Artist Account ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'spotifyalbum'){
                description = `Link to my ${choicesDict[`${choice}`]['label']} Album ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'spotifypodcast'){
                description = `Link to my ${choicesDict[`${choice}`]['label']} Podcast ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'spotifyplaylist'){
                description = `Link to my ${choicesDict[`${choice}`]['label']} Playlist ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'applemusic'){
                referencingURL = `https://music.apple.com/${username}`
                description = `Link to my ${choicesDict[`${choice}`]['label']} Account ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'kik'){
                referencingURL = `https://kik.com/`
                description = `Add me on Kik, ${choicesDict[`${choice}`]['emoji']}: ${username}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'whatsapp'){
                referencingURL = `https://api.whatsapp.com/send?phone="${username}"`
                description = `Call me with WhatsApp, ${choicesDict[`${choice}`]['emoji']}: ${username}`
                linkTitle = `Click to Call Me with WhatsApp`
            }
            if(choice === 'xbox'){
                referencingURL = `https://live.xbox.com/en-US/Profile?Gamertag=${username}`
                description = `Link to my Xbox Live, ${choicesDict[`${choice}`]['emoji']}: ${username}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'playstation'){
                referencingURL = `https://my.playstation.com/profile/${username}`
                description = `Link to my Playstation Network, ${choicesDict[`${choice}`]['emoji']}: ${username}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'nintendo'){
                referencingURL = `https://en-americas-support.nintendo.com/app/answers/detail/a_id/22326`
                description = `Add me at my Friend Code: SW-${username.slice(0,4)}-${username.slice(4,8)}-${username.slice(8,12)}`
                linkTitle = `My Nintendo Friend Code`
            }
            if(choice === 'depop'){
                linkTitle = 'depop - My Store'
                description = `Check out what I'm selling at depop.com/{username}`
            }
            if(choice === 'venmo'){
                referencingURL = `https://venmo.com/account/sign-in`
                description = `Venmo me at ${username}  ${choicesDict[`${choice}`]['emoji']}`
                linkTitle = `${choicesDict[`${choice}`]['label']} - ${username}`
            }
            if(choice === 'email'){
                referencingURL = `mailto:${username}?subject=Found%20You%20On%20Link-in.Bio/&body=Your%20Message%20Here`
                description = `For inquiries, please send an email to: ${username}`
                linkTitle = `Contact Email ${choicesDict[`${choice}`]['emoji']}`
            }
            if(choice === 'phone'){
                referencingURL = `tel:${username}`
                description = `Call Us at: ${username} `
                linkTitle = `${choicesDict[`${choice}`]['label']} ${choicesDict[`${choice}`]['emoji']}`
            }
            // console.log('refurl', referencingURL)
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
                // alert(`Link To ${choicesDict[`${choice}`]['label']} Successfully Added to Account`)
                toast.success(`Link To ${choicesDict[`${choice}`]['label']} Successfully Added to Account`)
                window.location.reload()
            })
            .catch((err) => {
                // console.log('error easyadd', err)
                // alert('Error EasyAdd Account')
                toast.error('Error EasyAdding Account')
            })
        } else {
            setIsLoading(false)
            return
        }
    }

    const choicesDict = {
        'instagram':{label:'Instagram', form:'instagram.com/', img:'https://imagizer.imageshack.com/img924/5446/9TX8ig.png', emoji:'📸🌐', type:'text'},
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
        'tumblr':{label:'tumblr', form:'->____.tumblr.com/ ', img:'https://imagizer.imageshack.com/img922/6862/scQdRH.png', emoji:'📸🌐', type:'text'},
        'github':{label:'GitHub', form:'github.com/', img:'https://imagizer.imageshack.com/img923/2070/CdhTJ7.png', emoji:'👩‍💻👨‍💻', type:'text'},
        'vk':{label:'VK', form:'vk.com/', img:'https://imagizer.imageshack.com/img924/9673/LnXxDo.png', emoji:'📸🌐', type:'text'},
        'nebula':{label:'Nebula', form:'watchnebula.com/', img:'https://imagizer.imageshack.com/img924/3839/fgFVLI.jpg', emoji:'🎥🌐', type:'text'},
        'flickr':{label:'Flickr', form:'flickr.com/photos/', img:'https://imagizer.imageshack.com/img923/8778/JytgsJ.png', emoji:'📸🌐', type:'text'},
        'imageshack':{label:'ImageShack', form:'imageshack.com/user/', img:'https://imagizer.imageshack.com/img924/5308/wNfQLy.png', emoji:'📸🌐', type:'text'},
        'startengine':{label:'StartEngine', form:'startengine.com/', img:'https://imagizer.imageshack.com/img924/3169/lW3Q7T.png', emoji:'💸🌐', type:'text'},
        'kickstarter':{label:'Kickstarter', form:'kickstarter.com/profile/', img:'https://imagizer.imageshack.com/img924/368/ZyT9Ts.png', emoji:'💸🌐', type:'text'},
        'email':{label:'Contact Email', form:'Enter Your Contact Email Here: ', img:'https://imagizer.imageshack.com/img923/5410/AmQrEf.jpg', emoji:'📧📥', type:'email'},
        'phone':{label:'Contact Phone', form:'Enter Your Contact Phone Number Here: ', img:'https://imagizer.imageshack.com/img922/3903/H262eI.jpg', emoji:'📱☎️', type:'tel'},
        'onlyfans':{label:'OnlyFans', form:'onlyfans.com/', img:'https://imagizer.imageshack.com/img923/7375/DEREnR.png', emoji:'🔐📸', type:'text'},
        'poshmark':{label:'Poshmark', form:'poshmark.com/closet/', img:'https://imagizer.imageshack.com/img923/8699/2ov1wB.png', emoji:'👜💸', type:'text'},
        'inprnt':{label:'INPRNT', form:'inprnt.com/gallery/', img:'https://imagizer.imageshack.com/img922/4316/Drqa4B.jpg', emoji:'🎨💸', type:'text'},
        'behance':{label:'Behance', form:'behance.net/', img:'https://imagizer.imageshack.com/img923/7082/EgwMvY.png', emoji:'🎨🌐', type:'text'},
        'amazonmusicpodcast':{label:'Amazon Music Podcast', form:'music.amazon.com/podcasts/', img:'https://imagizer.imageshack.com/img922/313/r61KwD.png', emoji:'🌐🔉', type:'text'},
        'amazonmusicalbum':{label:'Amazon Music Album', form:'music.amazon.com/albums/', img:'https://imagizer.imageshack.com/img922/313/r61KwD.png', emoji:'🌐🔉', type:'text'},
        'amazonmusicartist':{label:'Amazon Music Artist', form:'music.amazon.com/artists/', img:'https://imagizer.imageshack.com/img922/313/r61KwD.png', emoji:'🌐🔉', type:'text'},
        'deezerpodcast':{label:'Deezer Podcast USA', form:'deezer.com/us/show/', img:'https://imagizer.imageshack.com/img923/7159/DYfWbG.png', emoji:'🌐🔉', type:'text'},
        'deezerartist':{label:'Deezer Artist USA', form:'deezer.com/us/artist/', img:'https://imagizer.imageshack.com/img923/7159/DYfWbG.png', emoji:'🌐🔉', type:'text'},
        'deezeralbum':{label:'Deezer Album USA', form:'deezer.com/us/album/', img:'https://imagizer.imageshack.com/img923/7159/DYfWbG.png', emoji:'🌐🔉', type:'text'},
        'applemusic':{label:'Apple Music', form:'music.apple.com/', img:'https://imagizer.imageshack.com/img923/7135/WaXX3v.png', emoji:'🌐🔉', type:'text'},
        'spotifyartist':{label:'Spotify Artist', form:'open.spotify.com/artist/', img:'https://imagizer.imageshack.com/img922/9761/3HcN7o.png', emoji:'🌐🔉', type:'text'},
        'spotifyalbum':{label:'Spotify Album', form:'open.spotify.com/album/', img:'https://imagizer.imageshack.com/img922/9761/3HcN7o.png', emoji:'🌐🔉', type:'text'},
        'spotifyplaylist':{label:'Spotify Playlist', form:'open.spotify.com/playlist/', img:'https://imagizer.imageshack.com/img922/9761/3HcN7o.png', emoji:'🌐🔉', type:'text'},
        'spotifypodcast':{label:'Spotify Podcast', form:'open.spotify.com/show/', img:'https://imagizer.imageshack.com/img922/9761/3HcN7o.png', emoji:'🌐🔉', type:'text'},
        'kik':{label:'Kik', form:'Enter Your Kik Username Here: ', img:'https://imagizer.imageshack.com/img922/5820/HgFrU4.png', emoji:'🔒✉️', type:'text'},
        'whatsapp':{label:'WhatsApp', form:'Enter Your WhatsApp Number Here: ', img:'https://imagizer.imageshack.com/img924/4369/v8LUWb.png', emoji:'📱☎️', type:'tel'},
        'tidal':{label:'TIDAL', form:'tidal.com/', img:'https://imagizer.imageshack.com/img922/4056/eJz3yR.jpg', emoji:'🔉📹', type:'text'},
        'parler':{label:'Parler', form:'parler.com/profile/', img:'https://imagizer.imageshack.com/img923/7476/LdQcTG.jpg', emoji:'🆓🗨️', type:'text'},
        'bandsintown':{label:'Bandsintown', form:'bandsintown.com/a/', img:'https://imagizer.imageshack.com/img922/733/La7FSI.png', emoji:'🗺️🔉', type:'text'},
        'mixcloud':{label:'MixCloud', form:'mixcloud.com/', img:'https://imagizer.imageshack.com/img923/5218/GmKv69.png', emoji:'🌐🔉', type:'text'},
        'zelle':{label:'Zelle', form:'Enter Your Phone Number or Email (Zelle Username): ', img:'https://imagizer.imageshack.com/img924/2998/gYOvQh.jpg', emoji:'💸🌐', type:'text'},
        'toptal':{label:'Toptal', form:'toptal.com/resume/', img:'https://imagizer.imageshack.com/img922/9965/LFSZpa.png', emoji:'🔨🖨️', type:'text'},
        'upwork':{label:'Upwork', form:'upwork.com/o/profiles/users/', img:'https://imagizer.imageshack.com/img922/4/Rg1Irf.png', emoji:'🔨🖨️', type:'text'},
        'odysee':{label:'Odysee', form:'odysee.com/@', img:'https://imagizer.imageshack.com/img923/6384/JLvydT.png', emoji:'📹🌐', type:'text'},
        'textEntry':{label:'Text Entry', form:'Enter nonviolent speech here.', img:'https://imagizer.imageshack.com/img922/1971/ZoevxG.jpg', emoji:'🆓🗨️', type:'text'},
        'bitcoin':{label:'Bitcoin', form:'Your Bitcoin Public Key:', img:'https://imagizer.imageshack.com/img922/893/M2YC8X.png', emoji:'💻💸', type:'text'},
        'ethereum':{label:'Ethereum', form:'Your Ethereum Public Key:', img:'https://imagizer.imageshack.com/img923/2998/c27O4p.jpg', emoji:'💻💸', type:'text'},
        'dogecoin':{label:'Dogecoin', form:'Your Dogecoin Public Key:', img:'https://imagizer.imageshack.com/img923/7307/efzU3u.png', emoji:'💻💸', type:'text'},
        'monero':{label:'Monero', form:'Your Monero Public Key:', img:'https://imagizer.imageshack.com/img924/4135/U0zNc4.png', emoji:'💻💸', type:'text'},
        'sponsus':{label:'Sponsus', form:'sponsus.org/u/', img:'https://imagizer.imageshack.com/img922/1434/8gkFop.png', emoji:'🌐💸', type:'text'},
        'floatplane':{label:'Floatplane', form:'floatplane.com/', img:'https://imagizer.imageshack.com/img923/2084/0e51nC.png', emoji:'🎥💻', type:'text'}
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
                    <option value="amazonmusicartist">Amazon Music - Artist</option>
                    <option value="amazonmusicalbum">Amazon Music - Album</option>
                    <option value="amazonmusicpodcast">Amazon Music - Podcast</option>
                    <option value="applemusic">Apple Music</option>
                    <option value="bandcamp">Bandcamp</option>
                    <option value="bandsintown">Bandsintown</option>
                    <option value="behance">Behance</option>
                    <option value="bitcoin">Bitcoin Public Key</option>
                    <option value="cashapp">Cash App</option>
                    <option value="deezerartist">Deezer - Artist</option>
                    <option value="deezeralbum">Deezer - Album</option>
                    <option value="deezerpodcast">Deezer - Podcast</option>
                    <option value="depop">Depop</option>
                    <option value="discord">Discord</option>
                    <option value="dogecoin">Dogecoin Public Key</option>
                    <option value="ebay">Ebay</option>
                    <option value="email">Email Address</option>
                    <option value="etsy">Etsy</option>
                    <option value="ethereum">Ethereum Public Key</option>
                    <option value="facebook">Facebook</option>
                    <option value="flickr">Flickr</option>
                    <option value="floatplane">Floatplane</option>
                    <option value="github">GitHub</option>
                    <option value="gofundme">GoFundMe</option>
                    <option value="imageshack">ImageShack</option>
                    <option value="imdb">IMDB</option>
                    <option value="imgur">Imgur</option>
                    <option value="inprnt">INPRNT</option>
                    <option value="instagram">Instagram</option>
                    <option value="kickstarter">Kickstarter</option>
                    <option value="kik">Kik Messenger</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="mixcloud">MixCloud</option>
                    <option value="monero">Monero Public Key</option>
                    <option value="nintendo">Nintendo Friend Code</option>
                    <option value="nebula">Nebula</option>
                    <option value="odysee">Odysee</option>
                    <option value="onlyfans">OnlyFans</option>
                    <option value="parler">Parler</option>
                    <option value="patreon">Patreon</option>
                    <option value="paypal">PayPal</option>
                    <option value="phone">Phone Number</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="playstation">Playstation Network Gamertag</option>
                    <option value="poshmark">Poshmark</option>
                    <option value="reddit">Reddit</option>
                    <option value="snapchat">SnapChat</option>
                    <option value="soundcloud">SoundCloud</option>
                    <option value="sponsus">Sponsus</option>
                    <option value="spotifyartist">Spotify - Artist</option>
                    <option value="spotifyalbum">Spotify - Album</option>
                    <option value="spotifyplaylist">Spotify - Playlist</option>
                    <option value="spotifypodcast">Spotify - Podcast</option>
                    <option value="startengine">StartEngine</option>
                    <option value="steam">Steam</option>
                    <option value="telegram">Telegram</option>
                    <option value="textEntry">Text Entry (no link, just words)</option>
                    <option value="tidal">TIDAL</option>
                    <option value="tiktok">TikTok</option>
                    <option value="toptal">Toptal</option>
                    <option value="tumblr">Tumblr</option>
                    <option value="twitch">Twitch</option>
                    <option value="twitter">Twitter</option>
                    <option value="upwork">Upwork</option>
                    <option value="venmo">Venmo</option>
                    <option value="vk">VK</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="xbox">Xbox Live Gamertag</option>
                    <option value="youtube">YouTube</option>
                    <option value="zelle">Zelle</option>
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