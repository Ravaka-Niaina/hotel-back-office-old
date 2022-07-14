
import './home.css';

import { Container } from "@mui/material";
// import  Navbar  from "../components/partenaire/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import {session} from '../components/common/utilitySession.js';
import NotEnoughAccessRight from '../components/common/NotEnoughAccessRight';
import Login from '../components/common/Authentification/Login.js';

import ResponsiveDrawer from "../components/partenaire/Navbar/responsive-drawer.js";
import DashboardLayout from '../layouts/dashboard';
// material
import { Box, Grid, Typography } from '@mui/material';
// components
import Page from '../comp/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app';

function home() {
    return (
        // <>
        // {/* <Navbar currentPage={0}/> */}
        // <Container className="mainContainer">
        //     <h1 style={{margin: '0 auto'}}>Bienvenue!</h1>
        // </Container>
        // </>

        // <Page title="Dashboard | Minimal-UI">
        // <>
        // <DashboardLayout />
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
            </Box>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppBugReports />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={4}>
                <AppCurrentSubject />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={8}>
                <AppNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppTrafficBySite />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <AppTasks />
            </Grid> */}
            </Grid>
        </Container>
        //  </Page>
        // </>
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