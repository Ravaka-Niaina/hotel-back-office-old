
import './home.css';
import { Container } from "@mui/material";
import  Navbar  from "../Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactPlayer from 'react-player'

function home() {
    return (
        <>
        <Navbar currentPage={0}/>
        <Container className="mainContainer">
            <h1 style={{margin: '0 auto'}}>Bienvenue!</h1>
            <ReactPlayer url='https://www.youtube.com/watch?v=Yr_vG_C3eNA' />
        </Container>
        </>
        );
    }
  
  export default home;