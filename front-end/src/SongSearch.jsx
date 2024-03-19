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

const search_lyric_api = 'http://127.0.0.1:5000/search_lyrics'

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

const handleSubmitLyrics = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    fetch(search_lyric_api, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        lyrics: data.get("lyrics")
      })
    })
      .then((response) => {
        if (!response.ok) {
          //TODO handle HTTP error
          throw new Error(`HTTP error! Status:  ${response.status}`);
        } else{
          if (response.status == 200){
            //TODO User has signed in, redirect to profile page
          } else if(response.status == 400){
            //TODO Incorrect Password entered
            alert("Incorrect Password");
          }
        }
      })
  };

const handleSubmit = (event) => {

}

export default function SongSearch() {
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
            Welcome to the search page
          </Typography>
          <p>You can search by lyrics, artist, or title</p>

          <Box component="form" onSubmit={handleSubmitLyrics} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="search_lyrics"
              label="Search by Lyrics"
              name="lyrics"
              autoComplete="la la la la la"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Search
            </Button>
            <Grid container>
            </Grid>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="search_title"
              label="Search by Title"
              name="title"
              autoComplete="Never gonna give you up"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Search
            </Button>
            <Grid container>
            </Grid>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="search_artist"
              label="Search by Artist"
              name="artist"
              autoComplete="Rick Astley"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Search
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

