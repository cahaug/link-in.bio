import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
// import PopularityTracker from './PopularityTracker'
import ReactWordcloud from "react-wordcloud";
import toast from "react-hot-toast"
import { WorldMap } from 'react-svg-worldmap'
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {mapJson} from './MapJson'


const GraphForHomepage = () => {
    const [isLoading, setIsLoading] = useState(true)
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
    const [mostPopular, setMostPopular] = useState([])
    const [mostPopularToday, setMostPopularToday] = useState([])
    const [cloudData, setCloudData] = useState([])
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
   
    const getDatasetBravo = () => {
        axios.get('https://link-in-bio.limited/s/steakSauce')
        .then(res => {
            // console.log('res.data bravo', res.data)
            setDatasetBravo(res.data)
            const wordCloudRaw =  JSON.stringify(res.data.regions)
            var rst = JSON.parse(wordCloudRaw.replace(/"province"/g, '"text"').replace(/"count"/g, '"value"'))
            // console.log('rst', rst)
            setCloudData(rst)
            setTrimmedData(res.data.timeline.slice(res.data.timeline.length - 8))
            // console.log('top10', res.data.mostPopular)
            const testData = res.data.mostPopular
            testData.sort((a, b) => (parseInt(a.count,10) < parseInt(b.count,10)) ? 1 : -1)
            const processedTop10 = (testData.map((mostPopular) => {
                // console.log('mostp',mostPopular)
                return (
                    <div key={mostPopular.listId}>
                    <br />
                    <p><a alt={`https://link-in.bio/${mostPopular.listId}`} href={`https://link-in.bio/${mostPopular.listId}`}>{`https://link-in.bio/${mostPopular.listId}`}</a> - <a alt={`${mostPopular.customURL}`} href={`${mostPopular.customURL}`}>{`${mostPopular.customURL}`}</a> - {`${mostPopular.count} views`}</p>
                    </div>
                )
            }))
            const testData2 = res.data.mostPopularToday
            testData2.sort((a, b) => (parseInt(a.count,10) < parseInt(b.count,10)) ? 1 : -1)
            const processedTop10Today = (testData2.map((mostPopularToday) => {
                // console.log('mostp',mostPopularToday)
                return (
                    <div key={mostPopularToday.listId}>
                    <br />
                    <p><a alt={`https://link-in.bio/${mostPopularToday.listId}`} href={`https://link-in.bio/${mostPopularToday.listId}`}>{`https://link-in.bio/${mostPopularToday.listId}`}</a> - <a alt={`${mostPopularToday.customURL}`} href={`${mostPopularToday.customURL}`}>{`${mostPopularToday.customURL}`}</a> - {`${mostPopularToday.count} views`}</p>
                    </div>
                )
            }))
            setMostPopular(processedTop10)
            setMostPopularToday(processedTop10Today)
            setIsLoading(false)
        })
        .catch(err => {
            console.log('error in get dsb', err)
        })
    }


    useEffect(()=>{
        if(datasetBravo.browserNameCounts.length === 0){
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
                <p>Here's a sample of the information we provide all our users about their own lists, only it's the live data for viewers of this very page!</p><br/>
                <div>
                    <div className="vicLine">
                        <h2>{selectedDateRange == 0 ? <span>All-Time</span> :<span>Past {selectedDateRange} Days</span>} Link-in.Bio Homepage Viewers:</h2>
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
                                parent: { border: "1px solid #ccc"}}} scale={{x:"time", y:"linear"}} />
                            <VictoryAxis dependentAxis />
                            <VictoryAxis tickFormat={(t) => {const out = t.toString().slice(0,10); return `${out}`}} style={{tickLabels:{angle:45, textAnchor:"start", }, labels:{padding:-20}}} />
                        </VictoryChart>
                    </div>
                </div>
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Link-in.Bio Homepage Viewers Device Category</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceTypes} colorScale="qualitative" x='deviceType' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Browsers Used To Access Link-in.Bio Homepage</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.browserNameCounts} colorScale="qualitative" x='browserName' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>
                {/* <br /> */}
                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Do Link-in.Bio Homepage Viewers Have Touchscreen?</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.isTouchDevice} colorScale="qualitative" x='isMobileDevice' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Operating System of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.osFamilyCount} colorScale="qualitative" x='osFamily' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Brand of Devices of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceBrandNamesCount} colorScale="qualitative" x='deviceBrandName' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Name of Device of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceOwnNamesCount} colorScale="qualitative" x='deviceOwnName' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Country Link-in.Bio Homepage Viewers Are From</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.countries} colorScale="qualitative" x='countryOfOrigin' y='count' labelComponent={<VictoryTooltip constrainToVisibleArea />} style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Region Location Approximation for Link-in.Bio Homepage Viewers</h2>
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
                    <div style={{ width:"80%", height:"80%", backgroundColor:"white" , margin:"0 auto" }}>
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
                    <div style={{ width: "100%", height: "100%", margin:"0 auto" }}>
                        <ReactWordcloud words={cloudData} />
                    </div>
                </div>
                <br />
                <div className="wMap">
                    <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                        <WorldMap color="red" title="Known Around the World:" value-suffix="viewers" size="lg"  data={datasetBravo.mapCountries} />
                    </div>
                </div>
                <br />
                <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                    <p>Most Popular Accounts:</p>
                    {mostPopular}
                </div>
                <br />
                <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                    <p>Most Popular Today:</p>
                    {mostPopularToday}
                </div>
            </div>
        )
    }


}

export default GraphForHomepage