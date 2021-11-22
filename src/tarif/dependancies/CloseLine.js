import React , { useState , useEffect} from 'react';
import styles from '../CalendarComponent.module.css';
import {Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CloseLine = (props) => {
    const [opened, setOpened] = useState(false);
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
                onClick={() => setOpened(!opened)}
            >
                {props.day}
            </Box>
        </ThemeProvider>
        </>
    );
}

export default CloseLine;