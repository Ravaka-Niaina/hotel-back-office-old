import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

export default class PromotionList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      promotions: [],
    }
  }
 
  componentDidMount() {
    axios.get('http://localhost:3000/promotion')
      .then(res => {
        const promotions = res.data;
        console.log(promotions);
        this.setState( promotions );
      })
  }

  render() {
    return (
      <div>  

<div className='container' style={{marginTop:'120px'}}>
                    <div className='row'>
                            <div className='col-md-12'>
                                <Link to={'/promotion/create'}>
                                    <Button variant="contained" endIcon={<AddIcon />}>
                                        Ajouter un nouveau promotion
                                    </Button>
                                </Link>
                                <TableContainer component={Paper} style={{marginTop:'40px'}}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><strong>Nom</strong></TableCell>
                                            <TableCell align="center"><strong>Tarif</strong></TableCell>
                                            <TableCell align="center"><strong>Type Chambre</strong></TableCell>
                                            <TableCell align="center"><strong>Remise</strong></TableCell>
                                            <TableCell align="center"><strong>Date Sejour</strong></TableCell>
                                            
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.promotions.map((promotion) => (  
                                        <TableRow>
                                            <TableCell align="center">{promotion.nom}</TableCell>
                                            <TableCell align="center">{promotion.tarif}</TableCell>
                                            <TableCell align="center">{promotion.typeChambre}</TableCell>
                                            <TableCell align="center">{promotion.remiseEuro}</TableCell>
                                            <TableCell align="center">{promotion.dateDebutS}-{promotion.dateFinS}</TableCell>
                                            
                                        </TableRow>
                                        ))}  
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        {/* <div className='col-md-1'></div> */}
                    </div>
                </div>

      </div>
    )
  }
}

