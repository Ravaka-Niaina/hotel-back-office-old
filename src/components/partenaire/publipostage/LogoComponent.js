import { useEffect, useState } from "react";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";


const LogoComponent = (props) => {
  const [show, setShow] = useState(false);
  const [url,setUrl]=useState("");
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };
  const onChange = (e) => {
    setUrl(e);
  };
  const valider = (e) => {
    
    props.changeLogo(url);
    closeHandler();
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  useEffect(() => {
    setUrl(props.logo);
  }, [props.logo]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <h2>{props.title}</h2>
        <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
        <div className={popupStyles.content}>
                <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size='small'
                      label={
                        <p id='libel'>
                        URL
                        </p>
                             } 
                      type="text"
                      value={url}
                      style={{width:'325px'}}
                      onChange={onChange}
                      
                      
                      
                    />
                    <button class="button_mail btn_blue" onClick={valider} style={{width:150,marginTop:20}}>Valider</button>

        </div>
      </div>
    </div>
  );
};

LogoComponent.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default LogoComponent;