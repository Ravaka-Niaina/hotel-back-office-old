import { useState } from 'react';
import {useEffect} from "react";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import callAPI from '../../../utility.js';
import ButtonLoading from "../buttonLoading.js";
import SkelettonForm from '../../../SkeletonListe/SkeletonFormulaire.js';
import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";
import PhotoChambre from './insertHotel/Photo/PhotoChambre.js';

import MapPicker from "react-google-map-picker";

const DefaultLocation = { lat: -18.903233, lng: 47.520430 };
const DefaultZoom = 17;

function InsertHotel() {

  const noImage = '/no-image.jpg';

  let [state, setState] = useState({
    errors: [],
    error: {
      lien: null,
      ageBebeMin: null,
      ageBebeMax: null,
      ageEnfantMin: null,
      ageEnfantMax: null,
      telephone : null,
      email : null,
      vignette : null,
      taxe : null,
      checkIn : null,
      checkOut : null,
      adresse : null,
      photo : null,
    },

    lien : "",
    telephone : "",
    email : "",
    vignette : "",
    photo : "",
    TVA : true,
    taxe : "",
    checkIn : "",
    checkOut : "",
    adresse : "",

    ageEnfant: { min: '', max: '' },
    ageBebe: { min: '', max: '' },
    preview: [noImage],

  })

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState({lat: '', lng: ''});
  const [zoom, setZoom] = useState(DefaultZoom);
  const [photo, setPhoto] = useState([]);
  const [preview, setPreview] = useState([]);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  const [btnLoad, setBtnLoad] = useState(false);
  const [skeletonAffiche, setSkeleton] = useState(true);
  const [taxe, setTaxe] = useState(true);
  const [maps, setMaps] = useState(false);

  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;

  const history = useHistory();

  const { _id } = useParams();

  function removeError(fields){
    let current = {...state};

  }

  function setDetailsHotel(data){
    let error = {...state.error};
    let current = JSON.parse(JSON.stringify(state));
    current = data.hotel;
    current.error = error;
    
    setLocation(data.hotel.location);
    
    if(current.photo != '' || 
    current.photo != undefined ||
    current.photo != null){
      current.preview = [];
            for(let i = 0; i < current.photo.length; i++){
              current.preview[i] = process.env.REACT_APP_BACK_URL + "/" + current.photo[i];
            }
        }

    setState(current);
    setSkeleton(false);
  }

  useEffect(() => {
    if(!isInsert){
      callAPI('get', '/hotel/details/' + _id, {}, setDetailsHotel);
    }
  }, [])


  function tryRedirect(res) {
    let currentState = JSON.parse(JSON.stringify(state))
    let keys = Object.keys(currentState.error)
    keys.map((k) => {
      currentState.error[k] = null
    })
    if (res.status === 200) {
      history.push('/back/hotel')
    } else if (res.status === 401) {
      //Unauthorized
      history.push('/back/login')
    } else {
      setBtnLoad(false)
      console.log(res.errors);
      let keys = Object.keys(res.errors)
      keys.map((k) => {
        currentState.error[k] = res.errors[k]
      })
    }
    setState(currentState)
    setBtnLoad(false);
  }

  function insert(e) {
    e.preventDefault()
    setBtnLoad(true)
    let toSend = JSON.parse(JSON.stringify(state))
    toSend.location=location

    callAPI('post', '/hotel/create', toSend , tryRedirect);
  }

  function update(e){
    e.preventDefault();
    let toSend = JSON.parse(JSON.stringify(state));
    toSend.location=location;
    setBtnLoad(true);

    callAPI('post', '/hotel/update', toSend, tryRedirect);
  }

  function handleInputChange(event, inputName) {
    const currentState = JSON.parse(JSON.stringify(state))
    currentState[inputName] = event.target.value
    currentState.error[inputName] = null
    setState(currentState)
  }

  function handleInputChange1(event, inputName1,inputName2) {
    const currentState = JSON.parse(JSON.stringify(state))
    currentState[inputName1][inputName2] = event.target.value
    setState(currentState)
  }

  function handleInputChangeInput2(e , fieldname){
        setLocation(e.target.value);      
}

  function handleIsTvaChange(value) {
    let temp = { ...state }
    temp.TVA = value
    setState(temp)
  }

  return (
    <>
      {/* <Navbar currentPage={3}/> */}
      {maps ?
      <div>
          <button onClick={handleResetLocation}>Reset Location</button>
          <br/>

          <MapPicker
            defaultLocation={defaultLocation}
            zoom={zoom}
            style={{ height: "700px" }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
          />

          <box>
            <TextField
                id="outlined-basic"
                InputLabelProps={{
                  shrink: true,
                  }}
                label="Latitute"
                variant="outlined"
                className="form-control"
                style={{width:"250px",marginTop:"15px"}}
                size="small"
                type="text"
                value={location.lat}
                onChange={e => handleInputChangeInput2(e)}
                disabled
            />

            <TextField
                id="outlined-basic"
                InputLabelProps={{
                  shrink: true,
                  }}
                label="Longitute"
                variant="outlined"
                className="form-control"
                style={{width:"250px",marginTop:"15px",marginLeft:"30px"}}
                size="small"
                type="text"
                value={location.lng}
                onChange={e => handleInputChangeInput2(e)}
                disabled
            />

          <TextField
                id="outlined-basic"
                InputLabelProps={{
                  shrink: true,
                  }}
                label="Zoom"
                variant="outlined"
                className="form-control"
                style={{width:"250px",marginTop:"15px",marginLeft:"30px"}}
                size="small"
                type="text" 
                value={zoom} 
                disabled

            />

              <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2ac4ea',marginLeft : "30px",marginTop:"15px"}}
                onClick={(e) => setMaps(false)}
              >
              <span style={{ color: 'white' }}>Ok</span>
              </Button>
          </box>

        </div>
:
      <div className="block">
          <h4 id="title1">{isInsert ? "Ajouter une nouvelle hotel" : "Modifier une hotel"}</h4><br/>

        <div className="form-group" style={{}}>
            <TextField
                id="outlined-basic"
                label="lien"
                variant="outlined"
                className="form-control"
                style={{width:"400px",marginTop:"15px"}}
                size="small"
                type="text"
                name="lien"
                onChange={(e) => handleInputChange(e, "lien")}
                value={state.lien}
                error={state.error.lien === null ? false : true}
                helperText={state.error.lien === null ? null : state.error.lien}
            />

            <TextField
                id="outlined-basic"
                label="telephone"
                variant="outlined"
                className="form-control"
                style={{width:"400px",marginTop:"15px"}}
                size="small"
                type="text"
                name="telephone"
                onChange={(e) => handleInputChange(e, "telephone")}
                value={state.telephone}
                error={state.error.telephone === null ? false : true}
                helperText={state.error.telephone === null ? null : state.error.telephone}
            />


        </div>

        <div className="form-group" style={{}}>
            <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                className="form-control"
                style={{width:"400px",marginTop:"15px"}}
                size="small"
                type="email"
                name="email"
                onChange={(e) => handleInputChange(e, "email")}
                value={state.email}
                error={state.error.email === null ? false : true}
                helperText={state.error.email === null ? null : state.error.email}
            />

        </div>

        <div className="form-group" style={{}}>
            <TextField
                id="outlined-basic"
                label="adresse"
                variant="outlined"
                className="form-control"
                style={{width:"400px",marginTop:"15px"}}
                size="small"
                type="text"
                name="adresse"
                onChange={(e) => handleInputChange(e, "adresse")}
                value={state.adresse}
                error={state.error.adresse === null ? false : true}
                helperText={state.error.adresse === null ? null : state.error.adresse}
            />
        </div>

        <div className="form-group" style={{}}>
            <TextField
                id="outlined-basic"
                label="vignette touristique"
                variant="outlined"
                className="form-control"
                style={{width:"400px",marginTop:"15px"}}
                size="small"
                type="number"
                name="vignette"
                onChange={(e) => handleInputChange(e, "vignette")}
                value={state.vignette}
                error={state.error.vignette === null ? false : true}
                helperText={state.error.vignette === null ? null : state.error.vignette}
            />

        </div>

        <PhotoChambre state={state} setState={setState} noImage={noImage}/>

        <div className="form-group" style={{marginTop:'15px'}}>
        <label >Horaire</label><br/>
         <div style={{marginTop:'15px'}}>
          <box>
            <TextField
                id="outlined-basic"
                InputLabelProps={{
                  shrink: true,
                  }}
                label="checkIn"
                variant="outlined"
                className="form-control"
                style={{width:"100px"}}
                size="small"
                type="time"
                name="checkIn"
                onChange={(e) => handleInputChange(e, "checkIn")}
                value={state.checkIn}
                error={state.error.checkIn === null ? false : true}
                helperText={state.error.checkIn === null ? null : state.error.checkIn}
            />

            <TextField
                id="outlined-basic"
                InputLabelProps={{
                  shrink: true,
                  }}
                label="checkOut"
                variant="outlined"
                className="form-control"
                style={{width:"100px",marginLeft:"15px"}}
                size="small"
                type="time"
                name="checkOut"
                onChange={(e) => handleInputChange(e, "checkOut")}
                value={state.checkOut}
                error={state.error.checkOut === null ? false : true}
                helperText={state.error.checkOut === null ? null : state.error.checkOut}
            />
          </box>
         </div>
        </div>

        <RadioGroup
      aria-label="Lead"
      defaultValue="oui"
      name="radio-buttons-group"
    >
      <div className ="" style={{marginTop:'15px'}}>
      <label>Votre tarifs inclus déjà la TVA ?</label>
        <div className="">
          <FormControlLabel
            value="oui"
            onClick={(e) => {handleIsTvaChange(true);setTaxe(true)}}
            control={<Radio />}
            label={<span id="litleLabel">Oui</span>}
          />
        </div>
        <div className="">
          <FormControlLabel
            value="non"
            onClick={(e) => {handleIsTvaChange(false);setTaxe(false)}}
            control={<Radio />}
            label={<span id="litleLabel">Non</span>}
          />
        </div>
      </div>
    </RadioGroup>

    <div className ="" style={{marginTop:'15px'}}>
          { taxe ?
           <TextField
                id="outlined-basic"
                label="taxes communale"
                variant="outlined"
                className="form-control"
                style={{width:"400px"}}
                size="small"
                type="number"
                name="taxe"
                onChange={(e) => handleInputChange(e, "taxe")}
                value={state.taxe}
                // error={state.error.nom === null ? false : true}
                // helperText={state.error.nom === null ? null : state.error.nom}
            />
            :
            null
          }
      </div>

        <div className="form-group" style={{marginTop:"20px"}}>
        <label>Age</label>
        <br/>
         <div style={{marginTop:'15px'}}>
          <box>
            <span>Bébé a partir de</span>
            <TextField
                id="outlined-basic"
                label="min"
                variant="outlined"
                className="form-control"
                style={{width:"200px"}}
                size="small"
                type="number"
                name="ageBebe"
                onChange={(e) => handleInputChange1(e , "ageBebe" ,"min")}
                value={state.ageBebe.min}
                error={state.error.ageBebeMin === null ? false : true}
                helperText={state.error.ageBebeMin === null ? null : state.error.ageBebeMin}
            />
            <span>jusqu'à</span>
            <TextField
                id="outlined-basic"
                label="max"
                variant="outlined"
                className="form-control"
                style={{width:"200px"}}
                size="small"
                type="number"
                name="ageBebe"
                onChange={(e) => handleInputChange1(e , "ageBebe","max" )}
                value={state.ageBebe.max}
                error={state.error.ageBebeMax === null ? false : true}
                helperText={state.error.ageBebeMax === null ? null : state.error.ageBebeMax}
            />
          </box>
         </div>

        </div>

        <div className="form-group" style={{marginTop:'15px'}}>
          <box>
          <span>Enfant a partir de</span>
            <TextField
                id="outlined-basic"
                label="min"
                variant="outlined"
                className="form-control"
                style={{width:"200px"}}
                size="small"
                type="number"
                name="ageEnfant"
                onChange={(e) => handleInputChange1(e,"ageEnfant","min")}
                value={state.ageEnfant.min}
                error={state.error.ageEnfantMin=== null ? false : true}
                helperText={state.error.ageEnfantMin === null ? null : state.error.ageEnfantMin}
            />
            <span>jusqu'à</span>
            <TextField
                id="outlined-basic"
                label="max"
                variant="outlined"
                className="form-control"
                style={{width:"200px"}}
                size="small"
                type="number"
                name="ageEnfant"
                onChange={(e) => handleInputChange1(e , "ageEnfant" , "max" )}
                value={state.ageEnfant.max}
                error={state.error.ageEnfantMax === null ? false : true}
                helperText={state.error.ageEnfantMax === null ? null : state.error.ageEnfantMax}
            />
          </box>

        </div>

              <div style={{marginTop:"15px"}}>
              <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2ac4ea' }}
                onClick={(e) => setMaps(true)}
              >
              <span style={{ color: 'white' }}>Coordonnées gps</span>
              </Button>
              </div>

   <div>
    <div class="bouton-aligne" style={{marginTop:"20px"}}>
      {
        btnLoad
          ? <ButtonLoading />
          : <>{ isInsert
              ? <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2ac4ea' }}
                onClick={(e) => insert(e)}
              >
                <span style={{ color: 'white' }}>Ajouter</span>
              </Button>
              :  <Button
              variant="contained"
              type='submit'
              style={{backgroundColor:'#FA8072'}}
              onClick={(e) => update(e)}>
              <span style={{color:'white'}}>Modifier</span>
            </Button> }
          </>
      }
    </div>
    <div class="bouton-aligne">
      <Link to={'/back/promotion'} style={{textDecoration:'none'}}>
        <Button variant="outlined"
        id="btn2"
        >
        <span style={{color:'#1976d2'}}>Retour</span>
        </Button>
      </Link>
    </div>
   </div>
</div>
  }
</>
  );
}

export default function recherche_() {
  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;

  let titre = "";
  isInsert ? titre = "Ajout nouvelle hotel" : titre = "Modifier hotel"

  return(
      <ResponsiveDrawer
          title = {titre}
          getContent = {InsertHotel}
      />

  );
}
