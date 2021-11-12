import './Tarif.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import  Navbar  from "../Navbar/Navbar";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

import axios from "axios";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../partenaire/typeChambre.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState, useRef} from "react";

function List(props){
    let list = null;
        list = props.list.map(tarif => {
            return <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{tarif.nom}</TableCell>
              <TableCell align="center">
                <Link to={'/tarif/details/' + tarif._id}>
                    <button className="btn"
                        style={{textDecoration:'none',backgroundColor:'	#2F4050',color:'white'}}>
                        Voir détails
                    </button>
                </Link>
              </TableCell>
            </TableRow>
        });
    return list;
}
function ListTarif() {
    const [state, setState] = useState({
      status: '',
      message: '',
      list: []
    });

    function setListPlanTarifaire(data){
        console.log(data);
        let currentState = JSON.parse(JSON.stringify(state));
        currentState.list = data.list;
        setState(currentState);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + "/planTarifaire",
            withCredentials: true
        })
        .then(res => setListPlanTarifaire(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Link to={'/tarif/insert'}>
                <Button variant="contained" endIcon={<AddIcon />}>
                    Ajouter Plan tarifaire
                </Button>
            </Link>
            <TableContainer component={Paper} style={{marginTop:'40px'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center"><strong>Plan tarifaire</strong></TableCell>
                        <TableCell align="center"><strong>Actions</strong></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <List list={state.list}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
  }

  export default ListTarif;