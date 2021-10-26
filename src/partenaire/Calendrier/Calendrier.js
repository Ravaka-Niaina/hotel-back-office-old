import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



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
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

class Calendrier extends React.Component{
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
                <Sidebar/>
                    <div className="container"><br/>
                      <FormLabel>
                          Ceci est le calendrier
                      </FormLabel>
                    </div>   
                </div>
        ); 
    }
}

export default Calendrier