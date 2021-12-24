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

function App(){
  
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
      </Router>
    </div>
  );

}
export default App;
