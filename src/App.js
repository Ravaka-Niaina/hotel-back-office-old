import ListeDroitAcces from "./components/partenaire/droitAcces/listeDroitAcces.js";
import InsertDroitAcces from "./components/partenaire/droitAcces/InsertDroitAcces.js";
import  Login  from "./components/common/Authentification/Login.js";
import  LoginClient  from "./components/common/Authentification/loginClient";
import  registerClient  from "./components/common/Authentification/registerClient";
import  Register  from "./components/common/Authentification/Register.js";
import  home  from "./home/home";
import  listeUser  from "./components/partenaire/User/listeUser";
import  DetailsUser from "./components/partenaire/User/DetailsUser.js";

import  InsertTypeChambre  from "./components/partenaire/chambre/InsertTypeChambre.js";
import  ListTypeChambre  from "./components/partenaire/chambre/ListTChambre.js";

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
// import {BrowserRouter as Router, Route , useHistory ,Switch} from 'react-router-dom';

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
import Router from "./routes";

function App(){
  return(
    <Router />
  );
}
export default App;
