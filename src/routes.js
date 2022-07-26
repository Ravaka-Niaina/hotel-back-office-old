// import { Navigate, useRoutes } from 'react-router-dom';

// ---------------------------------------------------------------------------------
import ListeDroitAcces from "./components/partenaire/droitAcces/listeDroitAcces.js";
import InsertDroitAcces from "./components/partenaire/droitAcces/InsertDroitAcces.js";
import  Login  from "./components/common/Authentification/Login.js";
import LoginVerifyCodeController from "./components/common/Authentification/LoginVerifyCodeController";
import  LoginClient  from "./components/common/Authentification/loginClient";
import  registerClient  from "./components/common/Authentification/registerClient";
import  Register  from "./components/common/Authentification/Register.js";
import  home  from "./home/home";
import  listeUser  from "./components/partenaire/User/listeUser";
import  DetailsUser from "./components/partenaire/User/DetailsUser.js";

import  InsertTypeChambre  from "./components/partenaire/chambre/InsertTypeChambre.js";
import  ListTypeChambre  from "./components/partenaire/chambre/ListTChambre.js";

// import  InsertHotel  from "./components/partenaire/hotel/createHotel.js";
import  InsertHotel  from "./components/partenaire/hotel/insert";
import  HotelList  from "./components/partenaire/hotel/listHotel.js";
import  GetOneHotel  from "./components/partenaire/hotel/getOneHotel";
import  Localisation  from "./components/partenaire/hotel/localisation";

import  GetOnePartner from "./components/partenaire/User/getOnePartner";

import  InsertTarif  from "./components/partenaire/Calendrier/tarif/InsertTarif.js";

import Tarif from "./components/partenaire/Calendrier/tarif/Tarif.js";
import LTarif from "./components/partenaire/Calendrier/tarif/LTarif.js";
import CalendarComponent from './components/partenaire/Calendrier/tarif/CalendarComponent';

import Paiement from "./components/client/paiement";

import Navbar from "./components/client/NavbarClient/Navbar";

import SearchUser from "./components/common/Authentification/identify";
import Confirmation from "./components/common/Authentification/confirmation";
import RecoverPassword from "./components/common/Authentification/recoverPassword";
import result from "./components/common/Authentification/result";


import InsertChambre from './components/partenaire/chambre/InsertTypeChambre.js';
import  AppClient  from "./components/client/Book/dependencies/scroll";
import  test  from "./components/client/Cookies";

import PromotionList from "./components/partenaire/promotion/ListPromotion.js";
import  InsertPromotion  from "./components/partenaire/promotion/insertPromotion.js";
import Global from "./components/partenaire/politique/global.js";
import ListPolitique from "./components/partenaire/politique/LPolitique.js"
import testData from "./components/partenaire/politique/listpolitique.js"
import ListeReservation from "./components/partenaire/reservation/ListReservation.js";
import ModeleEmail from "./components/partenaire/publipostage/ModeleEmail.js";

import  Front_client  from "./front_client/front_client";

import  Reservation  from "./components/client/reservation.js";
import  ApplyReservation  from "./components/client/applyReservation.js";
import  ApplyReservationModif  from "./components/client/applyReservationModif.js";
import Voucher from "./components/client/voucher.js";
import Voucher1 from "./components/client/voucher1.js";

import  BasicDateRangePicker  from "./components/client/dateSejourClient";
import Calendrier from "./components/partenaire/Calendrier/Calendrier";

import  Devis  from "./front_client/devis";
import  guest  from "./components/partenaire/guest.js";
import  hideShow  from "./hideShow.js";

import DropDown from './pagination/pagination.js';
import {BrowserRouter as Router, Route , useHistory ,Switch} from 'react-router-dom';

import  ListTChambre  from "./dataTable/datatable.js";

import  Historique from "./historique/header.js";
import  HistoriqueTC from "./historique/dependancies/TChambre.js";
import  HistoriqueMPL from "./historique/dependancies/modifPlanT.js";
import  Tooltip from "./SkeletonListe/modal.js";

import NotFound from "./components/common/404NotFound.js";
import NotEnoughAccessRight from "./components/common/NotEnoughAccessRight.js";
import RechercheReservation from "./components/client/RechercheReseravation.js";

import Menu from "./components/menu/sidebar.js";
import ResponsiveDrawer from "./components/menu/responsive-drawer.js";

import  CompteOublier  from "./components/common/Authentification/CompteOublier";
import  modifyPassword  from "./components/common/Authentification/modifyPassword";

import RapportReservation from "./components/partenaire/rapportReservation/rapportReservation.js";

import  TestFeuille  from "./components/client/testFeuille";

import IdleTimer from '../src/components/partenaire/IdleTimer';
import LoginVerifyNewBrowserController from "./components/common/Authentification/LoginVerifyNewBrowserController.js";

// ---------------------------------------------------------------------------------

