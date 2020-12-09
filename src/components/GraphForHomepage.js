import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryLine, VictoryTheme } from 'victory'


const GraphForHomepage = () => {
    const [isLoading, setIsLoading] = useState()
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

   
    const getDatasetBravo = () => {
        axios.get('https://link-in-bio.herokuapp.com/s/steakSauce')
        .then(res => {
            console.log('res.data bravo', res.data)
            setDatasetBravo(res.data)

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
                <p>We're tracking this page! (Anonymously and Legally, of course.)</p>
                <p>Link-in.Bio logs anonymous information for you about your users, so you can better know your audience.</p>
                <p>Link-in.Bio is PCI, CCPA and GDPR Compliant, and is based in Scottsdale, Arizona.</p>
                <p>Link-in.Bio uses industry-leading security to safeguard your data and reCAPTCHA to protect against robot attack.</p>
                <p>We will never give or sell any of your information to anyone, and you won't see a cookie disclaimer on our website ❌🍪❌, because we do not use cookies. 👍 </p>
                <p>Here's a sample of the information we provide all our users about their own lists, only it's the live data for viewers of this very page!</p>
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
                        <VictoryPie animate={{duration:3000}}  data={datasetBravo.deviceTypes} colorScale="qualitative" x='deviceType' y='count' style={{
                            labels: {
                                fontSize: 25, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Browsers Used To Access Link-in.Bio Homepage</h2>
                        <VictoryPie animate={{duration:3000}}  data={datasetBravo.browserNameCounts} colorScale="qualitative" x='browserName' y='count' style={{
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
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.isTouchDevice} colorScale="qualitative" x='isMobileDevice' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Operating System of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.osFamilyCount} colorScale="qualitative" x='osFamily' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Brand of Devices of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.deviceBrandNamesCount} colorScale="qualitative" x='deviceBrandName' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Name of Device of Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.deviceOwnNamesCount} colorScale="qualitative" x='deviceOwnName' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>

                <div className="entryChartHolder">
                    <div className="vicPie">
                        <h2>Country Link-in.Bio Homepage Viewers Are From</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.countries} colorScale="qualitative" x='countryOfOrigin' y='count' style={{
                            labels: {
                                fontSize: 30, fill: '#929292'
                              }
                        }} />
                    </div>
                    <div className="vicPie">
                        <h2>Region Location Approximation for Link-in.Bio Homepage Viewers</h2>
                        <VictoryPie animate={{duration:3000}} data={datasetBravo.regions} colorScale="qualitative" x='province' y='count' style={{
                            labels: {
                                fontSize: 20, fill: '#929292'
                              }
                        }} />
                    </div>
                </div>
                {/* <br /> */}
                
            </div>
        )
    }


}

export default GraphForHomepage