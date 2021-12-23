/*
// import './App.css';
import  Login  from "./components/login/login";
import  register  from "./components/login/register";
import  Register  from "./components/login/register";
import  InsertTypeChambre  from "./partenaire/InsertTypeChambre.js";
import  DetailsTypeChambre  from "./partenaire/DetailsTypeChambre.js";
import  ListTypeChambre  from "./partenaire/ListTypeChambre.js";
import  InsertTarif  from "./tarif/InsertTarif.js";
import  DetailsTarif  from "./tarif/DetailsTarif.js";
import  home  from "./home/home";
import Tarif from "./tarif/Tarif.js";
import Paiement from "./paiement";
import  DCHambre  from "./components/client/listChambre";

import InsertChambre from './partenaire/chambre/InsertChambre.js';
import  AppClient  from "./components/client/scroll";
// import  paiement  from "./components/client2/paiement";
import  test  from "./test";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Calendrier from "./partenaire/Calendrier/Calendrier";

import  PromotionList  from "./promotion/promotionList.js";
import  InsertPromotion  from "./promotion/insertPromotion.js";
import  tarifList  from "./promotion/getTarifs.js";
import  DetailsPromotion  from "./promotion/DetailsPromotion";
import Global from "./politique/global.js";
import  searchTypeChambre  from "./partenaire/searchTypeChambre.js";
import  guest  from "./partenaire/guest.js";
import  hideShow  from "./hideShow.js";
import  Front_client  from "./front_client/front_client";
import  Devis  from "./front_client/devis";
import { useTranslation } from "react-i18next";
import  Reservation  from "./components/client/reservation.js";
import ListPolitique from "./politique/listpolitique.js"
import  ApplyReservation  from "./components/client/applyReservation.js";
import  dateReservation  from "./components/client/dateReservation";
import  calendar  from "./calendar/calendar";
import  BasicDateRangePicker  from "./calendar/calendar";
import  BookComponent from "./components/Book/BookComponent.js";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/TypeChambre/search" exact component={searchTypeChambre} />
        <Route path="/guest" exact component={guest} />
        <Route path="/hideShow" exact component={hideShow} />
        <Route path="/promotion" exact component={PromotionList} />
        <Route path="/promotion/create" exact component={InsertPromotion} />
        <Route path="/promotion/detail/:_id" exact component={DetailsPromotion} />
        <Route path="/" exact component={home} />
        <Route path="/client" exact component={AppClient} />
        <Route path="/booking" exact component={AppClient} />
        <Route path="/Paiement" exact component={Paiement} />

        <Route path="/typeChambre" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />

        <Route path="/tarif" exact component={Tarif} />
        <Route path="/tarif/insert" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id/" exact component={DetailsTarif} />
        
        <Route path="/chambre" exact component={InsertChambre} />
        <Route path="/politique" exact component={Global} />
        <Route path="/politique/detail/:_id" exact component={Global} />
        <Route path="/politique/list" exact component={ListPolitique} />

        <Route path="/calendrier" exact component={Calendrier} />

        <Route path="/test" exact component={test} />

        <Route path="/login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/book" exact component={BookComponent} />
        <Route path="/frontClient" exact component={Front_client} />
        <Route path="/devis" exact component={Devis} />

        <Route path="/reservation/:_id" exact component={Reservation} />
        <Route path="/reservation/:_id/apply" exact component={ApplyReservation} />
        <Route path="/dateReservation" exact component={dateReservation} />
        <Route path="/calendar" exact component={calendar} />

        <Route path="/CalendarClient" exact component={BasicDateRangePicker} />

      </Router>
    </div>
  );
}
export default App;
*/
import  Login  from "./components/login/login";
import  Register  from "./components/login/register";
import  home  from "./home/home";
import  listeUser  from "./components/User/listeUser";

import  InsertTypeChambre  from "./partenaire/InsertTypeChambre.js";
import  DetailsTypeChambre  from "./partenaire/DetailsTypeChambre.js";
import  ListTypeChambre  from "./partenaire/ListTChambre.js";
import  searchTypeChambre  from "./partenaire/searchTypeChambre.js";

import  InsertTarif  from "./tarif/InsertTarif.js";
import  DetailsTarif  from "./tarif/DetailsTarif.js";

import Tarif from "./tarif/Tarif.js";
import LTarif from "./tarif/LTarif.js";
import CalendarComponent from './tarif/CalendarComponent';

import Paiement from "./paiement";

import InsertChambre from './partenaire/chambre/InsertChambre.js';
import  AppClient  from "./components/Book/dependencies/scroll";
import  test  from "./components/client/Cookies";


import  PromotionList  from "./promotion/LPromotion.js";
import  InsertPromotion  from "./promotion/insertPromotion.js";
import Global from "./politique/global.js";
import ListPolitique from "./politique/LPolitique.js"
import testData from "./politique/listpolitique.js"

import  Front_client  from "./front_client/front_client";

import  Reservation  from "./components/client/reservation.js";
import  ApplyReservation  from "./components/client/applyReservation.js";

