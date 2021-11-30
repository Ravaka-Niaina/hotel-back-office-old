import React , { useState } from 'react';
import {Button,Box} from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import FullPriceEditor from './FullPriceEditor.js';
import styles from '../CalendarComponent.module.css';

function ListTarifs(props){
    let list = [];
    for(let i = 0; i < props.planTarifaire.length; i++){
        list.push(
            <li>
                <span>{props.planTarifaire[i].nom}</span>
            </li>
        );
    }
    return list;
}

const SideList = (props) => {
    const [openModal,setOpenModal] = useState(false);
    return(
        <>
        <Box
            sx={{
                width: 'auto',
                height: 'auto',
                display: 'inline-block',
            }}
            className={styles.sidelist}>
            <span className={styles.sidetitle}>{props.typechambre.nom}</span>
            <ul>
                <li>
                    <Button size="small" variant="outlined" onClick={() => setOpenModal(true)} startIcon={<ModeEditOutlinedIcon />}>
                        Customize
                    </Button>
                </li>
                <li>
                    <span>Room status</span>
                </li>
                <li>
                    <span>Room to sell</span>
                </li>
                <li>
                    <span>Booked</span>
                </li>
                <ListTarifs planTarifaire={props.typechambre.planTarifaire} />
            </ul>
        </Box>
        <FullPriceEditor 
            typechambre={props.typechambre}  
            closeModal={() => setOpenModal(false)} 
            showme={openModal} 
            dateRange={props.dateRange} />
        </>
    )
}

export default SideList;