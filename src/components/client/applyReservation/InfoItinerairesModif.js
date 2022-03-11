import TarifReserves from './TarifReservesModif.js';
import './Itineraires.css';
function InfoItineraires(props){
    console.log(props.reservation);
    let itineraires = [];
    let number = 0;
    if(props.reservation != null){
        for(let i = 0; i < props.reservation.itineraires.length; i++){
            for(let j = 0 ; j < props.reservation.itineraires[i].tarifReserves.length ; j++){
                if(props.reservation.itineraires[i].tarifReserves[j].etat !== 0){
                    number = number + 1;
                    const u = i;
                    itineraires.push(
                        <div class ="box_itineraire">
                            <h2 class ="title_itineraire">Informations itinéraire {number}</h2>
                            
                            <TarifReserves  
                                indexItineraire={u}
                                reservation={props.reservation}
                                setReservation={props.setReservation}
                                reservateur={props.reservateur}
                                isEditEnabled={props.isEditEnabled}
                                affilie={props.affilie}
                                setAffilie={props.setAffilie}
                                openLoad={props.openLoad}
                                setOpenLoad={props.setOpenLoad}
                                ShowModalAnnulation={props.ShowModalAnnulation}
                                indiceI = {props.indiceI}/>
                        </div>
                    );
                }
            }   
        }
    }    
    return(
        <div>
            {itineraires}
        </div>
    );
}

export default InfoItineraires;