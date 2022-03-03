import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "../canvas/canvasjs.react";
import { RootStateType } from "../reducers";
import "./Chart.scss"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart=()=>{
    const weatherReducer = useSelector((e:RootStateType)=>e.WeatherReducer);
    const [page,setPage]=useState(0);
    const dataPoint = weatherReducer.data?.forecast?.forecastday?.map((day:any)=>{
        return day?.hour?.map(
        (hour:any) => {
            var time = new Date(0);
            time.setUTCSeconds(hour?.time_epoch);
            return ({x: time, y: hour?.temp_c, extra: hour?.humidity}) || [];
        }
        )
    }) || []
    //const mergedTemperature:any[] = [].concat.apply([], dataPoint);
    const mergedTemperature:any[] = dataPoint[page] || [];
    const HumidityData = mergedTemperature.map(e=>({x: e?.x, y: e?.extra})) || []
    
    const [enableTemp, setEnableTemp]=useState(true);
    const [enableHumi, setEnableHumi]=useState(true);
    
    //useEffect(()=>{console.log("enableHumi"+enableHumi)},[enableHumi])
    //useEffect(()=>{console.log("enableTemp"+enableTemp)},[enableTemp])
    const options = {
        title: {
          text: "City Temporarture and Humidity Forcase"
        },
        animationEnabled: true,
		exportEnabled: true,
        theme: "dark2",
        axisX:{
            title: "Time (hour)",
            valueFormatString: "hh",
            suffix: "h",
            prefix: "day"
        },
        axisY: enableTemp ? [{
            title: "Temporature",
            //prefix: "$"
            suffix: "°C"
            
        },]:[],
        axisY2:enableHumi ? [
            {
            title: " Humidity",
            suffix: "%"
            }
        ]: [],
        data: [enableTemp && {				
                  type: "spline",
                  axisYIndex: 0,
                  dataPoints: [
                      ...mergedTemperature
                  ]
                },
                enableHumi && {				
                    type: "spline",
                    axisYIndex: 1,
                    axisYType: "secondary",
                    dataPoints: [
                        ...HumidityData
                    ]
                },
        ]
     }
     return <div className="chart-component">
         {weatherReducer.data && weatherReducer.data?.forecast && <CanvasJSChart options = {options} />}
         {weatherReducer.data && weatherReducer.data?.forecast && <h3>Day {weatherReducer.data?.forecast?.forecastday[page]?.date}</h3>}
         {weatherReducer.data && weatherReducer.data?.forecast && <div className="change-page">
             <button onClick={()=>{
                 if (page<=0){
                     setPage(dataPoint?.length-1)
                 }else{
                     setPage(page-1)
                 }
             }}>Previous Day</button>
             <button onClick={()=>{
                 if (page>=dataPoint?.length-1){
                    setPage(0)
                }else{
                    setPage(page+1)
                }
             }}>Next Day</button>
         </div>}
         {weatherReducer.data && weatherReducer.data?.forecast && <div className="toggle-enable">
             <button onClick={()=>{console.log(enableTemp);setEnableTemp(!enableTemp)}}>Toggle Temperature Display</button>
             <button onClick={()=>setEnableHumi(!enableHumi)}>Toggle Humidity Display</button>
         </div>}
     </div>
}

export default Chart;