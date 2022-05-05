import React from 'react';
import { useEffect,useState } from 'react';
import styles from './Book.module.css';
import Navbar  from "../NavbarClient/Navbar";
import {Button, TextField, Box, InputAdornment, ToggleButtonGroup, ToggleButton, Typography} from '@mui/material';
import {ManageSearch, Search, ArrowDropDown, PersonOutline} from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from 'react-select';
import MenuItem from '@mui/material/MenuItem';
import BaeCalendar from "./calendar/calendar.js";
import Guest from "./guest.js";
import Filtre from "./dependencies/Filtre.js";
import callAPI from '../../../utility';
import { useTranslation } from "react-i18next";

import {EventNote, ExpandMore} from '@mui/icons-material';
import Axios from 'axios';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';

import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

let regrouperResultatsParChanged = false;
const BookComponent = (props) => {
    const [groupby, setGroupBy] = React.useState('a');
    const [priceCheapestRate, setPriceCheapestRate] = React.useState(null);
    const [reloadSelectedDatePrices, setReloadSelectedDatePrices] = React.useState(false);
    const [regrouperResultatsPar, setRegrouperResultatsPar] = React.useState("typeChambre");
    const { t, i18n } = useTranslation();
    
    

    function changeDeviseRate(value,info){
        localStorage.setItem("devise" , value);
        var rate = info[value];
            let temp = {...props.context.state};
            let price = temp.listTypeChambre;
            temp.devise = value+"";
             if(value !== "eur"){
                temp.listTypeChambre = ChangeDevise(true,temp.listTypeChambre,rate);
             }else{
                temp.listTypeChambre = ChangeDevise(false,temp.listTypeChambre,rate);
             }
            if(temp.reservationEnCours.itineraires[0].tarifReserves.length !== 0){
                temp.reservationEnCours = ChangeDevisePannier(temp.reservationEnCours ,rate, value); 
                const cookies = new Cookies();
                handleChangeCookies(temp.reservationEnCours,temp.expirationCookie,cookies);
            } 
        
            props.context.setState(temp);
            
    }

    function handleChangeCookies(reservation , expiration , cookies){
        let name_cookies = 'reservation_real';
        cookies.set(name_cookies, reservation, { path: '/' ,expires:new Date(expiration)});
    }

    function ChangeDevisePannier(reservationEncours,rate,devise){
        for(let i = 0; i <  reservationEncours.itineraires.length ; i++){
            for(let j = 0; j <  reservationEncours.itineraires[i].tarifReserves.length ; j++){
                if(devise === "eur"){
                    reservationEncours.itineraires[i].tarifReserves[j].toPayDevise.afterProm = reservationEncours.itineraires[i].tarifReserves[j].toPay.afterProm;
                }else{
                    reservationEncours.itineraires[i].tarifReserves[j].toPayDevise.afterProm = rate*reservationEncours.itineraires[i].tarifReserves[j].toPay.afterProm;
                }
            } 
        }
        return reservationEncours
    }

    function ChangeDevise(isTrue,price,rate){
        let temporaire = 0;
        for(let i = 0; i < price.length ; i++){
            for(let j = 0; j < price[i].tarifs.length ; j++){
                for(let z= 0; z< price[i].tarifs[j].toPayStay.length ; z++){
                    if(isTrue){
                        if(price[i].tarifs[j].toPayStay[z].prixOriginal){
                            temporaire = price[i].tarifs[j].toPayStayOriginal[z].prixOriginal;
                            price[i].tarifs[j].toPayStay[z].prixOriginal = price[i].tarifs[j].toPayStayOriginal[z].prixOriginal * rate; 
                            price[i].tarifs[j].toPayStayOriginal[z].prixOriginal = temporaire;
                        }
                        temporaire = price[i].tarifs[j].toPayStayOriginal[z].prix; 
                        price[i].tarifs[j].toPayStay[z].prix = temporaire * rate  
                        
                    }else{
                        if(price[i].tarifs[j].toPayStay[z].prixOriginal){
                            price[i].tarifs[j].toPayStay[z].prixOriginal = price[i].tarifs[j].toPayStayOriginal[z].prixOriginal;
                        }
                        price[i].tarifs[j].toPayStay[z].prix =  price[i].tarifs[j].toPayStayOriginal[z].prix ;
                    }
                    
                }
            }
        }
        return price;
   }

    useEffect(() => {   //isakin mis fiovan d miats foan anle useEffect satri tss anle [] in ani amin farany
        if(regrouperResultatsParChanged){
            applyFilter();
            regrouperResultatsParChanged = false;
        }
    });

    const changeLanguageHandler = (e) => {
        const languageValue = e.target.value
        i18n.changeLanguage(languageValue);
      }

    const handleGroupByChange = (event, g) => {
        if(g !== null){
        setGroupBy(g);
        }
    };

    function changeOpenChangeNbGuest(){
        let temp = {...props.context.state};
        temp.openChangeNbGuest = !temp.openChangeNbGuest;
        props.context.setState(temp);
    }

    function ChangeReservationEncours(currentState,rate,To){
        for(let i = 0; i <  currentState.itineraires.length ; i++){
            for(let j = 0; j <  currentState.itineraires[i].tarifReserves.length ; j++){
                if(To === "eur"){
                    currentState.itineraires[i].tarifReserves[j].toPayDevise.afterProm = currentState.itineraires[i].tarifReserves[j].toPay.afterProm;
                }else{
                    currentState.itineraires[i].tarifReserves[j].toPayDevise.afterProm = rate*currentState.itineraires[i].tarifReserves[j].toPay.afterProm;
                    console.log("atu : " + currentState.itineraires[i].tarifReserves[j].toPayDevise.afterProm)
                }
            } 
        }
        return currentState;
        
    }

   function ResultatChangeDevise(currentState,liste,To,resultat,res){
        let rate = resultat[To];
        console.log(currentState);
        if(To !== "eur"){
            liste= ChangeDevise(true,liste,rate);
        }else{
            liste = ChangeDevise(false,liste,rate);
        }
        currentState.devise = To;
        currentState.listTypeChambre = liste;
        console.log(currentState.reservationEnCours.itineraires[0].tarifReserves.length);
       
        currentState.isListTarifDispoReceived = true;
        if(!res.prixNuiteeCalendrier){
            currentState.dateSejour.debut = '';
            currentState.dateSejour.fin = '';
        }
        currentState.pagination.nbPage = res.nombrePages;
        currentState.pagination.currentNumPage = 1;

        return currentState;
   }

    function setResult(res){
        for(let i = 0; i < res.list.length ; i++){
            for(let j = 0; j < res.list[i].tarifs.length ; j++){
                res.list[i].tarifs[j].toPayStayOriginal =  JSON.parse(JSON.stringify(res.list[i].tarifs[j].toPayStay));
            }
        }

        let To = SetToDevise();
        Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`)
        .then((resultat) => {
            let currentState = {...props.context.state};
            currentState = ResultatChangeDevise(currentState,res.list,To,resultat.data.eur, res);
            props.context.setState(currentState);

            setLoadingFilter(false);
            props.context.changeOpenFiltre(false);
            setPriceCheapestRate(res.prixNuiteeCalendrier);
            setReloadSelectedDatePrices(false);
         });
    }

    function SetToDevise(){
        let devise = localStorage.getItem("devise");
        if(!devise){
            devise = "eur"
        }
        return devise;
    }

    function applyFilter(moreData, reloadDate, numPage){
        
        setLoadingFilter(true);
        if(reloadDate){
            setReloadSelectedDatePrices(true);
        }
        if((props.context.state.guests.nbEnfant > 0 || props.context.state.guests.nbAdulte > 0)){
            props.context.handleChange("errFiltre", null);
            const data = {
                filtres: moreData,
                guests: props.context.state.guests,
                dateDebut: props.context.state.dateSejour.debut,
                dateFin: props.context.state.dateSejour.fin,
                numPage: numPage ? numPage : 1,
                regrouperParTypeChambre: regrouperResultatsPar == "planTarifaire" ? false : true
            }
            props.context.handleChange("isListTarifDispoReceived", false);
            callAPI('post', '/TCTarif/', data, setResult);
        }
    }

    function handleChangeRegrouperResultatsPar(value){
        regrouperResultatsParChanged = true;
        setRegrouperResultatsPar(value);
    }

    props.context.applyFilter = applyFilter;
    const [loadingFilter, setLoadingFilter] = React.useState(false);
  return(
    <div className={styles.Book}>
        <Navbar currentPage={0} changeLanguageHandler={changeLanguageHandler} 
            context = {props.context} bornes={props.bornes} setBornes={props.setBornes} 
            changeDeviseRate ={changeDeviseRate}  />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection:'column' }} className={styles.filter}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
            <BaeCalendar context = {props.context} applyFilter={applyFilter} dateSejour={props.context.state.dateSejour}
                priceCheapestRate={priceCheapestRate} reloadSelectedDatePrices={reloadSelectedDatePrices} 
                check={
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection:'column' }} className={styles.filter2}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
                        <TextField
                            fullwidth={false}
                            size="small"
                            id="outlined-number"
                            label={t('Check-in')}
                            value={props.context.state.dateSejour.debut}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EventNote/></InputAdornment>,
                                endAdornment:<InputAdornment position="end"><ExpandMore/></InputAdornment>,
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            fullwidth={false}
                            size="small"
                            id="outlined-number"
                            label={t('Check-out')} 
                            value={props.context.state.dateSejour.fin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EventNote/></InputAdornment>,
                                endAdornment:<InputAdornment position="end"><ExpandMore/></InputAdornment>,
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Box>
                </Box>} 
            />
            
            <Guest context = {props.context} applyFilter={applyFilter} changeLanguageHandler={changeLanguageHandler} occupancy={
                <div>
                    <TextField
                        fullwidth={false}
                        size="small" 
                        id="outlined-number"
                        label={t('Occupancy')}
                        value={ (!props.context.state.guests.nbAdulte ? 0 : props.context.state.guests.nbAdulte)  + t("Adults") + (!props.context.state.guests.nbEnfant ? 0 : props.context.state.guests.nbEnfant)  + t("Children's")}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PersonOutline/></InputAdornment>,
                            endAdornment:<InputAdornment position="end"><ArrowDropDown/></InputAdornment>,
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        onClick={(e) => changeOpenChangeNbGuest()}
                    />
                </div>
            } />
          
            <Button variant="outlined" startIcon={<Search />} onClick={(e) => applyFilter()}>
              Search
            </Button>
        </Box>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex'}}} className={styles.resultsFilter}>
            <Button variant="outlined" startIcon={<ManageSearch />} onClick={(e) => props.context.changeOpenFiltre(true)}>
            {t('filter')}
            </Button>
            <div>
                <span><strong>{ props.context.state.listTypeChambre.length }</strong>{t('matching rooms')}</span>
            </div>

            <label for="regrouperResultatsPar">Regrouper résultats par</label>
            <select name="regrouperResultatsPar" onChange={(e) => handleChangeRegrouperResultatsPar(e.target.value)}>
                <option value="typeChambre">Type chambre</option>
                <option value="planTarifaire">Plan tarifaire</option>
            </select>
        </Box>
        <Filtre context={props.context} applyFilter={applyFilter} loadingFilter={loadingFilter} />
    </div>
)};

export default BookComponent;