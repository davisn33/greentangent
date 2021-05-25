import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import logo from "../../assets/greentangent-logo.png";
import {
  Box,
  Button,
  Checkbox,
  Link,
  Container,
  FormHelperText,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {verify} from "../../Services/api"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <RouterLink to={"/login"}>
        <img src={logo} alt="aa" style={{ height: 80, width: 150,padding:10 }} />
        </RouterLink>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              otp:''
            }}
            validationSchema={
              Yup.object().shape({
                otp: Yup.string().matches(/^\d{4}$/, {message: "Please enter valid otp", excludeEmptyString: false}).required('OTP is required'),
              })
            }
            onSubmit={({otp},{ setSubmitting,setErrors }) => {
            verify(otp)
            .then(res=>{
              if(res.data.status){
                console.log("otpdata",res.data);
                setSubmitting(false);
                localStorage.setItem("verified","1");
                navigate('/app/devices', { replace: true });
              }

            })
            .catch(e=>{
              setSubmitting(false);
              setErrors({otp:"invalid otp"})
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
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Please Enter OTP
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    check your email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.otp && errors.otp)}
                  fullWidth
                  helperText={touched.otp && errors.otp}
                  label="OTP"
                  margin="normal"
                  name="otp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.otp}
                  variant="outlined"
                />
                
                
                <Box my={2}>
                  <Button
                    color="primary"
                    style={{color:"white"}}
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Verify Now
                 </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Go back To
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
  );
};

export default RegisterView;
