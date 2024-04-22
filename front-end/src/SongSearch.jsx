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
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});


const search_lyric_api = 'http://127.0.0.1:5002/search_lyrics'
const find_song_api = 'http://127.0.0.1:5002/find_song'
const find_artist_api = 'http://127.0.0.1:5002/find_artist'
const fetch_songs_api = 'http://127.0.0.1:5002/get_all_songs'

const themeLight = createTheme({
  palette: {
    background: {
      default: "#FFFF"
    },
    text: {
      primary: "#00CCAA",
      secondary: "0000FF"
    }
  }
});

export default function SongSearch() {
  const [SearchResultDialogOpen, setSearchResultDialogOpen] = useState(false);

  const handleSearchResultClose = () => {
    setSearchResultDialogOpen(false);
  };

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
      setSearchResultDialogOpen(true)
    } catch (error) {
      setSearchResult("None")
    }
  };

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
      const songString = data.slice(0,9).join('/n');
      setSearchResult(songString.split('/n').map((line, index) => (
        <div>{line}</div>
      )))
      setSearchResultDialogOpen(true)
    } catch (error) {
      console.error("Failed to search song")
    }
  };

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
      
      const artistsString = data.slice(0,9).join('/n');
      setSearchResult(artistsString.split('/n').map((line, index) => (
        <div>{line}</div>
      )))
      setSearchResultDialogOpen(true)
    } catch (error) {
      console.error("Failed to search artist")
    }
  };

  const [songOptions, setSongOptions] = useState([])
  if(songOptions.length == 0){
    fetch(fetch_songs_api, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
      mode: "cors"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setSongOptions(data.all_songs)
    })
  }
  
  

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth={false} sx={{maxHeight: 'none'}}>
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
                      options={songOptions}
                      filterOptions={filterOptions}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Search Song Lyrics"
                      name="lyrics" 
                      />}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
                    >
                      Search Lyrics
                    </Button>
                    <Grid container>
                    </Grid>
                  </Box>  
                  <Box component="form" onSubmit={handleSubmitSong} noValidate sx={{ mt: 1 }}>
                  <Autocomplete
                      disablePortal
                      id="title"
                      name="title"
                      options={songOptions}
                      freeSolo
                      filterOptions={filterOptions}
                      sx={{ width: 300 }}
                      renderInput={(params) => 
                        <TextField {...params} 
                          label="Search for song names"
                          name='title'
                          />}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
                    >
                      Search Title
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
                      freeSolo
                      filterOptions={filterOptions}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} 
                        label="Search for Artists"
                        name='artist'
                      />}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
                    >
                      Search Artist
                    </Button>
                  </Box>
                  <Box>
                    <Dialog
                      open={SearchResultDialogOpen}
                      onClose={handleSearchResultClose}
                      aria-labelledby="searchresult-dialog-title"
                      aria-describedby="searchresult-dialog-description"
                    >
                      <DialogContent>
                        <DialogContentText id="searchresult-dialog-description">
                          {searchResult}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleSearchResultClose} color="primary">
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
              </Box>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


const artistOptions = [
]
