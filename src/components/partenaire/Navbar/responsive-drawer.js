import * as React from 'react';
import { useEffect } from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

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

import { useHistory } from 'react-router-dom';

import callAPI from '../../../utility.js';

import Grid from '@mui/material/Grid';
import { addListenerMessage } from '../reservation/Notification.js';

const drawerWidth = 280;

const url = process.env.REACT_APP_FRONT_URL;

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
  const [open, setOpen] = React.useState(true);
  const [nbNotifs, setNbNotifs] = React.useState(0);

  useEffect(() => {
    
  }, []);

  var init = true;

  // list of options
  const optionlist = [
    { text: "Accueil", icon: HomeOutlinedIcon, lien: [ {link:"/back", nom: ""}], dropdown: false },
    { text: "Plan tarifaire", icon: DocumentScannerOutlinedIcon, lien: [{link:"/back/tarif", nom: "Tarif"}, {link:"/back/tarif/calendar", nom: "Calendrier"}], dropdown: true },
    { text: "Type de chambre", icon: BedroomChildOutlinedIcon, lien: [ {link:"/back/typeChambre", nom: ""}], dropdown: false },
    { text: "Promotion", icon: PushPinOutlinedIcon, lien: [ {link:"/back/promotion", nom: ""}], dropdown: false },
    { text: "Politique", icon: GavelOutlinedIcon, lien: [ {link:"/back/politique/list", nom: ""}], dropdown: false },
    { text: "Historique", icon: DocumentScannerOutlinedIcon, lien: [{link:"/historique/TC", nom: "Type de chambre"}, {link:"/historique/MPL", nom: "Modification plan tarifaire"}, {link:"/#", nom: "Promotion"}], dropdown: true },
    { text: "Clients", icon: FormatListBulletedOutlinedIcon, lien: [ {link:"/front", nom: ""}], dropdown: false },
    { text: "Mon compte", icon: PersonPinIcon, lien: [ {link:"/#", nom: ""}], dropdown: false },
    { text: "Partenaires", icon: GroupIcon, lien: [ {link:"/back/user", nom: ""}], dropdown: false },
    { text: "Hotel", icon: GroupIcon, lien: [ {link:"/back/hotel", nom: ""}], dropdown: false },
    { text: "Droits d'accès", icon: AddCardIcon, lien: [ {link:"/back/accessRight", nom: ""}], dropdown: false },
    { text: "Réservation", icon: ShoppingBagIcon, lien: [ {link:"/back/reservation", nom: "Liste des réservations"}, {link: "/back/reservation/notif", nom: "Liste des modifications"} ], dropdown: true },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [ouvrir, setOuvrir] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleClick = (event, index) => {
    console.log("curIndex "+index)
    // setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
    setOuvrir(!ouvrir)
  };

  const history = useHistory();

  // const redirection = (link, index) =>{
  //   history.push(link+"?curIndex="+index);
  // };
  const redirection = (link) =>{
    history.push(link);
  };

  React.useEffect(()=>{

    if(init){
      optionlist.map((option, i) =>{
        option.lien.map((opt, u) => {
          if(window.location.href.split(url)[1] === option.lien[u].link){
            console.log("curIndex "+i)
            setCurrentIndex(i);
            setOuvrir(true)
          }
        })
      })
      init = false
    }
  }, [])

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

  addListenerMessage((payload) => {
    console.log("Mety, ita le izy");
  });

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
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
              <Typography variant="h6" noWrap component="div" style={{ fontSize:'25px', fontWeight:'1000' }} >
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
        <List 
        // sx={{ml:"35px", mr:"35px"}}
        >
          {
            optionlist.map((option, index) => 
            {
              console.log(window.location.href.split(url)[1])
              return(
              option.dropdown === false ?
              // <Link to={option.lien[0]["link"]} className="nav-link">
                <ListItem button key=  
                {
                  <Typography>
                    {option.text}
                  </Typography>
                }
                sx={{ backgroundColor: window.location.href.split(url)[1] === option.lien[0].link ? "#f0fff7":null, borderRight:window.location.href.split(url)[1] === option.lien[0].link ? 4: null, borderRightColor: window.location.href.split(url)[1] === option.lien[0].link ? "#3CB371" : null }}   
                // sx={{ backgroundColor: "#f0fff7" }}
                >
                  <ListItemIcon sx={{ml:"35px", color: window.location.href.split(url)[1] === option.lien[0].link ? "#3CB371" : null }}>
                    <option.icon />
                  </ListItemIcon>
                  <ListItemText 
                  primary=
                  {
                    <Typography style={{ fontFamily: "Arial", color: window.location.href.split(url)[1] === option.lien[0].link ? "#3CB371" : "#8c8c8c" }}>
                      {option.text}
                    </Typography>
                  }
                  onClick={() => redirection(option.lien[0].link)}
                  sx={{mr:"35px"}}
                  />
                </ListItem>
              // </Link>
              : 
              <>
                <ListItem 
                  button key={option.text} 
                  onClick={(e) => handleClick(e, index)}
                >
                  <ListItemIcon sx={{ml:"35px", color: window.location.href.split(url)[1] === option.lien[0].link ? "#3CB371" : null}}>
                    <option.icon />
                  </ListItemIcon>
                  <ListItemText 
                    primary=
                    {
                      <Typography style={{ fontFamily: "Arial", color: window.location.href.split(url)[1] === option.lien[0].link ? "#3CB371" : "#8c8c8c" }}>
                        {option.text}
                      </Typography>
                    }
                    sx={{mr:"35px"}}
                    />
                  {ouvrir && currentIndex === index ? <ExpandLess sx={{mr:"30px"}} /> : <ExpandMore sx={{mr:"30px"}} />}

                </ListItem>
                {
                  currentIndex === index ?
                    
                      <Collapse 
                        in={ouvrir} 
                        timeout="auto" 
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                        {
                          optionlist[currentIndex].lien.map((opt, ind) => {
                            // window.location.href.split("http://localhost:3001")[1] === optionlist[currentIndex].lien[ind].link ? setOuvrir(true) : null
                          return(
                          <ListItemButton 
                            // sx={{ pl: 4, backgroundColor: "#f0fff7", borderRight:4, borderRightColor: "#3CB371" }} 
                            sx={{ pl:4, backgroundColor: window.location.href.split(url)[1] === optionlist[currentIndex].lien[ind].link ? "#f0fff7":null, borderRight:window.location.href.split(url)[1] === optionlist[currentIndex].lien[ind].link ? 4: null, borderRightColor: window.location.href.split(url)[1] === optionlist[currentIndex].lien[ind].link ? "#3CB371" : null }}
                            
                          >
                            <ListItemIcon sx={{ml:"35px", color: window.location.href.split(url)[1] === optionlist[currentIndex].lien[ind].link ? "#3CB371" : null }}>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText 
                              onClick={() => redirection(optionlist[currentIndex].lien[ind].link)}
                              primary=
                              {
                                <Typography style={{ fontFamily: "Arial", color: window.location.href.split(url)[1] === optionlist[currentIndex].lien[ind].link ? "#3CB371" : "#8c8c8c" }}>
                                  {optionlist[currentIndex].lien[ind].nom}
                                </Typography>
                              }
                              sx={{mr:"35px"}}
                            />
                          </ListItemButton>
                          );
                        })}
                        </List>
                      </Collapse>
                    : null
                }
                  
              </>
              );
            })
          }
        </List>
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
        {/* <Typography paragraph> */}
          {/* <content/> */}
          <props.getContent />
        {/* </Typography> */}
      </Main>
    </Box>
  );
}
