import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const authentication_url = 'http://127.0.0.1:5000/authenticate'

const themeLight = createTheme({
  palette: {
    background: {
      default: "#ffffff"
    },
    text: {
      primary: "#191414",
      secondary: "#191414"
    }
  }
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        CS222 Group 16
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate()
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
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json  
    })
      .then((response) => {
        if (!response.ok) {
          if(response.status == 440){
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
            navigate('/myprofile')
            localStorage.setItem('username', JSON.stringify(JSON.parse(json).username));
          }
        }
      })
  };

  return (
    <ThemeProvider theme={themeLight}>
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
          <Avatar
            src="/Spotify_logo_without_text.svg.png"
            sx={{ width: 56, height: 56 }} // Customize size as needed
          />
          <Typography component="h1" variant="h5">
            Welcome to Spotify Assistance
          </Typography>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}

