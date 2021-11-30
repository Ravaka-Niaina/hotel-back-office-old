import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/Checkbox'

class Paiment extends React.Component{
    constructor(props){
        super(props)
       
    }

render(){
        return(
            <div className="container" 
                 style={{width: "80%" , height:'80%' ,backgroundColor: 'gainsboro'}}>
                     hey
            </div>
        );
    }
}

export default Paiment
/*<FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="label" />
                </FormGroup>*/