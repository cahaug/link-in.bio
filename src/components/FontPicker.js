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
            console.log('setting first time')
            setFontSelection(event.target.value)
            updateSampleText(event.target.value)    
        } else if(fontSelection==event.target.value){
            console.log('same')
            setFontSelection(event.target.value)
        } else {
            console.log('heterozygous change')
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
            console.log('fontSelectionRes', res)
            toast.success('Font Changed Successfully')
        })
        .catch(err => {
            console.log('submit catcherror', err)
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