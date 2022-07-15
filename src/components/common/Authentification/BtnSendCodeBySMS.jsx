import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import SmsIcon from '@mui/icons-material/Sms';

function BtnSendCodeBySMS ({
  isSendingSMSBtnLoading,
  resendSMS,
}) {
  const [timeout, setTimeout] = useState();

  return (
    <>
      {
        timeout === 0
        ? <LoadingButton
          fullWidth
          loading={isSendingSMSBtnLoading}
          loadingPosition="start"
          startIcon={<SmsIcon />}
          variant="outlined"
          color
          onClick={(e) => resendSMS(e)}
        >
          <span style={{color:'white'}}>Renvoyer code</span>
        </LoadingButton>
        : 
      }
    </>
  );
}