import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Book.module.css';
import {PersonOutline, LiveTv, Wifi, AcUnit, Iron, HotTub} from '@mui/icons-material';
import * as MuiIcons from "@mui/icons-material"
import {Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
import {Front} from '../../../partenaire/chambre/utilityTypeChambre.js';
import ListTarif from './listTarif.js';
import SkeletonTarifDispo from './skeletons/skeletonTarifDispo.js';
import DetailsTypeChambre from './detailsTypeChambre.js';
import PhotoTypeChambre from './photoTypeChambre.js';
import {Font} from '../../../partenaire/chambre/utilityTypeChambre.js';
import callAPI from '../../../../utility';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

class DChambre extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDetailsTypeChambre: false,
            listTypeChambre : []
        };
    }

    switchShowDetailsTC(indexTypeChambre){
        let temp = {...this.props.context.state};
        temp.listTypeChambre[indexTypeChambre].show = !temp.listTypeChambre[indexTypeChambre].show;
        this.props.context.setState(temp);
    }

    setListTypeChambre(data){   
        let currentState = {...this.props.context.state};
        currentState.listTypeChambre = data.list;
        this.props.context.setState(currentState);  
        console.log(this.props.context.state);
    }

    setListTypeC(data){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.listTypeChambre = data.list;                                         
        this.setState(currentState);               
    }

    addReservation(e ,id, nom){
        let currentState = JSON.parse(JSON.stringify(this.props.context.state));
        currentState.reservation.push({idTarif : id , dateDebut : "2021-11-23" , datefin : "2021-11-29" });  
        this.props.context.setState(currentState);
    }

    printExistingTypeChambre(){
        let i = -1;
        let listChambre = this.props.context.state.listTypeChambre.map(typeChambre => {
            i++;
            const u = i;
            return (
                <div>
                    <Item>
                        <div className={styles.listChambre}>
                            <div>
                            <div class="row mb-4">
                                <div class="col">
                                    <PhotoTypeChambre photos={typeChambre.photo} photoProfil ={typeChambre.photoCrop[0]}/>
                                </div>
                                <div class="col">
                                    <div className="row">
                                    
                                    {this.props.context.state.traduction ?
                                        <div className="">
                                            <span>{typeChambre.name}</span>
                                        </div>
                                        :
                                        <div className="">
                                            <span>{typeChambre.nom}</span>
                                        </div>
                                    }
    
                                    </div>

                                    {this.props.context.state.traduction ?
                                        <span style={{fontSize:'14px'}}><PersonOutline/> max : 
                                            {typeChambre.nbAdulte} Adult +
                                            {typeChambre.nbEnfant} Children
                                        </span>
                                        :
                                        <span style={{fontSize:'14px'}}><PersonOutline/> max : 
                                            {typeChambre.nbAdulte} Adultes +
                                            {typeChambre.nbEnfant} enfants
                                        </span>
                                    }

                                    {this.props.context.state.traduction ?
                                            <div>
                                                {typeChambre.desc ?
                                                <span style={{fontSize:'12px'}}>{typeChambre.desc.substring(0,85) + "..."}</span>
                                                :
                                                null
                                                }
                                            </div>
                                        :
                                            <div>
                                                <span style={{fontSize:'12px'}}>{typeChambre.description.substring(0,85) + "..."}</span>
                                            </div>
                                    }

                                    
                                    <DetailsTypeChambre context={this.props.context} typeChambre={typeChambre} indexTypeChambre={u} />
                                        <div className={styles.equipements}>
                                        {
                                            typeChambre.equipements.map(equipement => {
                                                return(
                                                    <div>
                                                        {React.createElement(MuiIcons[equipement.tag])}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                <ListTarif context={this.props.context} tarifs={typeChambre.tarifs} idTypeChambre={typeChambre._id} nameTC = {typeChambre.nom} />
                                </div>
                            </div>  
                        </div>      
                    </div>
                    </Item>
            </div>
            )
        }); 
        return listChambre;
    }

    render(){
        let listChambre = this.props.context.state.isListTarifDispoReceived ? 
            this.printExistingTypeChambre() : 
            <div>
                <SkeletonTarifDispo />
                <SkeletonTarifDispo />
            </div>
        if(this.props.context.state.guests.nbEnfant == 0 
            && this.props.context.state.guests.nbAdulte == 0){
                listChambre = null;
            } 
        return (
            <div>
                {listChambre}
                <Stack spacing={2}>
                    <Pagination
                        page={this.props.context.state.pagination.currentNumPage} 
                        count={this.props.context.state.pagination.nbPage}
                        onChange={(e, val) => {this.props.context.setCurrentNumPage(val); this.props.context.applyFilter(undefined, undefined, val) }}
                    />
                </Stack>
            </div>
        );
    }
}
export default DChambre