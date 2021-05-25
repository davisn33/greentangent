import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "90vh",
    marginBottom: 0,
    marginTop: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.root}>
        ddd
      </Grid>
    </Container>
  );
};

export default Dashboard;
