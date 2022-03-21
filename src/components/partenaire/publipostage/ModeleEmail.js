
import { visuallyHidden } from '@mui/utils';
// import  Navbar  from "../../partenaire/Navbar/Navbar.js";
import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState ,convertFromHTML} from 'draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw } from 'draft-js';
import './ModeleEmail.css';
import draftToHtml from 'draftjs-to-html';
function ModeleEmail(props){
    var overview = "<b>I'm bg</b>";
    var html="";
    var header="";
   header += "				<div  style='margin-left: 40%;'>";
    header += "					<h3>Confirmation de l'itineraire <\/h3>";
    header += "					<p>Confirmation No. 12934802137<\/p>";
    header += "				<\/div>";
   
    html+=header;    
    const contentDataState = ContentState.createFromBlockArray(convertFromHTML(html));
    const editorDataState = EditorState.createWithContent(contentDataState);
    const [editorState, setEditorState] = useState(editorDataState);

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }
    
    return(
        
        <>
          

          <div class="container" style={{fontFamily:'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',width:800,margin:'0 auto',padding:'0 auto',marginTop:'20%'}}>
                
                    
                <div class='itineraire' >  
                        
                        {/* <div class='header'  style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                            <img style={{width:'35%' }} src='https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg' alt='logo'/>
                           
                            <div  style={{marginLeft:'40%'}}>
                                <h3>Confirmation de l'itineraire X</h3>
                                    <p>Confirmation No. 12934802137</p>
                                
                            </div>
                                            
                        </div> */}
                        <div class='header'  style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                            <img style={{width:'35%',height:'115%' }} src='https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg' alt='logo'/>
                           
                            <div style={{marginTop:'-28%',marginLeft:'15%'}}>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="wrapper-class-confirmation"
                                    editorClassName="editor-class-confirmation"
                                    toolbarClassName="toolbar-class-confirmation"
                                    onEditorStateChange={onEditorStateChange}
                                />
                                
                            </div>
                                            
                        </div>
                       
                      <div class="hotels_infos" style={{marginTop:20}}>
                        <p>
                         <strong>Cher(e)</strong> nom prenom 
                         </p>
                        <p>Nous vous remercions d'avoir choisi [Nom de l'hotel] pour votre réservation. Nous vous confirmons que nous avons bien reçu votre réservation.</p>
                      </div>
                      <hr style={{margin:'0.5rem'}}></hr>
                      <div class='infos_contact' style={{fontFamily:'arial,helvetica,sans-serif',fontSize:11,color:'#666666',backgroundColor: '#f3f0e9',paddingTop: '1rem',paddingBottom: '1rem'}}>
                        <p style={{textAlign:'center'}}><span style={{fontSize:12,color:'#333333',fontWeight:'bold',fontFamily:'arial,helvetica,sans-serif' }}>VOTRE SÉJOUR EN DÉTAILS</span></p>
                        <p style={{textTransform:'capitalize',textAlign:'center'}}><span style={{fontSize:10}}><strong>Nom:</strong> [Nom] [prénom]</span><span style={{textTransform:'capitalize'}}><br/><span style={{fontSize:10}}><strong>Adresse</strong>: , , ,  | Phone no: XXX XX XXX XX</span></span> <br/><span style={{fontSize:10}}><strong>Confirmation no:</strong> 104583466234</span></p><br/>
                      </div>
                      <div class='reservations' >
                        <div class='reservations_details' style={{marginTop: '1rem',border: '1px solid black'}}>
                            <table style={{marginLeft:'auto',marginRight:'auto',width: '97%'}}>
                                <tr style={{height:15,borderBottom:'1px solid',borderColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',width:187.5,height:15,textAlign:'center'}} colspan='3'><span style={{fontSize:10}}><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333'}}><strong>Clients :</strong></strong></span></span><br/><span style={{fontSize:10}}> X Adulte(s) X Enfant(s)<br/><br/></span></td>
                                    <td style={{width:190,height:15,textAlign:'center',paddingLeft:100}}><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Date d'arrivée :</strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>mardi 08 mars 2022</span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Check-in : 12.00 AM<br/><br/></strong></span></td><br/>
                                    <td style={{width:202.5,height:15,textAlign:'center'}} colspan='2'><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Date depart :</strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>mardi 08 mars 2022</span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Check-out : 12.00 AM<br/><br/></strong></span></td><br/>
                                
                                </tr>
                                <tr style={{height:15,borderBottom:'1px solid',borderColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',width:187.5,height:15,textAlign:'center'}} colspan='3'><span style={{fontSize:10}}><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333'}}><strong>Nombre de nuit:</strong></strong></span></span><br/><span style={{fontSize:10}}>1 <br/><br/></span></td>
                                    <td style={{width:190,height:15,textAlign:'center',paddingLeft:100}}><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Type de Chambre Réservé</strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>Chambre standard</span><br/></td><br/>
                                    <td style={{width:202.5,height:15,textAlign:'center'}} colspan='2'><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Plan Tarifaire: </strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>Petit déjeuner - Non remboursable</span><br/></td><br/>
                                
                                </tr>
                                <tr style={{marginTop: '1rem' ,height:15,backgroundColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',height:15,width:605}} colspan='6'><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333',fontSize:12}}><br/>Détails et préférences: <br/></strong></span>
                                            messageParticulier
                                    </td>
                                </tr>
                                <tr style={{marginTop: '1rem' ,height:15,backgroundColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',height:15,width:605}} colspan='6'><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333',fontSize:12}}><br/>Détails et préférences: <br/></strong></span>
                                        <p>Politiques 1</p>
                                        <p>Politiques 2</p>
                                    </td>
                                </tr>
                                <tr style={{height:10}}>
                                <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',height:15,width:187.5}} colspan='3'><span style={{fontSize:10}}><strong>Tarif par nuit:</strong></span></td>
                                <td style={{width:190,height:15}}>
                                    <span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>
                                        <strong>EUR X </strong>
                                        </span></td>
                                        
                                <td style={{height:15,width:202.5,textAlign:'right'}} colspan='2'><span style={{fontSize:10}}><strong style={{fontStyle:'normal',color:'#333333',fontFamily:'arial,helvetica,sans-serif'}}><span style={{fontSize:9}}>Prix Total (TTC)</span>:</strong></span><br style={{color:'#333333',fontFamily:'arial,helvetica,sans-serif',fontSize:12}}/><span style={{color:'#333333',fontFamily:'arial,helvetica,sans-serif',fontSize:20}}><strong>EUR X </strong></span></td>
                                </tr>
                            </table>
                        </div>
                      </div>
                      <div style={{fontFamily:'arial,helvetica,sans-serif',marginTop: '1rem',marginLeft:'1rem',fontSize:12,color:'#333333',width:588.008}}>
                        <p><span style={{fontSize:10}}>Pour toute question concernant votre réservation, veuillez appeler le département de réservation de "+ hotel.nom+" sur le [telephone de l'hotel] ou envoyer un email au <a href='"+hotel.email+"' target='_blank'>[email]</a><br/><br/></span>Salutations,<br/>[nom de l'hotel]<br/><br/></p>
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