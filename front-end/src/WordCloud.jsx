import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

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

const lyricsWordcloudApi = 'http://127.0.0.1:5002/lyrics_wordcloud';
const search_lyric_api = 'http://127.0.0.1:5002/search_lyrics';
const fetch_songs_api = 'http://127.0.0.1:5002/get_all_songs';

export default function WordCloud() {
  const [wordcloudImage, setWordcloudImage] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('lyrics');
    var lyrics = "Not Found";
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
      
      lyrics = data.lyrics
      
    } catch (error) {
      console.log("Search lyrics error")
    }

    try {
      const response = await fetch(lyricsWordcloudApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lyrics: lyrics.split('\n') }), // Assuming the lyrics are separated by new lines
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWordcloudImage(`data:image/png;base64,${data.wordcloud_image_as_bytes}`); // Set the src for your image
      console.log("Word cloud image update")
    } catch (error) {
      console.error("Failed to fetch wordcloud data:", error);
    }
    
    
  };

  const [songOptions, setSongOptions] = useState([])
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

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth={false} sx={{maxHeight: 'none'}}>
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
              Welcome to WordCloud page!
            </Typography>
          </LinearGradient>
          <p>You can generate Wordcloud</p>
        </Box>
        <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Autocomplete
                      disablePortal
                      options={songOptions}
                      filterOptions={filterOptions}
                      renderInput={(params) => <TextField {...params} label="Enter a song"
                      name="lyrics" 
            />}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
          >
            Generate Wordcloud
          </Button>
        </Box>
        {wordcloudImage && <img src={wordcloudImage} alt="Wordcloud" style={{ height: '100%', width: '100%' }} />}
        </Container>
        </Container>
      </Container>
    </ThemeProvider>
  );
}