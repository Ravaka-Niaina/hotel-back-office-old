import React , { useState} from 'react';
import styles from '../CalendarComponent.module.css';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import callAPI from '../../utility';
const utility = require('../utility.js');

const CloseLine = (props) => {
    const [opened, setOpened] = useState(!props.closed);
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF0000',
                opened: '#64E986'
            },
        },
    })
    // useEffect( () => {
    //     setopened(props.close);
    // })
    function closeTypeChambre(){
        const data = {
            _id: props.idTypeChambre, 
            dateDebut: utility.getDate(props.statusDay.date),
            dateFin: utility.getDate(props.statusDay.date)
        };
        console.log(data);
        callAPI('post', '/typeChambre/close', data, function(res){console.log(res); window.location.reload()} );
    }
    return (
        <>
        <ThemeProvider
            theme={theme}
            >
            <Box
                className={styles.closedline}
                sx={{
                width: 59,
                bgcolor: opened ? 'primary.opened' : 'primary.main',
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
                position: 'relative',
                }}
                onClick={() => {setOpened(!opened); closeTypeChambre()}}
            >
                {props.day}
            </Box>
        </ThemeProvider>
        </>
    );
}

export default CloseLine;