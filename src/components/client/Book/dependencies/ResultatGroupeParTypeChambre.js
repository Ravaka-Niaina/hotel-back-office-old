import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PersonOutline, LiveTv, Wifi, AcUnit, Iron, HotTub} from '@mui/icons-material';
import * as MuiIcons from "@mui/icons-material";
import {Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";


import ListTarif from './listTarif.js';
import DetailsTypeChambre from './detailsTypeChambre.js';
import PhotoTypeChambre from './photoTypeChambre.js';
import styles from './ResultatGroupeParTypeChambre.css';

const ResultatGroupeParTypeChambre = (props) => {
    const { t, i18n } = useTranslation();
    let tarifs = props.context.state.listTypeChambre;
    return(
        tarifs.map((tarif, i) => {
            return (
                <div className="tarif">
                    <div><span>tarif: {tarif.nom}</span></div>
                    {tarif.typeChambres.map((typeChambre, u) => {
                        return(
                            <div className="typeChambre">
                                <div className="photoChambre"><img src={process.env.REACT_APP_BACK_URL + "/" + typeChambre.photoCrop[0]} /></div>
                                <div>type chambre: {typeChambre.nom}</div>
                                <p>max: {typeChambre.nbAdulte} adultes + {typeChambre.nbEnfant} enfants</p>
                                <span>description type chambre: {typeChambre.desc}</span>
                                <div className="equipements">
                                    {typeChambre.equipements.map(equipement => {
                                        return(
                                            <div>
                                                {React.createElement(MuiIcons[equipement.tag])}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div>promotion: {typeChambre.listPromotion[0].nom}</div>
                                <div>politique d'annulation: {typeChambre.politiqueAnnulAtrb[0].nom}</div>
                                <div className="prix">
                                    {typeChambre.toPayStay.map((version, v) => {
                                        return(
                                            <div>
                                                <span>X {version.nbPers}</span>
                                                <span>{version.prixOriginal}EUR</span>
                                                <span>{version.prix} EUR</span>
                                                <Button variant="contained"
                                                onClick = {(e) => props.contextListChambre.addReservation(e,tarif._id, tarif.nom, typeChambre._id, version.nbPers , typeChambre.nom, tarif,version, () => {})}
                                                    endIcon={<AddIcon/>}
                                                    className="bookNow"
                                                >
                                                    {t('Book')}
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div> 
            )
        } )
    );
};

export default ResultatGroupeParTypeChambre;