import './Navbar.css';
import * as React from 'react';
import {Language, AccountCircle, LiveHelp, Login} from '@mui/icons-material';
import {Button, IconButton, Typography, Toolbar, AppBar, Avatar} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';

import {session} from "../../common/utilitySession.js";
import { useEffect } from "react";

import { useState } from 'react';

import { useTranslation } from "react-i18next";

import ButtonLoading from "./buttonLoading.js";

function Navbar(props) {
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [mdp, setMdp] = React.useState("");
  const [errorMdp, setErrorMdp] = React.useState(null);
  const [ambiguousError, setAmbiguousError] = React.useState(null);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [btnLoad, setBtnLoad] = useState(false)

  function translation(){
    let temp = {...props.context.state};
    temp.traduction= !temp.traduction;
    props.context.setState(temp);
}

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }
  
  const interpretResponse = (res) => {
      console.log(res);
      setBtnLoad(false);
      const data = res.data;
      if(data.status === 200){
          localStorage.setItem("user_session", res.headers.user_session);
          session.getInstance().update(res.headers.user_session);
          console.log(res.headers.user_session);
          if(props.urlRedirect){
              window.location.href = props.urlRedirect;
          }else{
              history.push('/front');
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
  };

  const login = (e) => {
      e.preventDefault();
      setAmbiguousError(null);
      setBtnLoad(true)
      const data = {
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
      history.push("/front/register");
  }
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Avatar alt="cobert" src="/colbert.png" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Hotel Colbert
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
                        <Link to='/front/researchReservation' style={{textDecoration : "none" ,color : "#887B62"}}>
                            <Button variant="outlined" startIcon={<SearchIcon/> }>
                                {t('search for a reservation')}
                            </Button>
                        </Link>
                    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="outlined" startIcon={<Login />} onClick={(e) => login(e)} {...bindToggle(popupState)}>
          {t('Log in')}
            </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>

<Paper 
                  elevation={1}
                  
                  children={
                      <>
                        <div className='title11'>
                          <h4 id='title11'>{t('Log in')}</h4>
                        </div>
                          {ambiguousError === null ? null : <Alert severity="error">{ambiguousError}</Alert>}
                          <Box
                              component="form"
                              sx={{
                                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                              }}
                              noValidate
                              autoComplete="off"
                          >
                          
                              <TextField 
                                  id="outlined-basic"
                                  variant="outlined"
                                  size='small'
                                  label={<p>Email</p>}
                                  type="email"
                                  value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
                                  error={errorEmail === null ? false : true}
                                  helperText={errorEmail === null ? null : errorEmail}
                              /> 
                          </Box>
                          <Box
                              component="form"
                              sx={{
                                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                              }}
                              noValidate
                              autoComplete="off"
                          >
                              <TextField 
                                  id="outlined-basic"
                                  variant="outlined"
                                  size='small'
                                  label={<p>Mot de passe</p>}
                                  type="password"
                                  value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
                                  error={errorMdp === null ? false : true}
                                  helperText={errorMdp === null ? null : errorMdp}
                              />
                          </Box>
                          <Box>
                          <div id='buttons'>
                           <div class="login">
                           { btnLoad ? 
                                <LoadingButton loading sx={{width: 200}} variant="outlined">
                                   Submit
                               </LoadingButton>
                           :
                            <Button sx={{width: 200}} variant="contained" onClick={(e) => login(e)}>
                                <span style={{color:'white'}}>{t('log in')}</span>
                            </Button>
                           }
                            <div class="mdp">
                           <Link to={'/login/identify'} style={{textDecoration:'none'}}>
                            <Button  id="mdp">
                            <span style={{color:'black'}}>{t('Forgot your password')}</span>
                            </Button>
                            </Link>
                            </div>
                           </div>
                           <div class="register">
                            <Button id="register" sx={{width: 200}} onClick={(e) => register(e)}>
                                <span style={{color:'black'}}>{t('Register')}</span>
                            </Button>
                           </div>
                          </div>
                          </Box>
                            
                      </>
                  } 
              />
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
                        <Button size="small">EUR</Button>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Language/>
                        </IconButton>

                <select className="custom-select" style={{width: 200}} onChange={(e) =>{changeLanguageHandler(e);translation(e)}}>
                    <option value="fr" >Francais</option>                            
                    <option value="en" >English</option>
                </select>

                    </Box>
                    </Toolbar>
                </AppBar>
            </Box>
    );
  }
  
  export default Navbar;