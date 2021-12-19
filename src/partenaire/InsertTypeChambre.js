
// import { TextField } from "@mui/material";
import CustomError from '../CustomError';
import axios from "axios";
import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Checkbox } from "@mui/material";
import './typeChambre.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import callAPI from '../utility';

import { useState } from 'react';
import {FileInput, Preview, Videos, Font} from './utilityTypeChambre.js';
import HtmlForm from '../HtmlForm';

const infoForm = {
  title: "Creer type chambre",
  urlSubmit: "/typeChambre/testInsert",
  urlRedirectSuccess: "/typeChambre",
  infoFields: [
    { field: "id", type: "String", value: "", error: null, required: true, maxCharacters: 5},
    { field: "nom", type: "String", value: "", error: null, required: true},
    { field: "nbAdulte", type: "Integer", value: "", error: null, required: true, min: 0, max: 20 },
    { field: "creation", type: "Date", value: "", error: null, required: true },
    { field: "Password", type: "Password", value: "", error: null, required: true},
    { label: "Equipements", field: "Eqpt", type: "Checkbox", options: [
      {label: "Television", value: "TV", checked: false}, 
      {value: "Wifi", checked: false}, 
      {label: "Climatiseur", value: "clim", checked: false}]
      , error: null, minToSelect: 1
    },
    { field: "Remboursable", type: "Radio", options: [{label: "Oui", value: "yes", checked: true}, {value: "no", checked: false}], error: null }
  ]
}

const disposition = [
  ["id", "nom"],
  ["nbAdulte", "creation"],
  ["Password"],
  ["Eqpt", "Remboursable"]
];

function InsertTypeCHambre(){
  const [state, setState] = useState({i: 1});
  const history = useHistory();
  const [htmlForm, setHtmlForm] = useState(null);

  useEffect(() => {
    setHtmlForm(new HtmlForm(infoForm, disposition, state, setState, history));
  }, []);
  
  return (
    <div>
      {htmlForm !== null ? htmlForm.generateForm() : null}
    </div>
  );
}
  
  export default InsertTypeCHambre;