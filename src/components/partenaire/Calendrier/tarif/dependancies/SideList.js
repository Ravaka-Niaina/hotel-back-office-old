import React , { useState } from 'react';
import {Button,Box} from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import FullPriceEditor from './FullPriceEditor.js';
import styles from '../CalendarComponent.module.css';
import sideList_safari from './SideList_safari.module.css';
import sideList_chrome from './SideList_chrome.module.css';
import {PersonOutline} from '@mui/icons-material';

let sideList_css = {};
if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) { // browser safari
    sideList_css = sideList_safari;
}else{
    sideList_css = sideList_chrome;
}

function ListTarifs(props){
    let list = [];
    for(let i = 0; i < props.planTarifaire.length; i++){
        list.push(
            <li className={sideList_css.sideElt}>
                <span>{props.planTarifaire[i].nom} x2 <PersonOutline size={12} /></span>
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
                display: 'inline-block'
            }}
            className={sideList_css.sidelist}>
            <span className={styles.sidetitle}>{props.typechambre.nom}</span>
            <ul>
                { props.customize ?
                <li>
                    
                    <Button size="small" variant="outlined" onClick={() => setOpenModal(true)} startIcon={<ModeEditOutlinedIcon />}>
                        Customize
                    </Button>
                </li>
                : null}
                <li>
                    <span>Room status</span>
                </li>
                <li className={sideList_css.sideElt}>
                    <span>Room to sell</span>
                </li>
                <li className={sideList_css.sideElt}>
                    <span>Booked</span>
                </li>
                <ListTarifs planTarifaire={props.typechambre.planTarifaire} />
            </ul>
        </Box>
        <FullPriceEditor
            typechambre={props.typechambre}  
            closeModal={() => setOpenModal(false)} 
            showme={openModal} 
            dateRange={props.dateRange}
            getPrix={props.getPrix}
            openLoad={props.openLoad}
            dateMin={props.dateMin}
            setOpenLoad={props.setOpenLoad}
            value={props.value}
            setValue={props.setValue} />
        </>
    )
}

export default SideList;