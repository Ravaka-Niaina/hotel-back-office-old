import axios from "axios";

export function submitLogin ({
  is_partner,
  email,
  mdp,
  browser,
}) {

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: process.env.REACT_APP_BACK_URL + '/user/login',
      withCredentials: true,
      data: {
        is_partner,
        email,
        mdp,
        browser,
      }
    })
    .then(res => resolve(res))
    .catch(err => console.error(err));// popup erreur
  });
  
}