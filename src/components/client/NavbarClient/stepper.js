import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useHistory } from 'react-router-dom';

const steps = [
  'Pannier',
  'Apply Reservation',
  'Voucher',
];



export default function HorizontalLabelPositionBelowStepper(props) {
    const history = useHistory();
    let numeroItineraire = props.numeroItineraire;
    function Route(e , i , id, numeroItineraire){
        if(numeroItineraire){
            if(i == "1" || i == 1){
                localStorage.setItem('access', 2);
                history.push("/reservation/"+id+"/apply/"+numeroItineraire);
            }else if( i == "2" || i == 2){
               if( props.isVariableModif == false){
                    localStorage.setItem('access', 1);  
                    history.push("/reservation/"+id+"/voucher/"+numeroItineraire);
               }else{
                    props.showConfModif();
               }
            }
        }
        
    }

  return (
    <Box sx={{ width: '100%' }}>
        {
            props.isConnected ? 
                <>
                    {
                        props.numeroItineraire ? 
                        <Stepper activeStep={3} alternativeLabel>
                            {steps.map((label, indice) => (
                                <Step key={label} style={{cursor :"pointer"}}onClick = {(e) => { Route(e , indice , props.id, numeroItineraire) }}>
                                    <StepLabel>{label}</StepLabel>
                                </Step> 
                            ))}
                        </Stepper>
                        :
                        <Stepper activeStep={props.indice} alternativeLabel>
                            {steps.map((label, indice) => (
                                props.indice > indice ?  <Step key={label} style={{cursor :"pointer"}}onClick = {(e) => { Route(e , indice , props.id,numeroItineraire) }}>
                                <StepLabel>{label}</StepLabel>
                                </Step> :  
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    } 
                </> :
                <Stepper activeStep={props.indice} alternativeLabel>
                    {steps.map((label, indice) => ( 
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
        }
    </Box>
  );
}