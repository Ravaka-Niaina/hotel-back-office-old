import { useState, useEffect, } from 'react';

import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import SmsIcon from '@mui/icons-material/Sms';

let intervalRefreshTimeId = null;
let timeout = 30;

export default function BtnSendCodeBySMS ({
  isSendingSMSBtnLoading,
  resendSMS,
}) {
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [refresh, setRefresh] = useState({});

  function decreaseTimeout () {
    timeout -= 1;
    setRefresh({});
  }

  function beginTimeout () {
    setIsTimeoutActive(true);
    intervalRefreshTimeId = setInterval(decreaseTimeout, 1000);
  }

  useEffect(() => {
    if (isTimeoutActive && timeout <= 0) {
      setIsTimeoutActive(false);
      timeout = 30;
      clearInterval(intervalRefreshTimeId);
      intervalRefreshTimeId = null;
    }
  });

  return (
    <>
      {
        isTimeoutActive
        
        ? <LoadingButton
          fullWidth
          loading={false}
          loadingPosition="start"
          startIcon={<SmsIcon />}
          variant="outlined"
          disabled
        >
          <span>Renvoyer code après { timeout } secondes</span>
        </LoadingButton>

        : <LoadingButton
          fullWidth
          loading={isSendingSMSBtnLoading}
          loadingPosition="start"
          startIcon={<SmsIcon />}
          variant="contained"
          onClick={(e) => { resendSMS(e); beginTimeout(); }}
        >
          <span style={{color:'white'}}>Renvoyer code</span>
        </LoadingButton>
      }
    </>
  );
}