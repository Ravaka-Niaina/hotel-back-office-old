import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import {  Link } from 'react-router-dom'


export default function AccountMenu(props) {
  
  return (
    <React.Fragment>
      <Menu 
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.close}
        onClick={props.click}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <Link to={"/historique/TC"}  style ={{  color: 'black' ,textDecoration: 'none'}}>
            <MenuItem>
                <ListItemIcon>
                    <LocalOfferOutlinedIcon fontSize="small"/> 
                </ListItemIcon>
                TypeChambre
            </MenuItem>
            </Link>
            <Link to={'/historique/MPL'}  style ={{  color: 'black' ,textDecoration: 'none'}}>
            <MenuItem>
                <ListItemIcon>
                    <LocalOfferOutlinedIcon fontSize="small"/> 
                </ListItemIcon>
                Modification PlanTarifaire
            </MenuItem>
            </Link>
            <Link to={''} style ={{  color: 'black' ,textDecoration: 'none'}}>
                <MenuItem>
                <ListItemIcon>
                <DateRangeOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Promotion
                </MenuItem>
            </Link>
      </Menu>
    </React.Fragment>
  );
}