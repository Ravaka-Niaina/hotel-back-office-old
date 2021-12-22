import React from 'react';
import styles from './Book.module.css';
import Navbar  from "../../NavbarClient/Navbar";
import {Button, TextField, Box, InputAdornment, ToggleButtonGroup, ToggleButton, Typography} from '@mui/material';
import {EventNote, ExpandMore, ManageSearch, Search, ArrowDropDown, PersonOutline} from '@mui/icons-material';
import FiltreAdulteEnfant from '../client/FiltreAdulteEnfant';
import BaeCalendar from "../../calendar/calendar.js";

const BookComponent = (props) => {
  const [groupby, setGroupBy] = React.useState('a');
  const handleGroupByChange = (event, g) => {
    if(g !== null){
      setGroupBy(g);
    }
  };

    function changeOpenCalendar(){
        let temp = {...props.context.state};
        temp.openCalendar = !temp.openCalendar;
        props.context.setState(temp);
    }

    function changeOpenChangeNbGuest(){
        let temp = {...props.context.state};
        temp.openChangeNbGuest = !temp.openChangeNbGuest;
        props.context.setState(temp);
    }

    function changeOpenFiltre(){
        let temp = {...props.context.state};
        temp.showFiltre = !temp.showFiltre;
        props.context.setState(temp);
    }

  return(
  <div className={styles.Book}>
    <Navbar currentPage={0}/>
    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection:'column' }} className={styles.filter}>
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
              onClick={(e) => changeOpenCalendar()}
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
              onClick={(e) => changeOpenCalendar()}
          />
          <TextField
              fullwidth={false}
              size="small" 
              id="outlined-number"
              label="Occupancy"
              value={props.context.state.guests.nbAdulte + " adults - " + props.context.state.guests.nbEnfant + " children"}
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
          <Button variant="outlined" startIcon={<Search />}>
              Search
          </Button>
      </Box>
    </Box>
    <Box sx={{ display: { xs: 'none', md: 'flex'}}} className={styles.resultsFilter}>
        <Button variant="outlined" startIcon={<ManageSearch />} onClick={(e) => changeOpenFiltre()}>
            Filter
        </Button>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '16px' }}
        >
            Group by :
        </Typography>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={groupby}
          onChange={handleGroupByChange}
        >
          <ToggleButton size="small" value="a">Type chambre</ToggleButton>
          <ToggleButton size="small" value="b">Plan tarifaires</ToggleButton>
        </ToggleButtonGroup>
        {props.context.state.openCalendar ? 
            <div style ={{ width :"fit-content" , margin :"0 auto", marginLeft: "-225px", marginTop: "500px", zIndex: "5", position: "absolute", backgroundColor: "white", padding: "10px 10px", borderRadius: "5px"}}>
                <div style={{backgroundColor: "white"}}>
                    <BaeCalendar context = {props.context} />
                </div>
            </div > : null }
        { props.context.state.openChangeNbGuest ? <FiltreAdulteEnfant context={props.context} /> : null }
    </Box>
  </div>
)};

export default BookComponent;
