import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis } from 'victory'


const GraphForEntry = () => {
    const [isLoading, setIsLoading] = useState()
    

    const data = [
        {
        "entryId": 73,
        "count": "6"
        },
        {
        "entryId": 76,
        "count": "1"
        },
        {
        "entryId": 77,
        "count": "2"
        },
        {
        "entryId": 78,
        "count": "2"
        },
        {
        "entryId": 79,
        "count": "2"
        },
        {
        "entryId": 81,
        "count": "1"
        },
        {
        "entryId": 83,
        "count": "2"
        },
        {
        "entryId": 84,
        "count": "1"
        }
    ]


    return(
        <div>
            <VictoryChart domainPadding={20}>
                <VictoryPie animate={{duration:2000}} data={data} x='entryId' y='count' />
            </VictoryChart>
        </div>
    )


}

export default GraphForEntry