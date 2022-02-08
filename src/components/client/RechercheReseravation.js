import React , {useState} from "react";
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NavBar from './NavbarClient/Navbar'
import {Link} from 'react-router-dom';
import CallAPI from '../../utility.js';
import Alert from '@mui/material/Alert';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {Button, IconButton, Typography, Toolbar, AppBar} from '@mui/material';
import TextField from '@mui/material/TextField';
import BtnLoad from '../partenaire/buttonLoading.js';
import SkeletonForm from '../../SkeletonListe/SkeletonFormulaire.js';
import './researchReservationCSS.css';

const div = {width : "520px" , border : "1px solid #887B62",padding : "10px"}
const photo = { maxWidth: "100%",height: "auto"}
function ReponseList(props){
    let list = props.list.reservation.map(liste => {
        return (
            <div style={div}>
                {
                    props.skeleton ? <SkeletonForm /> : <>
                    <img src="/hotel.jpg" style={photo}/> 
                    <span
                        component="div"
                        sx={{ display: {xs : "none" ,  sm: 'block' }, padding : "10px" }}
                    >
                        Heritage Le Telfaire Golf and Wellness Resort 
                    </span><br/>
                    <span>{props.list.client.nom} , {props.list.client.prenom}</span><br/>
                    <span>{props.list.client.email} </span><br/><br/>
                    {/*
                    <strong style={{textDecoration : "underline"}}>N° Confirmation : </strong><span>{liste.numeroConfirmation} </span><hr/> */}
                    <Itineraire itineraire = {liste.itineraires}/>
                    <div style={{float : 'right'}}>
                        <button style={{minWidth:250}} class="btn button_btn button_secondary button_sm" 
                            variant="contained" >AFFICHER LES INFORMATIONS</button>
                        
                    </div>
                </>
                }
            </div>
        )
    })
    return list;
}
function Itineraire(props){
    let itineraire = props.itineraire.map(liste => {
        return (
            <>
                <strong>N° itineraire : </strong><span>{liste.NumeroITineraire}</span><br/>
                <span style={{textDecoration : "underline"}}>Date sejour : </span>
                <span>Debut : {liste.dateSejour.debut} - fin : {liste.dateSejour.fin} </span><hr/>
            </>
        );
    })
return itineraire
}



function Compte(props){
    return (
        <>
        <Box sx={{ width: '100%'}} >
            
                <Typography style={{float : 'left'}}
                    variant="h7"
                    noWrap 
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    <Link  style={props.color}>Mot de passe oublié ?</Link>
                </Typography>
            
            <div style={{float : 'right'}}>  
                {
                    props.grise ? 
                    " " : <>
                        { props.btnLoad ?  <BtnLoad /> :
                            <button style={{minWidth:250}} class="btn button_btn button_secondary button_sm" 
                                variant="contained" onClick={() => props.conx()}>CONNEXION</button>
                        } </>
                }
                        
            </div> 
        </Box><br/><br/><br/>
        </>
    );
}
function Numero(props){
    return (
        <>
        <Box sx={{ width: '100%'}} >
            <div style={{float : 'right'}}>  
                {
                    props.grise ? 
                        " " : <>
                        { 
                            props.btnLoad ?  <BtnLoad /> :
                            <button style={{minWidth:250}} class="btn button_btn button_secondary button_sm" variant="contained" 
                                onClick={() => props.conx()}>
                                RECHERCHE UNE RESERVATION
                            </button>
                        } </>
                        
                }
            </div> 
        </Box><br/><br/><br/>
        </>
    );
}

