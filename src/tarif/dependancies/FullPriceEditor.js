import React , { useState , useEffect} from 'react';
import {Button,Stack,TextField,Box,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment,Modal,Checkbox,InputLabel,MenuItem,Select} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from '../CalendarComponent.module.css';

const getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

const DatePicker = () => {
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState([moment('2021-11-11'), moment('2021-12-11')])
    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePicker
            startText="From"
            endText="To"
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
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
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('open');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect( () => {
        setOpen(props.showme);
    })

    const [rate,setRate] = useState(1);

    return(
        <>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}
                className={styles.fullpopper}
            >
                
                <DatePicker/>
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
                    <MenuItem value={1}>Standard Rate</MenuItem>
                    <MenuItem value={2}>Medium Rate</MenuItem>
                    <MenuItem value={3}>Lux Rate</MenuItem>
                </Select>
                </FormControl>
                <br/>
                <TextField
                    fullwidth={false}
                    size="small"
                    id="outlined-number"
                    label="x 1"
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
                <TextField
                    fullwidth={false}
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
                <TextField
                    fullwidth={false}
                    size="small"
                    id="outlined-number"
                    label="x 3"
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