import  BasicDateRangePicker  from "./components/client/dateSejourClient";
import Calendrier from "./partenaire/Calendrier/Calendrier";

import  Devis  from "./front_client/devis";
import  guest  from "./partenaire/guest.js";
import  hideShow  from "./hideShow.js";
import  DetailsPromotion  from "./promotion/DetailsPromotion";


import DropDown from './pagination/pagination.js';


import { useCookies } from 'react-cookie';
import React, {useEffect , useState} from "react";
import APIGet from "./APiGet.js"
import {BrowserRouter as Router, Route , useHistory ,Switch} from 'react-router-dom';
import Cookies from 'universal-cookie';

import  ListTChambre  from "./dataTable/datatable.js";
import  BookComponent from "./components/Book/BookComponent.js";

import  Historique from "./historique/header.js";


/*
function  Boucleroute(props){
    let route = props.ReponseRoute.map(list => {
      return (
        <Route path={list.path} exact component={list.comp} />
      );
    })
    return route;
  }
  */

function App(){

  /*
  const [cookies, setCookie] = useCookies();
  const [route, setRoute] = useState([]);
  const id = cookies.sessionId;
  let history = useHistory();

  const CompoUrl = [
    {comp : Login , url : "/login"},
    {comp : Register , url : "/Register"},
    {comp : listeUser , url : "/userList"},
    {comp : home , url : "/"},

    {comp : Tarif , url : "/tarif"},
    {comp : InsertTarif , url : "/tarif/insert"},
    {comp : DetailsTarif , url : "/tarif/details/:_id"},

    {comp : ListTypeChambre , url : "/typeChambre"},
    {comp : InsertTypeChambre , url : "/TypeChambre/insert"},
    {comp : DetailsTypeChambre , url : "/TypeChambre/details/:_id"},

    {comp : PromotionList , url : "/promotion"},
    {comp : InsertPromotion , url : "/promotion/create"},

    {comp : ListPolitique , url : "/politique/list"},
    {comp : Global , url : "/politique" },
    {comp : Global , url : "/tarif/details/:_id" },

    {comp : Front_client , url : "/frontClient"},
    {comp : AppClient , url : "/booking"}

  ];

  let ReponseRoute = [];
  for(let i = 0; i < CompoUrl.length; i++){
     for(let u = 0; u < route.length; u++){
       if(route[u].url == CompoUrl[i].url){
         ReponseRoute.push({path : route[u].url , comp : CompoUrl[i].comp});
         break;
       }
    }
  }

  function responseList(data){
      console.log(data);
      setRoute(data.routeAccess);
  }

  useEffect(() => {
    if(id == null || id == undefined || id == ""){
      const cookie = new Cookies();
      cookie.set('sessionId', "V01", { path: '/login' });
     // history.push("/");
      window.location.href= "/login";
      console.log("cookie is null")
    }else{
      APIGet("get" , "/access/dataAccess/"+id , responseList);
    }
    
  }, []); */
  
  return(
    <div className="App"> 
      <Router>
        <Route path="/ListTC" exact component={ListTChambre} />
        
        <Route path="/TypeChambre/search" exact component={searchTypeChambre} />
        <Route path="/guest" exact component={guest} />
        <Route path="/hideShow" exact component={hideShow} />

        <Route path="/promotion" exact component={PromotionList} />
        <Route path="/promotion/create" exact component={InsertPromotion} />
        <Route path="/promotion/detail/:_id" exact component={DetailsPromotion} />
        <Route path="/" exact component={home} />

        <Route path="/client" exact component={AppClient} />
        
        <Route path="/booking" exact component={AppClient} />
        <Route path="/Paiement" exact component={Paiement} />

        <Route path="/typeChambre" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />

        <Route path="/tarif" exact component={LTarif} />
        <Route path="/tarif/calendar" exact component={CalendarComponent} />

        <Route path="/tarif/insert" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id" exact component={DetailsTarif} />
      
        <Route path="/chambre" exact component={InsertChambre} />
        <Route path="/politique" exact component={Global} />
        <Route path="/politique/detail/:_id" exact component={Global} />
        <Route path="/politique/list" exact component={ListPolitique} />
        <Route path="/politique/testData" exact component={testData} />


        <Route path="/calendrier" exact component={Calendrier} />
    
        <Route path="/cookie" exact component={test} />

        <Route path="/login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/userList" exact component={listeUser} />
        <Route path="/Register/:_id" exact component={Register} />
        
        <Route path="/frontClient" exact component={Front_client} />
        <Route path="/devis" exact component={Devis} />

        <Route path="/reservation/:_id" exact component={Reservation} />
        <Route path="/reservation/:_id/apply" exact component={ApplyReservation} />
        <Route path="/drop" exact component={DropDown} />

        <Route path="/CalendarClient" exact component={BasicDateRangePicker} />
        <Route path="/book" exact component={BookComponent} />

        <Route path="/historique" exact component={Historique} />
      </Router>
    </div>
  );

}
export default App;
