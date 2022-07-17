import MapPicker from "react-google-map-picker";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CustomMapPicker ({
  setLocation,
  resetLocation,
  defaultLocation,
  zoom,
  setZoom,
  setIsMapPickerToDisplay,
}) {
  return (
    <div className = "block">
      <button onClick={resetLocation}>Reset Location</button>
      <br/>

      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: "700px" }}
        onChangeLocation={(lat, lng) => setLocation({ lat: lat, lng: lng })}
        onChangeZoom={setZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />

      <box>
        <TextField
          id="outlined-basic"
          InputLabelProps={{
            shrink: true,
            }}
          label="Zoom"
          variant="outlined"
          className="form-control"
          style={{width:"250px",marginTop:"15px",marginLeft:"30px"}}
          size="small"
          type="text" 
          value={zoom} 
          disabled
        />

        <Button
          variant="contained"
          type="submit"
          style={{ textDecoration: 'none', backgroundColor: '#2ac4ea',marginLeft : "30px",marginTop:"15px"}}
          onClick={ () => setIsMapPickerToDisplay(false) }
        >
          <span style={{ color: 'white' }}>OK</span>
        </Button>
      </box>

    </div>  
  );
};