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
import Autocomplete from '@mui/material/Autocomplete';

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
      console.log(data.lyrics)
      
      setSearchResult(data.lyrics.split('\n').map((line, index) => (
        <div>{line}</div>
      )))
    } catch (error) {
      setSearchResult("None")
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
      const songString = data.slice(0,9).join(', ');
      setSearchResult(songString)
    } catch (error) {
      console.error("Failed to search song")
    }
  };

  const [artistResult, setArtistResult] = useState()

  const handleSubmitArtist = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('artist');
    console.log(body)
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
      const artistsString = data.slice(0,9).join(', ');
      setSearchResult(artistsString)
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
          
          <p>You can search for lyrics, artist, or title</p>
          <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginTop: '0px' }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                  <Box component="form" onSubmit={handleSubmitLyrics} noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                      disablePortal
                      options={song_options}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Search Song Lyrics"
                      name="lyrics" />}
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
                  <Box component="form" onSubmit={handleSubmitSong} noValidate sx={{ mt: 1 }}>
                  <Autocomplete
                      disablePortal
                      id="title"
                      name="title"
                      options={song_options}
                      sx={{ width: 300 }}
                      renderInput={(params) => 
                        <TextField {...params} 
                          label="Search for song names"
                          name='title'/>}
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
                  <Box component="form" onSubmit={handleSubmitArtist} noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                      disablePortal
                      id="artist"
                      name="artist"
                      options={artistOptions}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} 
                        label="Search for Artists"
                        name='artist' />}
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
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                  <div>
                    {searchResult}
                  </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const song_options = [
  {label: 'Never gonna give you up'},
  {label: 'Ahe\'s My Kind Of Girl'},
  {label: 'Crazy World'}
]

const artistOptions = [
  {label: "Rick Astley"}
]
