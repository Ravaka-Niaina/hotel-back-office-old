import { width } from '@mui/system';
import React from 'react'

import './CalendrierTimeline.css';




class CalendrierTimeline extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
            listeJours:this.props.listeJours,
            jourDeLaSemaine:["dim","lun","mar","mer","jeu","ven","sam"],
            
       }
       
    }


render(){
        return(
            <tr >
                <td>
                    Page blanche
                </td>
                {
                    this.state.listeJours.map(jour=>{
                            return (
                                <td>
                                    <div>
                                        Mois
                                    </div>  
                                    <div className="jour-date">
                                        <p>{this.state.jourDeLaSemaine[jour.getDay()]}</p>
                                        <p>{jour.getDate()}</p>
                                    </div>
                                    
                                </td>
                            )
                    })
                }
                 
            </tr>
        ); 
    }
}


export default CalendrierTimeline