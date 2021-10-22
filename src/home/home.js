// import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import  Navbar  from "../Navbar/Navbar";
import  Sidebar  from "../Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
function home() {
    return (
        <div>
        <Navbar/>
        <Sidebar/>
        <h1 style={{margin: '0 auto'}}>Bienvenue!</h1>


        </div>
              );
  }
  
  export default home;