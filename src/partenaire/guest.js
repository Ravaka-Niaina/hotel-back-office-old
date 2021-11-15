import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddIcon from '@mui/icons-material/Add';

class App extends React.Component{
 constructor(props){
   super(props);
     this.IncrAdulte = this.IncrAdulte.bind(this);
     this.DecrAdulte = this.DecrAdulte.bind(this);
     this.IncrEnfant = this.IncrEnfant.bind(this);
     this.DecrEnfant = this.DecrEnfant.bind(this);
       this.state = {
         adulte : 1,
         enfant : 0
       }
    }

IncrAdulte() {                              // addOne as HandleClick
  this.setState((preState) => {
    return {
      adulte : preState.adulte + 1
      };
   });
 }

DecrAdulte() {                              // addOne as HandleClick
  this.setState((preState) => {
    if (this.state.adulte !== 0) {
    return {
      adulte : preState.adulte - 1
      };
    }
   });
 }

 IncrEnfant() {                              // addOne as HandleClick
  this.setState((preState) => {
    return {
      enfant : preState.enfant + 1
      };
   });
 }

DecrEnfant() {                              // addOne as HandleClick
  this.setState((preState) => {
    if (this.state.enfant !== 0) {
    return {
      enfant : preState.enfant - 1
      };
    }
   });
 }

render() {
   return (
      <div>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={this.state.adulte}
            size="small"
            endAdornment={<InputAdornment position="end">
            kg
            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        <button onClick={this.IncrAdulte}>+1</button>
        <button onClick={this.DecrAdulte}>-1</button>

      <div style={{marginTop:'40px'}}>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={this.state.enfant}
            size="small"
            endAdornment={<InputAdornment position="end">
      <IconButton color="primary"/>
        <AddIcon style={{ fontSize: 100 }} />
      <AddBoxOutlinedIcon/>
            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        <button onClick={this.IncrEnfant}>+1</button>
        <button onClick={this.DecrEnfant}>-1</button>
      </div>
      </div>
     );
   }
 }

export default App;