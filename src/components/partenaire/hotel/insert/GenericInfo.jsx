import TextField from '@mui/material/TextField';

export default function GenericInfo ({
  name,
  setName,
  nameError,
  setNameError,
  link,
  setLink,
  linkError,
  setLinkError,
  phoneNum,
  setPhoneNum,
  phoneNumError,
  setPhoneNumError,
  emailAddress,
  setEmailAddress,
  emailAddressError,
  setEmailAddressError,
  address,
  setAddress,
  addressError,
  setAddressError,
  vignette,
  setVignette,
  vignetteError,
  setVignetteError,
}) {
  return (
    <>
      <div className="form-group">
        <TextField
          id="outlined-basic"
          label="Nom"
          variant="outlined"
          className="form-control"
          style={{width:"400px",marginTop:"15px"}}
          size="small"
          type="text"
          name="nom"
          onChange={ (e) => {
            setName(e.target.value);
            setNameError(null);
          } }
          value={ name }
          error={ !!nameError }
          helperText={ nameError }
        />

        <TextField
          id="outlined-basic"
          label="lien"
          variant="outlined"
          className="form-control"
          style={{width:"400px",marginTop:"15px"}}
          size="small"
          type="text"
          name="link"
          onChange={ (e) => {
            setLink(e.target.value);
            setLinkError(null);
          } }
          value={ link }
          error={ !!linkError }
          helperText={ linkError }
        />

        <TextField
          id="outlined-basic"
          label="telephone"
          variant="outlined"
          className="form-control"
          style={{width:"400px",marginTop:"15px"}}
          size="small"
          type="text"
          name="telephone"
          onChange={ (e) => {
            setPhoneNum(e.target.value);
            setPhoneNumError(null)
          } }
          value={ phoneNum }
          error={ !!phoneNumError }
          helperText={ phoneNumError }
        />
      </div>
      <div className="form-group">
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          className="form-control"
          style={{width:"400px",marginTop:"15px"}}
          size="small"
          type="email"
          name="email"
          onChange={(e) => {
            setEmailAddress(e.target.value);
            setEmailAddressError(null);
          } }
          value={ emailAddress }
          error={ !!emailAddressError }
          helperText={ emailAddressError }
        />
      </div>

      <div className="form-group">
        <TextField
          id="outlined-basic"
          label="adresse"
          variant="outlined"
          className="form-control"
          style={{width:"400px",marginTop:"15px"}}
          size="small"
          type="text"
          name="adresse"
          onChange={(e) => {
            setAddress(e.target.value);
            setAddressError(null);
          } }
          value={ address }
          error={ !!addressError }
          helperText={ addressError }
        />
      </div>

      <div className="form-group">
        <TextField
          id="outlined-basic"
          label="vignette touristique"
          variant="outlined"
          className="form-control"
          style={{width:"400px",marginTop:"15px"}}
          size="small"
          type="number"
          name="vignette"
          onChange={(e) => {
            setVignette(e.target.value);
            setVignetteError(null);
          } }
          value={ vignette }
          error={ !!vignetteError }
          helperText={ vignetteError }
        />
      </div>
    </>  
  );
};