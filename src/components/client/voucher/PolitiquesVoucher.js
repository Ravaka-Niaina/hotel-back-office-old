
import {getDiffDays,addDays,dateToDDMMYYYY} from '../../client/utility.js';



function PolitiquesVoucher(props){
    let politiques = [];
    const tarif = props.tarif;
    const datedebut = new Date(tarif.dateSejour.debut);
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
            
            <div class="details_politique_voucher">
                <p>Votre carte sera débité du montant total de la réservation le jour de votre arrivée le {dateToDDMMYYYY(datedebut)}. </p>
                
                 {politiques} 
            </div>
            
        </div>
    );
}

export default PolitiquesVoucher;