import * as React from 'react';
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Badge from '@mui/material/Badge';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import AddCardIcon from '@mui/icons-material/AddCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { components } from 'react-select';

import { useHistory } from 'react-router-dom';
import callAPI from '../../utility.js';

import Grid from '@mui/material/Grid';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [nbNotifs, setNbNotifs] = React.useState(0);

  // list of options
  const optionlist = [
    { text: "Accueil", icon: HomeOutlinedIcon, lien: "/back", hover: false },
    { text: "Plan tarifaire", icon: DocumentScannerOutlinedIcon, lien: "/back", hover: false },
    { text: "Type de chambre", icon: BedroomChildOutlinedIcon, lien: "/back/typeChambre", hover: false },
    { text: "Promotion", icon: PushPinOutlinedIcon, lien: "/back/promotion", hover: false },
    { text: "Politique", icon: GavelOutlinedIcon, lien: "/back/politique/list", hover: false },
    { text: "Historique", icon: DocumentScannerOutlinedIcon, lien: "/back", hover: false },
    { text: "Clients", icon: FormatListBulletedOutlinedIcon, lien: "/front", hover: false },
    { text: "Mon compte", icon: PersonPinIcon, lien: "/back", hover: false },
    { text: "Partenaires", icon: GroupIcon, lien: "/back/user", hover: false },
    { text: "Droits d'accès", icon: AddCardIcon, lien: "/back/accessRight", hover: false },
    { text: "Réservation", icon: ShoppingBagIcon, lien: "/back/reservation", hover: false },
  ];

  const buttomlist =[
    { icon: NotificationsActiveOutlinedIcon },
    { icon: LogoutOutlinedIcon }
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  // deconnexion
  function logout(e){
      e.preventDefault();
      localStorage.setItem("user_session", null);
      callAPI('post', '/user/logout', {}, (data) => {
          history.push('/back/login');
      });
  }

  // notifications
  function seeNotifications(){
    history.push('/back/reservation/notif');
  }

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          

      <Grid container spacing={2}>
        <Grid item xs={10}>
              <Typography variant="h6" noWrap component="div" >
                {props.title}
              </Typography>
        </Grid>  
        <Grid item xs={2}> 
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}> 
              <Typography variant="h6" noWrap component="div" >
                  <Box
                      sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 'fit-content',
                      }}
                  >
                      { nbNotifs > 0 
                      ? <Badge
                          sx={{
                              "& .MuiBadge-badge": {
                              color: "white",
                              backgroundColor: "red"
                              }
                          }}
                          className="mail-button" badgeContent={nbNotifs}
                          onClick={(e) => seeNotifications()} >
                              <NotificationsActiveOutlinedIcon fontSize="large" color="action" onClick={(e) => seeNotifications()} />
                          </Badge>
                      : <NotificationsActiveOutlinedIcon fontSize="large" color="action" /> }
                      <Divider orientation="vertical" variant="middle" flexItem />
                      <IconButton aria-label="fingerprint" color="success" onClick={(e) => logout(e)}>
                          <LogoutOutlinedIcon />
                      </IconButton>
                  </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>      
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            optionlist.map((option, index, block) => (
              <Link to={option.lien} className="nav-link">
                <ListItem button key={option.text} >
                  <ListItemIcon >
                    <option.icon />
                  </ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
              </Link>
            ))
          }
        </List>
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
        {/* <Typography paragraph> */}
          <props.getContent/>
        {/* </Typography> */}
      </Main>
    </Box>
  );
}
