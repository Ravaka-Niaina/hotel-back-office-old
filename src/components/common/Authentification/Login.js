import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";

import ResponsiveDrawer from "../../menu/responsive-drawer.js";

import {session} from "../utilitySession.js";
import styles from './Register.module.css';
import stylesLogin from './Login.module.css';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { useState } from 'react';

import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../comp/Iconify';

// material
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../../layouts/AuthLayout';
// components
import Page from '../../../comp/Page';
import { LoginForm } from '../../../sections/authentication/login';
import AuthSocial from '../../../sections/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

const Login = (props) => {
    const [isPartner, setIsPartner] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState(null);
    const [mdp, setMdp] = React.useState("");
    const [errorMdp, setErrorMdp] = React.useState(null);
    const [ambiguousError, setAmbiguousError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);


    const history = useHistory();

    useEffect(() => {
        const regExp = new RegExp("/back","i");
        if(regExp.test(window.location.href)){
            setIsPartner(true);
        }
    }, []);
 

    
    const interpretResponse = (res) => {
        console.log(res);
        const data = res.data;
        if(data.status === 200){
            localStorage.setItem("user_session", res.headers.user_session);
            session.getInstance().update(res.headers.user_session);
            if(props.urlRedirect){
                window.location.href = props.urlRedirect;
            }else{
                history.push(isPartner ? '/back' : '/front');
            }
        }else{
            const setErrors = [
                {field: "ambiguous", setter: setAmbiguousError},
                {field: "email", setter: setErrorEmail},
                {field: "mdp", setter: setErrorMdp}
            ];
            let keys = Object.keys(data.errors);
            keys.map(field => {
                for(let i = 0; i < setErrors.length; i++){
                    if(setErrors[i].field === field){
                        setErrors[i].setter(data.errors[field]);
                    }
                }
            });
        }
        setLoading(false);
    };

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        setAmbiguousError(null);
        const data = {
            isPartner: isPartner,
            email: email.trim(),
            mdp: mdp.trim()
        };
        axios({
            method: "post",      
            url: process.env.REACT_APP_BACK_URL + '/user/login',
            withCredentials: true,
            data: data
        })
        .then(res => interpretResponse(res))
        .catch(err =>{console.log(err); console.log("erreur");} );
    };

    const register = (e) => {
        e.preventDefault();
        history.push(isPartner ? "/back/register" : "/front/register");
    }
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
        history('/dashboard', { replace: true });
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const keyPress = (e) => {
        if(e.keyCode == 13){
           login(e);
        }
    }
    
    return(
        <>
        <Grid container spacing={2}>
            {/* <Grid item xs={4}> */}
                {/* <AuthLayout>
                    Don’t have an account? &nbsp;
                    <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
                    Get started
                    </Link>
                </AuthLayout> */}

                {/* <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <img src="/static/illustrations/illustration_login.png" alt="login" />
                </SectionStyle> */}
            {/* </Grid> */}
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                        <h1>{isPartner ? "Se connecter en tant que partenaire" : "Se connecter"}</h1>
                          {ambiguousError === null ? null : <Alert severity="error">{ambiguousError}</Alert>}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Stack>
                    <AuthSocial />

                    {/* <LoginForm /> */}
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                            <TextField
                                fullWidth
                                autoComplete="username"
                                type="email"
                                label="Email address"
                                {...getFieldProps('email')}
                                value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
                                error={errorEmail === null ? false : true}
                                onKeyDown={keyPress}
                                helperText={errorEmail === null ? null : errorEmail}
                            />

                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                {...getFieldProps('password')}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                    </InputAdornment>
                                )
                                }}
                                value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
                                error={errorMdp === null ? false : true}
                                onKeyDown={keyPress}
                                helperText={errorMdp === null ? null : errorMdp}
                            />
                            </Stack>

                            <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                            onClick={(e) => login(e)}
                            >
                            Login
                            </LoadingButton>
                        </Form>
                        </FormikProvider>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                        mt: 3,
                        display: { sm: 'none' }
                        }}
                    >
                        Don’t have an account?&nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
                        Get started
                        </Link>
                    </Typography>
                    </ContentStyle>
                </Container>
            </Grid>
        </Grid>
        </>


        // <div className={styles.auth + " " + stylesLogin.auth}>
        //       <Paper 
        //           elevation={1}
        //           className={styles.auth}
        //           children={
        //               <>
        //                   <h1>{isPartner ? "Se connecter en tant que partenaire" : "Se connecter"}</h1>
        //                   {ambiguousError === null ? null : <Alert severity="error">{ambiguousError}</Alert>}
        //                   <Box
        //                       component="form"
        //                       sx={{
        //                           '& .MuiTextField-root': { m: 1, width: '25ch' },
        //                       }}
        //                       noValidate
        //                       autoComplete="off"
        //                   >
        //                       <TextField 
        //                           id="outlined-basic"
        //                           variant="outlined"
        //                           size='small'
        //                           label={<p>Email</p>}
        //                           type="email"
        //                           value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
        //                           error={errorEmail === null ? false : true}
        //                           helperText={errorEmail === null ? null : errorEmail}
        //                       /> 
        //                   </Box>
        //                   <Box
        //                       component="form"
        //                       sx={{
        //                           '& .MuiTextField-root': { m: 1, width: '25ch' },
        //                       }}
        //                       noValidate
        //                       autoComplete="off"
        //                   >
        //                       <TextField 
        //                           id="outlined-basic"
        //                           variant="outlined"
        //                           size='small'
        //                           label={<p>Mot de passe</p>}
        //                           type="password"
        //                           value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
        //                           error={errorMdp === null ? false : true}
        //                           helperText={errorMdp === null ? null : errorMdp}
        //                       />
        //                   </Box>
        //                   <Stack spacing={1}>
        //                     <Button sx={{width: 200}} variant="contained" onClick={(e) => login(e)}>
        //                         <span style={{color:'white'}}>Se connecter</span>
        //                     </Button>
        //                     <Button sx={{width: 200}} variant="contained" onClick={(e) => register(e)}>
        //                         <span style={{color:'white'}}>S'inscrire</span>
        //                     </Button>
        //                   </Stack>
                            
        //               </>
        //           } 
        //       />
        // </div>
        );
    
    
}
export default Login;
