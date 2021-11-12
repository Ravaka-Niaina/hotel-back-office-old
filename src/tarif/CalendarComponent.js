import React , { useState , useEffect} from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import styles from './CalendarComponent.module.css';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';

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
                width: 50,
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

const DayLine = (props) => {
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
        return min;
    }
    const getMax = (arr) => {
        var max = arr[0];
        for(var i = 1; i < arr.length; i++) {
            if(max < arr[i]){
                max = arr[i];
            }
        }
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
    }
    const leftSelected = () => {
        if(selecteds.length > 0){
            var min = getMin(selecteds);
            return (min * 56) - 8;
        }
        return false;
    }

    const rightSelected = () => {
        if(selecteds.length > 0){
            var max = getMax(selecteds);
            max++;
            return (max * 56) - 8;
        }
        return false;
    }
    const dragStart = (ev) => {
        setFrom(ev.target.dataset.pos);
        var img = document.getElementsByTagName('canvas')[0];
        document.body.appendChild(img);
        ev.dataTransfer.setDragImage(img, -50, -50);
    }
    for(var i = 0; i < 20 ; i++){
        daycells.push(
        <td>
            <DayCell highlight={selecteds.indexOf(i) >= 0} key={i.toString()} deselectDay={rmSelection.bind(this)} selectDay={addSelection.bind(this)} selectOneDay={oneSelection.bind(this)} day={i} />
        </td>);
    }
    return(
        <div className={styles.dayline}>
        { (selecteds.length > 0) ? <Draggable pos={'left'} dragStart={dragStart.bind(this)} rightSelected={rightSelected.bind(this)} leftSelected={leftSelected.bind(this)} /> : null }
        <table border="1" className={styles.table}>
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
    );
}


const CalendarComponent = () => {
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState([null, null]);
  
    return(
        <Container className={styles.container}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
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
            <DayLine/>
        </Container>
    );
}

export default CalendarComponent;
