import { useState, useRef } from 'react';
import CustomError from '../../../CustomError';
import {useEffect} from "react";
// import Navbar from "../Navbar/Navbar";
import ResponsiveDrawer from "../Navbar/responsive-drawer.js";
import { Checkbox } from "@mui/material";
import './typeChambre.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams, useHistory } from 'react-router-dom';

import callAPI from '../../../utility';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';

import ButtonLoading from "../buttonLoading.js"
import SkelettonForm from '../../../SkeletonListe/SkeletonFormulaire.js';
import PhotoChambre from './InsertTypeChambre/Photo/PhotoChambre.js';
import VideoChambre from './InsertTypeChambre/Video/VideoChambre.js';
import Equipement from './InsertTypeChambre/Equipement.js';
import Galerie from '../Galerie/Galerie.js';
import ImageCrop from '../Galerie/ImageCrop.js';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function PlanTarifaire(props){
  let i = -1;
  let list = props.planTarifaire.map(tarif => {
      i++;
      let u = i;
      return(
        <FormControlLabel  
          checked={tarif.checked}
          control={<Checkbox/>}
          onChange={(e) => props.handleCheckBoxPlanTarifaire(e, u)}
          label={<span id='litleLabel'>
          {tarif.nom}
                </span>}
          style={{marginLeft:"20px",marginTop:'15px'}}
          key={u}
        />
      );
  })
  return list;
}

