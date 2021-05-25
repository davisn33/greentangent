import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import logo from "../../assets/greentangent-logo.png";

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 0,
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return <Toolbar className={classes.toolbar}></Toolbar>;
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
