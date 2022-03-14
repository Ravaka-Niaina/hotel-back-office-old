import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
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
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const CustomBox = ({content}) => {
    return(
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '250px' },
            }}
            noValidate
            autoComplete="off"
        >
            {content}
        </Box>
    );
};

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
        let test = "ye";
        test = "aaa";
        test = "inona?";
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

    const keyPress = (e) => {
        if(e.keyCode == 13){
           login(e);
        }
    }

    return(
        <div className={styles.auth + " " + stylesLogin.auth}>
            <h1>{isPartner ? "Se connecter en tant que partenaire" : "Se connecter"}</h1>
            {ambiguousError === null ? null : <Alert severity="error">{ambiguousError}</Alert>}
              <Paper 
                  elevation={1}
                  className={styles.auth}
                  children={
                      <>
                          <CustomBox 
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Email</p>}
                                type="email"
                                value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
                                error={errorEmail === null ? false : true}
                                helperText={errorEmail === null ? null : errorEmail}
                                onKeyDown={keyPress}
                                width="full"
                            />} />
                          <CustomBox
                            content={<TextField 
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                label={<p>Mot de passe</p>}
                                type="password"
                                value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
                                error={errorMdp === null ? false : true}
                                helperText={errorMdp === null ? null : errorMdp}
                                onKeyDown={keyPress}
                            />} />
                          <Stack spacing={1}>
                            <LoadingButton
                                sx={{width: "250px", marginLeft: "8px", marginRight: "8px"}}
                                onClick={(e) => login(e)}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<HowToRegIcon />}
                                variant="contained"
                            >
                                <span style={{color:'white'}}>Se connecter</span>
                            </LoadingButton>
                            <Button sx={{marginLeft: "8px", marginRight: "8px"}} onClick={(e) => register(e)}>
                                S'inscrire
                            </Button>
                          </Stack>
                            
                      </>
                  } 
              />
        </div>
        );
    
    
}
export default Login;
