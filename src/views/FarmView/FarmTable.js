import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import greenhouse from "../../assets/greenhouse.svg"
import loader from "../../assets/spinner.gif"

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



const useStyles = makeStyles({
  table: {},
  heading: {
    fontWeight: 600,
  },
  text:{
    fontSize:16,
    fontWeight:600,
    color:"#757575"
  }
});

export default function FarmTable({farms}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="customized table" fullwidth>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.heading}>
              Name
            </StyledTableCell>
            <StyledTableCell className={classes.heading} align="right">
              Size
            </StyledTableCell>
            <StyledTableCell className={classes.heading} align="right">
              Sensors
            </StyledTableCell>
            <StyledTableCell className={classes.heading} align="right">
              Controllers
            </StyledTableCell>
            <StyledTableCell className={classes.heading} align="right">
              Zones
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farms.length?farms.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row" style={{padding:0,display:"flex",flexDirection:"row",alignItems:"center"}}>
                <img src={greenhouse} style={{width:100,height:100,objectFit:"cover"}}/>
                <div>
                <div style={{fontWeight:700,fontSize:20,color:"#69AE06"}}>{item.name}</div>
                <div>{item.name}</div>
                </div>
              </StyledTableCell>
              <StyledTableCell className={classes.text} align="right">{item.size+" Sqft"}</StyledTableCell>
              <StyledTableCell className={classes.text} align="right">{item.total_sensors}</StyledTableCell>
              <StyledTableCell className={classes.text} align="right">{item.total_outputs}</StyledTableCell>
              <StyledTableCell className={classes.text} align="right">{item.total_zones}</StyledTableCell>
            </StyledTableRow>
          ))
          :
          <StyledTableRow>
            <StyledTableCell colSpan={5} align="center">
            <img src={loader} alt="loader"/>
            </StyledTableCell>
          </StyledTableRow>
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
