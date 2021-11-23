import './Navbar.css';
import * as React from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
function Navbar(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
            <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
            <Tabs value={props.currentPage} onChange={handleChange} aria-label="icon label tabs example">
                <Tab value={0} component={Link} to="/" icon={<HomeOutlinedIcon />} iconPosition="start" label="Accueil" />
                <Tab value={1} component={Link} to="/tarif" icon={<DocumentScannerOutlinedIcon />} iconPosition="start" label="Plan tarifaire" />
                <Tab value={2} component={Link} to="/typeChambre" icon={<BedroomChildOutlinedIcon />} iconPosition="start" label="Type de chambre" />
                <Tab value={3} component={Link} icon={<PushPinOutlinedIcon />} to="/promotion" iconPosition="start" label="Promotion" />

                <Tab value={4} component={Link} icon={<GavelOutlinedIcon />} to="/politique/list" iconPosition="start" label="Politique" />
                <Tab value={5} icon={<FormatListBulletedOutlinedIcon />} iconPosition="start" label="Réservation" />

                <Tab value={5} component={Link} icon={<FormatListBulletedOutlinedIcon />} to="/frontClient" iconPosition="start" label="Client" />

                <Tab value={6} icon={<PersonPinIcon />} iconPosition="start" label="Mon compte" />
            </Tabs>
            <div className="nav-right-el">
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'fit-content',
                    }}
                >
                <Badge
                sx={{
                    "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "red"
                    }
                }}
                className="mail-button" badgeContent={4}>
                    <NotificationsActiveOutlinedIcon fontSize="large" color="action" />
                </Badge>
                <Divider orientation="vertical" variant="middle" flexItem />
                <IconButton aria-label="fingerprint" color="success">
                    <LogoutOutlinedIcon />
                </IconButton>
                </Box>
            </div>
            </nav>
    );
  }
  
  export default Navbar;