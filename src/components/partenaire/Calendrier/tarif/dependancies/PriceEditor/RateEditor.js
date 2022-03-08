import {useState} from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment} from '@mui/material';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const RateEditor = ({nomPlanTarifaire, fromto, value, setValue, handleChange, closePopper}) => {
    const [changeStatusRate, setChangeStatusRate] = useState(false); 

    const switchChangeStatusRate = () => {
        setChangeStatusRate(!changeStatusRate);
        setValue("");
    }

    const savePrixTarif = (e) => {
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
                onChange={handleChange}
                row
            >
                <FormControlLabel value="open" control={<Radio />} label="Open" disabled={!changeStatusRate} />
                <FormControlLabel value="close" control={<Radio />} label="Close" disabled={!changeStatusRate} />
            </RadioGroup>
            <br/>
            <TextField
                size="small"
                id="outlined-number"
                label="x 2"
                type="number"
                InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>,
                    endAdornment:<InputAdornment position="end">€</InputAdornment>
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br/>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" disabled onClick={(e) => savePrixTarif(e)}>
                    Save
                </Button>
                <Button onClick={() => closePopper()} variant="contained">
                    Close
                </Button>
            </Stack>
        </FormControl>
    );
};

export default RateEditor;