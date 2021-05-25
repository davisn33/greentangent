import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Modal, TextField,Button, Tooltip } from "@material-ui/core";
import {renamedevice} from "../../Services/api"

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.lightgreen,
    // color: theme.palette.common.white,
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow);

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



const useStyles = makeStyles((theme)=>({
  table: {},
  heading: {
    fontWeight: 600,
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

export default function OutputTable({list,getDevices}) {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");


  

  const addName=()=>{
    console.log(id)
    renamedevice(name,id,"output")
    .then(res=>{
      setName("")
      setOpen(false)
      getDevices()
  
    })
    .catch(e=>{
      console.log(e)
    })
   }

   const body = (
    <div  className={classes.paper}>
      <h2 id="simple-modal-title">Please Enter Name</h2>
      <CssTextField onChange={(e)=>setName(e.target.value)} value={name} fullWidth variant="outlined" label="Name" size="small" style={{marginTop:20}}/>
      <Button onClick={addName} variant="contained" color="primary" style={{color:"white",marginTop:10,width:150}}>Submit</Button>
    </div>
  );


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table" fullwidth>
      <TableHead>
          <TableRow>
            <StyledTableCell className={classes.heading} >
              Serial Number
            </StyledTableCell>
            <StyledTableCell className={classes.heading} >
              Type
            </StyledTableCell>
            <StyledTableCell className={classes.heading} >
              Name
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <StyledTableRow key={item.serial_num}>
              <StyledTableCell component="th" scope="row">
                {item.serial_num}
              </StyledTableCell>
              <StyledTableCell >{"Controller"}</StyledTableCell>
              <StyledTableCell style={{cursor:"pointer"}} onClick={()=>{setId(item._id);setOpen(true)}}>
                <Tooltip title="Edit">
                  <span>
                {item.name?item.name:"Click to add a name"}
                  </span>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          {body}
      </Modal>
    </TableContainer>
  );
}
