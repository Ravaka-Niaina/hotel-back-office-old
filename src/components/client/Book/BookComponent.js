import React from 'react';
import styles from './Book.module.css';
import Navbar  from "../NavbarClient/Navbar";
import {Button, TextField, Box, InputAdornment, ToggleButtonGroup, ToggleButton, Typography} from '@mui/material';
import {ManageSearch, Search, ArrowDropDown, PersonOutline} from '@mui/icons-material';
import BaeCalendar from "./calendar/calendar.js";
import Guest from "./guest.js";
import Filtre from "./dependencies/Filtre.js";
import callAPI from '../../../utility';

import {EventNote, ExpandMore} from '@mui/icons-material';

const BookComponent = (props) => {
    const [groupby, setGroupBy] = React.useState('a');
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
        props.context.setState(currentState);
        setLoadingFilter(false);
        props.context.changeOpenFiltre(false);
    }

    function applyFilter(moreData){
        setLoadingFilter(true);
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
        <Navbar currentPage={0}/>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection:'column' }} className={styles.filter}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
            <BaeCalendar context = {props.context} applyFilter={applyFilter} dateSejour={props.context.state.dateSejour} check={
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection:'column' }} className={styles.filter2}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
                        <TextField
                            fullwidth={false}
                            size="small"
                            id="outlined-number"
                            label="Check-in"
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
                            label="Check-out" 
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
            
            <Guest context = {props.context} applyFilter={applyFilter} occupancy={
                <div>
                    <TextField
                        fullwidth={false}
                        size="small" 
                        id="outlined-number"
                        label="Occupancy"
                        value={ (!props.context.state.guests.nbAdulte ? 0 : props.context.state.guests.nbAdulte)  + " adults - " + (!props.context.state.guests.nbEnfant ? 0 : props.context.state.guests.nbEnfant)  + " children"}
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
                Filtrer
            </Button>
                <div>
                    <span><strong>{ props.context.state.listTypeChambre.length }</strong> matching rooms</span>
                </div>
        </Box>
        <Filtre context={props.context} applyFilter={applyFilter} loadingFilter={loadingFilter} />
    </div>
)};

export default BookComponent;