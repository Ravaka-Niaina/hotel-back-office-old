import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';




import FormLabel from '@mui/material/FormLabel'
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

class Calendrier extends React.Component{
    constructor(props){
        super(props)
       this.state = {
            label : "anja",
            range: [null,null],
            hotel:{id:1,name:'Maisonnette'},
            tarif:[{},{}],
            statusJours:[],
            
            tarifsJours:[],
       }
       
    }
renderTextfield(startProps, endProps){
    startProps.label = ""
        startProps.inputProps.value=(startProps.inputProps.value+"-"+endProps.inputProps.value)
        return (
                            <React.Fragment>
                               
                                <TextField {...startProps}  />
                               
                              
                               
                            </React.Fragment>
        )
}
render(){
        return(
            <div>
                <Navbar/>
                <Sidebar/>
                    <div className="container"><br/>
                      <FormLabel>
                          Ceci est le calendrier
                      </FormLabel>

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Check-in"
                            endText="Check-out"
                            value={this.state.range}
                            inputFormat={"dd/MM/yyyy"}
                            onChange={(newValue) => {
                                this.setState({range:newValue})
                            }}
                            renderInput={(startProps, endProps) => (
                                this.renderTextfield(startProps,endProps)
                            
                            )}
                        />
                     </LocalizationProvider>
                    </div>   
                 
                </div>
        ); 
    }
}

export default Calendrier