import React from 'react';
import axios from 'axios';
import Select from 'react-select'
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


export default class result extends React.Component {
  // state = {
  //   name: '',
  // }

  constructor(props){
    super(props);
    this.state = {
      user: [],
        email: ""
    };
}
  render() {
    return (
      <div className="">
        <p className="">
           Mandeha
        </p>
      </div>
    )
  }
}