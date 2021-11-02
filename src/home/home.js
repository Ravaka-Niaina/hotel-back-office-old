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
        <p 
style={{marginLeft:'650px',marginTop:'300px',fontSize:'30px',fontFamily:'arial'}}>
Bienvenue Mr Ravaka
        </p>
        </div>
              );
  }
  
  export default home;