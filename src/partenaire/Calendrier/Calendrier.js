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
            value: [null,null],
       }
       
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
                    </div>   
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Check-in"
                            endText="Check-out"
                            value={this.state.value}
                            onChange={(newValue) => {
                                this.setState({value:newValue})
                            }}
                            renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                            )}
                        />
                     </LocalizationProvider>
                </div>
        ); 
    }
}

export default Calendrier