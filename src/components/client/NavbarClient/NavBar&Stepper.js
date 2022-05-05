import NavBar from "./Navbar.js";
import Stepper from "./stepper.js";
import Box from '@mui/material/Box';

const css = {
    justifyContent: "center",
    minHeight: "60px",
    gap: "24px",
    alignItems: "center",
    backgroundColor: "#f2f2f2 !important",
    boxShadow: "0px 1px 2px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
}

function NavBarStepper (props){
    return (
        <> 
             <NavBar access = {props.access} id = {props.id} changeDeviseRate={props.changeDeviseRate} />
             <Box sx={{ display: { xs: 'none', md: 'flex'}}} style={css}>
                <Stepper indice = {props.indice} id = {props.id} numeroItineraire={props.numeroItineraire} isConnected={props.isConnected}
                    setConfModif={props.setConfModif} showConfModif={props.showConfModif} isVariableModif={props.isVariableModif} />
             </Box>
        </>
    );
}
export default NavBarStepper;