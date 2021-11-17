import { id } from 'date-fns/locale';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import callAPI from '../../utility';


function ListeTarifs(props){
    const tarifReserves = props.tarifReserves;
    let tarifs = [];
    for(let i = 0; i < tarifReserves.length; i++){
        tarifs.push(
            <tr>
                <td>{ tarifReserves[i].nomTarif }</td>
                <td>{ tarifReserves[i].dateSejour.debut } - { tarifReserves[i].dateSejour.fin }</td>
                <td>{ tarifReserves[i].datePaiement == null ? "Vide" : tarifReserves[i].datePaiement }</td>
            </tr>
        );
    }
    return tarifs;
}

function Reservation(){
    const [reservation, setReservation] = useState(null);
    const { _id } = useParams();
    const history = useHistory();

    function setDetailReservation(res){
        console.log(res);
        setReservation(res.reservation);
    }

    useEffect(() => {
        callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
    }, [_id]);

    return(
        <div>
            { reservation != null ? 
                <div>
                    <h2>Détails de réservation</h2>
                    <p>Réference: {reservation._id}</p>
                    <p>Date de validation: {reservation.dateValidation}</p>
                    <p>Etat: { reservation.etat == 2 ? "Validé" : "En cours" }</p>
                    <h3>Tarifs réservés:</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nom tarif</th>
                                <th>Date de séjour</th>
                                <th>Date de paiement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListeTarifs tarifReserves={ reservation.tarifReserves } />
                        </tbody>
                    </table>
                </div>
                : <p>Aucune réservation ne correspond à cette référence.</p>
            }
        </div>
        
    );

}
export default Reservation;