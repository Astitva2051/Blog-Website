import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React ,{useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const theme = createTheme();

function ForgotPassword() {
    const [email, setemail] = useState("");

    const {forgotPassword} = useAuth();

    const handleSubmit = async(e) => {
        forgotPassword(email).then((resp)=>{
            console.log(resp);
            Navigate('/resetPassword');
        }).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {email}
              onChange = {(e)=>setemail(e.target.value)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Link
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ForgotPassword