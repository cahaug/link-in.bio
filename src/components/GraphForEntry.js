import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryTheme, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import ReactWordcloud from "react-wordcloud";
import toast from 'react-hot-toast'
import { WorldMap } from 'react-svg-worldmap'
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {mapJson} from './MapJson'

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
        timeline:[],
        mapCountries:[],
        mapPoints:[]
    })
    const [selectedDateRange, setSelectedDateRange] = useState(7)
    const [trimmedData, setTrimmedData] = useState([])


    const onChangeDataDisplay = event => {
        event.preventDefault()
        const ogData = datasetBravo.timeline
        // console.log('trimmeddata',trimmedData)
        // console.log('original', datasetBravo.timeline)
        if(event.target.value > datasetBravo.timeline.length){
            toast.error(`There isn't any data that old yet :)`)
        } else if(event.target.value == 0){
            // console.log('is zero', ogData)
            setTrimmedData(ogData)        
            setSelectedDateRange(event.target.value)
            // console.log('trimmeddata',trimmedData)
            // console.log('original', datasetBravo.timeline)
        } else if(event.target.value !== 0 && event.target.value < datasetBravo.timeline.length) {
            // console.log('other behavior')
            setSelectedDateRange(event.target.value)
            setTrimmedData(datasetBravo.timeline.slice(datasetBravo.timeline.length - event.target.value - 1))
        }
    }

    const getData = () => {
        const userId = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        axios.post('https://link-in-bio.limited/s/pieGraph', {userId:userId}, {headers: {authorization: token}})
        .then(res => {
            // console.log('res.data', res.data)
            setPieGraphData(res.data)
            var localMax = 0
            res.data.forEach(value => {
                // console.log('value', value)
                if(value.count>localMax){
                    // console.log('newLocalMax', localMax)
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
        axios.get(`https://link-in-bio.limited/s/elv/${listId}`, {headers: {authorization: token}})
        .then(res => {
            // console.log('res.data bravo', res.data)
            setDatasetBravo(res.data)
            setDiscreteViewers(res.data.distinctViewersCount)
            const wordCloudRaw =  JSON.stringify(res.data.regions)
            var rst = JSON.parse(wordCloudRaw.replace(/"province"/g, '"text"').replace(/"count"/g, '"value"'))
            // console.log('rst', rst)
            setCloudData(rst)
            setTrimmedData(res.data.timeline.slice(res.data.timeline.length - 8))
            setIsLoading(false)
        })
        .catch(err => {
            console.log('error in get rdb', err)
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
                        <h2>{selectedDateRange == 0 ? <span>All-Time</span> :<span>Past {selectedDateRange} Days</span>} Your Link-in.Bio Views:</h2>
                        <br />
                        <select onChange={onChangeDataDisplay}>
                            <option value={7}>Past 7 Days</option>
                            <option value={14}>Past 14 Days</option>
                            <option value={30}>Past 30 Days</option>
                            <option value={0}>All Time</option>
                        </select>
                        <br />
                        <VictoryChart theme={VictoryTheme.material} padding={{bottom:75, left:50,right:50, top:30}} containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${datum.y} Views`} />}>
                            <VictoryLine data={trimmedData} style={{
                                data: { stroke: "#c43a31" ,}, 
                                tickLabels:{angle:45,}, 
                                parent: { border: "1px solid #ccc"}}} scale={{x:"time", y:"linear"}} labelComponent={<VictoryTooltip constrainToVisibleArea />} />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis tickFormat={(t) => {const out = t.toString().slice(0,10); return `${out}`}} style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                </div>
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Viewer Device Category</h2>
                        <VictoryPie animate={{duration:3000}} padding={40}  data={datasetBravo.deviceTypes} colorScale="qualitative" x='deviceType' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Browsers Used By Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40}  data={datasetBravo.browserNameCounts} colorScale="qualitative" x='browserName' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
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
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.isTouchDevice} colorScale="qualitative" x='isMobileDevice' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Operating System of Viewer</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.osFamilyCount} colorScale="qualitative" x='osFamily' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Brand of Device</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceBrandNamesCount} colorScale="qualitative" x='deviceBrandName' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Name of Device</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceOwnNamesCount} colorScale="qualitative" x='deviceOwnName' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Country Your Viewers Are From</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.countries} colorScale="qualitative" x='countryOfOrigin' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Best Guess Location</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.regions} colorScale="qualitative" x='province' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>
                <br />
                <div className="vMap">
                    <p>Last 100 Viewers Locations:</p><br />
                    <div style={{ width:"80%", height:"80%", backgroundColor:"white" ,margin:"0 auto" }}>
                    <ComposableMap>
                        <Geographies geography={mapJson}>
                            {({ geographies }) =>
                            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                            }
                        </Geographies>
                        {datasetBravo.mapPoints.map(({ name, coordinates, markerOffset }) => (
                            <Marker key={name} coordinates={coordinates}>
                                <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
                                <text textAnchor="middle" y={markerOffset} style={{ fontFamily: "Bariol Serif Thin", fill: "#5D5A6D" }} >{name}</text>
                            </Marker>
                        ))}
                    </ComposableMap>
                    </div>
                </div>
                <br />
                <div className="wCloud">
                    <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                        <ReactWordcloud words={cloudData} />
                    </div>
                </div>
                <br />
                <div className="wMap">
                    <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                        <WorldMap color="red" title="Your Views are from:" value-suffix="viewers" size="lg"  data={datasetBravo.mapCountries} />
                    </div>
                </div>
                <br />
                <p>Clicked Links Counts Breakdown: </p>
                <div className="entryChartHolder">
                    <div className="vicBar">
                        {/* <VictoryChart domainPadding={20}> */}
                        <VictoryChart  theme={VictoryTheme.material} containerComponent={<VictoryVoronoiContainer activateData={true} labels={({ datum }) => `${datum._y} Views`} />}>
                            <VictoryBar animate={{duration:3000}} data={pieGraphData} x='linkTitle' y='count' style={{data:{fill:'tomato', fillOpacity: 1}}} />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                    <div className="vicPie">
                        <VictoryPie animate={{duration:3000}} padding={45} data={pieGraphData} colorScale="qualitative" x='linkTitle' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
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