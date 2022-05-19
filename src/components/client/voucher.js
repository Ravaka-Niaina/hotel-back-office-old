import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import callAPI from '../../utility';
import './voucher/voucher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCalendar, faCheckCircle ,faPrint, faShare, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import ItinerairesVoucher from './voucher/ItineraireVoucher';
import ModalAnnulation from '../common/ModalAnnulation.js';
import ModalAnnulationChambre from '../common/ModalAnnulationChambre.js';
import { useHistory } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import NavBarStepper from "./NavbarClient/NavBar&Stepper.js"; 

function Voucher(props){
    const [reservation, setReservation] = useState(null);
    const { _id } = useParams();
    const [reservateur, setReservateur] = useState({prenom:"",nom: "", email: "", tel: "", messageParticulier: "",numeroCarte:"",expirationCarte:"",ccvCarte:"",nomCarte:""});
    const [openLoad, setOpenLoad] = useState(true);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [affilie, setAffilie] = useState([]);
    const [load, setLoad] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalChambre, setShowModalChambre] = useState(false);
    const history = useHistory();
    const[ variableAnnuler , setVariableAnnuler] = useState({idReservation:'', indexItineraire :'',indexTarifsReserve : ''});
    const [message , setMessage] = useState("");
    const [isReservation , setIsReservation] = useState(true);
    const [isConnected , setIsConnected] = useState(null);
    const [run , setRun] = useState(true);

    const [devise , setDevise] = useState("eur");

    function ShowModalAnnulation(isTrue,ObjectChambreAnnuler){
        if(isTrue){
            setShowModal(!showModal);
            setLoad(false);
        }else{
            setShowModalChambre(!showModalChambre)
            let keys = Object.keys(ObjectChambreAnnuler);
            let current = {...variableAnnuler};
            keys.map(field => {
                current[field] = ObjectChambreAnnuler[field];
            })
            setVariableAnnuler(current);
        }

    }
    function handleResponse1(res){
        if(res.status == 200){
            history.push('/');
        }else{
            setAlertError(res.errors[0].message);
            window.location.href = '#error';
        }
    }

    function annulerReservation(){
        setLoad(true);
        if(isReservation){
            setLoad(true);
            callAPI('post', '/reservation/annulerReservationWithEmail', {_id: reservation._id, reservateur: reservateur, reservation: reservation , email : reservateur.email}, handleResponse1 );
        }else{
            ShowModalAnnulation(true);
            history.push('#redirect');
        }
    }

    function AnnulationReservationChambre(){
        setLoad(true);
        const data = { _id: variableAnnuler.idReservation, indexItineraire: variableAnnuler.indexItineraire, indexTarifReserve: variableAnnuler.indexTarifsReserve };
        callAPI('post', '/reservation/delete', data, setDetailReservation );
    }


    function setDetailReservation(res){
        setDevise(localStorage.getItem("devise"));

        if(res.reservation == null){
            setIsReservation(false);
        }

        setMessage(res.message);
        setOpenLoad(false);
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
            }catch(err){
                console.log(err);
            }
        }else{
            setAlertError(res.errors[0].message);
            setMessage(res.errors[0].message);
        }
        setLoad(false);
        setShowModalChambre(false);
        if(res.message !== null){
            history.push('#redirect')
        }
        setRun(false);
    }

    function redirect(){
        localStorage.setItem('access', 0);
        return history.push('/')
    }

    function precedent(){
        localStorage.setItem('access',0);
        return history.push('/front/researchReservation');
    }
    
    function ControllerAcces(){
        if(localStorage.access == "1"){
            setIsConnected(true);
            return true;
        }else{
            setIsConnected(false);
            return false;
        }
    }
    function ModificationReservation(id){
        localStorage.setItem('access',2);
        // return history.push('/reservation/'+id+'/apply');
        return history.push("/reservation/"+id+"/apply/"+1);
    }
    
    useEffect(() => {
        let access = ControllerAcces();
        if(access){
            callAPI('get', '/reservation/details/' + _id, {}, setDetailReservation);
        }
        
    }, [_id]);

    function changeDeviseRate(value ,info){
        setDevise(value);
        let current = {...reservation};
        let rate = info[value];
        current = changeToPay(current,rate,value);
        localStorage.setItem("devise" , value);
        setReservation(current);
    }

    function changeToPay(current,rate,value){
        if(value == "eur"){
            current.toPayDevise = current.toPay;
        }else{
            current.toPayDevise = current.toPay*rate;
        }
        for(let i = 0; i <  current.itineraires.length ; i++){
            for(let j = 0; j <  current.itineraires[i].tarifReserves.length ; j++){
                if(value == "eur"){
                    current.itineraires[i].tarifReserves[j].toPayDevise.afterProm = current.itineraires[i].tarifReserves[j].toPay.afterProm;
                }else{
                    current.itineraires[i].tarifReserves[j].toPayDevise.afterProm = current.itineraires[i].tarifReserves[j].toPay.afterProm*rate;
                }  
            }
        }
        return current;
    }

    function SetToDevise(){
        let devise = localStorage.getItem("devise");
        if(!devise){
            devise = "eur"
        }
        return devise;
    }

    console.log(reservation);

    return(
        <>
        <NavBarStepper access = {localStorage.access} id = {_id} indice = {2}  numeroItineraire={"1"} isConnected={isConnected} changeDeviseRate={changeDeviseRate}/>
        <div class="voucher_container">
            <div class="voucher_infos">
                <div class="voucher_border voucher_bravo">
                    <div>
                    <FontAwesomeIcon icon={faCheckCircle} color="#587817" size="3x" />
                    </div>
                    <div style={{marginLeft:10}} id = 'redirect' >
                        <p style={{color:'#587817'}}>{message}</p>
                        
                           {
                               isReservation ? <p> Rendez-vous sur votre messagerie {reservateur.email} pour voir l'e-mail de confirmation.</p> : ""
                           } 
                        
                    </div>

                </div>
                <div class="voucher_itineraires">
                    {
                        isReservation 
                        ? <>
                            {
                                reservation != null && reservation.infoEtat.length > 0
                                ? <>
                                    <h3>Statut réservation:</h3>
                                    {reservation.infoEtat.map((etat) => {
                                        return <p key={`${etat.label} ${etat.date}`}>
                                            <strong>{etat.label} le {etat.date}</strong>
                                        </p>
                                    })}
                                </>
                                : null 
                            }
                            <ItinerairesVoucher 
                                reservation={reservation} 
                                setReservation={setReservation}
                                reservateur={reservateur}
                                affilie={affilie}
                                setAffilie={setAffilie}
                                
                                openLoad={openLoad}
                                setOpenLoad={setOpenLoad}

                                showModalChambre={showModalChambre}
                                setShowModalchambre={setShowModalChambre}
                                ShowModalAnnulation={ShowModalAnnulation}
                                load ={load}
                                devise={devise}
                            />  :  "" 
                        </>
                        : null
                    }
                    
                </div>
                
            </div>
            <div class="voucher_pannel">
                <div class="voucher_link_container">
                    <FontAwesomeIcon icon={faPrint} color="#7c612b" size="0.5x" />
                    <button class="voucher_link" datatest="Button"><span>imprimer cette page</span></button>
                </div>
                <div class="voucher_link_container">
                    <FontAwesomeIcon icon={faCalendar} color="#7c612b" size="0.5x" />
                    <button class="voucher_link" datatest="Button"><span>ajouter au calendrier</span></button>
                </div>
                <div class="voucher_link_container">
                    <FontAwesomeIcon icon={faShareAlt} color="#7c612b" size="0.5x" />
                    <button class="voucher_link" datatest="Button"><span>partager</span></button>
                </div>
                <hr style={{marginLeft:'0.1em'}}></hr>

                <div>
                    <p><strong><span>{message == "Cette réservation n'existe pas ou est déjà annulée" ? "précédent" : "Modification des réservations"}</span></strong></p>

                        {
                                message == "Cette réservation n'existe pas ou est déjà annulée" ? <button   class="button_pannel"  onClick={() => precedent()}>précédent</button>  
                                : 
                                <> {
                                    isConnected ?  <button   class="button_pannel"  onClick={() => ModificationReservation(_id)}>Modifier la réservation</button> : 
                                    <button style={{minWidth:250,heigth:80}} class="btn button_btn button_secondary button_sm" variant="contained" disabled>Modifier la réservation</button>
                                } </>
                                  
                        }
                    <p style={{marginTop:'1rem'}}><strong><span>Annulations</span></strong></p> 
                    {
                        isConnected ? <>
                            {
                                isReservation ? 
                                    <button style={{minWidth:250,heigth:80}} class="btn button_btn button_secondary button_sm" variant="contained"
                                        onClick={(e) => ShowModalAnnulation(true)}>Annuler réservation</button>
                                : 
                                    <button style={{minWidth:250,heigth:80}} class="btn button_btn button_secondary button_sm" variant="contained" 
                                        onClick={(e) => redirect()}>nouvelle réservation</button>
                            
                            } 
                            </> : <button style={{minWidth:250,heigth:80}} class="btn button_btn button_secondary button_sm" variant="contained" 
                                        disabled>Annuler réservation</button>
                    }
                    <br/> <br/>
                    <p><strong><span>nouvelle réservation</span></strong></p>
                    <button  class="button_pannel" onClick={(e) => redirect()}>nouvelle réservation</button>   
                </div>

                
            </div>
            <ModalAnnulationChambre ShowModalAnnulation={ShowModalAnnulation} showModal={showModalChambre} AnnulationReservationChambre = {AnnulationReservationChambre}  load ={load}  />  
        
            <ModalAnnulation ShowModalAnnulation={ShowModalAnnulation} showModal={showModal}  annulerReservation={annulerReservation} load ={load}  />  
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={run}
            >
                <CircularProgress color="inherit" />
            </Backdrop> 
        </div>
        </>
    );
}

export default Voucher;