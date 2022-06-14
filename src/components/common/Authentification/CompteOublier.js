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
import HowToRegIcon from '@mui/icons-material/HowToReg';

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


const CompteOublier = () => {
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
       
    });
    const history = useHistory();
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    const [email, setEmail] = React.useState(null);
    const [error,setError] = React.useState("Entrez votre adresse e-mail");
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [affichage , setAffichage] = React.useState(null);
    const [code, setCode] = React.useState(null);
    const [errorCode,setErrorCode] = React.useState(false);
    const [ResultBodyEmail , setResultBodyEmail] = React.useState(null);
    
    function handleChangeEmail(e){
        setEmail(e.target.value);
        if(e.target.value === ""){
            setErrorEmail(true);
        }
    }

    function handleEmptyInfo(field,setField){
        if(field === null || field === ""){
            setField(true);
        }
    }

    

    function Envoyer(e){
        setLoading(true);
        let data = {email :email}
        axios({
            method: "post",      
            url: process.env.REACT_APP_BACK_URL + '/user/SendEmailUpdateCompte',
            withCredentials: true,
            data: data
        })
        .then(res => interpretResponse(res))
        .catch(err =>{console.log(err); console.log("erreur");} );
    }

    function interpretResponse(res){
        console.log(res);
        setLoading(false);
        const data = res.data;

        if(data.status == 200){
            setAffichage(data.message);
            setEmail(null)
            setResultBodyEmail(data.body);
        }else{
            setError(data.message);
            setErrorEmail(true);
        }
    }

    function getChiffre(e){
        localStorage.setItem('access' , 23);
        e.preventDefault();
        setLoading(true); 
        const data = {code : code , data : ResultBodyEmail};
        axios({
            method: "post",      
            url: process.env.REACT_APP_BACK_URL + '/user/compareCode',
            withCredentials: true,
            data: data
        })
        .then(res => ResponseCode(res))
        .catch(err =>{console.log(err); console.log("erreur");} );
    }

    function ResponseCode(res){
        setLoading(false);
        const data = res.data;
        if(data.status === 200){
            history.push("/back/verifier/"+data.id);
        }else{
            setError(data.message);
            setErrorCode(true); 
        }
    }

    return(
        <>
        {
            affichage !== null ? 
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                        <h5>entrez le code à # chiffres</h5>
                        </Typography>
                    </Stack>

                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                <TextField
                                    fullWidth type="Number"
                                    label="entrez code secret"
                                    value={code} 
                                    onChange={(e) => {setErrorCode(false) ;setCode(e.target.value)}}
                                    onBlur={(e) => handleEmptyInfo(code,setErrorCode)}
                                    error={errorCode}
                                    helperText={errorCode === true ? error : null}
                                /> 
                                </Stack><br/>

                                <LoadingButton
                                    fullWidth
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<HowToRegIcon />}
                                    variant="contained"
                                    onClick={(e) => getChiffre(e)}
                                >
                                        <span style={{color:'white'}}>verifier</span>
                                </LoadingButton>
                            </Form>
                        </FormikProvider>

                    </ContentStyle>
                </Container>
            </Grid>
        </Grid> :

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                        <h3>Rechercher votre compte</h3>
                        <h5>entrez votre adresse e-mail</h5>
                        </Typography>
                    </Stack>

                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                <TextField
                                    fullWidth type="email"
                                    autoComplete="code"
                                    label="votre e-mail"
                                    value={email} 
                                    onChange={(e) => {setErrorEmail(false) ;setEmail(e.target.value)}}
                                    onBlur={(e) => handleEmptyInfo(email,setErrorEmail)}
                                    error={errorEmail}
                                    helperText={errorEmail === true ? error : null}
                                /> 
                                </Stack><br/>

                                <LoadingButton
                                    fullWidth
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<HowToRegIcon />}
                                    variant="contained"
                                    onClick={(e) => Envoyer(e)}
                                >
                                        <span style={{color:'white'}}>Envoyer</span>
                                </LoadingButton>
                            </Form>
                        </FormikProvider>

                    </ContentStyle>
                </Container>
            </Grid>
        </Grid>
        }
    </>
);
    
    
}
export default CompteOublier;
