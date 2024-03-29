import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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

const add_user_url = 'http://127.0.0.1:5002/add_user'

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

export default function SignUp() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Convert data from FormData to JSON object
    let jsonObject = {};
    for (const [key, value]  of data.entries()) {
      jsonObject[key] = value;
    }
    let json = JSON.stringify(jsonObject);

    fetch(add_user_url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
      .then((response) => {
        if (!response.ok) {
          //TODO handle HTTP error
          if(response.status == 400){
            //TODO Username already exists
            alert("Username already exists");
          }
          //throw new Error(`HTTP error! Message:  ${response.status}`);
        } else{
          if (response.status == 200){
            //TODO Account Creation Successful, redirect to Sign In
            alert("Account Created Successfully, proceed to Sign In")
            navigate('/signin')
          }
        }
      })
  };

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth="xs" sx={{height: '100vh', maxHeight: 'none'}}>
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
            src="/notes.png"
            sx={{ width: 100, height: 100 }}
          />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
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
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Sign Up
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}