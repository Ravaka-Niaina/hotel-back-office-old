import React from 'react';
import Navbar  from "../Navbar/Navbar";
import {ToggleButtonGroup, ToggleButton, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderHistorique = (props) => {
  const [value, setValue] = React.useState(0);
  const handleGroupByChange = (event, g) => {
    if(g !== null){
      setValue(g);
    }
  };

  return(
  <div>
    <Navbar currentPage={5}/><br/><br/>
    <div style={{  width :"fit-content" , margin : "0 auto" , heigth : "100px"}} >
        <ToggleButtonGroup color="primary" value={props.currentPage} onChange={handleGroupByChange}>
            <ToggleButton size="small" value="0" component={Link} to="/historique/TC">Type Chambre</ToggleButton>
            <ToggleButton size="small" value="1" component={Link} to="/historique/MPL">Modif Plan tarifaires</ToggleButton>
            <ToggleButton size="small" value="2"component={Link} to="/modal">Promotion</ToggleButton>
        </ToggleButtonGroup>
    </div>
  </div>
)};

export default HeaderHistorique;