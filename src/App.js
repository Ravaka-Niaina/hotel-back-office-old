// import './App.css';
import  Login  from "./components/login/login";
import  Register  from "./components/login/register";
import  InsertTypeChambre  from "./partenaire/InsertTypeChambre.js";
import  DetailsTypeChambre  from "./partenaire/DetailsTypeChambre.js";
import  ListTypeChambre  from "./partenaire/ListTypeChambre.js";
import  InsertTarif  from "./tarif/InsertTarif.js";
import  DetailsTarif  from "./tarif/DetailsTarif.js";
import  home  from "./home/home";
import  AppClient  from "./components/client/scroll";
import  paiement  from "./components/client2/paiement";
import  test  from "./test";

import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>

        {/*route client */}
        <Route path="/paiement" exact component={paiement} />
        <Route path="/test" exact component={test} />
        <Route path="/client" exact component={AppClient} />

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
      <Route path="/" exact component={home} />
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
