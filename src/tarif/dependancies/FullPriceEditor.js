import React , { useState , useEffect} from 'react';
import {Button,Stack,TextField,Box,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment,Modal,Checkbox,InputLabel,MenuItem,Select} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from '../CalendarComponent.module.css';

import callAPI from '../../utility';
import { useHistory } from 'react-router-dom'

const getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

const DatePicker = (props) => {
    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePicker
            startText="From"
            endText="To"
            value={props.interval}
            onChange={(newValue) => {
                props.setInterval(newValue);
            }}
            renderInput={(startProps, endProps) => (
            <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
            </React.Fragment>
            )}
        />
        </LocalizationProvider>
    )
}

function InputPrix(props){
    let inputPrix = [];
    for(let i = 0; i < props.guestsMax; i++){
        inputPrix.push(
            <>
                <TextField
                    fullwidth={false}
                    size="small"
                    id="outlined-number"
                    label={"x " + (i + 1)}
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>,
                        endAdornment:<InputAdornment position="end">€</InputAdornment>
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={props.prix[i]}
                    onChange={(e) => props.handleChangePrix(i, e.target.value)}
                />
                <br/>
            </>
        );
    }
    return inputPrix;
}

const FullPriceEditor = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px',
        p: 4,
    };
    const [value, setValue] = React.useState('open');
    const [tarifs, setTarifs] = React.useState([]);
    const handleChange = (event) => {
        setValue(event.target.value);
        if(event.target.value === "close"){
            setAllDays(false);
        }else{
            setAllDays(true);
        }
    };
    const [interval, setInterval] = React.useState(props.dateRange);
    const [prix, setPrix] = React.useState([]);
    const [days, setDays] = React.useState([
        { value: 1, checked: true, label: "Mon" },
        { value: 2, checked: true, label: "Tue" },
        { value: 3, checked: true, label: "Wed" },
        { value: 4, checked: true, label: "Thu" },
        { value: 5, checked: true, label: "Fri" },
        { value: 6, checked: true, label: "Sat" },
        { value: 7, checked: true, label: "Sun" },
    ]); // day 1 = lundi , 7 = dimanche

    function setAllDays(checked){
        for(let i = 0; i < days.length; i++){
            days[i].checked = checked;
        }
        setDays(days);
    }

    const guestsMax = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
    const history = useHistory();

    useEffect( () => {
        console.log(props.typechambre.planTarifaire);
        let taf = JSON.parse(JSON.stringify(props.typechambre.planTarifaire));
        if(taf.length > 0){
            taf.splice(0, 0, {nom: "Choisissez un plan tarifaire..."});
        }else{
            taf.splice(0, 0, {nom: "Aucun plan tarifaire..."});
        }
        let temp = [];
        for(let i = 0; i < guestsMax; i++){
            temp.push("");
        }
        setPrix(temp);
        
        setTarifs(taf);
    }, [])

    function handleClose(){
        let temp = [];
        for(let i = 0; i < guestsMax; i++){
            temp.push("");
        }
        setPrix(temp);
        setInterval(props.dateRange);
        setAllDays(true);
        setValue("open");
        setRate(1);
    }

    const [rate,setRate] = useState(1);

    function handleChangePrix(i, value){
        console.log("niova ny prix");
        let temp = JSON.parse(JSON.stringify(prix));
        temp[i] = value;
        setPrix(temp);
    }


    let rates = [];
    for(let i = 0; i < tarifs.length; i++){
        rates.push(
            <MenuItem value={i + 1}>{tarifs[i].nom}</MenuItem>
        );
    }

    function refresh(res){
        console.log(res);
        if(res.status === 200){
            console.log("Redirection en cours...");
            // reload
            window.location.reload();
            props.closeModal();
            handleClose();
        }else{
            console.log("prix non configuré");
        }
    }

    function savePrix(){
        if(rate > 1){
            let versions = [];
            console.log(prix);

            if(prix.length > 0){
                for(let i = 0; i < guestsMax; i++){
                    if(prix[i].trim() != ""){
                        versions.push({nbPers: (i + 1), prix: Number.parseFloat(prix[i])});
                    }
                }
            }

            let usedDays = JSON.parse(JSON.stringify(days));
            if(value == "close"){
                for(let i = 0; i < usedDays.length; i++){
                    usedDays[i].checked = false;
                }
            }
            const data = {
                idTarif: tarifs[rate - 1]._id,
                idTypeChambre: props.typechambre._id,
                days: usedDays,
                versions: versions,
                minSejour: 1,
                dateDebut: interval[0].format("YYYY-MM-DD"),
                dateFin: interval[1].format("YYYY-MM-DD")
            };
            console.log(data);
            callAPI('post', '/prixTarif/insert', data, refresh);
        }
        }
        
    
    function handleDayChange(i, checked){
        let current = JSON.parse(JSON.stringify(days));
        current[i].checked = checked;
        setDays(current);
        if(checked === true && value === "close"){
            setValue("open");
        }
    }

    let inputDays = [];
    for(let i = 0; i < days.length; i++){
        const a = i;
        inputDays.push(
            <>
                <FormControlLabel
                    style={{padding: 0}}
                    label={days[i].label}
                    onChange={(e) => handleDayChange(a, e.target.checked)}
                    control={<Checkbox checked={days[i].checked} />}
                />
                {/*<Checkbox checked={days[i].checked} onChange={(e) => console.log(e)} /><span>{days[i].label}</span>*/}
            </>
        );
    }

    function loadPrix(result){
        console.log(result);
        if(result.status === 200){
            let temp = [];
            for(let i = 0; i < result.prixTarif.length; i++){
                temp.push(result.prixTarif[i].prix);
            }
            setPrix(temp);
        }else{
            console.log("On n'a pas pu charger les prix");
        }
    }

    function getPrix(newValue){
        console.log("rate = " + newValue);
        if(rate > 1){
            const data = {
                idTarif: tarifs[newValue - 1]._id,
               idTypeChambre: props.typechambre._id,
               dateDebut: interval[0].format("YYYY-MM-DD"),
               dateFin: interval[1].format("YYYY-MM-DD")
           };
           console.log(data);
           callAPI('post', '/typeChambre/prix/min', data, loadPrix);
        }
    }

    function handleChangeRate(newValue){
        setRate(newValue);
        getPrix(newValue);
    }

    function handleIntervalChange(value){
        setInterval(value);
        getPrix(rate);
    }

    return(
        <>
        <Modal
            open={props.showme}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={(e) => {props.closeModal(); handleClose()}}
        >
            <Box sx={style}
                className={styles.fullpopper}
            >   
                <DatePicker interval={interval} setInterval={handleIntervalChange} />
                <br/>
                <div>
                    {inputDays}
                </div>
                <br/>
                <span>{props.typechambre.nom}</span>
                <br/>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel value="open" control={<Radio />} label="Open" />
                    <FormControlLabel value="close" control={<Radio />} label="Close" />
                </RadioGroup>
                <br/>
                <TextField
                    fullwidth={false}
                    size="small"
                    id="outlined-number"
                    label="Rooms to sell"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br/>
                <FormControl component="fieldset">
                <InputLabel variant="outlined">Rate</InputLabel>
                <Select
                    value={rate}
                    label="Rate"
                    onChange={(e) => handleChangeRate(e.target.value)}
                    size="small"
                >
                    { rates }
                </Select>
                </FormControl>
                <br/>
                <InputPrix guestsMax={guestsMax} prix={prix} handleChangePrix={handleChangePrix} />
                
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={(e) => savePrix()}>
                        Save
                    </Button>
                    <Button onClick={() => {props.closeModal(false); handleClose()}} variant="contained">
                        Close
                    </Button>
                </Stack>
            </Box>
      </Modal> 
        </>
    );
}

export default FullPriceEditor;