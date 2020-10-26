import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryBar } from 'victory'


const GraphForEntry = () => {
    const [isLoading, setIsLoading] = useState()
    const [pieGraphData, setPieGraphData] = useState([])
    const [countMax, setCountMax] = useState()

    const getData = () => {
        const userId = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        axios.post('https://link-in-bio.herokuapp.com/s/pieGraph', {userId:userId}, {headers: {authorization: token}})
        .then(res => {
            console.log('res.data', res.data)
            setPieGraphData(res.data)
            var localMax = 0
            res.data.forEach(value => {
                console.log('value', value)
                if(value.count>localMax){
                    console.log('newLocalMax', localMax)
                    localMax = value.count
                }
            })
            setCountMax(localMax)
            setIsLoading(false)
        })
        .catch(err => {
            console.log('error in get piegraph', err)
        })
    }

    useEffect(()=>{
        if(pieGraphData.length === 0){
            getData()
        } else{
            return
        }
    })

    if(isLoading===true){
        return <p>📝 Drawing Graph...</p>
    } else {
        return(
            <div className="entryChartHolder">
                <div className="vicPie">
                    <VictoryPie animate={{duration:3000}} data={pieGraphData} x='linkTitle' y='count' />
                    {/* <VictoryChart domainPadding={20}> */}
                    {/* </VictoryChart> */}
                </div>
                <div className="vicBar">
                    {/* <VictoryChart domainPadding={20}> */}
                    <VictoryChart>
                        <VictoryBar animate={{duration:3000}} data={pieGraphData} x='linkTitle' y='count' />
                    </VictoryChart>
                </div>
            </div>
        )
    }


}

export default GraphForEntry