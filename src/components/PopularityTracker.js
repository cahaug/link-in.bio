import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

const PopularityTracker = (mostPopular) => {
    const [isLoading, setIsLoading] = useState(false)
    const [mostPop, setMostPop] = useState([])

    useEffect(() => {
        if(mostPopular.length>1){
            return
        } else {
            return
        }
    })

    useEffect((mostPopular) => {
        const mostPop = mostPopular.map((mostPopular) => {
            return (<div key={mostPopular.listId}>
            <p><a alt={`https://link-in.bio/${mostPopular.listId}`} href={`https://link-in.bio/${mostPopular.listId}`}>{`https://link-in.bio/${mostPopular.listId}`}</a> - {mostPopular.count}</p>
            </div>)
        })
        setMostPop(mostPop)
    })

    if(isLoading === true){
        return <p>📝 Drawing Graph...</p>
    }  else {
        return (
            <div>
                {mostPop}
            </div>
        )
    }
   
}

export default PopularityTracker