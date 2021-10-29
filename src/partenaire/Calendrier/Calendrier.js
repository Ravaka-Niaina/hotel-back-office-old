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
import CalendrierTimeline from '../../components/calendrier/CalendrierTimeline';

class Calendrier extends React.Component{
    constructor(props){
        super(props)
       this.state = {
            label : "anja",
            range: [null,null],
            hotel:{id:1,name:'Maisonnette'},
            tarif:[{},{}],
            statusJours:[],
            listeJours:[],
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
renderCalendar(){
    if(this.state.listeJours.length>0){
        return (
            <CalendrierTimeline listeJours ={this.state.listeJours}/>
            )
    }
}
generateDatas(){

}
getDatas(newValue){
    if(newValue!=null && newValue[0]!=null && newValue[1]!=null){
        const dateDebut = newValue[0];
        const dateFin = newValue[1];
        var daysOfYear = [];
        for (var d = new Date(dateDebut); d <= dateFin; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }
        this.generateDatas();
        this.setState({range:newValue,listeJours:daysOfYear});
    }else{
        this.setState({range:newValue});
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

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Check-in"
                            endText="Check-out"
                            value={this.state.range}
                            inputFormat={"dd/MM/yyyy"}
                            onChange={(newValue) => {
                                this.getDatas(newValue);
                                
                            }}
                            renderInput={(startProps, endProps) => (
                                this.renderTextfield(startProps,endProps)
                            
                            )}
                        />
                     </LocalizationProvider>
                        <table>
                            

                            {this.renderCalendar()}
                            
                        </table>
                    
                    </div>   
                 
                </div>
        ); 
    }
}

export default Calendrier