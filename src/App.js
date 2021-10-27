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
import {BrowserRouter as Router, Route} from 'react-router-dom';
import  AppClient  from "./components/client/scroll";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={AppClient} />
        <Route path="/login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        {/* <Route path="/" exact component={home} /> */}
        <Route path="/Paiement" exact component={Paiement} />
        <Route path="/typeChambre" exact component={ListTypeChambre} />
        <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
        <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />
        <Route path="/tarif/insert/:idTypeChambre/:nomTypeChambre" exact component={InsertTarif}/>
        <Route path="/tarif/details/:_id/:idTypeChambre" exact component={DetailsTarif} />

      </Router>
    </div>
  );
}


export default App;
