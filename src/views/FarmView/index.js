import React from "react";
import { Container, makeStyles, Box, Button, TextField, InputAdornment, MenuItem } from "@material-ui/core";
import FarmTable from "./FarmTable";
import Modal from '@material-ui/core/Modal';
import { withStyles } from "@material-ui/styles";
import {getunassigned,addFarm,getFarms} from "../../Services/api"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "90vh",
    marginBottom: 0,
    marginTop: theme.spacing(1),
  },
  add: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
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







const FarmView = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [output, setOutput] = React.useState([]);
  const [input, setInput] = React.useState([]);
  const [selecto,setSelecto]=React.useState(null);
  const [selecti,setSelecti]=React.useState(null);
  const [showo, setShowo] = React.useState([]);
  const [showi, setShowi] = React.useState([]);
  const [name, setName] = React.useState("");
  const [size, setSize] = React.useState("");
  const [farms, setFarms] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(()=>{
    getunassigned()
    .then((res)=>{
      setOutput(res.data.outputs)
      setInput(res.data.sensors)
    })
    .catch(e=>{
      console.log(e)
    })
    getfarm()
  },[])


  const addfarm=()=>{
    setError("")
    if(!name||!size)
      setError("Please Fill all Feilds")
    else if(isNaN(size))
      setError("Enter A Valid Size")
    else if(!showo.length||!showi.length)
      setError("Please Select Atleast One Sensor and One Controller")
      
    else{
    let o=[],i=[];
    showo.map((item)=>o.push(item._id))
    showi.map((item)=>i.push(item._id))
    addFarm(name,size,i,o)
    .then(res=>{
        if(res.data.status){
          setName("")
          setSize("")
          setShowo([])
          setShowi([])
          getfarm();
          setOpen(false)
        }
    })
    .catch(e=>console.log(e))
  }
  }

  const getfarm=()=>{
    getFarms()
    .then(res=>{
      console.log(res.data.farms)
      setFarms(res.data.farms)
      
    })
    .catch(e=>console.log(e))
  }


  const addOutput=()=>{
      if(selecto){
        setOutput(output.filter((item)=> { 
          if(item._id === selecto){
            setShowo([...showo,item])
            return false
          }
          return true

        }))
        
      }
  }

  const addInput=()=>{
    if(selecti){
      setInput(input.filter((item)=> { 
        if(item._id === selecti){
          setShowi([...showi,item])
          return false
        }
        return true

      }))
      
    }
  }


  const body = (
    <div  className={classes.paper}>
      <h2 id="simple-modal-title">Please Enter Farm Details</h2>
        <form noValidate autoComplete="off"> 
            <CssTextField onChange={(e)=>setName(e.target.value)} value={name} fullWidth variant="outlined" label="Name" size="small" style={{marginTop:20}}/>
            <CssTextField onChange={(e)=>setSize(e.target.value)} value={size} fullWidth variant="outlined" label="Size" size="small" style={{marginTop:20}} 
            InputProps={{
                endAdornment: <InputAdornment position="start">Sqft</InputAdornment>,
              }}/>
            <h4>Add Devices</h4>
            <div style={{flex:2,display:"flex"}}>
                <div style={{flex:1,padding:10}}>
                <div style={{fontWeight:600,fontSize:19}}>Sensors</div>
                    {showi.map((item,i)=><div style={{fontWeight:500,fontSize:17}}>{`${i+1}. ${item.serial_num}`}</div>)}
                    <div style={{display:"flex",marginTop:10}}>
                        <CssTextField fullWidth variant="outlined" size="small"  label="Sensors" onChange={(e)=>setSelecti(e.target.value)} value={selecti} select>
                            {input.map((item)=><MenuItem value={item._id}>{item.serial_num}</MenuItem>)
                            }
                        </CssTextField>
                        <Button onClick={addInput} color="primary" variant="text">Add+</Button>
                    </div>
                </div>
                <div  style={{flex:1,padding:10}}>
                    <div style={{fontWeight:600,fontSize:19}}>Controllers</div>
                    {showo.map((item,i)=><div style={{fontWeight:500,fontSize:17}}>{`${i+1}. ${item.serial_num}`}</div>)}
                    <div style={{display:"flex",marginTop:10}}>
                        <CssTextField fullWidth variant="outlined" size="small"  label="Controllers" onChange={(e)=>setSelecto(e.target.value)} value={selecto} select>
                            {output.map((item)=><MenuItem value={item._id}>{item.serial_num}</MenuItem>)
                            }
                        </CssTextField>
                        <Button onClick={addOutput} color="primary" variant="text">Add+</Button>
                    </div>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:10,color:"red"}}>{error}</div>
            <div style={{display:"flex",justifyContent:"center",marginTop:10}}><Button color="primary" variant="contained" style={{color:"white",width:200}} onClick={addfarm}>Submit</Button></div>
            
        </form>

    </div>
  );

  return (
    <Container style={{minHeight:"90vh"}}>
      <h3 style={{ color: "#50A84C" }}>Farms</h3>
      <div>
        <div className={classes.add}>
          <Button color="primary" variant="text" size="large" onClick={()=>setOpen(true)}>
            <Box
              style={{
                fontWeight: 500,
                fontSize: 18,
                textTransform: "none",
                padding: 0,
              }}
            >
              +Add Farm
            </Box>
          </Button>
        </div>
        <div>
          <FarmTable farms={farms}/>
        </div>
      </div>
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

export default FarmView;

