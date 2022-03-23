import React , { useState , useEffect} from 'react';
import {Button,Stack,TextField,Box,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment,Modal,Checkbox,InputLabel,MenuItem,Select, FormLabel} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import styles from '../CalendarComponent.module.css';

import callAPI from '../../../../../utility';
import { useHistory } from 'react-router-dom';
import ButtonLoading from "../../../buttonLoading.js"
import {handleErrorConfigPrix, getChosenRateError, 
    removeChosenRateError, removeErrorConfigPrix} from "./FullPriceEditor/errorHandler.js";

const getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

const DatePicker = (props) => {
    const removeError = () => {
        console.log("arrrrrrghh");
        let temp = {...props.error};
        temp.dateDebut = null;
        temp.dateFin = null;
        props.setError(temp);
    };
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
                <TextField 
                    {...startProps} 
                    error={props.error.dateDebut === null ? false : true}
                    helperText={props.error.dateDebut === null ? null : props.error.dateDebut}
                    onChange={(e) => removeError()} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField 
                    {...endProps} 
                    error={props.error.dateFin === null ? false : true}
                    helperText={props.error.dateFin === null ? null : props.error.dateFin}
                    onChange={(e) => removeError()} />
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
                    error={props.error.versions[i] === null ? false : true}
                    helperText={props.error.versions[i] === null ? null : props.error.versions[i]}
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

        position:'absolute',
        overflow:'scroll',
        overflowX: 'hidden',
        height: '100%',
        display:'block'
    };
    const [value, setValue] = React.useState('open');
    const [tarifs, setTarifs] = React.useState([]);
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
    const [toSell, setToSell] = React.useState(0);
    const [isTypeChambreOpen, setIsTypeChambreOpen] = React.useState("open");
    const [isTarifOpen, setIsTarifOpen] = React.useState("open");
    const guestsMax = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
    let versions = {};
    for(let i = 0; i < guestsMax; i++){
        versions[i] = null;
    }
    const [error, setError] = React.useState({
        idTarif: null,
        idTypeChambre: null,
        dateDebut: null,
        dateFin: null,
        days: null,
        toSell: null,
        tarif: null,
        versions: versions,
        noVersion: null
    });

    function removeAnError(field){
        let temp = {...error};
        temp[field] = null;
        setError(temp);
    }

    function setAllDays(checked){
        for(let i = 0; i < days.length; i++){
            days[i].checked = checked;
        }
        setDays(days);
    }

    const history = useHistory();

    useEffect( () => {
        let taf = JSON.parse(JSON.stringify(props.typechambre.planTarifaire));
        for(let i = 0; i < taf.length; i++){
            taf.checked = false;
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
        removeChosenRateError(error, setError);
    }

    const [rate,setRate] = useState(1);

    function handleChangePrix(i, value){
        console.log("niova ny prix");
        let temp = JSON.parse(JSON.stringify(prix));
        temp[i] = value;
        setPrix(temp);

        let tempError = {...error};
        tempError.noVersion = null;
        tempError.versions[i] = null;
        setError(tempError);
    }


    let rates = [];
    for(let i = 0; i < tarifs.length; i++){
        const err = getChosenRateError(error, tarifs[i]._id);
        rates.push(
            <>
                <FormControlLabel
                    style={{padding: 0}}
                    label={tarifs[i].nom}
                    error={"erreur"}
                    onChange={(e) => handleRateChange(i, e.target.checked)}
                    control={<Checkbox checked={tarifs[i].checked} />}
                    helperText={"test "}
                />
                {err === null ? null : <div style={{color: "#D32F2F", font: "13px Roboto,Helvetica,Arial,sans-serif"}}><span>{err}</span></div> }
            </>
        );
    }

    function refresh(res){
        if(res.status === 200){
            props.getPrix(props.value);
            removeErrorConfigPrix(error, setError)
        }else{
            console.log("prix non configuré");
            handleErrorConfigPrix(res.errors, error, setError);
            props.setOpenLoad(false);
        }
    }

    function savePrix(forTypeChambre, forTarif){
        //props.setOpenLoad(true);
        let versions = [];

        if(prix.length > 0){
            console.log(prix);
            for(let i = 0; i < guestsMax; i++){
                if((prix[i] + "").trim() != ""){
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
        let tabIdTarif = [];
        for(let i = 0; i < tarifs.length; i++){
            if(tarifs[i].checked){
                tabIdTarif.push(tarifs[i]._id);
            }
        }
        const dateOublie = "Vous avez oublié de choisir une date";
        let tempError = {...error};
        if(interval[0] === null){
            tempError.dateDebut = dateOublie;
        }
        if(interval[1] === null){
            tempError.dateFin = dateOublie;
        }
        setError(tempError);
        if(interval[0] !== null && interval[1] !== null){
            const data = {
                tabIdTarif: tabIdTarif,
                idTypeChambre: props.typechambre._id,
                days: usedDays,
                versions: versions,
                minSejour: 1,
                dateDebut: interval[0].format("YYYY-MM-DD"),
                dateFin: interval[1].format("YYYY-MM-DD"),
                toSell: toSell,
                isTypeChambreOpen: isTypeChambreOpen === "open" ? true : false,
                isTarifOpen: isTarifOpen === "open" ? true : false,
                forTypeChambre: forTypeChambre,
                forTarif: forTarif
            };
            console.log(data);
            callAPI('post', '/TCTarif/configPrix', data, refresh);
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

    const handleRateChange = (i, checked) => {
        let temp = JSON.parse(JSON.stringify(tarifs));
        temp[i].checked = checked;
        setTarifs(temp);

        if(error.tarfi !== null){
            let tempError = {...error};
            tempError.tarif = null;
            setError(tempError);
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
            //setToSell(result.prixTarif.toSell);
            for(let i = 0; i < result.prixTarif.versions.length; i++){
                temp.push(result.prixTarif.versions[i].prix);
            }
            setPrix(temp);
        }else{
            console.log("On n'a pas pu charger les prix");
        }
    }

    function getPrix(newValue){
        console.log("rate = " + newValue);
        if(newValue > 1){
            const data = {
                idTarif: tarifs[newValue - 1]._id,
               idTypeChambre: props.typechambre._id,
               dateDebut: interval[0].format("YYYY-MM-DD"),
               dateFin: interval[1].format("YYYY-MM-DD")
           };
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

    const [minDate, setMinDate] = React.useState(new Date());

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
                <DatePicker 
                    interval={interval} 
                    setInterval={handleIntervalChange} 
                    minDate={minDate}
                    error={error}
                    setError={setError} />
                <br/>
                <div>
                    {inputDays}
                    { error.days === null ? null : <div style={{color: "#D32F2F", font: "13px Roboto,Helvetica,Arial,sans-serif"}}><span>{error.days}</span></div> }
                </div>
                <br/>
                <span>{props.typechambre.nom}</span>
                <br/>
                <FormLabel component="legend">Type chambre</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={isTypeChambreOpen}
                    onChange={(e) => setIsTypeChambreOpen(e.target.value)}
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
                    value={toSell}
                    type="number"
                    onChange={(e) => {removeAnError("toSell"); setToSell(Number.parseInt(e.target.value))}}
                    error={error.toSell === null ? false : true}
                    helperText={error.toSell === null ? null : error.toSell}
                />
                <br/>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={(e) => savePrix(true, false)}>
                        Sauvegarder type chambre
                    </Button>
                </Stack>
                <br/>
                <FormControl component="fieldset">
                {/*<InputLabel variant="outlined">Rate</InputLabel>*/}
                <FormLabel component="legend">Plan tarifaire</FormLabel>
                { error.tarif === null ? null : <div style={{color: "#D32F2F", font: "13px Roboto,Helvetica,Arial,sans-serif"}}><span>{error.tarif}</span></div> }
                { rates }
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={isTarifOpen}
                    onChange={(e) => setIsTarifOpen(e.target.value)}
                    row
                >
                    <FormControlLabel value="open" control={<Radio />} label="Open" />
                    <FormControlLabel value="close" control={<Radio />} label="Close" />
                </RadioGroup>
                </FormControl>
                <br/>
                { error.noVersion === null ? null : <div style={{color: "#D32F2F", font: "13px Roboto,Helvetica,Arial,sans-serif"}}><span>{error.noVersion}</span></div> }
                <InputPrix guestsMax={guestsMax} prix={prix} handleChangePrix={handleChangePrix} error={error} setError={setError} />
                
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={(e) => savePrix(false, true)}>
                        Sauvegarder tarif
                    </Button>
                </Stack>
                <br/>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={(e) => savePrix(true, true)}>
                        Sauvegarder tout
                    </Button>
                </Stack>
                <br/>
                <Stack direction="row" spacing={2}>
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