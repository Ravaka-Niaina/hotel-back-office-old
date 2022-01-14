
import './home.css';
import { Container } from "@mui/material";
import  Navbar  from "../Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import {session} from '../common/utilitySession.js';
import NotEnoughAccessRight from '../common/NotEnoughAccessRight';
import Login from '../components/Authentification/Login.js';

function home() {
    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["superAdmin"]);
    if(!session.getInstance().isConnected()){
        return(<Login urlRedirect={window.location.href} />);
    }else if(!hasAR){
        return(<NotEnoughAccessRight />);
    }
    return (
        <>
        <Navbar currentPage={0}/>
        <Container className="mainContainer">
            <h1 style={{margin: '0 auto'}}>Bienvenue!</h1>
        </Container>
        </>
        );
    }
  
  export default home;