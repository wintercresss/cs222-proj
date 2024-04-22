import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LinearGradient } from 'react-text-gradients';
import { useAuth } from './AuthContext.jsx';

const authentication_url = 'http://127.0.0.1:5002/authenticate'
const userDetailsUrl = 'http://127.0.0.1:5002/get_user_details'

const themeLight = createTheme({
  palette: {
    background: {
      default: "transparent"
    },
    text: {
      primary: "#191414",
      secondary: "#191414"
    }
  }
});

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Convert data to JSON object
    let jsonObject = {};
    for (const [key, value]  of data.entries()) {
      jsonObject[key] = value;
    }
    let json = JSON.stringify(jsonObject);

    fetch(authentication_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: json  
    })
    .then((response) => {
          if (!response.ok) {
            if(response.status == 440 || response.status == 401){
              //TODO Incorrect Password entered
              alert("Incorrect Password");
            } else if(response.status == 441){
              alert("User doesn't exist")
            }
            //TODO handle HTTP error
            else throw new Error(`HTTP error! Status:  ${response.status}`);
          } else{
            if (response.status == 200){
              //TODO User has signed in, redirect to profile page
              alert("Authenticated")
              localStorage.setItem('username', jsonObject.username);
              return fetch(userDetailsUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({ username: jsonObject.username }) // Ensure you send the necessary identifier to fetch details
              });
            }
          }
    })
    .then(response => response.json())  // Convert the second fetch response to JSON
    .then(userDetails => {
      console.log(userDetails)
      if (!userDetails) {
        throw new Error("User details retrieval failed - no details returned");
      }
      // Store user details in localStorage
      localStorage.setItem('prf_full_name', userDetails.prf_full_name);
      localStorage.setItem('email', userDetails.email);
      localStorage.setItem('ph_no', userDetails.ph_no);
      localStorage.setItem('fav_song', userDetails.fav_song);
      localStorage.setItem('fav_genre', userDetails.fav_genre);
      signIn(() => navigate('/myprofile'));
    })
    .catch(error => {
      console.error('Error during the authentication or fetching user details:', error);
      alert("Error: " + error.message);
    });
  };

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth={false} sx={{height: '100vh', maxHeight: 'none'}}>
        <CssBaseline />
        <Container maxWidth="md">
        <Box
          sx={{
            marginTop: '15rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
            <Typography component="h1" variant="h3" fontWeight={'bold'}>
              Sign In
            </Typography>
          </LinearGradient>
          <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:5173/signup#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

