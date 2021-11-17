import React , { useState , useEffect} from 'react';
import {Container,Button,Stack,TextField,Box,IconButton,Popper,Radio,RadioGroup,FormControl,FormControlLabel,InputAdornment,Modal,Checkbox} from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from './CalendarComponent.module.css';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import moment from 'moment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const DayCell = (props) => {
    const [selected, setSelected] = useState(false);
    const theme = createTheme({
        palette: {
            primary: {
                main: '#f57575',
                selected: 'lightblue'
            },
        },
    })
    const select = (next) => {
        if(next){
            props.selectDay(props.day);
        }else{
            props.deselectDay(props.day);
        }
    }
    useEffect( () => {
        setSelected(props.highlight);
    })
    return (
        <>
        <ThemeProvider
            theme={theme}
            >
            <Box
                className="dayCell"
                sx={{
                width: 59,
                height: 50,
                bgcolor: selected ? 'primary.selected' : 'primary.main',
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
                position: 'relative',
                }}
                onClick={() => {props.selectOneDay(props.day)}}
                onDragEnter={() => select(true)}
            >
                {props.day}
            </Box>
        </ThemeProvider>
        </>
    );
}

const Draggable = (props) =>{
    return(
        <IconButton data-pos={props.pos} sx={{ 
            left: ((props.pos == 'right') ? props.rightSelected() : props.leftSelected()) + 'px'
        }} 
        fontSize="small"
        onDragStart={props.dragStart} 
        draggable={true}  
        className={styles.pin} 
        aria-label="fingerprint" 
        color="success">
            <DragIndicatorIcon />
        </IconButton>
    )
}

 const getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

const FullPriceEditor = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        minHeight: '80%',
        bgcolor: 'background.paper',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px',
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.closeModal(false);
    };
    const [value, setValue] = React.useState('open');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect( () => {
        setOpen(props.showme);
    })
    return(
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
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
                <span>Maisonnette</span>
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
                        <Button onClick={() => setOpen(false)} variant="contained">
                            Close
                        </Button>
                    </Stack>
                </FormControl>
            </Box>
      </Modal>
        </>
    );
}

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
            <span>Maisonnette</span>
            <br/>
            <span>15 nov 2021 - 18 nov 2021</span>
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

