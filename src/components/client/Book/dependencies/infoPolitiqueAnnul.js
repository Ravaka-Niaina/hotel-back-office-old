import {getDate} from '../../../../utility/utilityDate.js';

const getDateAnnulation = (checkIn, nbJour) => {
    let dateAnnul = new Date(checkIn);
    dateAnnul.setDate(dateAnnul.getDate() - Number.parseInt(nbJour));
    dateAnnul = getDate(dateAnnul);
    return dateAnnul;
};

const InfoPolitiqueAnnul = (props) => {
    let conditions = [];
    let totalPourcentage = 0;
    props.politique.datePrice.map(condition => {
        totalPourcentage += condition.pourcentage;
        conditions.push(<p>En cas d’annulation après le {getDateAnnulation(props.checkIn, condition.date)} à Midi, 
        les frais d’annulation s’élèveront à {totalPourcentage}%</p>);
    });
    return(
    <>
        <h3>{props.politique.nom}</h3>
        <div>
            <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le {getDate(props.checkIn)}</p>
            {conditions}
        </div>
    </>);
};

export default InfoPolitiqueAnnul;