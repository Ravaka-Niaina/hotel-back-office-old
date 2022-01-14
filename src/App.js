import  Login  from "./components/Authentification/Login.js";
import  Register  from "./components/Authentification/Register.js";
import  home  from "./home/home";
import  listeUser  from "./components/User/listeUser";
import  DetailsUser from "./partenaire/DetailsUser.js";

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

import PromotionList from "./promotion/ListPromotion.js";
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
import  DetailsPromotion  from "./promotion/DetailsPromotion.js";

import DropDown from './pagination/pagination.js';
import {BrowserRouter as Router, Route , useHistory ,Switch} from 'react-router-dom';

import  ListTChambre  from "./dataTable/datatable.js";

import  Historique from "./historique/header.js";
import  HistoriqueTC from "./historique/dependancies/TChambre.js";
import  HistoriqueMPL from "./historique/dependancies/modifPlanT.js";
import  Tooltip from "./SkeletonListe/modal.js";

import NotFound from "./common/404NotFound.js";
import NotEnoughAccessRight from "./common/NotEnoughAccessRight.js";

function App(){
  return(
    <div className="App"> 
      <Router>
        <Route path="/ListTC" exact component={ListTChambre} />
        
        <Route path="/TypeChambre/search" exact component={searchTypeChambre} />
        <Route path="/guest" exact component={guest} />
        <Route path="/hideShow" exact component={hideShow} />

        <Route path="/promotion" exact component={PromotionList} />
        <Route path="/promotion/insert" exact component={InsertPromotion} />
        <Route path="/promotion/detail/:_id" exact component={DetailsPromotion} />

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

        <Route path="/back" exact component={home} />
        <Route path="/back/login" exact component={Login} />
        <Route path="/back/Register" exact component={Register} />
        <Route path="/back/user" exact component={listeUser} />
        <Route path="/back/user/details/:_id" exact component={DetailsUser} />

        <Route path="/" exact component={AppClient} />
        <Route path="/front" exact component={AppClient} />
        <Route path="/front/login" exact component={Login} />
        <Route path="/front/Register" exact component={Register} />
        <Route path="/front/userList" exact component={listeUser} />
        <Route path="/devis" exact component={Devis} />

        <Route path="/reservation/:_id" exact component={Reservation} />
        <Route path="/reservation/:_id/apply" exact component={ApplyReservation} />
        <Route path="/drop" exact component={DropDown} />

        <Route path="/CalendarClient" exact component={BasicDateRangePicker} />

        <Route path="/historique" exact component={Historique} />
        <Route path="/historique/TC" exact component={HistoriqueTC} />
        <Route path="/historique/MPL" exact component={HistoriqueMPL} />
        <Route path="/tooltip" exact component={Tooltip} />

        <Route path="/404NotFound" exact component={NotFound} />
        <Route path="/NotEnoughAccessRight" exact component={NotEnoughAccessRight} />
        <Route path="/modal" exact component={Tooltip} />
      </Router>
    </div>
    
  );

}
export default App;
