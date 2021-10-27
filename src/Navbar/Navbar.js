import './Navbar.css';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
// import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
            <>
            <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
            <span className="fs-6" 
            style={{color:'white',marginLeft: '30px',fontFamily:'Arial, Helvetica, sans-serif',fontSize:'12px'}}>
                HOTEL COLBERT
                </span>
            <span className="" style={{color:'white',marginLeft:'1400px'}}>Bienvenue Ravaka</span>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<PhoneIcon />} label="RECENTS" />
                <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                <Tab icon={<PersonPinIcon />} label="NEARBY" />
            </Tabs>
            </nav>
            </>
    );
  }
  
  export default Navbar;