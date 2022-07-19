import { useState, useEffect, cloneElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'

import {session} from '../../../common/utilitySession.js';
import callAPI from '../../../../utility.js';
import  ResponsiveDrawer  from "../../Navbar/responsive-drawer.js";
import NotEnoughAccessRight from '../../../common/NotEnoughAccessRight';

import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import ButtonLoading from "../../Galerie/Galerie";
import SkelettonForm from '../../../../SkeletonListe/SkeletonFormulaire.js';
import PhotoHotel from './Photo/PhotoHotel.js';
import CustomMapPicker from './CustomMapPicker';
import GenericInfo from './GenericInfo';
import Coordinates from './Coordinates';

const DefaultLocation = { lat: -18.903233, lng: 47.520430 };
const DefaultZoom = 17;
let isInsert = false;
let hasARInsert = false;
let hasARUpdate = false;
let hasARGet = false;

export default function InsertHotel_() {
  const isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;

  return(
      <ResponsiveDrawer
          title = {isInsert ? 'Créer un nouveau hôtel' : 'Modifier un hôtel'}
          getContent = {InsertHotel}
      />

  );
}

const noImage = '/no-image.jpg';

function InsertHotel() {
  
  const [link, setLink] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [vignette, setVignette] = useState('');
  const [photo, setPhoto] = useState('');
  const [isTVAIncluded, setIsTVAIncluded] = useState(false);
  const [TVA, setTVA] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [minBabyAge, setMinBabyAge] = useState(0);
  const [maxBabyAge, setMaxBabyAge] = useState(0);
  const [minKidAge, setMinKidAge] = useState(0);
  const [maxKidAge, setMaxKidAge] = useState(0);
  const [preview, setPreview] = useState(0);

  const [linkError, setLinkError] = useState(null);
  const [phoneNumError, setPhoneNumError] = useState(null);
  const [minBabyAgeError, setMinBabyAgeError] = useState(null);
  const [maxBabyAgeError, setMaxBabyAgeError] = useState(null);
  const [minKidAgeError, setMinKidAgeError] = useState(null);
  const [maxKidAgeError, setMaxKidAgeError] = useState(null);
  const [emailAddressError, setEmailAddressError] = useState(null);
  const [vignetteError, setVignetteError] = useState(null);
  const [checkInError, setCheckInError] = useState(null);
  const [checkOutError, setCheckOutError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [TVAError, setTVAError] = useState(null);

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState({lat: '', lng: ''});
  const [zoom, setZoom] = useState(DefaultZoom);

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [skeletonAffiche, setSkeleton] = useState(true);
  const [isMapPickerToDisplay, setIsMapPickerToDisplay] = useState(false);
  const [isModifImg, setIsModifImg]= useState(false);

  const { _id } = useParams();
  const history = useHistory();

  function resetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  function setHotelDetails(data){
    console.log(data);
    const { hotel } = data;
    const setters = [
      ['link', setLink],
      ['phonenum', setPhoneNum, setPhoneNumError],
      ['emailAddress', setEmailAddress, setEmailAddressError],
      ['vignette', setVignette, setVignetteError],
      [photo, setPhoto],
      ['isTVAIncluded', setIsTVAIncluded],
      ['TVA', setTVA, setTVAError],
      ['checkIn', setCheckIn, setCheckInError],
      ['checkOut', setCheckOut, setCheckOutError],
      ['address', setAddress, setAddressError],
      ['name', setName, setNameError],
      ['minBabyAge', setMinBabyAge, setMinBabyAgeError],
      ['maxBabyAge', setMaxBabyAge, setMaxBabyAgeError],
      ['minKidAge', setMinKidAge, setMinKidAgeError],
      ['maxKidAge', setMaxKidAge, setMaxKidAgeError],
    ];
    setters.forEach((setter) => {
      setter[1](hotel[setter[0]]);
    });
  }

  useEffect(() => {
    isInsert = new RegExp("/insert", "i").exec(window.location.href) === null ? false : true;
    hasARInsert = session.getInstance().hasOneOfTheseAccessRights(["insertHotel", "superAdmin"]);
    hasARUpdate = session.getInstance().hasOneOfTheseAccessRights(["updateHotel", "superAdmin"]);
    hasARGet = session.getInstance().hasOneOfTheseAccessRights(["getOneHotel", "superAdmin"]);
    if(isInsert && hasARInsert){
      setSkeleton(false);
    }else if(hasARGet || hasARUpdate){
      callAPI('get', '/hotel/details/' + _id, {}, setHotelDetails);
    }
  }, [])

  function callbackInsert (res) {
    const { status, errors } = res;
    const callback = {
      200: () => { history.push('/back/hotel') },
      400: () => {
        const setterErrors = {
          link: setLinkError,
          phoneNum: setPhoneNumError,
          emailAddress: setEmailAddressError,
          vignette: setVignetteError,
          photo: setPhotoError,
          TVA: setTVAError,
          checkIn: setCheckInError,
          checkOut: setCheckOutError,
          address: setAddressError,
          name: setNameError,
          minBabyAge: setMinBabyAgeError,
          maxBabyAge: setMaxBabyAgeError,
          minKidAge: setMinKidAgeError,
          maxKidAge: setMaxKidAgeError,
        };
        Object.keys(errors).forEach((errorName) => {
          setterErrors[errorName](errors[errorName]);
        });
      },
    }
    callback[res.status]();
  }

  function insert(e) {
    e.preventDefault()
    // setIsBtnLoading(true)
    const payload = {
      link,
      phoneNum,
      emailAddress,
      vignette: Number.parseFloat(vignette),
      photo,
      isTVAIncluded,
      TVA: Number.parseFloat(TVA),
      checkIn,
      checkOut,
      address,
      name,
      minBabyAge: Number.parseInt(minBabyAge),
      maxBabyAge: Number.parseInt(maxBabyAge),
      minKidAge: Number.parseInt(minKidAge),
      maxKidAge: Number.parseInt(maxKidAge),
      location,
    };

    console.log(payload);

    callAPI('post', '/hotel/insert', payload , callbackInsert);
  }

  function update(e){
    e.preventDefault();
    // setIsBtnLoading(true);
    const payload = {
      link, phoneNum,
      emailAddress,
      vignette,
      photo,
      isTVAIncluded,
      TVA,
      checkIn,
      checkOut,
      address,
      name,
      minBabyAge,
      maxBabyAge,
      minKidAge,
      maxKidAge,
      location,
      isModifImg,
    };

    callAPI('post', '/hotel/update', payload, () => {});
  }

  const displayMapPicker = {
    true: (
      <CustomMapPicker
        setLocation = { setLocation }
        resetLocation = { resetLocation }
        defaultLocation = { defaultLocation }
        zoom = { zoom }
        setZoom = { setZoom }
        setIsMapPickerToDisplay = { setIsMapPickerToDisplay }
      />
    ),

    false: (
      <div className="block">
        <div className="center">
          { skeletonAffiche ? <SkelettonForm  heigth = {300} /> : null }

          <GenericInfo
            name = { name }
            setName = { setName }
            nameError = { nameError }
            setNameError = { setNameError }
            link = { link }
            setLink = { setLink }
            linkError = { linkError }
            setLinkError = { setLinkError }
            phoneNum = { phoneNum }
            setPhoneNum = { setPhoneNum }
            phoneNumError = { phoneNumError }
            setPhoneNumError = { setPhoneNumError }
            emailAddress = { emailAddress }
            setEmailAddress = { setEmailAddress }
            emailAddressError = { emailAddressError }
            setEmailAddressError = { setEmailAddressError }
            address = { address }
            setAddress = { setAddress }
            addressError = { addressError }
            setAddressError = { setAddressError }
            vignette = { vignette }
            setVignette = { setVignette }
            vignetteError = { vignetteError }
            setVignetteError = { setVignetteError }
          />
          
          <div className="photoHotel">
            <PhotoHotel
              setPhoto = { setPhoto }
              photoError = { photoError }
              setPhotoError = { setPhotoError }
              preview = { preview }
              setPreview = { setPreview }
              noImage = { noImage }
              setIsModifImg = { setIsModifImg }
            />
          </div>

          <div className="form-group" style={{marginTop:'15px'}}>
            <label style={{textDecoration:'underline'}} id='bigLabel'>Horaire</label>
            <br/>
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
                  onChange={(e) => { 
                    setCheckIn(e.target.value);
                    setCheckInError(null);
                  } }
                  value={ checkIn }
                  error={ !!checkInError }
                  helperText={ checkInError }
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
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setCheckOutError(null);
                  } }
                  value={ checkOut }
                  error={ !!checkOutError }
                  helperText={ checkOutError }
                />
              </box>
            </div>
          </div>

          <RadioGroup
            aria-label="Lead"
            defaultValue="oui"
            name="radio-buttons-group"
          >
            <div className ="form-group" style={{marginTop:'15px'}}>
              <label style={{textDecoration:'underline'}} id='bigLabel'>Votre tarif inclus déjà la TVA ?</label>
              <div className="">
                <FormControlLabel
                  value="oui"
                  checked={ isTVAIncluded }
                  onClick={ () => setIsTVAIncluded(true) }
                  control={<Radio />}
                  label={<span id="litleLabel">Oui</span>}
                />
              </div>
              <div className="">
                <FormControlLabel
                  value="non"
                  checked={ !isTVAIncluded }
                  onClick={ () => setIsTVAIncluded(false) }
                  control={<Radio />}
                  label={<span id="litleLabel">Non</span>}
                />
              </div>
            </div>
          </RadioGroup>

          <div className ="form-group" style={{marginTop:'15px'}}>
            {
              !isTVAIncluded
              ? <TextField
                id="outlined-basic"
                label="taxes communale"
                variant="outlined"
                className="form-control"
                style={{width:"400px"}}
                size="small"
                type="number"
                name="TVA"
                onChange={ (e) => setTVA(e.target.value) }
                value={ TVA }
              />
              : null
            }
          </div>

          <div className="form-group" style={{marginTop:"20px"}}>
            <label style={{textDecoration:'underline'}} id='bigLabel'>Age</label>
            <br/>
            <div style={{marginTop:'15px'}}>
              <box>
                <span style={{position:'relative',top:'9px'}}>Bébé a partir de</span>
                <TextField
                  id="outlined-basic"
                  label="min"
                  variant="outlined"
                  className="form-control"
                  style={{width:"100px",marginLeft:'5px'}}
                  size="small"
                  type="number"
                  name="ageBebe"
                  onChange={ (e) => { 
                    setMinBabyAge(e.target.value);
                    setMinBabyAgeError(null);
                  } }
                  value = { minBabyAge }
                  error={ !!minBabyAgeError }
                  helperText={ minBabyAgeError }
                />
                <span style={{marginTop:'15px',position:'relative',top:'9px',marginLeft:'5px'}}>jusqu'à</span>
                <TextField
                  id="outlined-basic"
                  label="max"
                  variant="outlined"
                  className="form-control"
                  style={{width:"100px",marginLeft:'5px'}}
                  size="small"
                  type="number"
                  name="ageBebe"
                  onChange={ (e) => {
                    setMaxBabyAge(e.target.value);
                    setMaxBabyAgeError(null);
                  } }
                  value={ maxBabyAge }
                  error={ !!maxBabyAgeError }
                  helperText={ maxBabyAgeError }
                />
              </box>
            </div>
          </div>
          <div className="form-group" style={{marginTop:'30px'}}>
            <box>
              <span style={{position:'relative',top:'9px'}}>Enfant a partir de</span>
              <TextField
                id="outlined-basic"
                label="min"
                variant="outlined"
                className="form-control"
                style={{width:"100px",marginLeft:'5px'}}
                size="small"
                type="number"
                name="ageEnfant"
                onChange={ (e) => {
                  setMinKidAge(e.target.value);
                  setMinKidAgeError(null);
                }}
                value={ minKidAge }
                error={ !!minKidAgeError }
                helperText={ minKidAgeError }
              />
              <span style={{marginTop:'15px',position:'relative',top:'9px',marginLeft:'5px'}}>jusqu'à</span>
              <TextField
                id="outlined-basic"
                label="max"
                variant="outlined"
                className="form-control"
                style={{width:"100px",marginLeft:'5px'}}
                size="small"
                type="number"
                name="ageEnfant"
                onChange={ (e) => {
                  setMaxKidAge(e.target.value);
                  setMaxKidAgeError(null);
                } }
                value={ maxKidAge }
                error={ !!maxKidAgeError }
                helperText={ maxKidAgeError }
              />
            </box>
          </div>

          <Coordinates
            setIsMapPickerToDisplay = { setIsMapPickerToDisplay }
            location = { location }
            setLocation = { setLocation }
          />

          <div>
            <div class="bouton-aligne" style={{marginTop:"20px"}}>
              {
                isBtnLoading
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
              <Button variant="outlined" id="btn2">
                <span style={{color:'#1976d2'}}>Retour</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (displayMapPicker[isMapPickerToDisplay]);
}