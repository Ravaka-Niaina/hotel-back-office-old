import React , { useState, useEffect } from 'react';
import styles from '../CalendarComponent.module.css';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import callAPI from '../../../../../utility';
const utility = require('../utility.js');

const CloseLine = (props) => {
    const [opened, setOpened] = useState(props.closed ? false : true);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF0000',
                opened: '#64E986'
            },
        },
    })

    useEffect(() => {
        let tmpOpened = props.closed ? false : true;
        if (opened !== tmpOpened) {
            setOpened(!opened);
        }
    });


    function callbackCloseTypeChambre(res){
        if(res.status === 200){
            props.setOpenLoad(false);
        }
    }

    function closeTypeChambre(){
        setOpened(!opened);
        props.setOpenLoad(true);
        const data = {
            _id: props.idTypeChambre, 
            dateDebut: utility.getDate(props.statusDay.date),
            dateFin: utility.getDate(props.statusDay.date)
        };
        callAPI('post', '/typeChambre/close', data, callbackCloseTypeChambre );
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
                onClick={closeTypeChambre}
            >
            </Box>
        </ThemeProvider>
        </>
    );
}

export default CloseLine;