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
            return (<div>
            <p><a alt={`https://link-in.bio/${mostPopular.x.listId}`} href={`https://link-in.bio/${mostPopular.x.listId}`}>{`https://link-in.bio/${mostPopular.x.listId}`}</a> - {mostPopular.x.count}</p>
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