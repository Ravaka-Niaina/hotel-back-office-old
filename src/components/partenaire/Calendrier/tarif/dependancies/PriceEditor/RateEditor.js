import * as React from 'react';
import {useState} from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment} from '@mui/material';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';

import callAPI from '../../../../../../utility';
import {days, getDateYYYYMMDD} from './utilEditor.js';

const RateEditor = ({nomPlanTarifaire, idPlanTarifaire, fromto, value, setValue, 
    handleChange, closePopper, idTypeChambre, alldays, getPrix, nbPers}) => {
    const [changeStatusRate, setChangeStatusRate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prix, setPrix] = useState("");
    const [error, setError] = useState(null);

    if(fromto.length === 1){
        fromto.push(fromto[0] + "");
    }

    const switchChangeStatusRate = () => {
        setChangeStatusRate(!changeStatusRate);
        setValue("");
    }

    const refresh = (data) => {
        console.log(data);
        const startLoad = () => setLoading(true);
        const endLoad = () => setLoading(false);
        if(data.status === 200){
            getPrix([moment(alldays[0], "MM-DD-YYYY"), moment(alldays[alldays.length - 1], "MM-DD-YYYY")], startLoad, endLoad);
        }else{
            if(data.errors.other){
                setError(data.errors.other);
            }
            setLoading(false);
        }
    };

    const savePrixTarif = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(fromto);
        const data = {
            dateDebut: getDateYYYYMMDD(fromto[0]),
            dateFin: getDateYYYYMMDD(fromto[1]),
            days: days,
            forTypeChambre: false,
            forTarif: true,
            isTarifOpen: value === "open" ? true : false,
            idTypeChambre: idTypeChambre,
            idTarif: idPlanTarifaire,
            modifierOuvertureTarif: changeStatusRate,
            nbPers: nbPers,
            prix: Number.parseFloat(prix),
            minSejour: 1
        };
        console.log(data);
        callAPI('post', '/TCTarif/configPrixXPers', data, refresh);
    };

    return(
        <FormControl component="fieldset">
            <span>{nomPlanTarifaire}</span>
            <span>{moment(fromto[0]).format('ll') + ((fromto[1] != undefined) ?  ' - ' + moment(fromto[1]).format('ll') : "")}</span>
            <FormControlLabel
                checked={changeStatusRate}
                control={<Radio />} label="Modifier disponibilité tarif"
                onClick={() => switchChangeStatusRate()}
            />
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                row
            >
                <FormControlLabel value="open" control={<Radio />} label="Open" disabled={!changeStatusRate} />
                <FormControlLabel value="close" control={<Radio />} label="Close" disabled={!changeStatusRate} />
            </RadioGroup>

            {error === null 
            ? null 
            : <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => setError(null)}>{error}</Alert>
            </Stack>}

            <br/>
            <TextField
                size="small"
                id="outlined-number"
                label={"x " + nbPers} 
                type="number"
                InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>,
                    endAdornment:<InputAdornment position="end">€</InputAdornment>
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
            />
            <br/>

            <Stack direction="row" spacing={2}>
                <LoadingButton
                    color="secondary"
                    onClick={(e) => savePrixTarif(e)}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    Save
                </LoadingButton>
                <Button onClick={() => closePopper()} variant="contained">
                    Close
                </Button>
            </Stack>
        </FormControl>
    );
};

export default RateEditor;