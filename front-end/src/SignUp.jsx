import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinearGradient } from 'react-text-gradients';
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

export default function SignUp() {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = React.useState(false);

  // useEffect to navigate after the state is set to true
  React.useEffect(() => {
    if (signedUp) {
      navigate('/');
    }
  }, [signedUp, navigate]);

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
            setSignedUp(true);
          }
        }
      })
  };

  const handleBackToSignIn = () => {
    navigate('/');
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
              Let's create an account!
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
              <TextField
                margin="normal"
                fullWidth
                name="prf_full_name"
                label="Full name"
                type="fullname"
                id="prf_full_name"
                autoComplete="current-fullname"
              />
              <TextField
                margin="normal"
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                autoComplete="current-email"
              />
              <TextField
                margin="normal"
                fullWidth
                name="ph_no"
                label="Phone Number"
                type="ph_no"
                id="ph_no"
                autoComplete="current-phone"
              />
              <TextField
                margin="normal"
                fullWidth
                name="fav_song"
                label="Favorite Song"
                type="fav_song"
                id="fav_song"
                autoComplete="current-song"
              />
              <TextField
                margin="normal"
                fullWidth
                name="fav_genre"
                label="Favorite Genre"
                type="fav_genre"
                id="fav_genre"
                autoComplete="current-genre"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={handleBackToSignIn}
                sx={{ mt: 2, mb: 2 }}
              >
                Back to Sign In
              </Button>
              <Grid container>
              </Grid>
            </Box>
          </Container>
        </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}