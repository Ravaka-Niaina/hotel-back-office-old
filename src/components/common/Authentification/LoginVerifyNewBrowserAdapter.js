import axios from "axios";

export function submitVerificationCode ({
  isPartner,
  idUser,
  verificationCode,
  idBrowser
}) {
  
  return new Promise((resolve, reject) => {
    axios({
      method: "post",      
      url: process.env.REACT_APP_BACK_URL + '/user/verify',
      withCredentials: true,
      data: {
        isPartner,
        idUser,
        verificationCode,
        idBrowser
      },
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      console.error(err);
      // popup erreur
    });
  });
}