let isFirstRender = true;
let nbPhotoBefore = {value: 0};
function InsertTypeCHambre(){
  const noImage = '/no-image.jpg';
  let [state, setState] = useState(
    {
      errors: [],
      error: {
        nom: null,
        nbAdulte: null,
        nbEnfant: null,
        chambreTotal:null,
        etage:null,
        superficie:null,
        description:null,
        photo: null,
        name: null,
        desc: null
      },
      nom: '',
      nbAdulte: '',
      nbEnfant: '',
      
      chambreTotal:'',
      etage:'',
      superficie:'',
      description:'',
      planTarifaire: [],
      equipements: [],
      videos: [],
      name: '',
      desc: ''
    }
  );
  const { _id } = useParams();
  const [skeletonAffiche , setSkeleton] = useState(true);
  const [photo, setPhoto] = useState([]);
  const [preview, setPreview] = useState([]);
  
  console.log(window.location.href);
  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
  const hasARInsert = session.getInstance().hasOneOfTheseAccessRights(["insertTypeChambre", "superAdmin"]);
  const hasARGet = session.getInstance().hasOneOfTheseAccessRights(["getTypeChambre", "superAdmin"]);
  const hasARUpdate = session.getInstance().hasOneOfTheseAccessRights(["updateTypeChambre", "superAdmin"]);
  const fieldsToSet = ["_id", "nom", "nbAdulte", "nbEnfant", "photo",
      "chambreTotal", "etage", "superficie", "description",
      "planTarifaire", "equipements", "videos"];
  
  const [areImagesLoading, setAreImagesLoading] = useState(isInsert ? false : true);
  const [btnLoad, setBtnLoad] = useState(false);
  const [showGalerie, setShowGalerie] = useState(false);
  const [isModifImgCrop, setIsModifImgCrop]= useState(false);


  const [imageCrop, setImageCrop] = useState(null);
  const [showImageCrop , setShowImageCrop]= useState(false);
  const [srcImg ,setImgSrc]= useState("");
  const [AlertRedirect , setAlertRedirect] = useState(false);

  const switchShowImageCrop = (e , isTrue, img) => {
      if(isTrue){
        setAlertRedirect(false);
      }
      e.preventDefault();
      toDataUrl1(img, function(myBase64) {
          setImgSrc(myBase64);
      });
      setShowImageCrop(isTrue);
  }

  const errorRef = useRef(null);

  function toDataUrl1(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  }
  
  const switchShowGalerie = (e) => {
    e.preventDefault();
    setShowGalerie(!showGalerie);
  };
  
  const setDetailsTypeChambre = (data) => {
    // console.log(data);
    let currentState = {...state};

    if(data.status === 401){//Unauthorized
      history.push('/back/login');
    }else if(data.status === 403){
      history.push('/notEnoughAccessRight');
    }

    fieldsToSet.map(field => {
      currentState[field] = data.typeChambre[field];
    });

    let tmpPhoto = JSON.parse(JSON.stringify(data.typeChambre.photo));
    delete currentState.photo;
    
    if(photo != '' || 
      photo != undefined ||
      photo != null){
      let tmpPreview = [];
      for(let i = 0; i < tmpPhoto.length; i++){
        tmpPreview[i] = process.env.REACT_APP_BACK_URL + "/" + tmpPhoto[i];
      }
      setPreview(tmpPreview);
    }
    
    setPhoto(tmpPhoto);
    setState(currentState);
    setSkeleton(false);
    setAreImagesLoading(false);
    setImageCrop(process.env.REACT_APP_BACK_URL + "/"+data.typeChambre.photoCrop[0]);
  }

  useEffect(() => {
    if(isFirstRender){
      isFirstRender = false;
      if(isInsert && hasARInsert){
        callAPI('get', '/TCTarif/infoInsertTypeChambre', {}, setInfo);
      }else if(hasARGet || hasARUpdate){
        setAreImagesLoading(true);
        callAPI("get", "/typeChambre/details/" + _id, {}, setDetailsTypeChambre);
      }
    }

  });

  useEffect(() => {
    let href = window.location.href;
    const isHttp = new RegExp("http://", "i").exec(href);
    if(isHttp){
      let https = href.replace(/^http/, "https");
      window.location.href = https;
    }

    return () => {
      isFirstRender = true;
    }

  }, []);
  
  const history = useHistory();
  if(isInsert && !hasARInsert){
    return(
      <NotEnoughAccessRight />
    );
  }
  if(!isInsert && !hasARGet && !hasARUpdate){
    return(
      <NotEnoughAccessRight />
    );
  }

  function setInfo(res){
    let current = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < res.listTarif.length; i++){
      res.listTarif[i].checked = false;
    }
    current.planTarifaire = res.listTarif;
    for(let i = 0; i < res.listEquipement.length; i++){
      res.listEquipement[i].checked = true;
    }
    current.equipements = res.listEquipement;
    setState(current);
    setSkeleton(false);
  }

  function handleCheckBoxPlanTarifaire(e, index){
    let current = JSON.parse(JSON.stringify(state));
    current.planTarifaire[index].checked = e.target.checked;
    setState(current);
  }

  function tryRedirect(res){
    setBtnLoad(false);
    let currentState = JSON.parse(JSON.stringify(state));
    let keys = Object.keys(currentState.error);
    keys.map((k) => {
      currentState.error[k] = null;
    });
    
    if(res.status === 200){
      history.push('/back/typeChambre');
    }else if(res.status === 401){//Unauthorized
      history.push('/back/login');
    }else if(res.status === 403){
      history.push('/notEnoughAccessRight');
    }
    else{
      let keys = Object.keys(res.errors);
      keys.map((k) => {
        currentState.error[k] = res.errors[k];
      });
    }
    setState(currentState);
  }

  function insert(e){
    e.preventDefault();
    setBtnLoad(true);
    let toSend = JSON.parse(JSON.stringify(state));

    let selectedEquip = [];
    for(let i = 0; i < state.equipements.length; i++){
      if(state.equipements[i].checked){
        selectedEquip.push(state.equipements[i]._id);
      }
    }
    toSend.equipements = selectedEquip;
    
    let selectedPlan = [];
    for(let i = 0; i < state.planTarifaire.length; i++){
      if(state.planTarifaire[i].checked){
        selectedPlan.push(state.planTarifaire[i]._id);
      }
    }
    toSend.planTarifaire = selectedPlan;
    toSend.photo = photo;
    callAPI('post', '/typeChambre/insert', {toSend, imgCrop: imageCrop}, tryRedirect);
  }

  function update(e){
    e.preventDefault();
    setBtnLoad(true);
    let toSend = {};
    fieldsToSet.map(field => {
      toSend[field] = state[field];
    });
    toSend = {...toSend};
    let equipements = [];
    for(let i = 0; i < state.equipements.length; i++){
        if(state.equipements[i].checked){
            equipements.push(state.equipements[i]._id);
        }
    }
    toSend.equipements = equipements;
    let planTarifaire = [];
    for(let i = 0; i < state.planTarifaire.length; i++){
        if(state.planTarifaire[i].checked){
            planTarifaire.push(state.planTarifaire[i]._id);
        }
    }
    toSend.planTarifaire = planTarifaire;
    toSend.photo = photo;
    callAPI('post', '/typeChambre/update/', {toSend , imgCrop: {imageCrop: imageCrop , isModifPhoto : isModifImgCrop}}, tryRedirect);
  }

  function handleInputChange(event, inputName){
      const currentState = JSON.parse(JSON.stringify(state));
      currentState[inputName] = event.target.value;
      currentState.error[inputName] = null;
      setState(currentState);
  }

  function handleInputChange2( e, name1, name2){
    let current = JSON.parse(JSON.stringify(state));
    current[name1][name2] = e.target.value;
    setState(current);
    }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function  redirectError(e){
      e.preventDefault();
      setAlertRedirect(true);
      window.location.href = '#error';
      // errorRef.current.scrollIntoView({
      //   behavior :"smonth",
      //   block :'center',
      //   inline:"center"
      // })
  }

  return (
    <div> 
        {/* <Navbar  currentPage={2}/> */}
              <div className="jumbotron" style={{width:"1000px"}}>
              {
                  skeletonAffiche ? <SkelettonForm /> : <>

                <h4 className="" id='title1'>{isInsert ? "Ajouter type chambre" : "Modifier type chambre"}</h4>
                <CustomError errors={state.errors} />
                <form className="needs-validation" style={{marginTop:'15px'}}>
                  <div className="row">
                    <div className="col">
                    <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                      <p id='libel'>
                      Nom
                      </p>
                            } 
                      style={{width:'315px'}}
                      type="text" 
                      value={state.nom} onChange={(e) => handleInputChange(e, "nom")}
                      error={state.error.nom === null ? false : true}
                      helperText={state.error.nom === null ? null : state.error.nom}
                      />                    
                    </div>
                    <div className="col">
                    <TextField 
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                      <p id='libel'>
                      Name
                      </p>
                            } 
                      style={{width:'315px'}}
                      type="text" 
                      value={state.name} onChange={(e) => handleInputChange(e, "name")}
                      error={state.error.name === null ? false : true}
                      helperText={state.error.name === null ? null : state.error.name}
                      />                    
                    </div>  
                  </div>

                    <div style={{marginTop:'40px'}} className='row'>
                      <div className="col">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size='small'
                        label={
                          <p id='libel'>
                          Chambre total
                          </p>
                              } 
                        type="number"
                        style={{width:'315px'}}
                        value={state.chambreTotal} onChange={(e) => handleInputChange(e, "chambreTotal")}
                        error={state.error.chambreTotal === null ? false : true}
                        helperText={state.error.chambreTotal === null ? null : state.error.chambreTotal}
                      />
                      </div>
                      <div className="col">
                      <TextField 
                          id="outlined-basic"
                          variant="outlined"
                          size='small'
                          label={
                            <p id='libel'>
                                Etage
                            </p>
                                } 
                          type="number"
                          style={{width:'315px'}}
                          value={state.etage} onChange={(e) => handleInputChange(e, "etage")}
                          error={state.error.etage === null ? false : true}
                          helperText={state.error.etage === null ? null : state.error.etage}
                      />   
                      </div> 
                     </div>
                    <div style={{marginTop:'40px'}} id='input-group1'>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size='small'
                        label={
                          <p id='libel'>
                              Superficie
                          </p>
                              }
                        type="number"
                        style={{width:'315px'}}
                        value={state.superficie} onChange={(e) => handleInputChange(e, "superficie")}
                        error={state.error.superficie === null ? false : true}
                        helperText={state.error.superficie === null ? null : state.error.superficie}
                      />
                    </div>
                    <div id="error" ref={errorRef}>
                      <PhotoChambre state={state} setState={setState} noImage={noImage}
                        photo={photo} setPhoto={setPhoto} preview={preview} setPreview={setPreview}
                        areImagesLoading={areImagesLoading} setAreImagesLoading={setAreImagesLoading}
                        showGalerie={showGalerie} setShowGalerie={setShowGalerie} switchShowGalerie={switchShowGalerie}
                        nbPhotoBefore={nbPhotoBefore} isInsert={isInsert} setImageCrop={setImageCrop}
                        switchShowImageCrop={switchShowImageCrop} setAlertRedirect={setAlertRedirect}
                        
                      />
                      
                    {
                      imageCrop && (
                        <div style={{marginTop:'10px'}}>
                          <div>
                            <label className="form-label mt-4" style={{textDecoration:'underline'}} id='bigLabel'>Photo Crop</label>
                          </div>
                            <img src={imageCrop} />
                        </div>
                      )
                    }
                      
                        {
                          AlertRedirect ?<Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">photo profil null</Alert>
                          </Stack> : null
                        }
                    </div>
                    <Galerie showGalerie={showGalerie} setShowGalerie={setShowGalerie} 
                      photoSortie={photo} setPhotoSortie={setPhoto} nbPhotoBeforeSortie={nbPhotoBefore}
                      previewSortie={preview} setPreviewSortie={setPreview} 
                      setImageCrop={setImageCrop} imageCrop={imageCrop}
                    />


                    <VideoChambre state={state} setState={setState} />

                    <div style={{marginTop:'10px'}}>
                      <label className="form-label mt-4" 
                      style={{textDecoration:'underline'}}
                      id='bigLabel'>
                        Occupation 
                      </label>
                    </div>
                    <div style={{marginTop:'5px'}} className='row'>

                      <div className="col">
                      <TextField 
                          id="outlined-basic"
                          variant="outlined"
                          size='small' 
                          label={
                            <p id='libel'>
                                Adulte
                            </p>
                                }
                          type="number"
                          value={state.nbAdulte}
                          onChange={(e) => handleInputChange(e, "nbAdulte")}
                          style={{width:'315px'}}
                          error={state.error.nbAdulte === null ? false : true}
                          helperText={state.error.nbAdulte === null ? null : state.error.nbAdulte}
                      />
                      </div>

                      <div className="col">
                        <TextField 
                        id="outlined-basic"
                        variant="outlined"
                        size='small'
                        label={
                          <p id='libel'>
                              Enfant
                          </p>
                              }  
                        type="number" 
                        value={state.nbEnfant}
                        onChange={(e) => handleInputChange(e, "nbEnfant")}
                        style={{width:'315px'}}
                        error={state.error.nbEnfant === null ? false : true}
                        helperText={state.error.nbEnfant === null ? null : state.error.nbEnfant}
                        />
                      </div>
                    </div>

                    <div style={{marginTop:'15px'}}>
                      <div style={{}}>
                      <label className="form-label mt-4" 
                      style={{textDecoration:'underline'}}
                      id='bigLabel'>
                        Description
                      </label>
                    </div>
                    <TextField id="outlined-basic" variant="outlined" type='text'
                      placeholder=""
                      multiline
                      rows={2}
                      rowsmax={4}
                      label={
                        <p id='libel'>
                            Description
                        </p>
                             }
                      style={{width:'100%',height:'50px',marginTop:'5px'}}
                      value={state.description}
                      onChange={(e) => handleInputChange(e, "description")} 
                      error={state.error.description === null ? false : true}
                      helperText={state.error.description === null ? null : state.error.description}
                    />

                    <TextField id="outlined-basic" variant="outlined" type='text'
                      placeholder=""
                      multiline
                      rows={2}
                      rowsmax={4}
                      label={
                        <p id='libel'>
                            Description en Anglais
                        </p>
                             }
                      style={{width:'100%',height:'50px',marginTop:'55px'}}
                      value={state.desc}
                      onChange={(e) => handleInputChange(e, "desc")} 
                      error={state.error.desc === null ? false : true}
                      helperText={state.error.desc === null ? null : state.error.desc}
                    />

                    
                    <Equipement state={state} setState={setState} />
                    <div style={{marginTop:'15px'}}>
                      <div>
                        <label className="form-label-mt4"
                          style={{textDecoration: 'underline'}}
                          id='bigLabel'>
                          Plan tarifaire attribué
                        </label>
                      </div>
                      <FormGroup>
                        <PlanTarifaire planTarifaire={state.planTarifaire} handleCheckBoxPlanTarifaire={handleCheckBoxPlanTarifaire}/>
                      </FormGroup>
                    </div>
                    </div>
                  

                    <div className="pied" style={{marginTop:'30px'}}>   
                     <div class="bouton-aligne">

                       {
                         imageCrop == null ? 
                          <Button  
                            variant="contained" 
                            type='submit' 
                            id='btn1'
                            onClick={(e) =>redirectError(e)}
                            style={{backgroundColor:'#2ac4ea' }}>
                            <span style={{color:'white'}}>Ajouter</span>
                          </Button> : 
                          <>
                              { isInsert && hasARInsert 
                                ? <>
                                  { btnLoad 
                                  ? <ButtonLoading /> 
                                  : <Button  
                                    variant="contained" 
                                    type='submit' 
                                    id='btn1'
                                    onClick={(e) => insert(e)}
                                    style={{backgroundColor:'#2ac4ea' }}>
                                    <span style={{color:'white'}}>Ajouter</span>
                                  </Button> }
                                </> 
                                : null }
                          </>
                       }
                      

                      { !isInsert && hasARUpdate
                      ? <>
                        { btnLoad 
                        ? <ButtonLoading />
                        : <Button  
                          variant="contained" 
                          type='submit' 
                          id='btn1'
                          onClick={(e) => update(e)}
                          style={{backgroundColor:'#2ac4ea' }}>
                          <span style={{color:'white'}}>Modifier</span>
                        </Button> }
                        </>
                      : null}
                     </div>
                     <div class="bouton-aligne">
                      <Link to={'/back/typeChambre'} style={{textDecoration:'none'}}>
                        <Button variant="outlined" 
                        id="btn2">
                          <span style={{color:'#1976d2'}}>Retour</span>
                        </Button>
                      </Link>
                     </div>
                    </div>
                </form>

                <ImageCrop showImageCrop={showImageCrop}
                    switchShowImageCrop={switchShowImageCrop} 
                    srcImg={srcImg} 
                    imageCrop={imageCrop} 
                    setImageCrop={setImageCrop}
                    setIsModifImgCrop={setIsModifImgCrop}
                /> 
                </>
              }
              </div>
            </div>
  );
}

export default function InsertTypeCHambre_(){
  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
  let titre = "";
  isInsert ? titre = "Ajout type chambre" : titre = "Modifier type chambre"
  return (
    <ResponsiveDrawer
      title= {titre}
      getContent = {InsertTypeCHambre}
    />
  );
};