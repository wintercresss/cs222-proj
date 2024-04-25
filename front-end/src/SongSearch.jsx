import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
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
const record_search_api = 'http://127.0.0.1:5002/insert_search'

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
  const [searchResult, setSearchResult] = useState("Try searching something!")

  const handleSubmitLyrics = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('lyrics');
    try {
      const url2 = new URL(record_search_api);
      url2.searchParams.append('song', body);
      url2.searchParams.append('username', localStorage.getItem('username'));
      const resp2 = await(fetch(url2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        }
      }))
      const data2 = await resp2.json();


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

  const handleSubmitSong = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('title');
    try {
      const url = new URL(find_song_api);
      url.searchParams.append('song', body);
      const url2 = new URL(record_search_api);
      url2.searchParams.append('song', body);
      url2.searchParams.append('username', localStorage.getItem('username'));

      const resp2 = await(fetch(url2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        }
      }))
      const data2 = await resp2.json();

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
    } catch (error) {
      setSearchResult("None")
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
    } catch (error) {
      setSearchResult("No artists found")
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
  
  const searchBoxes = <Box
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
</Box>

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth={false} sx={{maxHeight: 'none'}}>
        <CssBaseline />
        <Box
  sx={{
    marginTop: '5rem',
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
  <Grid container spacing={2} alignItems="center" justifyContent="left" style={{ marginTop: '0px' }}>
  <Card variant="outlined" sx={{
    marginTop: '2rem',
    marginLeft: '8rem'
  }}>{searchBoxes}</Card>
  <Card variant="outlined" sx={{
    marginTop: '2rem',
    marginLeft: '8rem',
    width: '50rem',
    height: '28rem',
    overflow: 'auto'
  }}>{searchResult}</Card>
  </Grid>
</Box>
      </Container>
    </ThemeProvider>
  );
}


const artistOptions = [
]
