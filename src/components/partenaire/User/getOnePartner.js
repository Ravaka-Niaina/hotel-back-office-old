import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';
import {useEffect} from "react";
import callAPI from '../../../utility.js';

import  './user.css';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



 function GetOnePartner() {

  let [state, setState] = useState({
    nom : "",
    prenom : "",
    email : "",
    telephone : "",
  })

    function setDetailsPartner(data){
    let current = JSON.parse(JSON.stringify(state));
    current = data.partenaire;
    
    setState(current);
  }

  useEffect(() => {
      callAPI('get', '/user/partenaire', {}, setDetailsPartner);
  }, [])

  return (
  <div style={{marginTop:'50px'}}>
    <Card sx={{ maxWidth: 700 ,height : '200px'}} id='card1'>
      <div id='global'> 
          <div class='inline' id='first'>
          <img id='userPhoto' src='/user2.png'/>
          </div>

          <div class='inline' id='second'>
          <p id='username'>{state.nom} {state.prenom}</p>
          <p id='userRole'>Main Administrator</p>
          </div>

          <div class='inline' id='third'>
          <p id='userMail'>{state.email}</p>
          <p id='userPhone'>{state.telephone}</p>
          </div>
      </div>

          

    </Card>
  </div>
  );
}

export default function recherche_() {
  return(
      <ResponsiveDrawer
          getContent = {GetOnePartner}
      />
  );

};