import TextField from '@mui/material/TextField';
import CustomError from '../../../../CustomError';
import {useEffect, useRef} from "react";
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './insertTarif.css';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import callAPI from '../../../../utility';
import  Navbar  from "../../Navbar/Navbar";
import ButtonLoading from "../../buttonLoading.js"

import {session} from '../../../common/utilitySession.js';
import Login from '../../../common/Authentification/Login.js';
import NotEnoughAccessRight from '../../../common/NotEnoughAccessRight';
import SkelettonForm from '../../../../SkeletonListe/SkeletonFormulaire.js';

import InsertTarifDateReservation from './InsertTarif/InsertTarifDateReservation.js';
import InsertTarifDateSejour from './InsertTarif/InsertTarifDateSejour.js';
import InsertTarifLead from './InsertTarif/InsertTarifLead.js';
const utility = require('./utility.js');



function InsertTarif(){
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState({
        nom: null,
        description: null,
        dateReservationDebut: null,
        dateReservationFin: null,
        dateSejourDebut: null, 
        dateSejourFin: null,
        leadMin: null, 
        leadMax: null,
        chambresAtrb: null,
        politiqueAnnulAtrb: null,
        debutReserv: null,
        finReserv: null
    });
    const [planTarifaire, setPlanTarifaire] = useState({
        nom: '',
        description: '',
        isDateReservAuto: false,
        dateReservation: {debut: '', fin: ''},
        dateSejour: {debut: '', fin: ''},
        isLeadHour: true,
        lead: {min: '', max: ''},
        chambresAtrb: [],
        politiqueAnnulAtrb: [

        ],
        debutReserv: null,
        finReserv: null
    });
    const [btnLoad, setBtnLoad] = useState(false);
    const history = useHistory();
    const [skeletonAffiche , setSkeleton] = useState(true);
    const [leadMinInfini, setLeadMinInfini] = useState(false);
    const [isLeadMinDisabled, setIsLeadMinDisabled] = useState(false);
    const [reservAToutMoment, setReservAToutMoment] = useState(true);
    const [areDateReservDisabled, setAreDateReservDisabled] = useState(true);
    const [aucunFinDateSejour, setAucunFinDateSejour] = useState(false);
    const { _id } = useParams();

    const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;

    function setListTypeChambre(res){
        let current = JSON.parse(JSON.stringify(planTarifaire));
        current.chambresAtrb = res.listType;
        current.politiqueAnnulAtrb = res.listPolitique;
        for(let i = 0; i < current.politiqueAnnulAtrb.length; i++){
            current.politiqueAnnulAtrb[i].checked = false;
        }
        setPlanTarifaire(current);
        setSkeleton(false);
    }

    function setPlan(res){
        console.log(res);
        if(res.status === 200){
            setReservAToutMoment(res.planTarifaire.reservAToutMoment);
            setAreDateReservDisabled(res.planTarifaire.reservAToutMoment ? true : false);
            setLeadMinInfini(res.planTarifaire.leadMinInfini);
            setIsLeadMinDisabled(res.planTarifaire.leadMinInfini);
            setPlanTarifaire(res.planTarifaire);
            setSkeleton(false);
            setAucunFinDateSejour(res.planTarifaire.aucunFinDateSejour);
        }else if(res.status === 401){//Unauthorized
            history.push('/back/login');
        }else if(res.status === 403){
            history.push('/notEnoughAccessRight');
        }
    }

    const hasARInsert = session.getInstance().hasOneOfTheseAccessRights(["insertPlanTarifaire", "superAdmin"]);
    const hasARGet = session.getInstance().hasOneOfTheseAccessRights(["getPlanTarifaire", "superAdmin"]);
    const hasARUpdate = session.getInstance().hasOneOfTheseAccessRights(["updatePlanTarifaire", "superAdmin"]);

    useEffect(() => {
        const isConnected = session.getInstance().isConnected();
        if(!isConnected){
            return(<Login urlRedirect={window.location.href} />);
        }

        if(hasARInsert && isInsert){
            callAPI('get', '/TCTarif/TPAvecPA', {}, setListTypeChambre);
        }else if((hasARGet || hasARUpdate) && !isInsert){
            callAPI('get', "/planTarifaire/details/" + _id, {}, setPlan);
        }else{
            history.push('/notEnoughAccessRight');
        }
        
      }, []);

    function tryRedirect(res){
        let temp = {...error};
        temp = {
            nom: null,
            description: null,
            dateReservationDebut: null,
            dateReservationFin: null,
            dateSejourDebut: null, 
            dateSejourFin: null,
            leadMin: null, 
            leadMax: null
        };
        setBtnLoad(false);
        if(res.status === 200){
            history.push('/back/tarif');
        }else if(res.status === 401){//Unauthorized
            history.push('/back/login');
        }else if(res.status === 403){
            history.push('/notEnoughAccessRight');
        }else{
            let keys = Object.keys(res.errors);
            if(keys.length === 0){
                history.push('/back/tarif');
            }
            keys.map((k) => {
                temp[k] = res.errors[k];
            });
        }
        setError(temp);
    }

    function update(e){
        setBtnLoad(true);
        const current = utility.getPlan(planTarifaire);
        current.leadMinInfini = leadMinInfini;
        current.reservAToutMoment = reservAToutMoment;
        current.aucunFinDateSejour = aucunFinDateSejour;
        callAPI('post', '/planTarifaire/update', current, tryRedirect);
    }

    function insert(e){
        e.preventDefault();
        setBtnLoad(true);
        const current = utility.getPlan(planTarifaire);
        current.leadMinInfini = leadMinInfini;
        current.reservAToutMoment = reservAToutMoment;
        current.aucunFinDateSejour = aucunFinDateSejour;
        callAPI('post', '/planTarifaire/insert', current, tryRedirect);
    }

    return(
        <div className="">
            <Navbar currentPage={1}/>
            <div className="">
                    <div className="">
                        <div className="jumbotron">
                            {
                                skeletonAffiche ? <SkelettonForm /> : <>

                            <h1 className="text-center" id='title1'>{isInsert ? "Ajouter plan tarifaire" : "Modifier plan tarifaire"}</h1>
                            <CustomError errors={errors} />
                            <form className="needs-validation" style={{marginTop:'15px'}}>
                                <Box>
                                    <div style={{marginTop:''}}>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            style={{width: '300px'}}
                                            type="text"
                                            size='small'
                                            label="Nom"
                                            value={planTarifaire.nom}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, error, setError, e, "nom")}
                                            error={error.nom === null ? false : true}
                                            helperText={error.nom === null ? null : error.nom}
                                        />
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <label style={{textDecoration: 'underline'}} id='bigLabel'>Déscription </label> 
                                        <br/>
                                        <TextField 
                                            id="outlined-basic"
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                            rowsMax={4}
                                            label="Déscription"
                                            style={{
                                            width:'100%',
                                            height:'50px',
                                            marginTop:'15px'
                                                  }}
                                            type="text"
                                            value={planTarifaire.description}
                                            onChange={(e) => utility.handleInputChange1(planTarifaire, setPlanTarifaire, error, setError, e, "description")}
                                            error={error.description === null ? false : true}
                                            helperText={error.description === null ? null : error.description}
                                        />
                                    </div>
                                    <InsertTarifDateReservation
                                        reservAToutMoment={reservAToutMoment}
                                        setReservAToutMoment={setReservAToutMoment}
                                        error={error}
                                        setError={setError}
                                        areDateReservDisabled={areDateReservDisabled}
                                        setAreDateReservDisabled={setAreDateReservDisabled}
                                        planTarifaire={planTarifaire}
                                        setPlanTarifaire={setPlanTarifaire} />
                                    
                                    <InsertTarifDateSejour
                                        planTarifaire={planTarifaire}
                                        setPlanTarifaire={setPlanTarifaire}
                                        error={error}
                                        setError={setError}
                                        aucunFinDateSejour={aucunFinDateSejour}
                                        setAucunFinDateSejour={setAucunFinDateSejour}
                                        reservAToutMoment={reservAToutMoment} />
                                    
                                    <InsertTarifLead 
                                        planTarifaire={planTarifaire}
                                        setPlanTarifaire={setPlanTarifaire}
                                        leadMinInfini={leadMinInfini}
                                        setLeadMinInfini={setLeadMinInfini}
                                        isLeadMinDisabled={isLeadMinDisabled}
                                        setIsLeadMinDisabled={setIsLeadMinDisabled}
                                        error={error} setError={setError}
                                         />
                                    <div style={{marginTop:'20px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline'}} id='bigLabel'>Chambres attribuées </label> 
                                        </div>
                                        <div>
                                            <utility.ChambresAtrb 
                                                chambresAtrb={planTarifaire.chambresAtrb} 
                                                planTarifaire={planTarifaire}
                                                setPlanTarifaire={setPlanTarifaire}
                                                handleCheckBoxChange={utility.handleCheckBoxChange} />
                                            {error.chambresAtrb === null ? null : <div className="customError"><span>{error.chambresAtrb}</span></div>}
                                        </div>
                                    </div>
                                    <div style={{marginTop:'20px'}}>
                                        <div>
                                            <label className="" style={{textDecoration: 'underline',fontFamily:'Roboto',fontSize:'15px'}} >Politiques d'annulation </label> 
                                        </div>
                                        <utility.PolitiqueAnnulAtrb  
                                            politiqueAnnulAtrb={planTarifaire.politiqueAnnulAtrb}
                                            planTarifaire={planTarifaire}
                                            setPlanTarifaire={setPlanTarifaire}
                                            handleCheckBoxChange={utility.handleCheckBoxChange} />
                                        {error.PolitiqueAnnulAtrb === null ? null : <div className="customError"><span>{error.PolitiqueAnnulAtrb}</span></div>}
                                    </div>
                                </Box>

                                <div className="pied" style={{marginTop:'30px'}}>   
                                    <div class="bouton-aligne">
                                        { hasARInsert && isInsert
                                        ? <>{ btnLoad ? <ButtonLoading />
                                            : <Button  
                                                variant="contained" 
                                                type='submit' 
                                                style={{textDecoration:'none',color:'black',backgroundColor:'#2ac4ea'}}
                                                onClick={(e) => insert(e)}>
                                                <span style={{color:'white'}}>Ajouter</span>
                                            </Button>
                                        } </>
                                        : null }

                                        {hasARUpdate && !isInsert
                                        ? <>{ btnLoad 
                                            ? <ButtonLoading /> 
                                            : <Button variant="contained"  style={{backgroundColor:'#FA8072'}} onClick={(e) => update(e)}>
                                                Modifier
                                            </Button> }
                                        </>
                                        : null }
                                    </div>
                                    <div class="bouton-aligne">
                                        <Link to={'/back/tarif'} style={{textDecoration:'none'}}>
                                        <Button variant="outlined" 
                                        id="btn2">
                                    <span style={{color:'#1976d2'}}>Retour</span>
                                        </Button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                             </>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default InsertTarif;