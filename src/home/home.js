import './home.css';
import { Container } from "@mui/material";
import  Navbar  from "../Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
function home() {
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