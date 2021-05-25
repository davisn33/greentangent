import React from "react";
import { Container, makeStyles, Box, Button, Grid, Paper,Tooltip as ToolTip, TextField, Modal  } from "@material-ui/core";
import { Wifi as WifiIcon,Edit3 as EditIcon} from "react-feather"
import {getSensors,getSensorData,renamedevice} from "../../Services/api"
import {  useSelector,useDispatch } from 'react-redux';
import {currentSensor,sensorData} from "../../redux/actions/actions"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer  } from 'recharts';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/styles";


const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const GreenSwitch = withStyles({
  switchBase: {
    color: "lightgreen",
    '&$checked': {
      color: "green",
    },
    '&$checked + $track': {
      backgroundColor: "green",
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "90vh",
    marginBottom: 0,
    marginTop: theme.spacing(1),
  },
  sensors:{
    width:120,
    height:120,
    borderRadius:10,
    margin:10,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    position:"relative"
  },
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    maxHeight:"70vh",
    overflowY:"scroll"
  },
}));

const MonitorView = () => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const [sensors,setSensors] = React.useState([]);
  const [selected,setSelected] = React.useState("");
  const [currentid,setCurrentid] = React.useState("");
  const [graphdata,setGraphdata] = React.useState([]);
  const current_farm = useSelector(state=> state.farmReducer.current);
  const sensor_details = useSelector(state=> state.sensorReducer);
  const [open, setOpen] = React.useState(false);
  const [outputs,setOutputs] = React.useState([]);
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [devicetype, setDevicetype] = React.useState("");

  const addName=()=>{
    renamedevice(name,id,devicetype)
    .then(res=>{
      setName("")
      setOpen(false)

      if(current_farm)
        getSensors(current_farm)
        .then(res=>{ 
          setOutputs(res.data.outputs)
          setSensors(res.data.sensors)
          setSelected(res.data.sensors.length?res.data.sensors[0].serial_num:"")
          setCurrentid(res.data.sensors.length?res.data.sensors[0]._id:"")
          dispatch(currentSensor(res.data.sensors.length?res.data.sensors[0].serial_num:""))
        })
        .catch(e=>console.log("error",e))

    })
    .catch(e=>{
      console.log(e)
    })
   }


  React.useEffect(() => {
    return () => {
      dispatch(currentSensor(""))
    }
  }, []);

  
  
  React.useEffect(()=>{
    if(current_farm)
    getSensors(current_farm)
    .then(res=>{
      setOutputs(res.data.outputs)
      setSensors(res.data.sensors)
      setSelected(res.data.sensors.length?res.data.sensors[0].serial_num:"")
      setCurrentid(res.data.sensors.length?res.data.sensors[0]._id:"")
      dispatch(currentSensor(res.data.sensors.length?res.data.sensors[0].serial_num:""))
    })
    .catch(e=>console.log("error",e))
  },[current_farm])


  React.useEffect(()=>{
    console.log(sensor_details.current)
    if(sensor_details.current&&current_farm)
    getSensorData(current_farm,currentid)
    .then(res=>{
      let temp=res.data.graph.map(item=>{
        let time=item.date_time.substring(item.date_time.indexOf("T")+1,item.date_time.indexOf(".")).split(":")
        let hours =time[0].length==1?(time[0]==0?"12":"0"+time[0]):(parseInt(time[0])%12)>9?parseInt(time[0])%12:parseInt(time[0])%12==0?"12":"0"+parseInt(time[0])%12;
        let minute=time[1].length==1?"0"+time[1]:time[1]
        let sec=time[2].length==1?"0"+time[2]:time[2]
        let ampm =parseInt(time[0])>11?" pm":" am"
        time=`${hours}:${minute}:${sec}${ampm}`
        return{
          ...item,
          time,
        }
      })
      dispatch(sensorData(temp.reverse()))
    })
    .catch(e=>console.log("err",e))

  },[sensor_details.current])

  React.useEffect(()=>{
    if(sensor_details.sensordata.length){
      setGraphdata(sensor_details.sensordata)
    }

  },[sensor_details.sensordata])


  const body = (
    <div  className={classes.paper}>
      <h2 id="simple-modal-title">Please Enter Name</h2>
      <CssTextField onChange={(e)=>setName(e.target.value)} value={name} fullWidth variant="outlined" label="Name" size="small" style={{marginTop:20}}/>
      <Button onClick={addName} variant="contained" color="primary" style={{color:"white",marginTop:10,width:150}}>Submit</Button>
    </div>
  );


  

  return (
    <Container style={{minHeight:"80vh"}}>
      <h3 style={{ color: "#50A84C" }}>Monitor</h3>
      <h4 >Sensors</h4>
      <Grid container style={{marginTop:10,display:"flex"}}>
          {sensors.map((item)=>
          <div className={classes.sensors} style={{ border:item.serial_num==selected?"solid green 2px":"solid grey 1px",}} key={item._id}>
                <div style={{height:10,width:10,background:"green",borderRadius:5,position:"absolute",top:10,left:10}}/>
                <div style={{position:"absolute",top:5,right:10}}>
                    <ToolTip title="edit">
                      <EditIcon onClick={()=>{setId(item._id);setDevicetype('sensor');setOpen(true)}} size={15} color="#555"/>
                    </ToolTip>
                  </div>
                <WifiIcon color="#555"/>
                <div style={{fontWeight:500,textAlign:"center"}}>{item.name?item.name:item.serial_num}</div>
          </div>)}
      </Grid>
      <Grid container style={{marginTop:50}}>
      {["Hour",].map((item)=>
        <Paper elevation={5} style={{padding:10,margin:5,width:100,borderBottom:item==="Hour"?"solid 3px green":""}}>1 HOUR</Paper>
      )}
      </Grid>
      <Grid container style={{marginTop:20}}>
        <Grid item md={10}>
          <ResponsiveContainer height={500}>
            <AreaChart
              data={graphdata}
              margin={{
                top: 10, right: 50, left: 0, bottom: 0,
              }}
            >
              <XAxis fontSize={12} angle={45} height={100} textAnchor="start" dataKey="time" />
              <YAxis fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="humidity" stroke="blue" strokeWidth={2} fill="#8884d8" />
              <Area type="monotone" dataKey="temperature" stroke="green" strokeWidth={2} fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item md={2} style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <Paper style={{width:150,height:70,padding:5}} elevation={9}>
              <div style={{color:"#8884d8",fontWeight:500}}>Current Humidity</div>
              <div style={{color:"blue",fontWeight:500,marginTop:10,marginLeft:10,fontSize:20}}>
              {graphdata.length?graphdata[graphdata.length-1].humidity+" %":""}</div>
              </Paper>
        <Paper style={{width:150,height:70,marginTop:10,padding:5}} elevation={9}>
          <div style={{color:"#82ca9d",fontWeight:500}}>Current Temp</div>
          <div style={{color:"green",fontWeight:500,marginTop:10,marginLeft:10,fontSize:20}}>
            {graphdata.length?graphdata[graphdata.length-1].temperature+" °C":""}</div>
              </Paper>
        </Grid>
      </Grid>
      <h4>Controllers</h4>
      {outputs.map(ele=>
      <>
      <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <h5>{ele.name}</h5>
      <ToolTip title="edit" style={{marginLeft:10}}>
        <EditIcon onClick={()=>{setId(ele._id);setDevicetype('output');setOpen(true)}} size={15} color="#555"/>
      </ToolTip>
      </div>
      <Grid container style={{marginTop:10}}>
      {ele.ports.map((item)=>
          <div className={classes.sensors} style={{ border:"solid green 2px"}} key={item._id}>
                <div style={{height:10,width:10,background:"green",borderRadius:5,position:"absolute",top:10,left:10}}/>
                  <GreenSwitch/>
                <div style={{fontWeight:500,textAlign:"center"}}>{item.name?item.name:item.serial_num}</div>
          </div>)}
      </Grid>
      </>
      
      )}

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          {body}
      </Modal>
    </Container>
  );
};

export default MonitorView;
