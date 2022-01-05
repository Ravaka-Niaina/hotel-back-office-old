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
import CalendrierTimeline from '../../components/calendrier/CalendrierTimeline/CalendrierTimeline';


class Calendrier extends React.Component{
    constructor(props){
       super(props)
       this.state = {
            label : "anja",
            range: [null,null],
            hotel:{id:1,name:'Maisonnette'},
            tarifs:[{name:'Standard Rate'}],
            statusJours:[],
            listeJours:[],
            hebergementJours:[],
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
getStatus(daysOfYear){
    let array =[];
    daysOfYear.forEach(element=>{
        array.push("fermé")
    })
    return array;

}
getHebergementJours(daysOfYear){
    let array =[];
    daysOfYear.forEach(element=>{
        array.push(0)
    })
    return array;

}
getTarifsJours(daysOfYear){
    let array =[];
    let arrayTarifs=[];
    daysOfYear.forEach(element=>{
        arrayTarifs.push(65)
    })
    this.state.tarifs.forEach(element=>{
       array.push({name:element.name,data:arrayTarifs}) 
    })
   
    return array;

}


getDatas(newValue){
    if(newValue!=null && newValue[0]!=null && newValue[1]!=null){
        const dateDebut = newValue[0];
        const dateFin = newValue[1];
        var daysOfYear = [];
        for (var d = new Date(dateDebut); d <= dateFin; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }
        const statusArray = this.getStatus(daysOfYear);
        const hebergergementArray = this.getHebergementJours(daysOfYear);
        const tarifArrays = this.getTarifsJours(daysOfYear);
        this.setState({range:newValue,listeJours:daysOfYear,statusJours:statusArray,hebergementJours:hebergergementArray,tarifsJours:tarifArrays});
    }else{
        this.setState({range:newValue});
    }
    
}
renderStatus(){

}
renderTarifs(){

}
renderHebergemets(){

}
render(){
        return(
            <div>
                <Navbar/>
                <Sidebar/>
                <div className="container"><br/>
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
                    <table style={{marginTop:20}}>
                        {this.renderCalendar()}
                    </table>
                
                </div>
            </div>
        ); 
    }
}

export default Calendrier