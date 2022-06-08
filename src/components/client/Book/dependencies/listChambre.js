import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Book.module.css';
import {PersonOutline, LiveTv, Wifi, AcUnit, Iron, HotTub} from '@mui/icons-material';
import * as MuiIcons from "@mui/icons-material"
import {Paper} from '@mui/material';
import { styled } from '@mui/material/styles';

import {Front} from '../../../partenaire/chambre/utilityTypeChambre.js';
import ListTarif from './listTarif.js';
import ResultatGroupeParTypeChambre from './ResultatGroupeParTypeChambre.js';
import SkeletonTarifDispo from './skeletons/skeletonTarifDispo.js';
import DetailsTypeChambre from './detailsTypeChambre.js';
import PhotoTypeChambre from './photoTypeChambre.js';
import {Font} from '../../../partenaire/chambre/utilityTypeChambre.js';
import callAPI from '../../../../utility';
import numeroConfirmation from './numeroConfirmation.js';
import {session} from "../../../../components/common/utilitySession.js";

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

function NumeroIntineraire (random , nameHotel ,TChambre){
    let hotel = '';
    const number = 3;
    const min = 1;
    const max = 1000000;
    const nameTC = TChambre.split(" ");
    let rand = min + Math.random() * (max - min);
    rand = Number.parseInt(rand);
    let now = new Date();
    let date = getDateNotEspace(now);
    for(let i = 0; i < number ; i++){
        hotel = hotel + nameHotel[i] ;
    }
    
    try{//A revoir
        return random = date+hotel+(random + rand)+nameTC[0][0] + nameTC[1][0];
    }catch(err){
        return random = date+hotel+(random + rand)+nameTC[0][0] + nameTC[0][0];
    }
}

function getNDigits(number, digit){
    digit = digit + '';
    const remain = number - digit.length;
    for(let i = 0; i < remain; i++){
        digit = "0" + digit;
    }
    return digit;
}

function getDateNotEspace(date){
    date = new Date(date);
    let year = date.getFullYear()+"";
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    let annee = '';
    for (let i = year.length-1; i > 1 ; i--){
        annee = annee+year[i];   
    }
    date = annee  + month  + day;
    return date;
}

function getDate(date){
    date = new Date(date);
    let year = date.getFullYear();
    let month = getNDigits(2, date.getMonth() + 1);
    let day = getNDigits(2, date.getDate());
    date = year + '-' + month + '-' + day;
    return date;
}

function Equipements (equipements) {
    try {
        if (equipements) {
            let htmlEquipements = equipements.map(equipement => <div>{React.createElement(MuiIcons[equipement.tag])}</div>)
            return htmlEquipements;
        }
    } catch (err) {
        return null;
    }
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

    addReservation(e ,id, nom, idTypeChambre, nbPers, TChambre, tarif, toPay, setShowButton, toPayEuro, listPrix){

        console.log(toPay);
        console.log(toPayEuro);
        setShowButton(true);
        let isFirstTarif=false;
        if(this.props.context.state.itineraires.length > 0){

            let itineraires = JSON.parse(JSON.stringify(this.props.context.state.itineraires));
            let dateSejour = this.props.context.state.dateSejour;
            const lastItineraire = itineraires.length - 1;
            const lastTarif = itineraires[lastItineraire].tarifReserves.length - 1;
            if(itineraires[lastItineraire].tarifReserves.length > 0){
                dateSejour = {
                    debut: itineraires[itineraires.length - 1].tarifReserves[lastTarif].dateSejour.debut,
                    fin: itineraires[itineraires.length - 1].tarifReserves[lastTarif].dateSejour.fin
                };
            }
            if(this.props.context.state.itineraires.length == 1 && itineraires[lastItineraire].tarifReserves.length==0){
                    isFirstTarif=true;
            }
            const Random = NumeroIntineraire(this.props.context.state.random , this.props.context.state.nameHotel,TChambre);
            const numeroConfirm = numeroConfirmation(0, this.props.context.state.nameHotel, TChambre);
                
                let headers = {
                    idsession: session.getInstance().getId(),
                    ispartner: session.getInstance().getIsPartner()
                };
                const session_temp = localStorage.getItem("session_temp");
                if(session_temp !== null){
                    headers.session_temp = session_temp;
                }
                axios({
                    method: "get",      
                    url: process.env.REACT_APP_BACK_URL + "/TypeChambre/detailsChambre/"+idTypeChambre,
                    withCredentials: true,
                    data: {},
                    headers: headers
                })
                .then(res => {                                           
                    let typeChambre = res.data.typeChambre;
                    if(res.data.status==200){
                        itineraires[lastItineraire].NumeroITineraire =Random;
                        itineraires[lastItineraire].tarifReserves.push({
                            idTarif: id, 
                            dateSejour: dateSejour,
                            dateReservation: getDate(Date.now()),
                            guests: this.props.context.state.guests,
                            idTypeChambre : idTypeChambre,
                            nbPers: nbPers,
                            reservateurWithEmail: {nom: "", prenom: "", email: "", tel: ""},
                            numeroConfirmation : numeroConfirm,
                            nomTypeChambre:typeChambre.nom,
                            TypeChambreName:typeChambre.name,
                            politiqueAnnulAtrb:tarif.politiqueAnnulAtrb,
                            nomTarif:tarif.nom,
                            TarifName:tarif.name,
                            toPayDevise:{afterProm: toPay.prix,beforeProm:toPay.prixOriginal},
                            toPay: {afterProm:toPayEuro.prix,beforeProm:toPayEuro.prixOriginal},
                            listPrix: JSON.parse(JSON.stringify(listPrix))
                        });
                        
                        let reserv = this.props.context.state.reservationEnCours;
                        reserv.itineraires=itineraires;
                        console.log(reserv);
                        this.props.context.setReservationEnCours(reserv,true,isFirstTarif);
                    }
                })
                .catch(err =>{console.log(err); console.log("erreur");} );
        }
    }

    printExistingTypeChambre(){
        let i = -1;
        let listChambre = <div>An error occured!</div>
        try{
            listChambre = this.props.context.state.listTypeChambre.map(typeChambre => {
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
                                            <Equipements equipements = { typeChambre.equipements } />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                    <ListTarif 
                                        context={this.props.context} 
                                        tarifs={typeChambre.tarifs} 
                                        idTypeChambre={typeChambre._id} 
                                        nameTC = {typeChambre.nom} 
                                        contextListChambre = {this}
                                    />
                                    </div>
                                </div>  
                            </div>      
                        </div>
                        </Item>
                </div>
                )
            }); 
        }catch(err){
            listChambre = <ResultatGroupeParTypeChambre context={this.props.context} contextListChambre = {this} />
        }
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