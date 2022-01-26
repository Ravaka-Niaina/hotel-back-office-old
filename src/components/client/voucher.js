import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import callAPI from '../../utility';
function Voucher(props){
    const [reservation, setReservation] = useState(null);
    const { _id } = useParams();
    const [reservateur, setReservateur] = useState({prenom:"",nom: "", email: "", tel: "", messageParticulier: "",numeroCarte:"",expirationCarte:"",ccvCarte:"",nomCarte:""});
    const [openLoad, setOpenLoad] = useState(true);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [affilie, setAffilie] = useState([]);

    function setDetailReservation(res){
        setOpenLoad(false);
        console.log(res);
        if(res.status === 200){
            try{
                let current = JSON.parse(JSON.stringify(res.reservation));
                let tempAffilie = [];
                for(let i = 0; i < current.itineraires.length; i++){
                    tempAffilie.push(false);
                    const a = i;
                    for(let u = 0; u < current.itineraires[i].tarifReserves.length; u++){
                        const b = u;
                        if(current.itineraires[a].tarifReserves[b] != undefined){
    
                            let nbEnfant = current.itineraires[a].tarifReserves[b].guests.nbEnfant;
                            try{
                                nbEnfant = Number.parseInt(nbEnfant);
                            }catch(err){}
                            
                            let nbAdulte = current.itineraires[a].tarifReserves[b].guests.nbAdulte;
                            try{
                                nbAdulte = Number.parseInt(nbAdulte);
                            }catch(err){}
                            
                            const max = nbEnfant + nbAdulte;
                        }
                    }
                }
                setReservation(current);
                setAffilie(tempAffilie);
                if(res.reservation.reservateur != undefined){
                    setReservateur(res.reservation.reservateur);
                }
                console.log("reservation:");
                console.log(current);
            }catch(err){
                console.log(err);
            }
        }else{
            console.log(res.errors[0].message);
            setAlertError(res.errors[0].message);
        }
    }

    useEffect(() => {
        callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
    }, [_id]);


    return(
        <div>
            
            this is voucher
        </div>
    );
}

export default Voucher;