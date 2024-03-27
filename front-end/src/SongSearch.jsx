import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinearGradient } from 'react-text-gradients';

const search_lyric_api = 'http://127.0.0.1:5000/search_lyrics'
const find_song_api = 'http://127.0.0.1:5000/find_song'
const find_artist_api = 'http://127.0.0.1:5000/find_artist'

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
      <Container component="main" maxWidth={false} sx={{height: '100vh', maxHeight: 'none'}}>
        <CssBaseline />
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
              Welcome to Search page!
            </Typography>
          </LinearGradient>
          <p>You can search by lyrics, artist, or title</p>
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
                    <TextField
                      margin="normal"
                      fullWidth
                      id="search_lyrics"
                      label="Search by Lyrics"
                      name="lyrics"
                      autoComplete="la la la la la"
                      multiline
                      rows={2}
                      InputLabelProps={{
                        sx: { 
                          color: 'white', // Label color
                          '&.Mui-focused': { // Label color when the input is focused
                            color: 'white',
                          }
                        }
                      }}
                      InputProps={{
                        sx: {
                          color: 'white', // Text color
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color for the outlined variant
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color on hover for the outlined variant
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color when the input is focused for the outlined variant
                          },
                        },
                      }}
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
                    >
                      Search Lyrics
                    </Button>
                    <Grid container>
                    </Grid>
                  </Box>  
                  <Box component="form" onSubmit={handleSubmitSong} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="search_title"
                      label="Search by Title"
                      name="title"
                      autoComplete="Never gonna give you up"
                      multiline
                      rows={2}
                      InputLabelProps={{
                        sx: { 
                          color: 'white', // Label color
                          '&.Mui-focused': { // Label color when the input is focused
                            color: 'white',
                          }
                        }
                      }}
                      InputProps={{
                        sx: {
                          color: 'white', // Text color
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color for the outlined variant
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color on hover for the outlined variant
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color when the input is focused for the outlined variant
                          },
                        },
                      }}
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
                    >
                      Search Title
                    </Button>
                    <Grid container>
                    </Grid>
                  </Box>
                  <Box component="form" onSubmit={handleSubmitArtist} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="search_artist"
                      label="Search by Artist"
                      name="artist"
                      autoComplete="Rick Astley"
                      multiline
                      rows={2}
                      InputLabelProps={{
                        sx: { 
                          color: 'white', // Label color
                          '&.Mui-focused': { // Label color when the input is focused
                            color: 'white',
                          }
                        }
                      }}
                      InputProps={{
                        sx: {
                          color: 'white', // Text color
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color for the outlined variant
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color on hover for the outlined variant
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Border color when the input is focused for the outlined variant
                          },
                        },
                      }}
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: '#1DB954', '&:hover': { bgcolor: 'darkgreen' } }}
                    >
                      Search Artist
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
                  <p>{searchResult}</p>
                  <p>{songResult}</p>
                  <p>{artistResult}</p>
              </Box>
            </Grid>
          </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}

