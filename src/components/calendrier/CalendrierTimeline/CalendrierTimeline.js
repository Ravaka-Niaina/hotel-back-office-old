
import React from 'react'

import './CalendrierTimeline.css';



const jourDeLaSemaine= ["dim","lun","mar","mer","jeu","ven","sam"];
const listeMois=["jan.","fev.","mars.","avr","mai.","juin","juil.","aout","sept.","oct.","nov.","dec."]
class CalendrierTimeline extends React.Component{
    constructor(props){
        super(props)
        this.mois=0
        this.state = {
           
            listeJours:this.props.listeJours,
           
            
       }
       
    }

renderMois(jour){
    if(this.mois !== jour.getMonth()){
        this.mois = jour.getMonth();
        return (
            <div className="mois-calendar" style={{width:80}}>
                <p >
                    {
                        listeMois[this.mois] + " "+jour.getFullYear()
                    }
                </p>
            </div>
        )
    }else{
        return (
        <div className="no-mois-calendar" style={{width:80}}>
                 <p > 
                &nbsp;
                </p>
        </div>)
    }
}
renderJour(jour){
    //Debut du mois
    if(jour.getDate()===1){
        return(

            <div className="jour-date">
                <p style={{marginTop:15}}>{jourDeLaSemaine[jour.getDay()]}</p>
                <p>{jour.getDate()}</p>
            </div>
        )
    }
    //Dimanche
    if(jour.getDay()===0){
        return(

            <div className="jour-date bold">
                <p style={{marginTop:15}}>{jourDeLaSemaine[jour.getDay()]}</p>
                <p>{jour.getDate()}</p>
            </div>
        )
    }
    //Jour samedi
    if(jour.getDay()===6){
        return(

            <div className="jour-date bold">
                <p style={{marginTop:15}}>{jourDeLaSemaine[jour.getDay()]}</p>
                <p>{jour.getDate()}</p>
            </div>
        )
    }
    if(jour.getDay()===1){
        return(

            <div className="jour-date lundi">
                <p style={{marginTop:15}}>{jourDeLaSemaine[jour.getDay()]}</p>
                <p>{jour.getDate()}</p>
            </div>
        )
    }

    //Jour ouvrables
        return(

            <div className="jour-date">
                <p style={{marginTop:15}}>{jourDeLaSemaine[jour.getDay()]}</p>
                <p>{jour.getDate()}</p>
            </div>
        )
}
render(){
        return(
            <tr >
                <td style={{minWidth:180}}>
                    
                </td>
                {
                    this.state.listeJours.map(jour=>{
                            return (
                                <td>
                                    
                                        {this.renderMois(jour)}
                                    
                                        {this.renderJour(jour)}
                                    
                                </td>
                            )
                    })
                }
                 
            </tr>
        ); 
    }
}


export default CalendrierTimeline