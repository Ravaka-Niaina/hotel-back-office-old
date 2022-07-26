import './Tarif.css';
import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import  Navbar  from "../../Navbar/Navbar";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../chambre/typeChambre.css';

import ListT from './LTarif.js';
import CalendarComponent from './CalendarComponent';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Tarif() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
            <>
            <Navbar currentPage={1}/>
            <Box className="tarif" sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab icon={<LocalOfferOutlinedIcon />} label="Les tarifs" {...a11yProps(0)} />
                        <Tab icon={<DateRangeOutlinedIcon />} label="Calendrier" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {/*<ListTarif />*/}
                  <ListT />
                </TabPanel>
                <TabPanel className="calendarTab" value={value} index={1}>
                    <CalendarComponent/>
                </TabPanel>
            </Box>
            </>
    );
  }
  
  export default Tarif;