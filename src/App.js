// import './App.css';
import  Login  from "./components/login/login";
import  register  from "./components/login/register";
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

import {BrowserRouter as Router, Route} from 'react-router-dom';
import  AppClient  from "./components/client/scroll";
import Calendrier from "./partenaire/Calendrier/Calendrier";

import  PromotionList  from "./promotion/promotionList.js";
import  InsertPromotion  from "./promotion/insertPromotion.js";
import  tarifList  from "./promotion/getTarifs.js";
import Global from "./politique/global.js";
import  searchTypeChambre  from "./partenaire/searchTypeChambre.js";
import  guest  from "./partenaire/guest.js";
import  hideShow  from "./hideShow.js";
import  front_client  from "./front_client/front_client.js";
import  Devis  from "./front_client/devis";
import { useTranslation } from "react-i18next";
import Lang from "./front_client/Lang";


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
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={register} />
        <Route path="/Paiement" exact component={Paiement} />

        <Route path="/typeChambre" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />

        <Route path="/tarif" exact component={Tarif} />
        <Route path="/tarif/insert" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id/" exact component={DetailsTarif} />
        
        <Route path="/chambre" exact component={InsertChambre} />
        <Route path="/politique" exact component={Global} />
        <Route path="/calendrier" exact component={Calendrier} />

        <Route path="/front_client" exact component={front_client} />
        <Route path="/devis" exact component={Devis} />
        <Route path="/lang" exact component={Lang} />

      </Router>
    </div>
  );
}

//push heroku
export default App;