import * as React from 'react';
import {useState} from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment} from '@mui/material';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import callAPI from '../../../../../../utility';
import {days, getDateYYYYMMDD} from './utilEditor.js';

const versions = [];
const RateEditor = ({nomPlanTarifaire, fromto, value, setValue, 
    handleChange, closePopper, idTypeChambre, alldays, getPrix, nbPers}) => {
    const [changeStatusRate, setChangeStatusRate] = useState(false);
    const [loading, setLoading] = React.useState(false);

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
            console.log("prix non configuré");
            setLoading(false);
        }
    };

    const setPrix = (i, value) => {
        versions[i].prix = value;
    };

    const savePrixTarif = (e) => {
        e.preventDefault();
        console.log(getDateYYYYMMDD(fromto[0]));
        setLoading(true);
        const data = {
            idTypeChambre: idTypeChambre,
            dateDebut: getDateYYYYMMDD(fromto[0]),
            dateFin: getDateYYYYMMDD(fromto[1]),
            forTypeChambre: false,
            forTarif: false,
            modifierOuvertureChambre: changeStatusRate,
            days: days
        };
        callAPI('post', '/TCTarif/configPrix', data, refresh);
    };

    let inputPrix = [];
    for(let i = 0; i < nbPers; i++){
        versions.push({
            nbPers: i + 1,
            prix: ""
        });
        inputPrix.push(
            <>
                <TextField
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
                    value={versions[i].prix}
                    onChange={(e) => setPrix(i, e.target.value)}
                />
                <br/>
            </>
        );
    }

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
                onChange={handleChange}
                row
            >
                <FormControlLabel value="open" control={<Radio />} label="Open" disabled={!changeStatusRate} />
                <FormControlLabel value="close" control={<Radio />} label="Close" disabled={!changeStatusRate} />
            </RadioGroup>
            <br/>
            {inputPrix}
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