function RechercheReservation (){
    const [response , setResponse] = useState(false);
    const [isGriseConx , setIsGriseConx] = useState(true);
    const [isGriseSerf , setIsGriseSerf] = useState(true);
    const [messageCompte , setMessageC] = useState("");
    const [messageNumero , setMessageN] = useState("");
    const [list , setList] = useState({reservation : [] , client :{}});
    const [compte , setCompte] = useState({nom : "" , mdp :""});
    const [numero , setNumero] = useState({num : "" , email :""});
    const [pageCurrent , setPageCurrent] = useState(1);
    const [btnLoad , setBtnLoad] = useState(false);
    const [skeleton , setSkeleton] = useState(true);
    const [errorEmpty, setErrorEmpty] = useState({nom:false,mdp: false, num: false, email: false});


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(5),
        color: theme.palette.text.secondary,
      }));

    
      const style = {
        // fontFamily: 'Arial, Helvetica , sans-serif',
        // color: '#887B62',
        // textAlign: 'center',
        // textDecoration: "underline",
        // display: { xs: 'none', sm: 'block' },
        margin: "0",
        padding:" 0",
        border:" 0",
        fontSize: "100%",
        font: "inherit",
        verticalAlign: "baseline"
      }

      const border = {
          border : "1px solid #887B62",
          padding : "10px"
      }

      const color ={
          color : "#887B62"
      }

      const  haddleChangeInputCompte = (event,field) => {
        let current = {...compte};
        current[field] = event.target.value;
        setCompte(current);
        current.nom = current.nom + ""
        current.mdp = current.mdp + ""
            if(current.nom.trim() !== "" && current.mdp !==""){
                setIsGriseConx(false);
            }else{
                setIsGriseConx(true);
            }
        
      } 
      const  haddleChangeInputNumero = (event,field) => {
        let current = {...numero};
        current[field]= event.target.value;
        setNumero(current);
        current.num = current.num+"";
        current.email = current.email+'';
        if(current.num.trim() !== "" && current.email.trim() !== ""){
            setIsGriseSerf(false);
        }else{
            setIsGriseSerf(true);
        }
        
      }
      const callBack = (data) => {
        if(data.status === 200){
            let current = {...list};
            current.reservation = data.reservation;
            current.client = data.client;  
            setList(current);
            setResponse(true)
            setMessageC("");
            setMessageN("");
            vider(compte , 'nom' , 'mdp', setCompte);
            vider(numero , 'num' ,'email', setNumero);
            setBtnLoad(false);
            setSkeleton(false);
        }else if(data.status == 204){
            if(compte.nom !== "" && compte.mdp !== ""){
                setMessageC(data.message);
            }else{
                setMessageN(data.message);
            }
        }else if(data.status == 400){
            setMessageN(data.message);
        }
        setBtnLoad(false);
      }

      const connexionC = () => {
        setBtnLoad(true);
        setSkeleton(true)
        CallAPI("post" , "/reservation/researchC" , {mdp : compte.mdp , nom : compte.nom, pageCurrent : pageCurrent} , callBack);
      }

      const connexionN = () => {
        setBtnLoad(true);
        setSkeleton(true);
        CallAPI("post" , "/reservation/researchN" , {numero : numero.num , email : numero.email} , callBack);
      }

      const suivant = (e, pageCurrent) => {
            setPageCurrent(pageCurrent+1)
            setSkeleton(true);
            CallAPI("post" , "/reservation/researchC" , {mdp : compte.mdp , nom : compte.nom, pageCurrent : pageCurrent+1} , callBack);
            
      }
      const vider = (params , field1 , field2 , set) =>{
        let current = {...params};
        current[field1] = "";
        current[field2] = "";
        set(current);
      }
      

      const precedent = (e , pageCurrent) => {
          let pageC = pageCurrent-1;
          setPageCurrent(pageC)
          setSkeleton(true);
          CallAPI("post" , "/reservation/researchC" , {mdp : compte.mdp , nom : compte.nom, pageCurrent : pageC} , callBack);
          
     }
     const clickRetour = () => {
        setResponse(false);
        setIsGriseConx(true);
        setIsGriseSerf(true);
        setPageCurrent(1);
     }
     const handleEmptyNumero = (field) => {
        let current = {...numero}
        let errors_input = {...errorEmpty};

        if(current[field] ==='' ||current[field] === null){
            errors_input[field] = true;
        }else{
            errors_input[field] = false;
        }
        setErrorEmpty(errors_input);

     }

     const handleEmptyCompte = (field) => {
        let current = {...compte};
        let errors_input = {...errorEmpty};

        if(current[field]==='' ||current[field]===null){
            errors_input[field] = true;
        }else{
            errors_input[field] = false;
        }
        setErrorEmpty(errors_input);

     }

    return (
            <div style={{background: "rgba(255,255,255,1)" }}>
                <NavBar clickRetour = {clickRetour}/><br/>
                    <h1 id="pageTitle">
                        <span>Rechercher une réservation</span>
                    </h1>  
                     <Box style={{marginTop :"auto" , marginButtom : "auto"}} >
                        <Grid container spacing={2} style={{padding : "30px"}}>
                            <Grid item xs={6}>
                                <div style={border}>
                                    {messageCompte ? <Alert severity="error">{ messageCompte}</Alert> : ""}
                                    <h2 class='h2'>
                                        <span>  Avec votre compte </span>
                                    </h2>
                                    <div class="input-fieldR">
                                        <input type="text" value={compte.nom} onChange={e => haddleChangeInputCompte(e, 'nom')}
                                            onBlur={(e) => handleEmptyCompte("nom")} required />
                                            <label>Nom d'utilisateur <span class="red_required">*</span></label>
                                                {
                                                    errorEmpty.nom ?
                                                    <>
                                                        <div class="error_text">
                                                            nom vide
                                                        </div>
                                                    </>
                                                    : null
                                                }
                                    </div>
                                     <div class="input-fieldR">
                                        <input type="text" value={compte.mdp} onChange={e => haddleChangeInputCompte(e, 'mdp')}
                                            onBlur={(e) => handleEmptyCompte("mdp")} required />
                                            <label>Mot de passe <span class="red_required">*</span></label>
                                            {
                                                errorEmpty.mdp ?
                                                <>
                                                    <div class="error_text">
                                                        Mot de passe vide
                                                    </div>
                                                </>
                                                : null
                                            }
                                    </div>
                                    <Compte grise = {isGriseConx} color = {color}  conx = {connexionC} btnLoad = {btnLoad}/> 
                                    <hr/>
                                    <h3 class="app_subheading2 app_bold">
                                        <span >Pas de compte en ligne ?</span>
                                    </h3>
                                    <p>
                                        <Link style={color} to='/front/register'>Inscrivez-vous aujourd'hui</Link>
                                        <span>  pour gagner du temps lors de votre prochaine réservation.</span>
                                    </p>
                                    
                                </div> 
                            </Grid>
                            <Grid item xs={6}>
                                <div style={border}> 
                                    {messageNumero ? <Alert severity="error">{messageNumero}</Alert> : ""} 

                                    <h2 class='h2'>
                                        <span>  Avec  numéro d'itinéraire </span>
                                    </h2>
                                    <div class="input-fieldR">
                                        <input type="text" value={compte.num} onChange={e => haddleChangeInputNumero(e, 'num')}
                                            onBlur={(e) => handleEmptyNumero("num")} required />
                                            <label>Numéro d'itinéraire<span class="red_required">*</span></label>
                                            {
                                                errorEmpty.num ?
                                                <div class="error_text">
                                                    Veuillez indiquer un numéro d'itinéraire 
                                                </div>
                                                : null
                                            }
                                    </div>
                                     <div class="input-fieldR">
                                        <input type="text" value={compte.email} onChange={e => haddleChangeInputNumero(e, 'email')}
                                            onBlur={(e) => handleEmptyNumero("email")} required />
                                            <label>Adresse e-mail <span class="red_required">*</span></label>
                                            {
                                                errorEmpty.email ?
                                                    <div class="error_text">
                                                        Veuillez indiquer une adresse e-mail ou un ID de programme de fidélité
                                                    </div>
                                                : null
                                            }
                                    </div>
                                    <Numero grise = {isGriseSerf} conx = {connexionN} btnLoad = {btnLoad} />
                                    <div class='divFooterR'>
                                        <h3 class="app_subheading2 app_bold">
                                            <span >Vous ne connaissez pas votre numéro de confirmation ?</span>
                                        </h3>
                                            <p>
                                                <span >
                                                    Votre numéro de confirmation a été envoyé par e-mail au moment de la réservation
                                                    Veuillez consulter cet e-mail pour retrouver le numéro.
                                                </span>
                                            </p>
                                        
                                    </div>

                                </div> 
                            </Grid>
                        </Grid>
                    </Box> 
                        {
                            response ?  <>
                            <h1 id="pageTitle">
                                <span> Liste des reservations </span>
                            </h1> 
                             <div>
                                <div style={{float : 'left' , fontSize :"450px" , width :"30px",cursor:"pointer"}}>  
                                    {
                                        pageCurrent == 1 ? " " : <ChevronLeftIcon   onClick={(e) => precedent(e ,pageCurrent)}/>
                                    }
                                </div>  
                                <div style={{float : 'right' , fontSize :"500px",  width :"30px" , cursor:"pointer"}}> 
                                    {
                                        list.reservation.length < 3 ? " " : <ChevronRightIcon onClick={(e) => suivant(e , pageCurrent)}/>
                                    }   
                                </div><br/>
                                <Box sx={{ display: { xs: 'none', md: 'flex'  }, gap : 1 , padding : "30px"}}>
                                    <ReponseList  list ={list} skeleton={skeleton}/>
                                </Box> 
                            </div> 
                            </> : ""
                        }
                </div>
    );
}

export default RechercheReservation;