import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css';
import toast from 'react-hot-toast';

const FontPicker = () => {

    const [fontSelection, setFontSelection] = useState('mulish')
    
    const handleFontChange = (event) => {
        event.preventDefault()
        // remove old, set new
        if(fontSelection==''){
            // console.log('setting first time')
            setFontSelection(event.target.value)
            updateSampleText(event.target.value)    
        } else if(fontSelection==event.target.value){
            // console.log('same')
            setFontSelection(event.target.value)
        } else {
            // console.log('heterozygous change')
            //toggle off old css
            updateSampleText(fontSelection)
            setFontSelection(event.target.value)
            updateSampleText(event.target.value)
        }
    }

    const updateSampleText = (font) => {
        const fontsDict = {
            'smythe':{name:`'Smythe', cursive`, weight:'400'},
            'sigmarOne':{name:`'Sigmar One', cursive`, weight:'400'},
            'mulish':{name:`'Mulish', sans-serif`, weight:'900'},
            'amaticSC':{name:`'Amatic SC', cursive`, weight:'700'},
            'pacifico':{name:`'Pacifico', cursive`, weight:'400'},
            'holtwoodOne':{name:`'Holtwood One SC', serif`, weight:'400'},
            'radley':{name:`'Radley', serif`, weight:'400'},
            'carterOne':{name:`'Carter One', cursive`, weight:'400'},
            'musetta':{name:`'Musetta', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'cassannet':{name:`'Cassannet', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'bariolThin':{name:`'Bariol Thin', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'bariolSerifThin':{name:`'Bariol Serif Thin', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'archia':{name:`'Archia', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'bould':{name:`'Bould', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'geomanist':{name:`'Geomanist', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'knileBlack':{name:`'Knile Black', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'nowayLight':{name:`'Noway Light', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'parking':{name:`'Parking', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'salome':{name:`'Salome', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'silka':{name:`'Silka', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'},
            'wotfard':{name:`'Wotfard', 'Oswald', 'ZCOOL KuaiLe', 'Namun Gothic', 'Yusei Magic', 'Almarai', 'Assistant', 'Source Sans Pro', 'Kanit', 'Inter', cursive`, weight:'normal'}
        }

        var fontPickerSampleTextArray = document.getElementsByClassName('fontPickerSampleText')
        var i 
        for (i=0; i<fontPickerSampleTextArray.length; i++){
            // fontPickerSampleTextArray[i].classList.toggle(`${font}Font`)
            fontPickerSampleTextArray[i].style.fontFamily = fontsDict[font]['name']
            fontPickerSampleTextArray[i].style.fontWeight = fontsDict[font]['weight']
        }
    }

    const submitFontChange = (event) => {
        event.preventDefault()
        const token = sessionStorage.getItem('token')
        const listId = sessionStorage.getItem('listId')
        const userId = sessionStorage.getItem('userId')
        return axios.put('https://link-in-bio.limited/l/setText', {listId:listId, userId:userId, fontSelection:fontSelection}, { headers: { authorization:token }})
        .then(res => {
            // console.log('fontSelectionRes', res)
            toast.success('Font Changed Successfully')
        })
        .catch(err => {
            // console.log('submit catcherror', err)
            toast.error('Error in Changing Font')
        })
    }

    useEffect(() => {
        updateSampleText(fontSelection)
    })

    return (
        <div>
            <br />
            <p>Font Selector</p>
            <br />
            <p className="fontPickerSampleText">The Quick Brown Fox Jumped Over The Lazy Dog</p>
            <br />
            <p className="fontPickerSampleText">1234567890()-_+=/\!@#$%^{`&`}*</p>
            <br />
            {/* <p className="fontPickerSampleText">THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG</p> */}
            <br />
            <form onSubmit={submitFontChange}>
                <label>
                    Select the Font you want on your Page, then hit submit: <br />
                    <select onChange={handleFontChange}>
                        <option value="mulish">Default</option>
                        <option value="smythe">Smythe</option>
                        <option value="sigmarOne">Sigmar One</option>
                        {/* <option value="mulish">Link-in.Bio Classic - Mulish</option> */}
                        <option value="amaticSC">Amatic SC</option>
                        <option value="pacifico">Pacifico</option>
                        <option value="holtwoodOne">Holtwood One SC</option>
                        <option value="radley">Radley</option>
                        <option value="carterOne">Carter One</option>
                        <option value="musetta">Musetta</option>
                        <option value="cassannet">Cassannet</option>
                        <option value="bariolThin">Bariol Thin</option>
                        <option value="bariolSerifThin">Bariol Serif Thin</option>
                        <option value="archia">Archia</option>
                        <option value="bould">Bould</option>
                        <option value="geomanist">Geomanist</option>
                        <option value="knileBlack">Knile Black</option>
                        <option value="nowayLight">Noway Light</option>
                        <option value="parking">Parking</option>
                        <option value="salome">Salome</option>
                        <option value="silka">Silka</option>
                        <option value="wotfard">Wotfard</option>
                    </select>
                    <br />
                </label>
                <br />
                <button type="submit">Submit Font Selection Change</button>
            </form>
        </div>
    )
}

export default FontPicker