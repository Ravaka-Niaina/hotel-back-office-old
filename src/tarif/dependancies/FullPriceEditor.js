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
    const [value, setValue] = useState([moment('2021-11-11'), moment('2021-12-11')])
    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePicker
            startText="From"
            endText="To"
            value={props.interval}
            onChange={(newValue) => {
                props.setInterval(newValue);
                if(newValue != undefined && newValue[0] != null && newValue[1] != null){
                    const allday = getDaysBetweenDates(newValue[0],newValue[1]);
                }
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
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [interval, setInterval] = React.useState([]);
    const [prix, setPrix] = React.useState([]);
    const guestsMax = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
    const history = useHistory();

    useEffect( () => {
        let temp = [];
        for(let i = 0; i < guestsMax; i++){
            temp.push("");
        }
        setPrix(temp);
    }, [])

    const [rate,setRate] = useState(1);

    function handleChangePrix(i, value){
        console.log("niova ny prix");
        let temp = JSON.parse(JSON.stringify(prix));
        temp[i] = value;
        setPrix(temp);
    }


    let rates = [];
    for(let i = 0; i < props.typechambre.planTarifaire.length; i++){
        const a = i;
        rates.push(
            <MenuItem value={i + 1}>{props.typechambre.planTarifaire[a].nom}</MenuItem>
        );
    }

    function refresh(res){
        console.log(res);
        if(res.status === 200){
            history.push('/tarif');
        }else{
            console.log("prix non configuré");
        }
    }

    function savePrix(){
        let versions = [];
        console.log(prix);
        for(let i = 0; i < guestsMax; i++){
            if(prix[i].trim() != ""){
                versions.push({nbPers: (i + 1), prix: Number.parseInt(prix[i])});
            }
        }
        if(versions.length > 0){
            const data = {
                idTarif: props.typechambre.planTarifaire[rate - 1]._id,
                idTypeChambre: props.typechambre._id,
                versions: versions,
                minSejour: 1,
                dateDebut: interval[0].format("YYYY-MM-DD"),
                dateFin: interval[1].format("YYYY-MM-DD")
            };
            console.log(data);
            callAPI('post', '/prixTarif/insert', data, refresh);
        }else{
            console.log("Veuillez entrez au moins un prix");
        }
    }

    return(
        <>
        <Modal
            open={props.showme}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={(e) => props.closeModal()}
        >
            <Box sx={style}
                className={styles.fullpopper}
            >
                
                <DatePicker interval={interval} setInterval={setInterval} />
                <br/>
                <div>
                    <Checkbox defaultChecked /><span>Mon</span>
                    <Checkbox defaultChecked /><span>Tue</span>
                    <Checkbox defaultChecked /><span>Wed</span>
                    <Checkbox defaultChecked /><span>Thu</span>
                    <Checkbox defaultChecked /><span>Fri</span>
                    <Checkbox defaultChecked /><span>Sat</span>
                    <Checkbox defaultChecked /><span>Sun</span>
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
                    onChange={(e) => setRate(e.target.value)}
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
                    <Button onClick={() => props.closeModal(false)} variant="contained">
                        Close
                    </Button>
                </Stack>
            </Box>
      </Modal>
        </>
    );
}

export default FullPriceEditor;