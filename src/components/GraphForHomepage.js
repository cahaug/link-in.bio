import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryLine, VictoryTheme } from 'victory'
// import PopularityTracker from './PopularityTracker'
import ReactWordcloud from "react-wordcloud";



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
    })
    const [mostPopular, setMostPopular] = useState([])
    const [cloudData, setCloudData] = useState([])

   
    const getDatasetBravo = () => {
        axios.get('https://link-in-bio.herokuapp.com/s/steakSauce')
        .then(res => {
            console.log('res.data bravo', res.data)
            setDatasetBravo(res.data)
            const wordCloudRaw =  JSON.stringify(res.data.regions)
            var rst = JSON.parse(wordCloudRaw.replace(/"province"/g, '"text"').replace(/"count"/g, '"value"'))
            console.log('rst', rst)
            setCloudData(rst)
            const processedTop10 = (res.data.mostPopular.map((mostPopular) => {
                console.log('mostp',mostPopular)
                return (
                    <div key={mostPopular.listId}>
                    <p><a alt={`https://link-in.bio/${mostPopular.listId}`} href={`https://link-in.bio/${mostPopular.listId}`}>{`https://link-in.bio/${mostPopular.listId}`}</a> - <a alt={`${mostPopular.customURL}`} href={`${mostPopular.customURL}`}>{`${mostPopular.customURL}`}</a> - {`${mostPopular.count}`}</p>
                    </div>
                )
            }))
            setMostPopular(processedTop10)
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
                <p>We're tracking this page! (Anonymously and Legally, of course.)</p> <br/>
                <p>Link-in.Bio logs anonymous information for you about your page viewers, so you can better know your audience.</p><br/>
                <p>Link-in.Bio is PCI, CCPA and GDPR Compliant, and is based in Scottsdale, Arizona.</p><br/>
                <p>Link-in.Bio uses industry-leading practices to safeguard your data and reCAPTCHA to protect against robot attack.</p><br/>
                <p>We will never give or sell any of your information to anyone.</p><br/>
                <p>You won't ever see a cookie disclaimer on our website ❌🍪❌, because we do not use cookies. 👍 </p><br/>
                <p>Here's a sample of the information we provide all our users about their own lists, only it's the live data for viewers of this very page!</p><br/>
                <div>
                    <div className="vicLine">
                        <h2>Daily Link-in.Bio Homepage Viewers:</h2>
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
                        <h2>Link-in.Bio Homepage Viewers Device Category</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceTypes} colorScale="qualitative" x='deviceType' y='count' style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Browsers Used To Access Link-in.Bio Homepage</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.browserNameCounts} colorScale="qualitative" x='browserName' y='count' style={{
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
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.isTouchDevice} colorScale="qualitative" x='isMobileDevice' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Operating System of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.osFamilyCount} colorScale="qualitative" x='osFamily' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Brand of Devices of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceBrandNamesCount} colorScale="qualitative" x='deviceBrandName' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Name of Device of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={40} data={datasetBravo.deviceOwnNamesCount} colorScale="qualitative" x='deviceOwnName' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Country Link-in.Bio Homepage Viewers Are From</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.countries} colorScale="qualitative" x='countryOfOrigin' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Region Location Approximation for Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} padding={45} data={datasetBravo.regions} colorScale="qualitative" x='province' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>
                <br />
                <div className="wCloud">
                    <div style={{ width: "100%", height: "100%", margin:"0 auto" }}>
                        <ReactWordcloud words={cloudData} />
                    </div>
                </div>
                <br />
                <div style={{ width: "98%", height: "98%", margin:"0 auto" }}>
                    <p>Most Popular Accounts:</p>
                    {mostPopular}
                </div>
            </div>
        )
    }


}

export default GraphForHomepage