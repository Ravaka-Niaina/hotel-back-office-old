import React from 'react';
import Navbar  from "../Navbar/Navbar";
import {ToggleButtonGroup, ToggleButton, Typography} from '@mui/material';

const HeaderHistorique = (props) => {
  const [groupby, setGroupBy] = React.useState('a');
  const handleGroupByChange = (event, g) => {
    if(g !== null){
      setGroupBy(g);
    }
  };

  return(
  <div>
    <Navbar currentPage={5}/><br/><br/>
    <div style={{  width :"fit-content" , margin : "0 auto" , heigth : "100px"}} >
        <ToggleButtonGroup color="primary" value={groupby}onChange={handleGroupByChange}>
            <ToggleButton size="small" value="a">Politique</ToggleButton>
            <ToggleButton size="small" value="b">Plan tarifaires</ToggleButton>
            <ToggleButton size="small" value="c">Promotion</ToggleButton>
            <ToggleButton size="small" value="d">Ouverture</ToggleButton>
        </ToggleButtonGroup>
    </div>
  </div>
)};

export default HeaderHistorique;