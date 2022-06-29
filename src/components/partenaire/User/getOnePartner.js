import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';
import {useEffect} from "react";
import { useHistory } from 'react-router-dom';

import callAPI from '../../../utility.js';
import {session} from '../../common/utilitySession.js';

import  './user.css';

import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

import SkelettonForm from '../hotel/SkeletonFormulaire.js';


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
    _id: "",
  });

  const [skeletonAffiche, setSkeleton] = useState(true);

  function setDetailsPartner(data){
    let current = JSON.parse(JSON.stringify(state));
    current = data.partenaire;
    
    setState(current);
    setSkeleton(false);
  }

  const history = useHistory();

  useEffect(() => {
      if (session.getInstance().isConnected()) {
        callAPI('get', '/user/partenaire', {}, setDetailsPartner);
      } else {
        history.push('/back/login');
      }
  }, [])

  return (
  <div style={{marginTop:'50px'}}>
            {
          skeletonAffiche ? <SkelettonForm  heigth = {300} />  : <>
    <Card sx={{ maxWidth: 730 ,height : '301px'}} id='card1'>
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

            <Link to={'/back/user/details/'+ state._id} style={{textDecoration:'none',float: 'right',marginRight: '120px'}}>
              <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2F4050',marginLeft : "30px",marginTop:"15px"}}
              >
              <span style={{ color: 'white' }}>Edit</span>
              </Button>
            </Link>    

    </Card>
       </>
  }
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