import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Tooltip,
  TextField,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import logo from "../../assets/greentangent-logo.png";
import { withStyles } from "@material-ui/styles";
import {getFarms} from "../../Services/api"
import {  useSelector,useDispatch } from 'react-redux';
import {currentFarm,setFarmList} from "../../redux/actions/actions"

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
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

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const farm_details = useSelector(state=> state.farmReducer);
  let dispatch = useDispatch();
  const classes = useStyles();
  const [notifications] = useState([]);
  const [farms,setFarms] = useState([]);
  const [selected,setSelected] = useState("");
  React.useEffect(()=>{
    getFarms()
    .then(res=>{
      setFarms(res.data.farms);
      setSelected(res.data.farms?res.data.farms[0]._id:"")
      dispatch(setFarmList(res.data.farms))
    })
    .catch(e=>console.log(e))
  },[])

  React.useEffect(()=>{
    if(selected!==""){
        dispatch(currentFarm(selected))
    }
  },[selected])

  React.useEffect(()=>{
    console.log("farm_details",farm_details);
    setFarms(farm_details.farms)
    setSelected(farm_details.current);
  },[farm_details])

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={4}
      color="secondary"
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src={logo} style={{ height: 60 }} />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
        <CssTextField style={{width:150,marginRight:50}} size="small"  label="Farm" onChange={(e)=>setSelected(e.target.value)} value={selected}  select>
            {farms.map((item,i)=><MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>)
            }
        </CssTextField>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="logout">
            <IconButton color="inherit">
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
        <CssTextField style={{width:150}} size="small"  label="Farm"  onChange={(e)=>setSelected(e.target.value)} value={selected}  select>
            {farms.map((item,i)=><MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>)
            }
        </CssTextField>
        <Tooltip title="logout">
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Tooltip>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
