import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "90vh",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileDetails />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
