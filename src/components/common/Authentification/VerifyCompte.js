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


const VerifyCompte = ({setCodeVerifyPhone,codeVerifyPhone,loading,verify,setErrorCode,errorCode}) => {
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

    
    return(
        <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                        <h3>Enter your verification code</h3><br/>
                        <h5>Input the code we sent to +261-XXX-XXX-XX-XX to access your account.</h5>
                        </Typography>
                    </Stack>

                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    autoComplete="code"
                                    label="Enter your code"
                                    value={codeVerifyPhone} 
                                    onChange={(e) =>  {setErrorCode(null); setCodeVerifyPhone(e.target.value)}}
                                    error={errorCode === null ? false : true}
                                    helperText={errorCode === null ? null : errorCode}
                                /> 
                                </Stack><br/>

                                <LoadingButton
                                    fullWidth
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<HowToRegIcon />}
                                    variant="contained"
                                    onClick={(e) => verify(e)}
                                >
                                        <span style={{color:'white'}}>Verify</span>
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
export default VerifyCompte;
