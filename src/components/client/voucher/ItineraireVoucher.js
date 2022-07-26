import TarifsVoucher from "./TarifsVoucher";


function ItinerairesVoucher(props){
    let itineraires = [];

    if(props.reservation != null){
        for(let i = 0; i < props.reservation.itineraires.length; i++){
            console.log( props.reservation ? props.reservation.itineraires[i].infoEtat : null);
            const u = i;
            let chambres_number = [];
            let nbr = 0;
            let length = props.reservation.itineraires[i].tarifReserves.length;
            for (let j = 0; j < length; j++) {
                    const tarif = props.reservation.itineraires[i].tarifReserves[j];
                    nbr = nbr + 1
                    chambres_number.push(
                        <div class="voucher_chambres"> 
                                <h3 class="voucher_title2"><span>Chambre {j+1} Confirmation #&nbsp;: </span><span class="confirmation-message_confirmationNumber">
                                        {props.reservation.itineraires[i].tarifReserves[j].numeroConfirmation}</span></h3>
                        </div>
                    )
                    if(j<length-1) {
                            chambres_number.push(<hr style={{marginLeft:'0.8em'}}></hr>);
                    }
            }
    
            itineraires.push(
                <div >
                    {
                        chambres_number.length !== 0 ? 
                        <>
                            <div class=" voucher_border voucher_numeros">
                                <h2 class="voucher_title"><span>Merci.</span> <span>Votre numéro d'itinéraire {nbr} est {props.reservation.itineraires[i].NumeroITineraire}</span></h2>
                                {chambres_number}
                                {
                                    props.reservation.itineraires[i].infoEtat.length === 0
                                    ? null 
                                    : <>
                                        <h3>Statut itinéraire ie:</h3>
                                        {props.reservation.itineraires[i].infoEtat.map((etat) => {
                                            return <p key={`${etat.label} ${etat.date}`}>
                                                <strong>{etat.label} le {etat.date}</strong>
                                            </p>
                                        })}
                                    </>
                                }
                            </div>

                            <div class="voucher_border voucher_tarifs">
                                <TarifsVoucher
                                    indexItineraire={u}
                                    reservation={props.reservation}
                                    setReservation={props.setReservation}
                                    reservateur={props.reservateur}
                                    isEditEnabled={props.isEditEnabled}
                                    affilie={props.affilie}
                                    setAffilie={props.setAffilie}
                                    openLoad={props.openLoad}
                                    setOpenLoad={props.setOpenLoad}

                                    showModalChambre={props.showModalChambre}
                                    setShowModalchambre={props.setShowModalChambre}
                                    ShowModalAnnulation={props.ShowModalAnnulation}
                                    load ={props.load} 
                                    devise={props.devise}
                                    /> 

                            </div>
                        </>
                    : ''
                }
                   
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

export default ItinerairesVoucher;