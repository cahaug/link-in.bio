import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryTheme, VictoryLabel } from 'victory'


const GraphForEntry = () => {
    const [isLoading, setIsLoading] = useState()
    const [pieGraphData, setPieGraphData] = useState([])
    const [countMax, setCountMax] = useState()
    const [datasetBravo, setDatasetBravo] = useState({
        browserNameCounts:[],
        countries:[],
        deviceTypes:[],
        regions:[],
        isTouchDevice:[],
        osFamilyCount:[],
        deviceOwnNamesCount:[],
        deviceBrandNamesCount:[],
        timeline:[]
    })

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
            // setIsLoading(false)
        })
        .catch(err => {
            console.log('error in get piegraph', err)
        })
    }

    const getDatasetBravo = () => {
        const listId = sessionStorage.getItem('listId')
        const token = sessionStorage.getItem('token')
        axios.get(`https://link-in-bio.herokuapp.com/s/elv/${listId}`, {headers: {authorization: token}})
        .then(res => {
            console.log('res.data bravo', res.data)
            setDatasetBravo(res.data)

            setIsLoading(false)
        })
        .catch(err => {
            console.log('error in get piegraph', err)
        })
    }

    useEffect(()=>{
        if(pieGraphData.length === 0){
            getData()
            getDatasetBravo()
        } else{
            return
        }
    })

    if(isLoading===true){
        return <p>📝 Drawing Graph...</p>
    } else {
        return(
            <div>
                <br />
                <p>List Viewer Location {`&`} Device Information:</p>
                <div>
                    <div className="vicLine">
                        <h2>Daily Viewers:</h2>
                        <VictoryChart theme={VictoryTheme.material}>
                            <VictoryLine data={datasetBravo.timeline} style={{
                                data: { stroke: "#c43a31" ,}, 
                                tickLabels:{angle:45,}, 
                                parent: { border: "1px solid #ccc"}}} scale={{x:"time", y:"linear"}} />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                </div>
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Viewer Device Category</h2>
                        <VictoryPie animate={{duration:3000}}  data={datasetBravo.deviceTypes} x='deviceType' y='count' />
                    </div>
                    <div className="vicPie">
                        <h2>Browsers Used By Viewers</h2>
                        <VictoryPie animate={{duration:3000}}  data={datasetBravo.browserNameCounts} x='browserName' y='count' />
                    </div>
                </div>
                {/* <br /> */}
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Do Your Viewers Have Touchscreen?</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.isTouchDevice} x='isMobileDevice' y='count' />
                    </div>
                    <div className="vicPie">
                        <h2>Operating System of Viewer</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.osFamilyCount} x='osFamily' y='count' />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Brand of Device</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.deviceBrandNamesCount} x='deviceBrandName' y='count' />
                    </div>
                    <div className="vicPie">
                        <h2>Name of Device</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.deviceOwnNamesCount} x='deviceOwnName' y='count' />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Country Your Viewers Are From</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.countries} x='countryOfOrigin' y='count' />
                    </div>
                    <div className="vicPie">
                        <h2>Best Guess Location</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.regions} x='province' y='count' />
                    </div>
                </div>
                {/* <br /> */}
                <p>Clicked Links Counts Breakdown: </p>
                <div className="entryChartHolder">
                    <div className="vicBar">
                        {/* <VictoryChart domainPadding={20}> */}
                        <VictoryChart>
                            <VictoryBar animate={{duration:3000}} data={pieGraphData} x='linkTitle' y='count' />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                    <div className="vicPie">
                        <VictoryPie animate={{duration:3000}} data={pieGraphData} x='linkTitle' y='count' />
                        {/* <VictoryChart domainPadding={20}> */}
                        {/* </VictoryChart> */}
                    </div>
                </div>
            </div>
        )
    }


}

export default GraphForEntry