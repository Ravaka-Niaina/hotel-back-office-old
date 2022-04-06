import TarifReserves from './TarifReservesModif.js';
import './Itineraires.css';
function InfoItineraires(props){
    console.log(props.reservation);
    let itineraires = [];
    let number = 0;
    if(props.reservation != null){
        for(let i = 0; i < props.reservation.itineraires.length; i++){
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
                            indiceI = {props.indiceI} setisVariableUpdate={props.setisVariableUpdate}/>
                    </div>
                );  
        }
    }    
    return(
        <div>
            {itineraires}
        </div>
    );
}

export default InfoItineraires;