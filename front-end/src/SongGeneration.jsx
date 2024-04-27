import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';
import CircularProgress from '@mui/material/CircularProgress';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#FFFF"
    },
    text: {
      primary: "#191414",
      secondary: "#191414"
    }
  }
});

const song_recommender_api = 'http://127.0.0.1:5002/song_recommender';
const make_song_api = 'http://127.0.0.1:5002/make_song';

export default function SongGeneration() {
  const [RecommenderResult, setRecommenderResult] = useState()
  const [loading, setLoading] = useState(false);

  const handleSubmitRecommender = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('recommender');
    setLoading(true);
    try {
      const response = await fetch(song_recommender_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({lyrics_input_data: body}),
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.recommended_songs)
      setRecommenderResult(data.recommended_songs.map((song, index) => (
        <div key={index}>{index + 1}. {song}</div>
      )));
    } catch (error) {
      console.error("Failed to search recommended song")
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
  };

  const handleSubmitMakeSong = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('makesong');
    setLoading(true);
    try {
      const response = await fetch(make_song_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({target_songs: body}),
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.song);
      setRecommenderResult(data.song.split('\n').map((line, index) => (
        <div>{line}</div>
      )));
    } catch (error) {
      console.error("Failed to generate song")
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
    
  };

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth={false}>
        <CssBaseline />
        <Container maxWidth="md">
        <Box
          sx={{
            marginTop: '0rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
            <Typography component="h1" variant="h3" fontWeight={'bold'}>
              Welcome to Recommendation page!
            </Typography>
          </LinearGradient>
          <p>You can recommend and generate song</p>
        </Box>
        </Container>

        <Grid container spacing={2} alignItems="center" justifyContent="left" style={{ marginTop: '5px' }}>
          <Box
          marginLeft="15rem"
          marginRight="10rem"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
          <Box component="form" onSubmit={handleSubmitRecommender} noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
            <TextField
              margin="normal"
              width="30rem"
              id="song_recommender"
              label="Enter a song"
              name="recommender"
              autoComplete="la la la la la"
              autoFocus
            />
            <Button
              type="submit"
              width="30rem"
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
            >
              Recommend Song
            </Button>
          </Box>
          
          <Box component="form" onSubmit={handleSubmitMakeSong} noValidate sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
            <TextField
              margin="normal"
              width="30rem"
              id="makesong"
              label="Enter a song"
              name="makesong"
              autoFocus
            />
            <Button
              type="submit"
              width="30rem"
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
            >
              Make Song
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>

          <Card
          sx={{
            height:'20em',
            width:'40rem',
            overflow: 'auto'
          }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              RecommenderResult ? RecommenderResult : "No recommendations available."
            )}
          </Card>
        </Grid> 

      </Container>
    </ThemeProvider>
  );
}