// layouts
// import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import Login from './components/common/Authentification/Login.js';
// import Register from './pages/Register';
// import DashboardApp from './home/home';
// import Products from './pages/Products';
// import Blog from './pages/Blog';
// import User from './pages/User';
// import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Routes() {
  return (
      <div className="App">
          <Router>
            <IdleTimer>
              <Route path="/ListTC" exact component={ListTChambre} />
              <Route path="/guest" exact component={guest} />
              <Route path="/hideShow" exact component={hideShow} />

              <Route path="/Paiement" exact component={Paiement} />
            
              <Route path="/chambre" exact component={InsertChambre} />

              <Route path="/calendrier" exact component={Calendrier} />
          
              <Route path="/cookie" exact component={test} />

              <Route path="/back/accessRight" exact component={ListeDroitAcces} />
              <Route path="/back/accessRight/insert" exact component={InsertDroitAcces} />
              <Route path="/back/accessRight/update/:_id" exact component={InsertDroitAcces} />

              <Route path="/back/partenaire" exact component={GetOnePartner} />     

              <Route path="/back" exact component={home} />
              <Route path="/back/login" exact component={Login} />
              <Route path="/back/login/verifyCode/:idPartner" exact component = { LoginVerifyCodeController } />
              < Route path="/back/login/verifyNewBrowser" exact component={LoginVerifyNewBrowserController} />
              <Route path="/back/Register" exact component={Register} />
              <Route path="/back/user" exact component={listeUser} />
              <Route path="/back/user/details/:_id" exact component={DetailsUser} />
              <Route path="/back/research" exact component={CompteOublier} />
              <Route path="/back/verifier/:_id" exact component={modifyPassword} />

              <Route path="/loginClient" exact component={LoginClient} />
              <Route path="/registerClient" exact component={registerClient} />

              <Route path="/back/tarif" exact component={LTarif} />
              <Route path="/back/tarif/calendar" exact component={CalendarComponent} />
              <Route path="/back/tarif/insert" exact component={InsertTarif}/>
              <Route path="/back/tarif/details/:_id" exact component={InsertTarif} />

              <Route path="/back/typeChambre" exact component={ListTypeChambre} />
              <Route path="/back/TypeChambre/insert" exact component={InsertTypeChambre} />
              <Route path="/back/TypeChambre/details/:_id" exact component={InsertTypeChambre} />

              <Route path="/back/promotion" exact component={PromotionList} />
              <Route path="/back/promotion/insert" exact component={InsertPromotion} />
              <Route path="/back/promotion/detail/:_id" exact component={InsertPromotion} />

              <Route path="/back/politique" exact component={Global} />
              <Route path="/back/politique/detail/:_id" exact component={Global} />
              <Route path="/back/politique/list" exact component={ListPolitique} />
              <Route path="/back/politique/testData" exact component={testData} />

              <Route path="/back/reservation" exact component={ListeReservation} />
              <Route path="/back/reservation/notif" exact component={ListeReservation} />
              
              <Route path="/back/modelemail" exact component={ModeleEmail} />

              <Route path="/back/hotel/insert" exact component={InsertHotel} />
              <Route path="/back/hotel" exact component={HotelList} />
              <Route path="/back/hotel/detail/:_id" exact component={ InsertHotel } />

              <Route path="/localisation" exact component={Localisation} />
              
              <Route path="/back/reservation/rapport" exact component={RapportReservation} />

              <Route path="/" exact component={AppClient} />
              <Route path="/front" exact component={AppClient} />
              <Route path="/front/login" exact component={Login} />
              <Route path="/login/identify" exact component={SearchUser} />
              <Route path="/confirmation" exact component={Confirmation} />
              <Route path="/recover/password/:_id" exact component={RecoverPassword} />
              <Route path="/result" exact component={result} />
              <Route path="/front/Register" exact component={Register} />
              <Route path="/front/userList" exact component={listeUser} />
              <Route path="/front/researchReservation" exact component={RechercheReservation} />
              <Route path="/devis" exact component={Devis} />

              <Route path="/reservation/:_id" exact component={Reservation} />
              <Route path="/reservation/:_id/apply" exact component={ApplyReservation} />
              <Route path="/reservation/:_id/apply/:numeroItineraire" exact component={ApplyReservationModif} />
              <Route path="/reservation/:_id/voucher" exact component={Voucher} />
              <Route path="/reservation/:_id/voucher/:numeroItineraire" exact component={Voucher1} />
              <Route path="/drop" exact component={DropDown} />

              <Route path="/CalendarClient" exact component={BasicDateRangePicker} />

              <Route path="/historique" exact component={Historique} />
              <Route path="/historique/TC" exact component={HistoriqueTC} />
              <Route path="/historique/MPL" exact component={HistoriqueMPL} />
              <Route path="/tooltip" exact component={Tooltip} />

              <Route path="/404NotFound" exact component={NotFound} />
              <Route path="/NotEnoughAccessRight" exact component={NotEnoughAccessRight} />
              <Route path="/modal" exact component={Tooltip} />

              <Route path="/navBarClient" exact component={Navbar} />

              <Route path="/menu" exact component={Menu} />
              <Route path="/responsive" exact component={ResponsiveDrawer} />

              <Route path="/feuille" exact component={TestFeuille} />
            </IdleTimer>
          </Router>
        </div> 
  );
}
