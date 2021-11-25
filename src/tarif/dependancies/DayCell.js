import React , { useState , useEffect} from 'react';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../CalendarComponent.module.css';

const DayCell = (props) => {
    const [selected, setSelected] = useState(false);
    const theme = createTheme({
        palette: {
            primary: {
                main: '#f5f5f5',
                selected: '#8ac0f5a8'
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
                className={styles.daycell}
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
                {props.day != null ? props.day + ((props.isprice) ? ' Є' : '') : ''}
            </Box>
        </ThemeProvider>
        </>
    );
}

export default DayCell;