import './Navbar.css';
import * as React from 'react';
import {Language, AccountCircle, LiveHelp, Login} from '@mui/icons-material';
import {Button, IconButton, Typography, Toolbar, AppBar} from '@mui/material';
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
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import axios from "axios";

import {session} from "../../common/utilitySession.js";
import { useEffect } from "react";

import { useState } from 'react';

function Navbar(props) {
    let [state, setState] = useState(
        {
            email: '',
            mdp: '',
            errors: []
        }
      );
      const history = useHistory();

    function  tryRedirectToHome(res){
        console.log(res);
        if(res.status === 200){
          history.push('/test');
        }else{
          let currentState = JSON.parse(JSON.stringify(state));
          currentState.errors = res.errors;
          setState(currentState);
        }
      }
    
      function  handleEmailChange(event){
        const currentState = JSON.parse(JSON.stringify(state));
        currentState.email = event.target.value;
        setState(currentState);
      }
    
      function  handleMdpChange(event){
        const currentState = JSON.parse(JSON.stringify(state));
        currentState.mdp = event.target.value;
        setState(currentState);
      }
    
      function  login(e){
        e.preventDefault();
        let data = {email: state.email, mdp: state.mdp};
        axios({
          method: 'post',
          url: process.env.REACT_APP_BACK_URL + "/client/login",
          withCredentials: true,
          data: data
        })
        .then(res => tryRedirectToHome(res.data))
        .catch(err => console.log(err))
      }
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        [LOGO]
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>

                    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindToggle(popupState)}>
            Connexion
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>

        <Paper>
        <div className="base-container">
            <div className="content">
              {/* <CustomError errors={this.state.errors} /> */}
              <div className="form">
                <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField id="standard-basic" className="form-control" label="Email" variant="standard" style={{width:"350px"}}
                  type="email" 
                  name="email" 
                  value={state.email} placeholder="Email"
                  onChange={(e) => handleEmailChange(e)}/>
                  </div>
                  <div className="form-group" style={{paddingTop:"15px"}}>
                  <TextField id="standard-basic" className="form-control" label="Mot de passe" variant="standard" style={{width:"350px"}}
                  type="password" 
                  name="mdp" 
                  value={state.mdp}
                  onChange={(e) => handleMdpChange(e)}/>
                </div>
              </div>
            </div>
              

            <Link to='/Register' style={{textDecoration:'none',marginLeft:'290px',marginTop:'30px'}}>
              <p style={{color:"#87CEEB",fontSize:"17px",color:'#2F4050',textDecoration:'underline'}}>S'inscrire</p>
            </Link>
            <div className="footer">
              {/* <button type="button" className="btn" id="btn" onClick={(e) => this.login(e)}>Login</button> */}
              <Button variant="contained" style={{backgroundColor:'#1E90FF'}} onClick={(e) => login(e)}>
              Se Connecter
              </Button>
            </div>
          </div>
        </Paper>

              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>

                        <Button variant="outlined" startIcon={<Login />}>
                            Sign in
                        </Button>
                        <Button size="small">EUR</Button>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Language/>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <LiveHelp/>
                        </IconButton>
                    </Box>
                    </Toolbar>
                </AppBar>
            </Box>
    );
  }
  
  export default Navbar;