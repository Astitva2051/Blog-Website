import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React ,{useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function useQuery(){
  const location = useLocation()
  return new URLSearchParams(location.search);
}

const theme = createTheme();

function ResetPassword() {
    const [password, setpassword] = useState("")

    const {resetPassword} = useAuth();
    const query = useQuery();

    const handleSubmit = async (e) => {
      resetPassword(query.get('oobCode'), password).then((resp)=> {
          console.log("password reseted");
          Navigate('/');
      }).catch((err)=>console.log(err))
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
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              value = {password}
              onChange = {(e)=>setpassword(e.target.value)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ResetPassword