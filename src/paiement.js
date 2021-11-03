import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import  Sidebar  from "./Sidebar/Sidebar";
import  Navbar  from "./Navbar/Navbar";

import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Box from '@mui/material/Box'
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'; 
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

class Paiement extends React.Component{
    constructor(props){
        super(props)
       this.state = {
            label : "anja"
       }
    }

render(){
        return(
            <div>
                <Navbar/>
                
                    <div className="container"><br/>
                        <div className ="row">
                            <div className ="col-md-2"></div>
                                <div className ="col-md-8" style={{backgroundColor :"gainsboro" , padding :"15px"}}>
                                        <FormControl component="fieldset" >
                                            <FormLabel component="legend" style={{fontSize : "12px"}}>
                                                <strong>vous voyager pour le travail?</strong></FormLabel>
                                            <RadioGroup
                                                aria-label="gender"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                            >
                                            <div className ="row">
                                                <div className ="col">
                                                    <FormControlLabel value="female" control={<Radio />} label="oui" />
                                                </div>
                                                <div className ="col">
                                                    <FormControlLabel  value="male" control={<Radio />} label="non" />
                                                </div>
                                            </div>
                                            </RadioGroup>
                                        </FormControl>

                                    <div className ="row">
                                        <div className ="col">
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField id="input-with-sx" label="Nom" variant="standard" 
                                                    style={{width : "220px"}}/>
                                            </Box>
                                        </div>
                                        <div className ="col">
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                
                                                <TextField id="input-with-sx" label="Prenom" variant="standard" 
                                                    style={{width : "220px"}} />
                                            </Box>
                                        </div>
                                    </div><br/>  
                                        <div className="mail">
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AlternateEmailOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                                                <TextField id="input-with-sx" label="Adresse e-mail"
                                                            variant="standard" style={{width : "420px"}}/>
                                            </Box><br/>
                                            <FormLabel component="legend" style={{fontSize : "12px"}} >
                                                <strong>L'e-mail de confirmation sera envoyé à cette adresse</strong>
                                            </FormLabel><br/>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <MarkEmailReadOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                                                <TextField id="input-with-sx" label="Confirmer l'adresse e-mail"
                                                            variant="standard" style={{width : "420px"}}/>
                                            </Box>
                                        </div><br/>
                                        <div className="mail">
                                            <FormLabel component="legend" style={{fontSize : "12px"}} >
                                                <strong>Pour qui réservez-vous</strong>
                                            </FormLabel>

                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    aria-label="gender"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"   
                                                >
                                                    <FormControlLabel value="female" control={<Radio />} 
                                                        label="Je suis le client principale" />
                                                    <FormControlLabel  value="male" control={<Radio />} 
                                                        label="Je réserve pour un autre client"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    
                                </div>
                            <div className ="col-md-2">
                            </div>
                        </div>
                    </div>   
                </div>
        ); 
    }
}

export default Paiement