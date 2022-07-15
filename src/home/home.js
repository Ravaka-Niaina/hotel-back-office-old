
import './home.css';

import { Container } from "@mui/material";
// import  Navbar  from "../components/partenaire/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import {session} from '../components/common/utilitySession.js';
import NotEnoughAccessRight from '../components/common/NotEnoughAccessRight';
import Login from '../components/common/Authentification/Login.js';
import RapportReservation from 'src/components/partenaire/rapportReservation/rapportReservation';

import ResponsiveDrawer from "../components/partenaire/Navbar/responsive-drawer.js";
import DashboardLayout from '../layouts/dashboard';
import RapportReservation from '../components/partenaire/rapportReservation/rapportReservation';
// material
import { Box, Grid, Typography } from '@mui/material';

function home() {
    return (
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
            </Box>
            <Grid container spacing={3}>
              <RapportReservation />
            </Grid>
        </Container>
    );
}
  
export default function home_() {
    return(
        <ResponsiveDrawer 
            title = "Accueil"
            getContent = {home}
        />
    );
}