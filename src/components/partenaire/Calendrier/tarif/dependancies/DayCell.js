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
            props.selectDay(props.index);
        }else{
            props.deselectDay(props.index);
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
                onClick={() => {props.selectOneDay(props.index)}}
                onDragEnter={() => select(true)}
            >
                {props.data != null && props.isprice ? 
                <div>
                    <div style={{height: "10px", backgroundColor: (props.closed ? "#FF0000" : "#64E986"), marginTop: "-12px"}}></div>
                    <span>{props.data} €</span>
                </div>
                : (props.data != null ? props.data + ((props.isprice) ? ' Є' : '') : '')}
            </Box>
        </ThemeProvider>
        </>
    );
}

export default DayCell;