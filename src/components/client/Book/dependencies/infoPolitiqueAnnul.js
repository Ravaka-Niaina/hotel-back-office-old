import {getDate} from '../../../../utility/utilityDate.js';
import {getDiffDays,addDays,dateToDDMMYYYY} from '../../../client/utility.js';

const getDateAnnulation = (checkIn, nbJour) => {
    let dateAnnul = new Date(checkIn);
    dateAnnul.setDate(dateAnnul.getDate() - Number.parseInt(nbJour));
    dateAnnul = getDate(dateAnnul);
    return dateAnnul;
};

const InfoPolitiqueAnnul = (props) => {
    console.log(props.politique);
    let politiques = [];
    const tarif = props.tarif;
    const datedebut = new Date(props.checkIn);
    const datenow = new Date();
    const diff = getDiffDays(datenow,datedebut);
    console.log(datedebut);
    console.log("diff day:"+diff);

    
    

    // Non entame
    if(diff>=15){
        let d = addDays(datedebut,-15);
        politiques.push(<p>Vous pouvez annuler votre réservation gratuitement avant le {dateToDDMMYYYY(d)} à Midi. </p>);
    }if(diff >15){
        let d = addDays(datedebut,-15);
        politiques.push(<p> En cas d’annulation après le {dateToDDMMYYYY(d)} à Midi, votre carte sera débité de 20%.</p>);
    } if(diff>5){
        let d = addDays(datedebut,-5);
        politiques.push(<p> En cas d’annulation après le {dateToDDMMYYYY(d)} à Midi, votre carte sera débité de 50%.</p>);
    }
    // entame
    if(diff>=15){
        let d = addDays(datedebut,-15);
        // politiques.push(<p>Vous pouvez annuler votre réservation gratuitement avant le {dateToDDMMYYYY(d)} à Midi. </p>);
    }else if(diff <15 && diff >=5){
        let d = addDays(datedebut,-15);
        politiques.push(<p> En cas d’annulation , votre carte sera débité de 20%.</p>);
    }else if(diff<5 && diff>0){
         let d = addDays(datedebut,-5);
         politiques.push(<p> En cas d’annulation , votre carte sera débité de 50%.</p>);
     }
    return(
        <div>
            <h3>{props.politique.nom}</h3>
            <div >
                <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le {dateToDDMMYYYY(datedebut)}. </p>
                
                 {politiques} 
            </div>
            
        </div>
    );
    // let conditions = [];
    // let totalPourcentage = 0;
    // props.politique.datePrice.map(condition => {
    //     totalPourcentage += condition.pourcentage;
    //     conditions.push(<p>En cas d’annulation après le {getDateAnnulation(props.checkIn, condition.date)} à Midi, 
    //     les frais d’annulation s’élèveront à {totalPourcentage}%</p>);
    // });
    // return(
    // <>
    //     <h3>{props.politique.nom}</h3>
    //     <div>
    //         <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le {getDate(props.checkIn)}</p>
    //         {conditions}
    //     </div>
    // </>);
    
};

export default InfoPolitiqueAnnul;