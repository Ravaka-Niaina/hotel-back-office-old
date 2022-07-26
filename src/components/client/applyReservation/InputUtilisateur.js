import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {Champs} from '../../common/commonAssets.js';

function handleClientInfo(reservation, indexItineraire, indexTarif, i, categPers, field, value, setReservation){
    let current = JSON.parse(JSON.stringify(reservation));
    current.itineraires[indexItineraire].tarifReserves[indexTarif].infoGuests[categPers][i][field] = value;
    setReservation(current);
}

function InputUtilisateur(props){
    function fillInfoOccupant(reservation, setReservation, reservateur, indexItineraire, indexTarif, categPers, i){
        let current = JSON.parse(JSON.stringify(reservation));
        current.itineraires[indexItineraire].tarifReserves[indexTarif].infoGuests[categPers][i].nom = reservateur.nom;
        current.itineraires[indexItineraire].tarifReserves[indexTarif].infoGuests[categPers][i].email = reservateur.email;
        current.itineraires[indexItineraire].tarifReserves[indexTarif].infoGuests[categPers][i].tel = reservateur.tel;
        setReservation(current);
        
        let temp = JSON.parse(JSON.stringify(props.affilie));
        temp[indexItineraire] = true;
        props.setAffilie(temp);
    }

    let inputs = [];

    if(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests == undefined
        || props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes == undefined){
            console.log("Namboarina");
        let infoGuests = {adultes: [], enfants: []};
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbAdulte; i++){
            infoGuests.adultes.push({nom: "", email: "", tel: ""});
        }
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbEnfant; i++){
            infoGuests.enfants.push({nom: "", email: "", tel: ""});
        }
        let temp = JSON.parse(JSON.stringify(props.reservation));
        temp.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests = infoGuests;
        props.setReservation(temp);
        console.log(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests);
    }

    try{
        console.log(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests);
        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbAdulte > 0){
            inputs.push(<h5>Adultes</h5>);
        }
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbAdulte; i++){
            inputs.push(
                <div>
                {props.isEditEnabled ? 
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-required"
                                label={"Nom"}
                                placeholder="Dupond"
                                value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].nom}
                                onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "adultes", "nom", e.target.value, props.setReservation)}
                            />
                            <TextField
                                id="outlined-required"
                                label={"Email"}
                                placeholder="dupond@gmail.com"
                                value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].email}
                                onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "adultes", "email", e.target.value, props.setReservation)}
                            />
                            <TextField
                                id="outlined-required"
                                label={"Tel"}
                                placeholder="034 00 000 00"
                                value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].tel}
                                onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "adultes", "tel", e.target.value, props.setReservation)}
                            />
                        </Box>
                    </div> : 
                    <div>
                        <Champs label="Nom" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].nom.trim() != "" ?
                            props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].nom : "vide"} />
                        <Champs label="Email" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].email.trim() != "" ?
                            props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].email : "vide"} />
                        <Champs label="Tel" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].tel.trim() != "" ? 
                            props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.adultes[i].tel : "vide"} />
                    </div>
                }
                
                    {(props.affilie.length > 0 && !props.affilie[props.indexItineraire]) ? <Button variant="contained" onClick={(e) => fillInfoOccupant(props.reservation, props.setReservation, props.reservateur, props.indexItineraire, props.indexTarif, "adultes", i)}>Celui qui a fait la réservation</Button> : null}
                </div>
            );
        }

        if(props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbEnfant > 0){
            inputs.push(<h5>Enfant</h5>);
        }
        for(let i = 0; i < props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].guests.nbEnfant; i++){
            inputs.push(
                <div>
                    {props.isEditEnabled ? 
                    <div>
                        <TextField
                            id="outlined-required"
                            label={"Nom"}
                            placeholder="Dupond"
                            value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].nom}
                            onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "enfants", "nom", e.target.value, props.setReservation)}
                        />
                        <TextField
                            id="outlined-required"
                            label={"Email"}
                            placeholder="dupond@gmail.com"
                            type="email"
                            value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].email}
                            onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "enfants", "email", e.target.value, props.setReservation)}
                        />
                        <TextField
                            id="outlined-required"
                            label={"Tel"}
                            placeholder="034 00 000 00"
                            value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].tel}
                            onChange={(e) => handleClientInfo(props.reservation, props.indexItineraire, props.indexTarif, i, "enfants", "tel", e.target.value, props.setReservation)}
                        />
                    </div> :
                    <div>
                        <Champs label="Nom" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].nom} />
                        <Champs label="Email" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].email} />
                        <Champs label="Tel" value={props.reservation.itineraires[props.indexItineraire].tarifReserves[props.indexTarif].infoGuests.enfants[i].tel} />
                    </div> }
                    {(props.affilie.length > 0 && !props.affilie[props.indexItineraire]) ? <Button variant="contained" onClick={(e) => fillInfoOccupant(props.reservation, props.setReservation, props.reservateur, props.indexItineraire, props.indexTarif, "enfants", i)}>Celui qui a fait la réservation</Button> : null}
                </div>
            );
        }
    }catch(err){

    }
    return inputs
}

export default InputUtilisateur;