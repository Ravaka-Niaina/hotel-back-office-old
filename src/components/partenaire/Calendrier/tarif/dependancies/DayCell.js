import React , { useState , useEffect} from 'react';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../CalendarComponent.module.css';

const DayCell = ({
  x,
  y,
  selectDay,
  deselectDay,
  highlight,
  data,
  selectOneDay,
  isprice,
}) => {
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
            selectDay(x, y);
        }else{
            deselectDay(x, y);
        }
    }
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
                bgcolor: highlight ? 'primary.selected' : 'primary.main',
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
                position: 'relative',
                }}
                onClick={() => {selectOneDay(x, y)}}
                onDragEnter={() => select(true)}
            >
                { data ? data + ((isprice) ? ' Є' : '') : '' }
            </Box>
        </ThemeProvider>
        </>
    );
}

export default DayCell;