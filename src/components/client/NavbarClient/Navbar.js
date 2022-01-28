import './Navbar.css';
import style from './css.module.css';
import * as React from 'react';
import {Language, AccountCircle, LiveHelp, Login} from '@mui/icons-material';
import {Button, IconButton, Typography, Toolbar, AppBar} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
function Navbar(props) {
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        [LOGO]
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
                            <Button variant="outlined" startIcon={<SearchIcon/> } onClick={(e) => props.clickRetour()}>
                                <Link to='/front/researchReservation' style={{textDecoration : "none" ,color : "#887B62"}}>
                                    RECHERCHE UNE RESERVATION
                                </Link>
                            </Button>
                            
                            <Button variant="outlined" startIcon={<AccountCircle />}>
                                Sign up
                            </Button>
                            <Button variant="outlined" startIcon={<Login />}>
                                Sign in
                            </Button>
                            <Button size="small">EUR</Button>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Language/>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <LiveHelp/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
    );
  }
  
  export default Navbar;