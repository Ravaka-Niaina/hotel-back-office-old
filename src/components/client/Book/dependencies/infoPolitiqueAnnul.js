import {getDate} from '../../../../utility/utilityDate.js';
import {getDiffDays,addDays,dateToDDMMYYYY} from '../../../client/utility.js';

const getDateAnnulation = (checkIn, nbJour) => {
    let dateAnnul = new Date(checkIn);
    dateAnnul.setDate(dateAnnul.getDate() - Number.parseInt(nbJour));
    dateAnnul = getDate(dateAnnul);
    return dateAnnul;
};

const InfoPolitiqueAnnul = (props) => {
    let conditions = [];
    let totalPourcentage = 0;
    if(props.politique.datePrice){
        props.politique.datePrice.map(condition => {
            totalPourcentage += condition.pourcentage;
            conditions.push(<p>En cas d’annulation après le {getDateAnnulation(props.checkIn, condition.date)} à Midi, 
            les frais d’annulation s’élèveront à {totalPourcentage}%</p>);
        });
    }
    return(
    <>

        <h2 class="infos_heading"><span>Politique: {props.politique.nom} </span></h2> 
        <div class="details_politique">
            <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le {getDate(props.checkIn)}</p>
            {conditions}
        </div>
        <div class="prix_reservation">

        </div>
    </>);
    
};

export default InfoPolitiqueAnnul;