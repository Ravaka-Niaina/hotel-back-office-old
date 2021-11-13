import './Tarif.css';
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import  Navbar  from "../Navbar/Navbar";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import axios from "axios";
import Button from '@mui/material/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../partenaire/typeChambre.css';

import ListTarif from './ListTarif.js';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CalendarComponent from './CalendarComponent'
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
          <Typography>{children}</Typography>
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

function ListTarif(){
    const [tarifs, setTarifs] = useState([]);
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACK_URL + 
            "/tarif",
        withCredentials: true
    })
    .then(res => setTarifs(res.data.list))
    .catch(err => console.log(err));
    let list = null;
    list = tarifs.map(tarif => {
        return <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center">{tarif.nom}</TableCell>
            <TableCell align="center">{tarif.prixParJour}</TableCell>
            <TableCell align="center">{tarif.services}</TableCell>
            <TableCell align="center">{tarif.conditionsAnnulation}</TableCell>
            <TableCell align="center">
            <Button variant="contained" style={{backgroundColor:'#4682B4'}}>
                Modifier
            </Button>
            </TableCell>
        </TableRow>
    });
    return(
        <TableContainer component={Paper} style={{marginTop:'40px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center"><strong>Nom</strong></TableCell>
                <TableCell align="center"><strong>Prix par jour</strong></TableCell>
                <TableCell align="center"><strong>Services</strong></TableCell>
                <TableCell align="center"><strong>Conditions d'annulation</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            { list }
            </TableBody>
        </Table>
        </TableContainer>
    );
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
<<<<<<< HEAD
                  <ListTarif />
=======
                    <ListTarif/>
>>>>>>> a1e20565d9147f39e04b10bd2fecb7ad4e7d7107
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CalendarComponent/>
                </TabPanel>
            </Box>
            </>
    );
  }
  
  export default Tarif;