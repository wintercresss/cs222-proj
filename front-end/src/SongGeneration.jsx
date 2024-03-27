import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

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

const song_recommender_api = 'http://127.0.0.1:5000/song_recommender';
const make_song_api = 'http://127.0.0.1:5000/make_song';

export default function SongGeneration() {

  const [RecommenderResult, setRecommenderResult] = useState()

  const handleSubmitRecommender = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('recommender');
    try {
      const response = await fetch(song_recommender_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({lyrics_input_data: body})
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRecommenderResult(data.lyrics)
    } catch (error) {
      console.error("Failed to search recommended song")
    }
  };

  const [MakeSongResult, setMakeSongResult] = useState()

  const handleSubmitMakeSong = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('makesong');
    try {
      const response = await fetch(make_song_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({lyrics_data: body})
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMakeSongResult(data.lyrics)
    } catch (error) {
      console.error("Failed to generate song")
    }
  };

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
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
            Welcome to Song Recommendation page!
          </Typography>
          <p>You can recommend and generate song</p>
        </Box>
        <Box component="form" onSubmit={handleSubmitRecommender} noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h6" align="center" gutterBottom>
          Song Recommendation
          </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="song_recommender"
              label="Enter a song"
              name="recommender"
              autoComplete="la la la la la"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Recommend Song
            </Button>
            <Grid container>
            </Grid>
          </Box>
          <p>{RecommenderResult}</p>

          <Box component="form" onSubmit={handleSubmitMakeSong} noValidate sx={{ mt: 1 }}>
            <Typography component="h1" variant="h6" align="center" gutterBottom>
            Song Generator
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="make_song"
              label="Enter a song"
              name="makesong"
              autoComplete="Never gonna give you up"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Make Song
            </Button>
            <Grid container>
            </Grid>
          </Box>
          <p>{MakeSongResult}</p>
      </Container>
    </ThemeProvider>
  );
}