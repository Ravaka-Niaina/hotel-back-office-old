
import { visuallyHidden } from '@mui/utils';
// import  Navbar  from "../../partenaire/Navbar/Navbar.js";
import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";


function ModeleEmail(props){
   

    
    return(
        
        <>
          
          <div class="container" style={{fontFamily:'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',width:800,margin:'0 auto',padding:'0 auto'}}>
                <div class='itineraire' >  
                        
                        <div class='header'  style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                            <img style={{width:'35%'}} src='https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg' alt='logo'/>
                            <div  style={{marginLeft:'40%'}}>
                                <h3>Confirmation de l'itineraire 1</h3>
                                    <p>Confirmation No. 12934802137</p>
                                
                            </div>
                                            
                        </div>
                      <div class="hotels_infos">
                        <p>
                         <strong>Cher(e)</strong> nom prenom 
                         </p>
                        <p>Nous vous remercions d'avoir choisi "+hotel.nom+" pour votre réservation. Nous vous confirmons que nous avons bien reçu votre réservation.</p>
                      </div>
                      <hr style={{margin:'0.5rem'}}></hr>
                      <div class='infos_contact' style={{fontFamily:'arial,helvetica,sans-serif',fontSize:11,color:'#666666',backgroundColor: '#f3f0e9',paddingTop: '1rem',paddingBottom: '1rem'}}>
                        <p style={{textAlign:'center'}}><span style={{fontSize:12,color:'#333333',fontWeight:'bold',fontFamily:'arial,helvetica,sans-serif' }}>VOTRE SÉJOUR EN DÉTAILS</span></p>
                        <p style={{textTransform:'capitalize',textAlign:'center'}}><span style={{fontSize:10}}><strong>Nom:</strong> "+reservateur.nom+" "+reservateur.prenom+"</span><span style={{textTransform:'capitalize'}}><br/><span style={{fontSize:10}}><strong>Adresse</strong>: , , ,  | Phone no: "+reservateur.tel+"</span></span> <br/><span style={{fontSize:10}}><strong>Confirmation no:</strong> 104583466234</span></p><br/>
                      </div>
                      <div class='reservations' >
                        <div class='reservations_details' style={{marginTop: '1rem',border: '1px solid black'}}>
                            <table style={{marginLeft:'auto',marginRight:'auto',width: '97%'}}>
                                <tr style='height:15px;borderBottom:1px solid;borderColor:#f7f7f7'>
                                    <td style='fontFamily:arial,helvetica,sans-serif;fontSize:12px;color:#333333;width:187.5px;height:15px;textAlign:center' colspan='3'><span style='fontSize:10pt'><span style='fontFamily:arial,helvetica,sans-serif'><strong style='fontStyle:normal;color:#333333'><strong>Clients :</strong></strong></span></span><br/><span style='fontSize:10pt'>"+nbAdults+" Adulte(s) + "+nbEnfant+" Enfant(s)<br/><br/></span></td>
                                    <td style='width:190px;height:15px;textAlign:center'><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Date d'arrivée :</strong></span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'>"+utility.dateToFullString(datedebut)+"</span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Check-in : 12.00 AM<br/><br/></strong></span></td><br/>
                                    <td style='width:202.5px;height:15px;textAlign:center' colspan='2'><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Date depart :</strong></span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'>"+utility.dateToFullString(datedebut)+"</span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Check-out : 12.00 AM<br/><br/></strong></span></td><br/>
                                
                                </tr>
                                <tr style='height:15px;borderBottom:1px solid;borderColor:#f7f7f7'>
                                    <td style='fontFamily:arial,helvetica,sans-serif;fontSize:12px;color:#333333;width:187.5px;height:15px;textAlign:center' colspan='3'><span style='fontSize:10pt'><span style='fontFamily:arial,helvetica,sans-serif'><strong style='fontStyle:normal;color:#333333'><strong>Clients :</strong></strong></span></span><br/><span style='fontSize:10pt'>Date <br/><br/></span></td>
                                    <td style='width:190px;height:15px;textAlign:center'><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Date d'arrivée :</strong></span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'>"+utility.dateToFullString(datedebut)+"</span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong><br/><br/></strong></span></td><br/>
                                    <td style='width:202.5px;height:15px;textAlign:center' colspan='2'><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Date depart :</strong></span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'>"+utility.dateToFullString(datedebut)+"</span><br/><span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'><strong>Check-out : 12.00 AM<br/><br/></strong></span></td><br/>
                                
                                </tr>
                                <tr style='marginTop: 1rem;height:15px;background-color:#f7f7f7'>
                                    <td style='fontFamily:arial,helvetica,sans-serif;fontSize:12px;color:#333333;height:15px;width:605px' colspan='6'><span style='fontFamily:arial,helvetica,sans-serif'><strong style='fontStyle:normal;color:#333333;fontSize:12px'><br/>Détails et préférences: <br/></strong></span>
                                            messageParticulier
                                    </td>
                                </tr>
                                <tr style='marginTop: 1rem;height:15px;background-color:#f7f7f7'>
                                    <td style='fontFamily:arial,helvetica,sans-serif;fontSize:12px;color:#333333;height:15px;width:605px' colspan='6'><span style='fontFamily:arial,helvetica,sans-serif'><strong style='fontStyle:normal;color:#333333;fontSize:12px'><br/>Détails et préférences: <br/></strong></span>
                                        <p>Politiques 1</p>
                                        <p>Politiques 2</p>
                                    </td>
                                </tr>
                                <tr style='height:10px'>
                                <td style='fontFamily:arial,helvetica,sans-serif;fontSize:12px;color:#333333;height:15px;width:187.5px' colspan='3'><span style='fontSize:10pt'><strong>Tarif par nuit:</strong></span></td>
                                <td style='width:190px;height:15px'>
                                    <span style='fontFamily:arial,helvetica,sans-serif;fontSize:10pt'>
                                        <strong>EUR "+tarif.toPay.afterProm+"</strong>
                                        </span></td>
                                        
                                <td style='height:15px;width:202.5px;textAlign:right' colspan='2'><span style='fontSize:10pt'><strong style='fontStyle:normal;color:#333333;fontFamily:arial,helvetica,sans-serif'><span style='fontSize:9pt'>Prix Total (TTC)</span>:</strong></span><br style='color:#333333;fontFamily:arial,helvetica,sans-serif;fontSize:12px'/><span style='color:#333333;fontFamily:arial,helvetica,sans-serif;fontSize:20px'><strong>EUR "+tarif.toPay.afterProm+"</strong></span></td>
                                </tr>
                            </table>
                        </div>
                      </div>
                      <div style={{fontFamily:'arial,helvetica,sans-serif',marginTop: '1rem',marginLeft:'1rem',fontSize:12,color:'#333333',width:588.008}}>
                        <p><span style={{fontSize:10}}>Pour toute question concernant votre réservation, veuillez appeler le département de réservation de "+ hotel.nom+" sur le "+hotel.tel+" ou envoyer un email au <a href='"+hotel.email+"' target='_blank'>"+hotel.email+"</a><br/><br/></span>Salutations,<br/>"+hotel.nom+"<br/><br/></p>
                      </div>
                </div>
          </div>
        </>
      
    
    );
}

export default function ModeleEmail_(props){
    return(
        <ResponsiveDrawer 
            // title = {props.title}
            getContent = {() => ModeleEmail(props)} 
        />
        
    );
};