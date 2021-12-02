import {Champs, line} from './commonAssets.js';
import InputUtilisateur from './InputUtilisateur.js';
import Politiques from './Politiques.js';

function TarifReserves(props){
    let tarifs = [];
    console.log("indexItineraire = " + props.indexItineraire);
    for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves.length; i++){
        const u = i;
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
                    reservateur={props.reservateur} />
                <Politiques politiques={props.reservation.itineraires[props.indexItineraire].tarifReserves[i].infoTarif.infoPolitique} />
            </div>
            
        );
    }
    return tarifs;
}

export default TarifReserves;