import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';
import {useEffect} from "react";
import callAPI from '../../../utility.js';

import  './hotel.css';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



 function GetOneHotel() {

  let [state, setState] = useState({
    nom : "",
    adresse : "",
    email : "",
    telephone : "",
    _id : ""
  })

    function setDetailsHotel(data){
    let current = JSON.parse(JSON.stringify(state));
    current = data.hotel;
    
    setState(current);
  }

  useEffect(() => {
      callAPI('get', '/hotel/details', {}, setDetailsHotel);
  }, [])

  return (
  <div style={{marginTop:'50px'}}>
    <Card sx={{ maxWidth: 700 ,height : '300px'}} id='card1'>

      <div id='global'> 
          <div>
          <h5 id='titleH'>Information de l'hotel</h5>
          </div>

          <div class='inline' id='first'>
          <img id='logoHotel' src='/download.jpeg'/>
          </div>

          <div class='inline' id='second'>
          <p id='hotelName'>{state.nom}</p>
          <p id='hotelAdress'>{state.adresse}</p>
          </div>

          <div class='inline' id='third'>
          <p id='hotelMail'>{state.email}</p>
          <p id='hotelPhone'>{state.telephone}</p>
          </div>
      </div>

            <Link to={'/back/hotel/detail/'+ state._id} style={{textDecoration:'none',float: 'right',marginRight: '120px'}}>
              <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2F4050',marginLeft : "30px",marginTop:"15px"}}
              >
              <span style={{ color: 'white' }}>Edit</span>
              </Button>
            </Link>    

    </Card>
  </div>
  );
}

export default function recherche_() {
  return(
      <ResponsiveDrawer
          getContent = {GetOneHotel}
      />
  );

};