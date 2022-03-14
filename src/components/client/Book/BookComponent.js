import React from 'react';
import styles from './Book.module.css';
import Navbar  from "../NavbarClient/Navbar";
import {Button, TextField, Box, InputAdornment, ToggleButtonGroup, ToggleButton, Typography} from '@mui/material';
import {ManageSearch, Search, ArrowDropDown, PersonOutline} from '@mui/icons-material';
import BaeCalendar from "./calendar/calendar.js";
import Guest from "./guest.js";
import Filtre from "./dependencies/Filtre.js";
import callAPI from '../../../utility';
import { useTranslation } from "react-i18next";

import {EventNote, ExpandMore} from '@mui/icons-material';

const BookComponent = (props) => {
    const [groupby, setGroupBy] = React.useState('a');
    const [priceCheapestRate, setPriceCheapestRate] = React.useState(null);
    const [reloadSelectedDatePrices, setReloadSelectedDatePrices] = React.useState(false);
    const { t, i18n } = useTranslation();

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

    function setResult(res){
        let currentState = {...props.context.state};
        currentState.listTypeChambre = res.list;
        currentState.isListTarifDispoReceived = true;
        if(!res.prixNuiteeCalendrier){
            currentState.dateSejour.debut = '';
            currentState.dateSejour.fin = '';
        }
        props.context.setState(currentState);
        setLoadingFilter(false);
        props.context.changeOpenFiltre(false);
        setPriceCheapestRate(res.prixNuiteeCalendrier);
        setReloadSelectedDatePrices(false);
    }

    function applyFilter(moreData, reloadDate){
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
                dateFin: props.context.state.dateSejour.fin
            }
            props.context.handleChange("isListTarifDispoReceived", false);
            callAPI('post', '/TCTarif/', data, setResult);
        }
    }
    const [loadingFilter, setLoadingFilter] = React.useState(false);
  return(
    <div className={styles.Book}>
        <Navbar currentPage={0} changeLanguageHandler={changeLanguageHandler} bornes={props.bornes} setBornes={props.setBornes} />
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
        </Box>
        <Filtre context={props.context} applyFilter={applyFilter} loadingFilter={loadingFilter} />
    </div>
)};

export default BookComponent;