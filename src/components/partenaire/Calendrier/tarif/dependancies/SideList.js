import React , { useEffect, useState } from 'react';
import {Button,Box} from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import FullPriceEditor from './FullPriceEditor.js';
import styles from '../CalendarComponent.module.css';
import sideList_safari from './SideList_safari.module.css';
import sideList_chrome from './SideList_chrome.module.css';
import {PersonOutline} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import callAPI from '../../../../../utility.js';

let sideList_css = {};
if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) { // browser safari
    sideList_css = sideList_safari;
}else{
    sideList_css = sideList_chrome;
}

function ListTarifs(props){
    const [isActif, setIsActif] = useState(new Array(props.planTarifaire.length).fill(true));
    const [isLoading, setIsLoading] = useState(new Array(props.planTarifaire.length).fill(false));
    let list = [];

    useEffect(() => {
        let tmp = [];
        for(let i = 0; i < props.planTarifaire.length; i++){
            if(props.planTarifaire[i].activationTCTarif.length === 0){
                tmp.push(false);
            }else{
                tmp.push(props.planTarifaire[i].activationTCTarif[0].isActif);
            }
        }
        setIsActif(tmp);
    }, []);

    const switchIsLoading = (i, bool) => {
        let tmpIsLoading = JSON.parse(JSON.stringify(isLoading));
        tmpIsLoading[i] = bool;
        setIsLoading(tmpIsLoading);
    }

    const switchIsActif = (i, idTypeChambre, idPlanTarifaire) => {
        switchIsLoading(i, true);
        const data = {
            idTypeChambre: idTypeChambre,
            idPlanTarifaire: idPlanTarifaire,
            isActif: !isActif[i]
        };
        callAPI('post', '/TCTarif/switchIsTarifActif', data, (data) => {
            console.log(data);
            if(data.status === 200){
                const tmp = JSON.parse(JSON.stringify(isActif));
                tmp[i] = !tmp[i];
                setIsActif(tmp);
            }
            switchIsLoading(i, false);
            console.log("erreur connection");
        });
    };

    for(let i = 0; i < props.planTarifaire.length; i++){
        let nbOccupants = props.typechambre.nbAdulte + props.typechambre.nbEnfant;
        list.push(
            <li className={sideList_css.ratePlanName}>
                <span>{ props.planTarifaire[i].nom }</span>
            </li>
        );
        for(let u  = 0; u < nbOccupants; u++){
            list.push(
                <li className={sideList_css.sideElt}>
                    <span> x{u + 1} <PersonOutline size={12} /> </span>
                    {/* <LoadingButton
                        onClick={(e) => switchIsActif(i, props.typechambre._id, props.planTarifaire[i]._id)}
                        loading={isLoading[i]}
                        color={isActif[i] ? "success" : "error"}
                    >
                        <PowerSettingsNewIcon />
                    </LoadingButton> */}
                </li>
            );
        }
    }
    return list;
}

const SideList = (props) => {
    const [openModal,setOpenModal] = useState(false);
    console.log(props.typeChambre);
    return(
        <>
        <Box
            sx={{
                width: '287px',
                height: 'auto',
                display: 'inline-block'
            }}
            className={sideList_css.sidelist}>
            <span className={styles.sidetitle}>{props.typechambre.nom}</span>
            <ul>
                { 
                    props.customize 
                    ? <li>
                        <Button size="small" variant="outlined" onClick={() => setOpenModal(true)} startIcon={<ModeEditOutlinedIcon />}>
                            Customize
                        </Button>
                    </li>
                    : <Button size="small" variant="outlined" disabled startIcon={<ModeEditOutlinedIcon />}>
                        Customize
                    </Button>
                }
                <li>
                    <span>Room status</span>
                </li>
                <li className={sideList_css.sideElt}>
                    <span>Room to sell</span>
                </li>
                <li className={sideList_css.sideElt}>
                    <span>Booked</span>
                </li>
                <ListTarifs planTarifaire={props.typechambre.planTarifaire} typechambre={props.typechambre} />
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