import React from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import  ResponsiveDrawer  from "../Navbar/responsive-drawer.js";

class HotelList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hotels: [],
    }
  }
 
  componentDidMount() {
    axios.get('http://localhost:3000/hotel')
      .then(res => {
        const hotels = res.data.hotel[0];
        console.log(hotels);
        this.setState( {hotels : hotels} );
      })
  }
  render() {
    return (
     <div> 
      <div style={{marginTop:'50px'}}>  
        <Link to={'/back/hotel/insert'}>
            <Button 
            variant="contained" 
            endIcon={<AddIcon style={{color:'white'}}/>}
            style={{textDecoration:'none'}}>
                <span style={{color:'white'}}>
                Ajouter un nouveau Hotel
                </span>
            </Button>
        </Link>
    <TableContainer component={Paper} style={{marginTop:'50px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Telephone</TableCell>
            <TableCell align="right">Adresse</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {console.log(this.state.hotels)}
        {this.state.hotels.map((hotel) => ( 
            <TableRow>
              <TableCell align="right">{hotel.nom}</TableCell>
              <TableCell align="right">{hotel.email}</TableCell>
              <TableCell align="right">{hotel.telephone}</TableCell>
              <TableCell align="right">{hotel.adresse}</TableCell>

            <TableCell align="right">
            <Link to={'/back/hotel/detail/'+ hotel._id} style={{textDecoration:'none'}}>
              <Button
                variant="contained"
                type="submit"
                style={{ textDecoration: 'none', backgroundColor: '#2F4050',marginLeft : "30px",marginTop:"15px"}}
              >
              <span style={{ color: 'white' }}>Edit</span>
              </Button>
            </Link>
            </TableCell>
            </TableRow>
            ))} 
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>    

    );
  }

}

export default function recherche_() {
  return(
      <ResponsiveDrawer
          getContent = {HotelList}
      />
  );

};