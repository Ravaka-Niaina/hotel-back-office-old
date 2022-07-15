import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SmsIcon from '@mui/icons-material/Sms';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import BtnSendCodeBySMS from './BtnSendCodeBySMS';

import { Form, } from 'formik';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const LoginVerifyNewBrowserComponent = ({
    verificationCode,
    setVerificationCode,
    errorMessage,
    setErrorMessage,
    isLoading,
    verifyCode,
    instructionMessage,
    resendSMS,
    isSendingSMSBtnLoading,
}) => {
    
    return(
        <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <Stack sx={{ mb: 5 }}>
                            <Typography variant="h4" gutterBottom>
                            <h3>Code de vérification</h3><br/>
                            <h5>{ instructionMessage }</h5>
                            </Typography>
                        </Stack>

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                autoComplete="code"
                                label="Enter your code"
                                value={verificationCode}
                                onChange={(e) =>  {setErrorMessage(null); setVerificationCode(e.target.value)}}
                                error={errorMessage === null ? false : true}
                                helperText={errorMessage === null ? null : errorMessage}
                            /> 
                        </Stack>
                        <br/>

                        <LoadingButton
                            fullWidth
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<HowToRegIcon />}
                            variant="contained"
                            onClick={(e) => verifyCode(e)}
                        >
                            <span style={{color:'white'}}>Verifier</span>
                        </LoadingButton>
                        <br/>

                        <BtnSendCodeBySMS
                            isSendingSMSBtnLoading={isSendingSMSBtnLoading}
                            resendSMS={resendSMS}
                        />
                    </ContentStyle>
                </Container>
            </Grid>
        </Grid>
    </>
);
    
    
}
export default LoginVerifyNewBrowserComponent;
