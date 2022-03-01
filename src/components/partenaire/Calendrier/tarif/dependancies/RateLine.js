
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
            <SideList 
                typechambre={props.typechambre} 
                dateRange={props.fromto} 
                getPrix={props.getPrix} 
                openLoad={props.openLoad}
                dateMin={props.dateMin}
                setOpenLoad={props.setOpenLoad}
                value={props.value}
                setValue={props.setValue} />
            <DayLine 
                typechambre={props.typechambre} 
                indice={props.indice} 
                fromto={props.fromto} 
                daterange={props.daterange}
                setOpenLoad={props.setOpenLoad}
                getPrix={props.getPrix} />
        </Box>
    )
}

export default RateLine;