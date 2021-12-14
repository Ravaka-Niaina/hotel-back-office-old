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
import  BasicDateRangePicker  from "./calendar/calendar";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/TypeChambre/search" exact component={searchTypeChambre} />
        <Route path="/guest" exact component={guest} />
        <Route path="/hideShow" exact component={hideShow} />
        <Route path="/promotion" exact component={PromotionList} />
        <Route path="/promotion/create" exact component={InsertPromotion} />
        <Route path="/" exact component={home} />
        <Route path="/client" exact component={AppClient} />
        {/*<Route path="/Paiement" exact component={Paiement} />*/}
        <Route path="/booking" exact component={AppClient} />
        <Route path="/Paiement" exact component={Paiement} />

        <Route path="/typeChambre" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />

        <Route path="/tarif" exact component={Tarif} />
        <Route path="/tarif/insert" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id/" exact component={DetailsTarif} />
        
        {/*politique*/}
        <Route path="/chambre" exact component={InsertChambre} />
        <Route path="/politique" exact component={Global} />
        <Route path="/politique/detail/:_id" exact component={Global} />
        <Route path="/politique/list" exact component={ListPolitique} />

        <Route path="/calendrier" exact component={Calendrier} />

        {/*route client */}
        <Route path="/test" exact component={test} />

        {/*route client */}
        <Route path="/login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        {/*
        <Route path="/Home" exact component={Home} />
        <Route path="/TypeChambre/" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />
        <Route path="/tarif/insert/:idTypeChambre/:nomTypeChambre" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id" exact component={DetailsTarif} />
       */} 
        <Route path="/frontClient" exact component={Front_client} />
        <Route path="/devis" exact component={Devis} />

        <Route path="/reservation/:_id" exact component={Reservation} />
        <Route path="/reservation/:_id/apply" exact component={ApplyReservation} />

        <Route path="/CalendarClient" exact component={BasicDateRangePicker} />

      </Router>
    </div>
  );
}
export default App;