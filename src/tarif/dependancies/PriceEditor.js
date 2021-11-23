import React from 'react';
import {Button,Stack,TextField,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const PriceEditor = (props) => {
    const [value, setValue] = React.useState('open');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const closePopper = () => {
        props.closePopper(null);
    }
    return(
        <>
            <span>{props.typechambre.nom}</span>
            <br/>
            <span>{props.fromto[0].format('ll') + ' - ' + props.fromto[1].format('ll')}</span>
            <br/>
            <FormControl component="fieldset">
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
                size="small"
                id="outlined-number"
                label="Rooms to sell"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                />
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
                    <Button variant="contained" disabled>
                        Save
                    </Button>
                    <Button onClick={() => closePopper()} variant="contained">
                        Close
                    </Button>
                </Stack>
            </FormControl>
        </>
    )
}

export default PriceEditor;