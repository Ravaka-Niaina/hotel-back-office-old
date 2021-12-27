
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Book.module.css';
import {PersonOutline, LiveTv, Wifi, AcUnit, Iron, HotTub} from '@mui/icons-material';
import {Paper} from '@mui/material';
import { styled } from '@mui/material/styles';

import Filtre from '../../client/Filtre.js';
import {Font} from '../../../partenaire/utilityTypeChambre.js';
import ListTarif from './listTarif.js';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ListConditionAnnulation(props){
    let services = props.politiqueAnnulAtrb.map(condition =>{
        return (
            <div class="row">
                <span style={{fontSize:'12px' , color : 'green'}}>
                    <i class="fa fa-check" aria-hidden="true">
                        &nbsp;&nbsp;{condition.nom} 
                    </i>
                </span>
            </div>
        );
    }) ;
    return services;
}

function ListServiceTarif(props){
    let services = props.services.map(service =>{
        return (
            <div class="row">
                <span style={{fontSize:'12px'}}><i class="fa fa-desktop" aria-hidden="true"></i>
                    &nbsp;{service}
                </span><br/>
            </div>
        );
    }) ;
    return services;
}

function Equipements(props){
    let list = [];
    try{
        for(let i = 0; i < props.equipements.length; i++){
            list.push(
                <li style={ {marginLeft : 10 , listStyle : 'none', width: '150px'} }>
                    {
                        props.equipements[i].font.startsWith("https://") ?
                        <img src={props.equipements[i].font} style={{maxWidth:'20px', maxHeight: '200px', width: 'auto', height: 'auto', padding: '0 0'}}/>
                        : <i class={props.equipements[i].font}></i>
                    }
                    &nbsp;{props.equipements[i].nom}
                </li>
            );
        }
    }catch(err){}
    
    return list;
}

class DChambre extends React.Component{
    constructor(props){
        super(props);
    }

    setListTypeChambre(data){   
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));  //mamadika donne ho lasa json
        currentState.listTypeChambre = data.list;                                         // lasa currentState ilai data (this.state) ilai data
        this.props.context.setState(currentState);  
        console.log(this.props.context.state);
        this.state= {
            listTypeChambre : []
        }
    }
// ilai this ary scroll atsoin zan oe enfant ity page ity
    setListTypeChambre(data){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));  //this.state iani
        console.log(data);
        currentState.listTypeChambre = data.list;                                         // lasa currentState ilai data (this.state) ilai data
        this.props.context.setState(currentState);  
        console.log(currentState);                 //modifier ilai state ho lasa donnee json
    }

    setListTypeC(data){
        let currentState = JSON.parse(JSON.stringify(this.state));  
        console.log(data);
        currentState.listTypeChambre = data.list;                                         
        this.setState(currentState);               
    }

    addReservation(e ,id, nom){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));
        currentState.reservation.push({idTarif : id , dateDebut : "2021-11-23" , datefin : "2021-11-29" });  
        this.props.context.setState(currentState);
    }

    render(){
        let listChambre = this.props.context.state.listTypeChambre.map(typeChambre => {
            return (
            <Item>
            <div className={styles.listChambre}>
                <div>
                <div class="row mb-4">
                    <div class="col">
                        <div style={{ backgroundImage: 'url(' + process.env.REACT_APP_BACK_URL + "/" + typeChambre.photo[0].replace("\\","/") + ")" }}></div>
                    </div>
                    <div class="col">
                        <span>{typeChambre.nom}</span><br/>
                        <span><PersonOutline/> max : 
                            {typeChambre.nbAdulte} Adultes +
                            {typeChambre.nbEnfant} enfants
                        </span>
                        <span>{typeChambre.description.substring(0,85) + "..."}</span>
                        <div className={styles.equipements}>
                            {
                                typeChambre.equipements.map(equipement => {
                                    return(
                                        <Font font={equipement.font} />
                                    );
                                })
                            }
                            {/*
                            <div>
                                <LiveTv/>
                            </div>
                            <div>
                                <Wifi/>
                            </div>
                            <div>
                                <AcUnit/>
                            </div>
                            <div>
                                <HotTub/>
                            </div>
                            <div>
                                <Iron/>
                            </div>
                            */}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <ListTarif context={this.props.context} tarifs={typeChambre.tarifs} idTypeChambre={typeChambre._id} />
                    </div>
                </div>  
            </div>      
        </div>
        </Item>
            )
        }); 
        if(this.props.context.state.guests.nbEnfant == 0 
            && this.props.context.state.guests.nbAdulte == 0){
                listChambre = null;
            } 
        return (
            <div>
                { this.props.context.state.showFiltre ? <Filtre context={this.props.context} /> : null }
                 {listChambre}
            </div>
        );
        //this.addReservation()
    }
}
export default DChambre
