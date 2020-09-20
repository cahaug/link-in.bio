import React, { useState, useEffect } from "react"
import axios from "axios"
import loadingGif from '../files/loading.gif'
import { Link } from 'react-router-dom'

function SettingsPanel(){
    return (
        <div>
            <p>Setting Panel</p>
            <a href="/dashboard2" alt="Back to Dashboard">Back to Dashboard</a>
        </div>

    )
}

export default SettingsPanel