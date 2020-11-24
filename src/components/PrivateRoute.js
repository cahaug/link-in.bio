import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function(props) {
    const {
        component:Component,
        ...rest
    } = props

    return (
        <Route {...rest} render={(rest)=>{
            const token = sessionStorage.getItem('token')
            return token
                ? <Component {...rest}/>
                : <Redirect to="/failedlogin" />
        }} />
    )
}