const DayLine = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);
    const openPopper = (target) => {
        setAnchorEl(target);
    };
    const open = Boolean(anchorEl);
    const daycells = [];
    const [selecteds, setSelecteds] = useState([]);
    const [from, setFrom] = useState('none');
    const getMin = (arr) => {
        var min = arr[0];
        for(var i = 1; i < arr.length; i++) {
            if(min > arr[i]){
                min = arr[i];
            }
        }
        setMin(min);
        return min;
    }
    const getMax = (arr) => {
        var max = arr[0];
        for(var i = 1; i < arr.length; i++) {
            if(max < arr[i]){
                max = arr[i];
            }
        }
        setMax(max);
        return max;
    }
    const addSelection = (i) => {
        var min = getMin(selecteds);
        var max = getMax(selecteds);
       // console.log('from : ' + min + ' => ' + max);
        if((i <= min || (i > min && i <= max)) && from == 'left'){
            min = i;
        }
        if((i >= max || (i >= min && i < max)) && from == 'right'){
            max = i;
        }
        var tmp = [];
        //console.log('to : ' + min + ' => ' + max);
        for(var j = min; j <= max; j++) {
            tmp.push(j);
        }
        setSelecteds(tmp);
    }
    const rmSelection = (i) => {
        // const tmp = [...selecteds];
        // const r = selecteds.indexOf(i);
        // tmp.splice(r, 1);
        // if(tmp.length > 0){
        //     var min = tmp[0];
        //     var max = tmp[0];
        //     for(var j = 1; j < tmp.length; j++){
        //         if(tmp[j] < min){
        //             min = tmp[j];
        //         }
        //         if(tmp[j] > max){
        //             max = tmp[j];
        //         }
        //     }
            
        // }else{
        //     setSelecteds(tmp);
        // }
    }
    const oneSelection = (i) => {
        setSelecteds([i]);
        let anchorEl = document.getElementById('anchorEl');
        openPopper(anchorEl);
    }
    const leftSelected = () => {
        if(selecteds.length > 0){
            var min = getMin(selecteds);
            return (min * 60) - 10;
        }
        return false;
    }

    const rightSelected = () => {
        if(selecteds.length > 0){
            var max = getMax(selecteds);
            max++;
            return (max * 60) - 10;
        }
        return false;
    }
    const dragStart = (ev) => {
        setFrom(ev.target.dataset.pos);
        var img = document.getElementsByTagName('canvas')[0];
        document.body.appendChild(img);
        ev.dataTransfer.setDragImage(img, -50, -50);
    }
    const closePopper = () => {
        setAnchorEl(null);
        setSelecteds([]);
    }
    for(var i = 0; i < props.daterange.length ; i++){
        daycells.push(
        <td>
            <DayCell highlight={selecteds.indexOf(i) >= 0} key={i.toString()} deselectDay={rmSelection.bind(this)} selectDay={addSelection.bind(this)} selectOneDay={oneSelection.bind(this)} day={i} />
        </td>);
    }
    return(
        <>
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement='top'
            disableRestoreFocus
            className={styles.popper}
        >
        <PriceEditor closePopper={closePopper.bind(this)} />
        </Popper>
        <div className={styles.dayline}>
        <div id="anchorEl" style={{ height: '10px', backgroundColor: 'transparent', position: 'absolute', top: '-10px', left: (min * 60) + 'px' ,width: ((max - min + 1) * 60) + 'px' }}></div>
        { (selecteds.length > 0) ? <Draggable pos={'left'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
        <table className={styles.table}>
            <thead>

            </thead>
            <tbody>
                <tr>
                {daycells}
                </tr>
            </tbody>
        </table>
        { (selecteds.length > 0) ? <Draggable pos={'right'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
        </div>
        </>
    );
}

const DateRangeLine = (props) => {
    var days = [];
    for(var i = 0; i < props.daterange.length ; i++){
        days.push(
        <td className={ moment(props.daterange[i]).format('ddd').toLowerCase().indexOf('mon') >= 0 ? styles.limit : null}>
            <span>{ moment(props.daterange[i]).format('ddd') }</span>
            <br/>
            <span>{ moment(props.daterange[i]).format('D') }</span>
        </td>);
    }
    return(
        <div>
        <table className={styles.rangeLine}>
            <tbody>
                <tr>
                {days}
                </tr>
            </tbody>
        </table>
        </div>
    );
}
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
const CalendarComponent = () => {
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState([moment('2021-11-11'), moment('2021-12-11')]);
    const alldays = getDaysBetweenDates(value[0],value[1]);
    const [openModal,setOpenModal] = useState(false);
    return(
        <Container className={styles.container}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                startText="Check-in"
                endText="Check-out"
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
            <FullPriceEditor closeModal={setOpenModal.bind(this)} showme={openModal} />
            <Box
                sx={{
                    marginTop: '30px',
                    width: 'auto',
                    height: 'auto',
                    display: 'inline-block',
                }}>
                <Button variant="outlined" onClick={() => setOpenModal(true)} startIcon={<ModeEditOutlinedIcon />}>
                    Customize
                </Button>
                <br/>
                <span>Standard Rate x 2</span>
            </Box>
            <Box
                sx={{
                    width: '80%',
                    height: 'auto',
                    overflowX: 'scroll',
                    float: 'right'
                }}
            >
                <DateRangeLine daterange={alldays} />
                <DayLine daterange={alldays}/>
            </Box>
        </Container>
    );
}

export default CalendarComponent;
