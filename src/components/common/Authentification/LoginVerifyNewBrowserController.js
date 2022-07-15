import { useState, } from 'react';
import { useHistory } from 'react-router-dom';

import { session, } from "../utilitySession.js";
import { submitVerificationCode } from './LoginVerifyNewBrowserAdapter';
import LoginVerifyNewBrowserComponent from './LoginVerifyNewBrowserComponent.jsx';

export default function LoginVerifyNewBrowserController () {
  const history = useHistory();

  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otherErrorMessage, setOtherErrorMessage] = useState(null);

  let isPartner = false;
  let idUser = null;
  let idBrowser = null;

  function verifyCode(e){
    e.preventDefault();
    
    setIsLoading(true);

    submitVerificationCode({
      isPartner,
      idUser,
      verificationCode,
      idBrowser :   localStorage.getItem('idBrowser')
    }).then((res) => {
      const callback = {
        200: () => {
          localStorage.setItem("user_session", res.headers.user_session);
          session.getInstance().update(res.headers.user_session);
          history.push(isPartner ? '/back' : '/front');
        },
        201: () => { setErrorMessage(res.message) },
        202: () => { setOtherErrorMessage(res.message) },
        // 203: () => { history.push('/back/login/verifyNewBrowser') },
      };
      callback[res.status]();
    });
  };

  return (
    <LoginVerifyNewBrowserComponent
      verificationCode = { verificationCode }
      setVerificationCode = { setVerificationCode }
      errorMessage = { errorMessage }
      setErrorMessage = { setErrorMessage }
      isLoading = { isLoading }
      verifyCode = { verifyCode }
      instructionMessage = 'Entrez le code que nous avons envoyé à +261-XXX-XXX-XX-XX pour vous connecter.'
    />
  );
}