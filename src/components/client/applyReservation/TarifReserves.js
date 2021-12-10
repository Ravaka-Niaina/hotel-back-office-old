import { useState } from 'react';
import Button from '@mui/material/Button';

import {Champs, line} from './commonAssets.js';
import InputUtilisateur from './InputUtilisateur.js';
import Politiques from './Politiques.js';
import ConfirmAnnulChambre from './ConfirmAnnulChambre.js';
import {setValue} from '../../../../src/utility2.js';

function TarifReserves(props){
    const [annulChambre, setAnnulChambre] = useState(
        {
            open: false, 
            idReservation: props.reservation._id, 
            indexItineraire: props.indexItineraire,
            indexTarif: null
        });

    function showAnnulModal(indexTarif){
        console.log("Annulation en cours...");
        let temp = JSON.parse(JSON.stringify(annulChambre));
        temp.open = true;
        temp.indexTarif = indexTarif;
        console.log(temp);
        setAnnulChambre(temp);
    }
    
    let tarifs = [];
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[i].dateAnnulation === undefined){
            const u = i;
            console.log("u = " + u);
            tarifs.push(
                <div>
                    <h3>Informations Hôtel</h3>
                    <div style={line}>
                        <Champs label="Nom" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.nom} />
                        <Champs label="Adresse" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.adresse} />
                        <Champs label="Email" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.email} />
                        <Champs label="Téléphone" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTypeChambre.infoHotel.tel} />
                    </div>
                    <div style={line}>
                        <Champs label="Type chambre" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].nomTypeChambre} />
                        <Champs label="Plan tarifaire" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].nomTarif} />
                    </div>
                    <InputUtilisateur 
                        reservation={props.reservation}
                        setReservation={props.setReservation}
                        indexItineraire={props.indexItineraire}
                        indexTarif={u}
                        reservateur={props.reservateur}
                        affilie={props.affilie}
                        setAffilie={props.setAffilie} />
                    <Politiques politiques={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTarif.infoPolitique} />
                    <Button variant="contained" color="warning" onClick={(e) => showAnnulModal(u)}>Annuler</Button>
                </div>
            );
        }
    }
    tarifs.push(<ConfirmAnnulChambre annulChambre={annulChambre} setAnnulChambre={setAnnulChambre} key={annulChambre} openLoad={props.openLoad} setOpenLoad={props.setOpenLoad} />);
    return tarifs;
}

export default TarifReserves;