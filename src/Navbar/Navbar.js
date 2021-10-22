import './Navbar.css';
// import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar() {
    return (
<nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
<span className="fs-6" 
style={{color:'white',marginLeft: '30px',fontFamily:'Arial, Helvetica, sans-serif',fontSize:'12px'}}>
    HOTEL COLBERT
    </span>
<span className="" style={{color:'white',marginLeft:'1400px'}}>Bienvenue Ravaka</span>
</nav>
              );
  }
  
  export default Navbar;