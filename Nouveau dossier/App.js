// import './App.css';
import  Login  from "./components/login/login";
import  Register  from "./components/login/register";
import  InsertTypeCHambre  from "./partenaire/InsertTypeChambre.js";
import  DetailsTypeCHambre  from "./partenaire/DetailsTypeChambre.js";
import  ListTypeChambre  from "./partenaire/ListTypeChambre.js";
import  InsertTarif  from "./tarif/InsertTarif.js";
import  DetailsTarif  from "./tarif/DetailsTarif.js";
import  Sidebar  from "./Sidebar/Sidebar";
import  Navbar  from "./Navbar/Navbar";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Sidebar/>
      {/* <Chambre/> */}
      <Route path="/typeChambre" exact component={InsertTypeCHambre} />
      <Route path="/tarifs" exact component={InsertTarif} />
      <Route path="/tarif/details" exact component={DetailsTarif} />
      <Route path="/TypeChambre/details" exact component={DetailsTypeCHambre} />
      <Route path="/LiseTypeChambre" exact component={ListTypeChambre} />

{/* <Route path="/TypeChambre/" exact component={ListTypeChambre} />
<Route path="/TypeChambre/insert" exact component={InsertTypeCHambre} />
<Route path="/TypeChambre/details/:_id" exact component={DetailsTypeCHambre} />
<Route path="/tarif/insert/:idTypeChambre/:nomTypeChambre" exact component={InsertTarif}/>
<Route path="/tarif/details/:_id" exact component={DetailsTarif} /> */}
      {/* <Route path="/" exact component={Login} />
      <Route path="/Register" exact component={Register} /> */}
      </Router>
    </div>
  );
}


export default App;
