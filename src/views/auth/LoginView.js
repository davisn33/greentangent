import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import logo from "../../assets/greentangent-logo.png";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {login} from "../../Services/api"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <img src={logo} alt="aa" style={{ height: 80, width: 150,padding:10 }} />
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={(values,{ setSubmitting,setErrors }) => {
            login(values.email,values.password)
            .then(res=>{
                console.log("login",res.data);
                if(res.data.status){
                  localStorage.setItem("token",res.data.token);
                  if(res.data.user.isVerified){
                      setSubmitting(false);
                      navigate("/app/devices");
                      localStorage.setItem("verified","1");
                  }
                  else{
                    setSubmitting(false);
                    navigate("/verify");
                  }
                }
                else{
                  setErrors({email:"Invalid email or password",password:"Invalid email or password"});
                }
            })
            .catch(e=>{
              setErrors({email:"Invalid email or password",password:"Invalid email or password"});
              setSubmitting(false);
              console.log(e)
            })
            
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                  style={{ textAlign: "center" }}
                >
                  Sign in
                </Typography>
              </Box>

              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  style={{ color: "white" }}
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
              </Box>
              <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign Up
                  </Link>
                </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default LoginView;
