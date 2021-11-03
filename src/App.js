// import './App.css';
import  Login  from "./components/login/login";
import  Register  from "./components/login/register";
import  InsertTypeChambre  from "./partenaire/InsertTypeChambre.js";
import  DetailsTypeChambre  from "./partenaire/DetailsTypeChambre.js";
import  ListTypeChambre  from "./partenaire/ListTypeChambre.js";
import  InsertTarif  from "./tarif/InsertTarif.js";
import  DetailsTarif  from "./tarif/DetailsTarif.js";
import  home  from "./home/home";
import Paiement from "./paiement";
import  DCHambre  from "./components/client/listChambre";

import InsertChambre from './partenaire/chambre/InsertChambre.js';
import ListPlanTarifaire from './partenaire/planTarifaire/ListPlanTarifaire';
import InsertPlanTarifaire from './partenaire/planTarifaire/InsertPlanTarifaire.js';
import UpdatePlanTarifaire from './partenaire/planTarifaire/UpdatePlanTarifaire.js';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import  AppClient  from "./components/client/scroll";

import  PromotionList  from "./promotion/promotionList.js";
import  InsertPromotion  from "./promotion/insertPromotion.js";

function App() {
  return (
    <div className="App">
      <Router>
      <Route path="/promotion" exact component={PromotionList} />
        <Route path="/promotion/create" exact component={InsertPromotion} />
        <Route path="/client" exact component={AppClient} />
        <Route path="/login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/" exact component={home} />
        <Route path="/Paiement" exact component={Paiement} />

        <Route path="/typeChambre" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />
        <Route path="/tarif/insert/:idTypeChambre/:nomTypeChambre" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id/:idTypeChambre" exact component={DetailsTarif} />

        <Route path="/chambre" exact component={InsertChambre} />

        <Route path="/planTarifaire" exact component={ListPlanTarifaire} />
        <Route path="/planTarifaire/insert" exact component={InsertPlanTarifaire} />
        <Route path="/planTarifaire/details/:_id" exact component={UpdatePlanTarifaire} />

      </Router>
    </div>
  );
}


export default App;