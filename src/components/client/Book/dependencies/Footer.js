import React from 'react';
import styles from '../Book.module.css';
import Box from '@mui/material/Box'
import ContactMailIcon from '@mui/icons-material/ContactMail';

function Footer(props){
    return(
        <>
            <Box className={styles.footer}>
                <img src="/colbert.png"/>
                <span>@ 2022 . All reserved.</span>
            </Box>
        </>
    );
}

export default Footer;