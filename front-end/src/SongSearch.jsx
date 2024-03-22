import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const search_lyric_api = 'http://127.0.0.1:5000/search_lyrics'

const find_song_api = 'http://127.0.0.1:5000/find_song'
const find_artist_api = 'http://127.0.0.1:5000/find_artist'

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

export default function SongSearch() {
  const [searchResult, setSearchResult] = useState()

  const handleSubmitLyrics = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('lyrics');
    try {
      const response = await fetch(search_lyric_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({search_song: body})
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResult(data.lyrics)
    } catch (error) {
      console.error("Failed to search lyrics")
    }
  };

  const [songResult, setSongResult] = useState()

  const handleSubmitSong = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('title');
    try {
      const url = new URL(find_song_api);
      url.searchParams.append('song', body);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        console.log(response.status)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const songString = data.join(', ');
      setSongResult(songString)
    } catch (error) {
      console.error("Failed to search song")
    }
  };

  const [artistResult, setArtistResult] = useState()

  const handleSubmitArtist = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('artist');
    try {
      const url = new URL(find_artist_api);
      url.searchParams.append('artist', body);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        console.log(response.status)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const artistsString = data.join(', ');
      setArtistResult(artistsString)
    } catch (error) {
      console.error("Failed to search artist")
    }
  };

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth="xs" >
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
              id="search_song"
              label="Search by Lyrics"
              name="search_song"
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
          <p>{searchResult}</p>

          <Box component="form" onSubmit={handleSubmitSong} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              fullWidth
              id="search_title"
              label="Search by Title"
              name="song_to_search"
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
          <p>{songResult}</p>

          <Box component="form" onSubmit={handleSubmitArtist} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="search_artist"
              label="Search by Artist"
              name="artist_to_search"
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
          </Box>
          <p>{artistResult}</p>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

