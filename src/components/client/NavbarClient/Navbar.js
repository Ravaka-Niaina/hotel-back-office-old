import './Navbar.css';
import * as React from 'react';
import { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import {Language, AccountCircle, LiveHelp, Login} from '@mui/icons-material';
import {Button, IconButton, Typography, Toolbar, AppBar, Avatar} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';

import {session} from "../../common/utilitySession.js";
import { useTranslation } from "react-i18next";

import Dropdown from 'react-dropdown';

import ButtonLoading from "./buttonLoading.js";

let deviseOriginal = [
    {label:"USD" , value :'United States Dollars'},
	{label:"EUR", value :'Euro'},
	{label:"GBP", value :'United Kingdom Pounds'},
	{label:"DZD", value :'Algeria Dinars'},
	{label:"ARP", value :'Argentina Pesos'},
	{label:"AUD", value :'Australia Dollars'},
	{label:"ATS", value :'Austria Schillings'},
	{label:"BSD", value :'Bahamas Dollars'},
	{label:"BBD", value :'Barbados Dollars'},
	{label:"BEF", value :'Belgium Francs'},
	{label:"BMD", value :'Bermuda Dollars'},
	{label:"BRR", value :'Brazil Real'},
	{label:"BGL", value :'Bulgaria Lev'},
	{label:"CAD", value :'Canada Dollars'},
	{label:"CLP", value :'Chile Pesos'},
	{label:"CNY", value :'China Yuan Renmimbi'},
	{label:"CYP", value :'Cyprus Pounds'},
	{label:"CSK", value :'Czech Republic Koruna'},
	{label:"DKK", value :'Denmark Kroner'},
	{label:"NLG", value :'Dutch Guilders'},
	{label:"XCD", value :'Eastern Caribbean Dollars'},
	{label:"EGP", value :'Egypt Pounds'},
	{label:"FJD", value :'Fiji Dollars'},
	{label:"FIM", value :'Finland Markka'},
	{label:"FRF", value :'France Francs'},
	{label:"DEM", value :'Germany Deutsche Marks'},
	{label:"XAU", value :'Gold Ounces'},
	{label:"GRD", value :'Greece Drachmas'},
	{label:"HKD", value :'Hong Kong Dollars'},
	{label:"HUF", value :'Hungary Forint'},
	{label:"ISK", value :'Iceland Krona'},
	{label:"INR", value :'India Rupees'},
	{label:"IDR", value :'Indonesia Rupiah'},
	{label:"IEP", value :'Ireland Punt'},
	{label:"ILS", value :'Israel New Shekels'},
	{label:"ITL", value :'Italy Lira'},
	{label:"JMD", value :'Jamaica Dollars'},
	{label:"JPY", value :'Japan Yen'},
	{label:"JOD", value :'Jordan Dinar'},
	{label:"KRW", value :'Korea (South) Won'},
	{label:"LBP", value :'Lebanon Pounds'},
	{label:"LUF", value :'Luxembourg Francs'},
	{label:"MYR", value :'Malaysia Ringgit'},
	{label:"MXP", value :'Mexico Pesos'},
	{label:"NLG", value :'Netherlands Guilders'},
	{label:"NZD", value :'New Zealand Dollars'},
	{label:"NOK", value :'Norway Kroner'},
	{label:"PKR", value :'Pakistan Rupees'},
	{label:"XPD", value :'Palladium Ounces'},
	{label:"PHP", value :'Philippines Pesos'},
	{label:"XPT", value :'Platinum Ounces'},
	{label:"PLZ", value :'Poland Zloty'},
	{label:"PTE", value :'Portugal Escudo'},
	{label:"ROL", value :'Romania Leu'},
	{label:"RUR", value :'Russia Rubles'},
	{label:"SAR", value :'Saudi Arabia Riyal'},
	{label:"XAG", value :'Silver Ounces'},
	{label:"SGD", value :'Singapore Dollars'},
	{label:"SKK", value :'Slovakia Koruna'},
	{label:"ZAR", value :'South Africa Rand'},
	{label:"KRW", value :'South Korea Won'},
	{label:"ESP", value :'Spain Pesetas'},
	{label:"XDR", value :'Special Drawing Right (IMF)'},
	{label:"SDD", value :'Sudan Dinar'},
	{label:"SEK", value :'Sweden Krona'},
	{label:"CHF", value :'Switzerland Francs'},
	{label:"TWD", value :'Taiwan Dollars'},
	{label:"THB", value :'Thailand Baht'},
	{label:"TTD", value :'Trinidad and Tobago Dollars'},
	{label:"TRL", value :'Turkey Lira'},
	{label:"VEB", value :'Venezuela Bolivar'},
	{label:"ZMK", value :'Zambia Kwacha'},
	{label:"EUR", value :'Euro'},
	{label:"XCD", value :'Eastern Caribbean Dollars'},
	{label:"XDR", value :'Special Drawing Right (IMF)'},
	{label:"XAG", value :'Silver Ounces'},
	{label:"XAU", value :'Gold Ounces'},
	{label:"XPD", value :'Palladium Ounces'},
	{label:"XPT", value :'Platinum Ounces'}
]
function Navbar(props) {
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [mdp, setMdp] = React.useState("");
  const [errorMdp, setErrorMdp] = React.useState(null);
  const [ambiguousError, setAmbiguousError] = React.useState(null);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [btnLoad, setBtnLoad] = useState(false);

  //devise
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("eur");
  const [to, setTo] = useState("eur");
  const [cookies, setCookie] = useCookies(['reservation-real']);
  const [options, setOptions] = useState([]);

  // Calling the api whenever the dependency changes
useEffect(() => {
  Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
 .then((res) => {
    setInfo(res.data[from]);
  })
}, [from]);

// Calling the convert function whenever
// a user switches the currency
  useEffect(() => {
      setOptions(Object.keys(info));
        // setOptions(deviseOriginal);
        SetToDevise();

  }, [info])
  

function SetToDevise(){
    let devise = localStorage.getItem("devise");
    if(!devise){
        setTo("eur");
        devise = "eur"
    }else{
        setTo(devise);
    }
    return devise;
}

function translation(){
    let temp = {...props.context.state};
    temp.traduction= !temp.traduction;
    props.context.setState(temp);
}

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }
  
  const interpretResponse = (res) => {
      setBtnLoad(false);
      if(props.access){
          if(props.access == "2"){
                history.push("/reservation/"+props.id+"/apply");
          }
        }else{
            const data = res.data;
            if(data.status === 200){
                localStorage.setItem("user_session", res.headers.user_session);
                session.getInstance().update(res.headers.user_session);
                console.log(res.headers.user_session);
                if(props.urlRedirect){
                    window.location.href = props.urlRedirect;
                }else{
                    // history.push('/front');
                    alert("vous etes connecté");
                }
            }else{
                const setErrors = [
                    {field: "ambiguous", setter: setAmbiguousError},
                    {field: "email", setter: setErrorEmail},
                    {field: "mdp", setter: setErrorMdp}
                ];
                let keys = Object.keys(data.errors);
                keys.map(field => {
                    for(let i = 0; i < setErrors.length; i++){
                        if(setErrors[i].field === field){
                            setErrors[i].setter(data.errors[field]);
                        }
                    }
                });
            }
        }
      
  };

  const login = (e) => {
      e.preventDefault();
      setAmbiguousError(null);
      setBtnLoad(true)
      const data = {
          email: email.trim(),
          mdp: mdp.trim()
      };
      axios({
          method: "post",      
          url: process.env.REACT_APP_BACK_URL + '/user/login',
          withCredentials: true,
          data: data
      })
      .then(res => interpretResponse(res))
      .catch(err =>{console.log(err); console.log("erreur");} );
  };

  const register = (e) => {
      e.preventDefault();
      history.push("/front/register");
  }
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Avatar alt="cobert" src="/colbert.png" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Hotel Colbert
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
                        <Link to='/front/researchReservation' style={{textDecoration : "none" ,color : "#887B62"}}>
                            <Button variant="outlined" startIcon={<SearchIcon/> }>
                                {t('search for a reservation')}
                            </Button>
                        </Link>
                    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="outlined" startIcon={<Login />} onClick={(e) => login(e)} {...bindToggle(popupState)}>
          {t('Log in')}
            </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>

                <Paper 
                  elevation={1}
                  children={
                      <>
                        <div className='title11'>
                          <h4 id='title11'>{t('Log in')}</h4>
                        </div>
                          {ambiguousError === null ? null : <Alert severity="error">{ambiguousError}</Alert>}
                          <Box
                              component="form"
                              sx={{
                                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                              }}
                              noValidate
                              autoComplete="off"
                          >
                          
                              <TextField 
                                  id="outlined-basic"
                                  variant="outlined"
                                  size='small'
                                  label={<p>Email</p>}
                                  type="email"
                                  value={email} onChange={(e) => {setErrorEmail(null); setEmail(e.target.value)}}
                                  error={errorEmail === null ? false : true}
                                  helperText={errorEmail === null ? null : errorEmail}
                              /> 
                          </Box>
                          <Box
                              component="form"
                              sx={{
                                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                              }}
                              noValidate
                              autoComplete="off"
                          >
                              <TextField 
                                  id="outlined-basic"
                                  variant="outlined"
                                  size='small'
                                  label={<p>Mot de passe</p>}
                                  type="password"
                                  value={mdp} onChange={(e) => {setErrorMdp(null); setMdp(e.target.value)}}
                                  error={errorMdp === null ? false : true}
                                  helperText={errorMdp === null ? null : errorMdp}
                              />
                          </Box>
                        <Box>
                          <div id='buttons'>
                           <div class="login">
                           { btnLoad ? 
                                <LoadingButton loading sx={{width: 200}} variant="outlined">
                                   Submit
                               </LoadingButton>
                           :
                            <Button sx={{width: 200}} variant="contained" onClick={(e) => login(e)}>
                                <span style={{color:'white'}}>{t('log in')}</span>
                            </Button>
                           }
                            <div class="mdp">
                                <Link to={'/login/identify'} style={{textDecoration:'none'}}>
                                    <Button  id="mdp">
                                    <span style={{color:'black'}}>{t('Forgot your password')}</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div class="register">
                            <Button id="register" sx={{width: 200}} onClick={(e) => register(e)}>
                                <span style={{color:'black'}}>{t('Register')}</span>
                            </Button>
                        </div>
                    </div>
                </Box>
             </>
                  } 
              />
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
        {/* <Button size="small">EUR</Button> */}
        <Dropdown options={options} onChange={(e) => {setTo(e.value); props.changeDeviseRate(e.value,info)}}  
            value={to} placeholder="To" />

            <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
            >
                <Language/>
            </IconButton>
        <select className="custom-select" style={{width: 200}} onChange={changeLanguageHandler}>
            <option value="fr" >Francais</option>                            
            <option value="en" >English</option>
        </select>
        </Box>
        </Toolbar>
    </AppBar>
</Box>
    );
  }
  
  export default Navbar;