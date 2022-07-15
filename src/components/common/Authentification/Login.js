import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
    Link,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import Iconify from '../../../comp/Iconify';
import AuthSocial from '../../../sections/authentication/AuthSocial';

import { session, } from "../utilitySession.js";
import { submitLogin } from "./LoginAdapter";

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const Login = () => {
    const [isPartner, setIsPartner] = useState(false);
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const [mdp, setMdp] = useState("");
    const [errorMdp, setErrorMdp] = useState(null);
    const [otherErrorMessage, setOtherErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const regExp = new RegExp("/back","i");
        if(regExp.test(window.location.href)){
            setIsPartner(true);
        }
    }, []);
    
    const interpretResponseLogin = (res) => {
        console.log(res);
        const response = {
            200: () => {
                // localStorage.setItem("user_session", res.headers.user_session);
                // session.getInstance().update(res.headers.user_session);
                history.push(`/back/login/verifyCode/${res.data.idUser}`);
            },
            201: () => {
                const errors = res.data.errors;
                const setErrors = [
                    {field: "other", setter: setOtherErrorMessage},
                    {field: "email", setter: setErrorEmail},
                    {field: "mdp", setter: setErrorMdp}
                ];
                let keys = Object.keys(errors);
                keys.map(field => {
                    for(let i = 0; i < setErrors.length; i++){
                        if(setErrors[i].field === field){
                            setErrors[i].setter(errors[field]);
                        }
                    }
                });
            },
            202: () => setOtherErrorMessage(res.message),
            203: () => history.push(`/back/login/verifyCode/${res.idUser}`),
        };
        response[res.data.status]();
        setLoading(false);
    };

    function IdBrowser(object){
        var id = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"!#$%';
        for ( var i = 0; i < characters.length; i++ ) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        object.idBrowser = id;
        object.isInsert = true;
        localStorage.setItem('idBrowser', id);
        return object;
    }
    const login = (e) => {
        e.preventDefault();
        var ObjectBrowser = {idBrowser : "" , isInsert : false};
        if(!localStorage.getItem('idBrowser')){
            ObjectBrowser = IdBrowser(ObjectBrowser);
        }
        ObjectBrowser.idBrowser = localStorage.getItem('idBrowser');

        setLoading(true);
        setOtherErrorMessage(null);
        submitLogin({
            is_partner: true,
            email: email.trim(),
            mdp: mdp.trim(),
            browser : ObjectBrowser,
        })
        .then(res => interpretResponseLogin(res))
        .catch(err =>{console.log(err); console.log("erreur");} );
    };
    
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

    const { handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const keyPress = (e) => {
        if(e.keyCode == 13){
           login(e);
        }
    }

    function redirect(e){
        e.preventDefault();
        history.push("/back/research");
    }
    
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                        <h1>{isPartner ? "Se connecter en tant que partenaire" : "Se connecter"}</h1>
                        {otherErrorMessage === null ? null : <Alert severity="error">{otherErrorMessage}</Alert>}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Stack>
                    <AuthSocial />

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
                            </Stack><br/>

                            <LoadingButton
                                fullWidth
                                onClick={(e) => login(e)}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<HowToRegIcon />}
                                variant="contained"
                            >
                                <span style={{color:'white'}}>Login</span>
                            </LoadingButton>

                            <Link>
                                <h5 onClick ={(e) => redirect(e)}
                                    style={{marginLeft: '45%' , color :'black'}} >Mot de passe oublié?
                                </h5>
                            </Link>

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
    );
}

export default Login;
