

function ItinerairesVoucher(props){
    let itineraires = [];
    
    if(props.reservation != null){
        for(let i = 0; i < props.reservation.itineraires.length; i++){
            const u = i;
            let chambres_number = [];
            let length = props.reservation.itineraires[i].tarifReserves.length;
            for (let j = 0; j < length; j++) {
                    const tarif = props.reservation.itineraires[i].tarifReserves[j]; 
                   chambres_number.push(
                       <div class="voucher_chambres"> 
                            <h3 class="voucher_title2"><span>Chambre {j+1} Confirmation #&nbsp;: </span><span class="confirmation-message_confirmationNumber"> 59973SC016061</span></h3>
                            <span class="confirmation-message_Confirmed"><span>Confirmé</span></span>
                       </div>
                   )
                   if(j<length-1) {
                        chambres_number.push(<hr style={{marginLeft:'0.8em'}}></hr>);
                   }               
                                    
            }
    
            itineraires.push(
                <div >
                    <div class=" voucher_border voucher_numeros">
                        <h2 class="voucher_title"><span>Merci.</span> <span>Votre numéro d'itinéraire {u+1} est 14463B2867239</span></h2>
                        {chambres_number}
                                
                       
                    </div>
                   
                    {/* <TarifsVoucher 
                        indexItineraire={u}
                        reservation={props.reservation}
                        setReservation={props.setReservation}
                        reservateur={props.reservateur}
                        isEditEnabled={props.isEditEnabled}
                        affilie={props.affilie}
                        setAffilie={props.setAffilie}
                        openLoad={props.openLoad}
                        setOpenLoad={props.setOpenLoad}
                        isEditEnabled={props.isEditEnabled} /> */}
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