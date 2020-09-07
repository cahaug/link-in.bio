import React, { useState } from 'react'

function PaymentSuccess( props){
    const fullSessionID =  props.location.search
    const sessionID = fullSessionID.slice(12, fullSessionID.length)
    console.log('this.props.location', props)
    
    return (
        <div>
            <h1>This is your {sessionID ? sessionID : 'Error'}</h1>
            <p>Payment was successful</p>
            <p>Thank You</p>
            <p>Now you may register or whatever lol </p>
        </div>
    )
}

export default PaymentSuccess