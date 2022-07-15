import axios from "axios";

export function submitLoginCode ({
  isPartner,
  idUser,
  verificationCode,
}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: process.env.REACT_APP_BACK_URL + '/user/login/verifyCode',
      withCredentials: true,
      data: {
        isPartner,
        idUser,
        verificationCode,
      }
    })
    .then(res => resolve(res))
    .catch(err => console.error(err));// popup erreur
  });
}