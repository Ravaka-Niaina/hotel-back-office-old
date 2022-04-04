import React from 'react';
import {IconButton} from '@mui/material';
import styles from '../CalendarComponent.module.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Draggable = (props) =>{
    const icon = (props.pos === 'right') ? <ChevronRightIcon /> : <ChevronLeftIcon />;
    return(
        <IconButton data-pos={props.pos} sx={{ 
            left: ((props.pos === 'right') ? props.rightSelected() : props.leftSelected()) + 'px',
            top: props.top
        }} 
        fontSize="small"
        onDragStart={props.dragStart} 
        draggable={true}  
        className={styles.pin} 
        aria-label="fingerprint" 
        color="success">
            {icon}
        </IconButton>
    )
}

export default Draggable;