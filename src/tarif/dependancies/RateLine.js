import React , { useState } from 'react';
import {Box} from '@mui/material';
import styles from '../CalendarComponent.module.css';
import DayLine from './DayLine.js';
import SideList from './SideList.js'

const RateLine = (props) => {
    return(
        <Box
            sx={{
                height: 'auto',
            }}
            className={styles.sideline}
        >
            <SideList typechambre={props.typechambre}/>
            <DayLine typechambre={props.typechambre} indice={props.indice} fromto={props.fromto} daterange={props.daterange}/>
        </Box>
    )
}

export default RateLine;