import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './detailsTypeChambre.module.css';
import {Font} from '../../../partenaire/utilityTypeChambre.js';
import {PersonOutline} from '@mui/icons-material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

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
                                <h3>{props.typeChambre.nom}</h3>
                                <div>
                                    <span><PersonOutline/> max : 
                                        {props.typeChambre.nbAdulte} Adultes +
                                        {props.typeChambre.nbEnfant} enfants
                                    </span>
                                </div>
                                <div>
                                    <span>{props.typeChambre.chambreTotal} chambres | {props.typeChambre.etage}è étage | {props.typeChambre.superficie} m<sup>2</sup></span>
                                </div>
                                <p>{props.typeChambre.description}</p>
                            </div>
                            <div class="col">
                                <div>
                                    <h4>Equipements:</h4>
                                    <ul>
                                        {props.typeChambre.equipements.map(equipement => {
                                            return(
                                                <li><Font font={equipement.font} /> <span>{equipement.nom}</span></li>
                                            );
                                        })}
                                    </ul>
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