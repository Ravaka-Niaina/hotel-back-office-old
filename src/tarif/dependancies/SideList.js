import React , { useState } from 'react';
import {Button,Box} from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import FullPriceEditor from './FullPriceEditor.js';
import styles from '../CalendarComponent.module.css';

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
            <span className={styles.sidetitle}>Maisonnette</span>
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
                <li>
                    <span>Standard Rate x 2</span>
                </li>
            </ul>
        </Box>
        <FullPriceEditor closeModal={() => setOpenModal(false)} showme={openModal} />
        </>
    )
}

export default SideList;