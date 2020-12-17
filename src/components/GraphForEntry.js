import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryTheme, VictoryLabel } from 'victory'
import ReactWordcloud from "react-wordcloud";


const GraphForEntry = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pieGraphData, setPieGraphData] = useState([])
    const [countMax, setCountMax] = useState()
    const [cloudData, setCloudData] = useState([])
    const [discreteViewers, setDiscreteViewers] = useState(2)
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
            setDiscreteViewers(res.data.distinctViewersCount)
            const wordCloudRaw =  JSON.stringify(res.data.regions)
            var rst = JSON.parse(wordCloudRaw.replace(/"province"/g, '"text"').replace(/"count"/g, '"value"'))
            console.log('rst', rst)
            setCloudData(rst)
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
                <br />
                <div className="discreteViewers">
                    <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                        <h2>{discreteViewers} different people have seen your page.</h2>
                    </div>
                </div>
                <br />
                <br />
                <p>List Viewer Location {`&`} Device Information:</p>
                <br />
                <div>
                    <div className="vicLine">
                        <h2>Daily Views:</h2>
                        <VictoryChart theme={VictoryTheme.material} padding={{bottom:75, left:50,right:50}}>
                            <VictoryLine data={datasetBravo.timeline} style={{
                                data: { stroke: "#c43a31" ,}, 
                                tickLabels:{angle:45,}, 
                                parent: { border: "1px solid #ccc"}}} scale={{x:"time", y:"linear"}} />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis tickFormat={(t) => {const out = t.toString().slice(0,10); return `${out}`}} style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                </div>
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Viewer Device Category</h2>
                        <VictoryPie animate={{duration:3000}} padding={40}  data={datasetBravo.deviceTypes} colorScale="qualitative" x='deviceType' y='count' style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Browsers Used By Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40}  data={datasetBravo.browserNameCounts} colorScale="qualitative" x='browserName' y='count' style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>
                {/* <br /> */}
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Do Your Viewers Have Touchscreen?</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.isTouchDevice} colorScale="qualitative" x='isMobileDevice' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Operating System of Viewer</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.osFamilyCount} colorScale="qualitative" x='osFamily' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Brand of Device</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceBrandNamesCount} colorScale="qualitative" x='deviceBrandName' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Name of Device</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceOwnNamesCount} colorScale="qualitative" x='deviceOwnName' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Country Your Viewers Are From</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.countries} colorScale="qualitative" x='countryOfOrigin' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Best Guess Location</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.regions} colorScale="qualitative" x='province' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>
                <br />
                <div className="wCloud">
                    <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                        <ReactWordcloud words={cloudData} />
                    </div>
                </div>
                <br />
                <p>Clicked Links Counts Breakdown: </p>
                <div className="entryChartHolder">
                    <div className="vicBar">
                        {/* <VictoryChart domainPadding={20}> */}
                        <VictoryChart  theme={VictoryTheme.material}>
                            <VictoryBar animate={{duration:3000}} data={pieGraphData} x='linkTitle' y='count' style={{data:{fill:'tomato', fillOpacity: 1}}} />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                    <div className="vicPie">
                        <VictoryPie animate={{duration:3000}} padding={45} data={pieGraphData} colorScale="qualitative" x='linkTitle' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                        {/* <VictoryChart domainPadding={20}> */}
                        {/* </VictoryChart> */}
                    </div>
                </div>
            </div>
        )
    }


}

export default GraphForEntry