import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Coordinates ({
  setIsMapPickerToDisplay,
  location,
  setLocation,
}) {
  return (
    <div style={{marginTop:"20px"}} class='form-group'>
      <p style={{textDecoration:'underline'}} id='bigLabel'>Coordonnées gps</p>
      <div style={{marginTop:"15px"}}>
        <Button
          variant="contained"
          type="submit"
          style={{ textDecoration: 'none', backgroundColor: '#2ac4ea' }}
          onClick={ (e) => setIsMapPickerToDisplay(true) }
        >
        <span style={{ color: 'white' }}>Coordonnées gps</span>
        </Button>
      </div>
      <div style={{marginTop:"10px"}}>
        <box>
          <TextField
            id="outlined-basic"
            InputLabelProps={{
              shrink: true,
              }}
            label="Latitute"
            variant="outlined"
            className="form-control"
            style={{width:"220px",marginTop:"15px"}}
            size="small"
            type="number"
            value={location.lat}
            onChange={ (e) => setLocation(e.target.value) }
          />

          <TextField
            id="outlined-basic"
            InputLabelProps={{
              shrink: true,
              }}
            label="Longitute"
            variant="outlined"
            className="form-control"
            style={{width:"220px",marginTop:"15px",marginLeft:"30px"}}
            size="small"
            type="number"
            value={location.lng}
            onChange={ (e) => setLocation(e.target.value) }
          />
        </box>
      </div>
    </div>  
  );
};