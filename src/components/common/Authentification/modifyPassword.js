import React, { useEffect } from "react";
import { useHistory ,useParams} from 'react-router-dom';
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


const ModifierPassword = () => {
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

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    const [state, setState] = React.useState({mdp:"", confirm:""});
    const [stateError , setErrorState] = React.useState({mdp:"" , confirm :""});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({mdp :"champs vide",confirm :"champs vide"});
    const { _id } = useParams();
    const history = useHistory();
    
    function getAccess(value){
        let access = localStorage.getItem("access");
        access = access+"";
        value = value+"";
        if(access !== value){
            history.push('/back/login');
        }
    }

    useEffect(() => {
        getAccess(23);
    }, []);

    function handleChange(e,field){
        e.preventDefault();
        let current = {...state};
        let currentError = {...stateError};
        let errorC = {...error};
        let champsVide = "champs vide";

        current[field] = e.target.value;
        setState(current);

        if(e.target.value === ""){
            currentError[field] = true;
            setErrorState(currentError);
            error[field] = champsVide;
            setError(errorC);
        }else{
            currentError[field] = false;
            setErrorState(currentError);
        }
    }

    function handleEmptyInfo(e,field){
        let current = {...stateError};
        let errorC = {...error};
        let champsVide = "champs vide";

        if(state[field] === null || state[field] === ""){
            current[field] = true;
            errorC[field] = champsVide;
            setError(errorC);
            setErrorState(current);
        }
    }

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

    function Valider(e){
        setLoading(true);
        var ObjectBrowser = {idBrowser : "" , isInsert : false};
        if(!localStorage.getItem('idBrowser')){
            ObjectBrowser = IdBrowser(ObjectBrowser);
        }
        ObjectBrowser.idBrowser = localStorage.getItem('idBrowser');

        let data = {data : state , id : _id , idBrowser : ObjectBrowser.idBrowser}
        axios({
            method: "post",      
            url: process.env.REACT_APP_BACK_URL + '/user/updatePassword',
            withCredentials: true,
            data: data
        })
        .then(res => interpretResponse(res))
        .catch(err =>{console.log(err); console.log("erreur");} );

    }

    function interpretResponse(res){
        if(res.data.status == 200){
            history.push('/back/login');
            localStorage.setItem("access" , 0);
        }else{
            let current = {...stateError};
            let currentError = {...error}; 
            let keys= Object.keys(res.data.errors);
            let keysStateErrors = Object.keys(stateError);
            for (let i = 0; i < keys.length; i++) {
                for (let u = 0; u < keysStateErrors.length; u++) {
                    if(keys[i] == keysStateErrors[u]){
                        current[keys[i]] = true
                        currentError[keys[i]] = res.data.errors[keys[i]];
                   }
                }
             }
            setError(currentError);
            setErrorState(current);    
             setLoading(false);
        }
    }

    return(
        <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                        <h5>Modifier Mot de passe</h5>
                        </Typography>
                    </Stack>

                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                <TextField
                                    fullWidth type="password"
                                    autoComplete="code"
                                    label="votre mot de passe"
                                    value={state.mdp} 
                                    onChange={(e) => handleChange(e,'mdp')}
                                    onBlur={(e) => handleEmptyInfo(e , "mdp")}
                                    error={stateError.mdp}
                                    helperText={stateError.mdp === true ? error.mdp : null}
                                /> 
                                <TextField
                                    fullWidth type="password"
                                    autoComplete="code"
                                    label="confirmation mot de passe"
                                    value={state.confirmMdp} 
                                    onChange={(e) => handleChange(e,"confirm")}
                                    onBlur={(e) => handleEmptyInfo(e , "confirm")}
                                    error={stateError.confirm}
                                    helperText={stateError.confirm === true ? error.confirm : null}
                                /> 
                                </Stack><br/>

                                <LoadingButton
                                    fullWidth
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<HowToRegIcon />}
                                    variant="contained"
                                    onClick={(e) => Valider(e)}
                                >
                                        <span style={{color:'white'}}>Valider</span>
                                </LoadingButton>
                            </Form>
                        </FormikProvider>

                    </ContentStyle>
                </Container>
            </Grid>
        </Grid>
    </>
);
    
    
}
export default ModifierPassword;
