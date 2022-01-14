import { useState } from 'react';
import  React,{useEffect}  from 'react';
import { useParams } from 'react-router-dom'
import callAPI from '../utility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Icon from '@mui/material/Icon';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import axios from "axios";

import {Champs} from '../common/commonAssets';
import {session} from '../common/utilitySession.js';
import NotEnoughAccessRight from '../common/NotEnoughAccessRight';


const DetailsUser = () => {
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [dateInscription, setDateInscription] = React.useState("");
    const [companie, setCompanie] = React.useState("");

    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["getPartenaire", "updatePartenaire", "superAdmin"]);
    const setDetailsUser = (data) => {
        if(data.status === 300){
            window.location.href = "/back/login";
        }else{

        }
    }

    useEffect(() => {
        if(hasAR){
        callAPI('post', '/user/detail', {}, setDetailsUser);
    }
    }, []);

    if(!hasAR){
        return(
        <NotEnoughAccessRight />
        );
    }
    return(
            <Paper 
                  elevation={1}
                  children={
                      <>
                          <h1>Détails partenaire</h1>
                          <Box
                              component="form"
                              sx={{
                                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                              }}
                              noValidate
                              autoComplete="off"
                          >
                            <Champs label="Nom" value={nom} />
                            <Champs label="Prénoms" value={prenom} />
                          </Box>
                          <div>
                          <Button variant="contained" onClick={(e) => {}}>
                              <span style={{color:'white'}}>S'inscrire</span>
                          </Button>
                          </div>
                      </>
                  } 
              />
    );
};
export default DetailsUser;