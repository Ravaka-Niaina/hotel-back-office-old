import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './detailsTypeChambre.module.css';
import {Font} from '../../../partenaire/chambre/utilityTypeChambre.js';
import {PersonOutline} from '@mui/icons-material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import * as MuiIcons from "@mui/icons-material"

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 850,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

const DetailsTypeChambre = (props) => {
    return(
        <>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <div className="row">
                            <div class="col">

                                {props.context.state.traduction ?
                                    <div className="">
                                        <span>{props.typeChambre.name}</span>
                                    </div>
                                    :
                                    <div className="">
                                        <span>{props.typeChambre.nom}</span>
                                    </div>
                                }

                                <div>

                                    {props.context.state.traduction ?
                                            <span><PersonOutline/> max : 
                                            {props.typeChambre.nbAdulte} Adult +
                                            {props.typeChambre.nbEnfant} Children
                                            </span>
                                            :
                                            <span><PersonOutline/> max : 
                                            {props.typeChambre.nbAdulte} Adultes +
                                            {props.typeChambre.nbEnfant} enfants
                                            </span>
                                    }
                                </div>
                                <div>
<span>{props.typeChambre.chambreTotal} {props.context.state.traduction ? "rooms" : "chambres" } | {props.typeChambre.etage} {props.context.state.traduction ? "è task"  : "è étage"} | {props.typeChambre.superficie} m<sup>2</sup></span>
                                </div>

                                {props.context.state.traduction ?
                                    <div className="">
                                        <span>{props.typeChambre.desc}</span>
                                    </div>
                                    :
                                    <div className="">
                                        <span>{props.typeChambre.description}</span>
                                    </div>
                                }

                            </div>
                            <div class="col">
                                <h4>Equipements:</h4>
                                <div className={styles.equipements}>
                                    {props.typeChambre.equipements.map(equipement => {
                                        return(
                                            <div>
                                                {React.createElement(MuiIcons[equipement.tag])}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
                placement="bottom-start"
            >
                <Button className={styles.btnVoirDetails} onClick={(e) => props.context.switchShowDetailsTC(props.indexTypeChambre)}>Voir détails</Button>
            </HtmlTooltip>
        </>
    );
};

export default DetailsTypeChambre;