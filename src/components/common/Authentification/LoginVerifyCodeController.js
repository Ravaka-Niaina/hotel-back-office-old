import { useState, } from 'react';
import { useHistory ,useParams} from 'react-router-dom';

import { session, } from "../utilitySession.js";
import { submitLoginCode } from './LoginVerifyCodeAdapter';
import LoginVerifyNewBrowserComponent from './LoginVerifyNewBrowserComponent.jsx';

export default function LoginVerifyCodeController () {
  const history = useHistory();
  const { idPartner } = useParams();

  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingSMSBtnLoading, setIsSendingSMSBtnLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isPartner = true;
  const idUser = idPartner;
  let idBrowser = null;

  function verifyCode(e){
    e.preventDefault();
    
    setIsLoading(true);

    submitLoginCode({
      isPartner,
      idUser,
      verificationCode,
    }).then((res) => {
      console.log(res.data);
      const callback = {
        200: () => {
          localStorage.setItem("user_session", res.headers.user_session);
          session.getInstance().update(res.headers.user_session);
          history.push(isPartner ? '/back' : '/front');
        },
        201: () => {
          setErrorMessage(res.data.message);
          setIsLoading(false);
        },
        202: () => {}, // another error
      };
      callback[res.data.status]();
    });
  };

  function resendSMS () {
    setIsSendingSMSBtnLoading(true);
    console.log('resending SMS');

    setTimeout(() => {setIsSendingSMSBtnLoading(false)}, 2000);
  }

  return (
    <LoginVerifyNewBrowserComponent
      verificationCode = { verificationCode }
      setVerificationCode = { setVerificationCode }
      errorMessage = { errorMessage }
      setErrorMessage = { setErrorMessage }
      isLoading = { isLoading }
      verifyCode = { verifyCode }
      instructionMessage = 'Entrez le code que nous avons envoyé à +261-XXX-XXX-XX-XX pour vous connecter.'
      resendSMS = { resendSMS }
      isSendingSMSBtnLoading = { isSendingSMSBtnLoading }
    />
  );
}