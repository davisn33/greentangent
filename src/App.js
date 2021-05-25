import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import routes from "./routes";
import mqtt from 'mqtt';
import {  useSelector,useDispatch } from 'react-redux';
import { addSensorData } from "./redux/actions/actions"

// const client = mqtt.connect("ws://3.129.218.77:3001",{username:"mqtt",password:"test"});
const App = () => {
  const dispatch=useDispatch();
  // const [current,setCurrent] = React.useState("")
  // const currentsensor = useSelector(state=> state.sensorReducer.current);
  // React.useEffect(() => {
  //   if(currentsensor){
  //   client.on('connect', () => console.log("connected"));
  //   client.subscribe(currentsensor,()=>console.log("subbed"))
  //   client.on('message', (topic, payload, packet) => {
  //     console.log(JSON.parse(payload.toString()))
  //     let data=JSON.parse(payload.toString());

  //     let time=data.TIME.substring(data.TIME.indexOf("T")+1,data.TIME.length).split(":")
  //     let hours =time[0].length==1?"0"+(time[0]===0?"12":time[0]):(parseInt(time[0])%12)>12?parseInt(time[0])%12:"0"+parseInt(time[0])%12;
  //     let minute=time[1].length==1?"0"+time[1]:time[1]
  //     let sec=time[2].length==1?"0"+time[2]:time[2]
  //     let ampm =parseInt(time[0])>12?" pm":" am"
  //     time=`${hours}:${minute}:${sec}${ampm}`
  //     let updateddata={
  //       humidity:data.HUMI,
  //       temperature:data.TEMP,
  //       time,
  //     }
  //     dispatch(addSensorData(updateddata))
  //   });
  //   setCurrent(currentsensor);
  // }

  // if(currentsensor===""){
  //   client.unsubscribe(current,()=>console.log("unsubbed"))

  // }
  // }, [currentsensor]);
  const routing = useRoutes(routes);

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

export default App;
