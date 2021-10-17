import './App.css';
import  Login  from "./components/login/login";
import  Register  from "./components/login/register";
import Home from './components/home';
import InsertTypeChambre from './components/typeChambre/InsertTypeChambre';
import ListTypeChambre from './components/typeChambre/ListTypeChambre';
import DetailsTypeChambre from './components/typeChambre/DetailsTypeChambre';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      
      <Route path="/" exact component={Login} />
      <Route path="/Register" exact component={Register} />
      <Route path="/Home" exact component={Home} />
      <Route path="/TypeChambre/" exact component={ListTypeChambre} />
      <Route path="/TypeChambre/insert" exact component={InsertTypeChambre} />
      <Route path="/TypeChambre/details/:_id" exact component={DetailsTypeChambre} />

      </Router>
    </div>
  );
}


export default App;
