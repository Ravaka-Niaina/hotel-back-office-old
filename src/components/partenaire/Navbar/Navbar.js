import './Navbar.css';
import * as React from 'react';
import { useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Badge from '@mui/material/Badge';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Divider from '@mui/material/Divider';
import GroupIcon from '@mui/icons-material/Group';
import AddCardIcon from '@mui/icons-material/AddCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Drop from "./drop.js";
import { useHistory } from 'react-router-dom';

import callAPI from '../../../utility.js';

import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import Login from '../../common/Authentification/Login.js';

import DropHisto from "./dropHisto.js";

function Navbar(props) {
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    
    const [showPlanTarifaire, setShowPlanTarifaire] = React.useState(true);
    const [showTypeChambre, setShowTypeChambre] = React.useState(true);
    const [showPromotion, setShowPromotion] = React.useState(true);
    const [showPolitique, setShowPolitique] = React.useState(true);
    const [showHistorique, setShowHistorique] = React.useState(true);
    const [showPartenaire, setShowPartenaire] = React.useState(true);
    const [showDroitAcces, setShowDroitAcces] = React.useState(true);
    const [showReservation, setShowReservation] = React.useState(true);
    const [nbNotifs, setNbNotifs] = React.useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClick2 = (event) => {
        setAnchorEl1(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleClose1 = () => {
        setAnchorEl1(null);
      };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const history = useHistory();

    function logout(e){
        e.preventDefault();
        localStorage.setItem("user_session", null);
        callAPI('post', '/user/logout', {}, (data) => {
            history.push('/back/login');
        });
    }

    useEffect(() => {
        const instance = session.getInstance();
        if(!instance.isConnected() || !instance.getIsPartner()){
            return(<Login urlRedirect="/back/login" />);
        }
        setShowPlanTarifaire(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "insertPlanTarifaire", "getPlanTarifaire", "updatePlanTarifaire", "deletePlanTarifaire"]));
        setShowTypeChambre(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "insertTypeChambre", "getTypeChambre", "updateTypeChambre", "deleteTypeChambre"]));
        setShowPromotion(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "insertPromotion", "getPromotion", "updatePromotion", "deletePromotion"]));
        // setShowPolitique(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "insertPolitique", "getPolitique", "updatePolitique", "deletePolitique"]));
        // setShowHistorique() = // a implementer
        setShowPartenaire(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "getListPartenaire", "insertPartenaire", "getPartenaire", "updatePartenaire", "deletePartenaire"]));
        setShowDroitAcces(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "getListDroitAcces", "insertDroitAcces", "getDroitAcces", "updateDroitAcces", "deleteDroitAcces"]));
        setShowReservation(session.getInstance().hasOneOfTheseAccessRights(["superAdmin", "getListReservation"]));
    }, []);
    console.log("reservation = " + showReservation);

    function getNotification(){
        return new Promise((resolve, reject) => {
            setInterval(() => {
                callAPI('post', '/notifPartenaire', {}, (data) => {
                    setNbNotifs(data.nbNotifs);
                });
            }, 10000);
        });
    }

    getNotification();

    function seeNotifications(){
        history.push('/back/reservation/notif');
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
            <Tabs value={props.currentPage} onChange={handleChange} aria-label="icon label tabs example">
                <Tab value={0} component={Link} to="/back" icon={<HomeOutlinedIcon />} iconPosition="start" label="Accueil" />
                { showPlanTarifaire ? <Tab value={1} component={Link} to="#" icon={<DocumentScannerOutlinedIcon />} iconPosition="start" label="Plan tarifaire" onClick={handleClick} /> : null }
                { showTypeChambre ? <Tab value={2} component={Link} to="/back/typeChambre" icon={<BedroomChildOutlinedIcon />} iconPosition="start" label="Type de chambre" /> : null }
                { showPromotion ? <Tab value={3} component={Link} icon={<PushPinOutlinedIcon />} to="/back/promotion" iconPosition="start" label="Promotion" /> : null }
                { showPolitique ? <Tab value={4} component={Link} icon={<GavelOutlinedIcon />} to="/back/politique/list" iconPosition="start" label="Politique" /> : null }
                { showHistorique ? <Tab value={5} icon={<DocumentScannerOutlinedIcon />}  iconPosition="start" label="historique" onClick={handleClick2}/> : null }
                <Tab value={6} component={Link} icon={<FormatListBulletedOutlinedIcon />} to="/front" iconPosition="start" label="Client" />
                <Tab value={7} icon={<PersonPinIcon />} iconPosition="start" label="Mon compte" />
                { showPartenaire ? <Tab value={8} component={Link} to="/back/user" icon={<GroupIcon />} iconPosition="start" label="Partenaires" /> : null }
                { showDroitAcces ? <Tab value={9} component={Link} to="/back/accessRight" icon={<AddCardIcon />} iconPosition="start" label="Droit d'accès" /> : null }
                { showReservation ? <Tab value={10} component={Link} to="/back/reservation" icon={<ShoppingBagIcon />} iconPosition="start" label="Réservation" /> : null }
                <Drop click = {handleChange} close ={handleClose} open={open} anchorEl={anchorEl} />
                <DropHisto click = {handleChange} close ={handleClose1} open={open1} anchorEl={anchorEl1} />
            </Tabs>
        <div className="nav-right-el">
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
        </div>
        </nav>
    );
  }
  
  export default Navbar;