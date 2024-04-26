import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from  '@mui/material/Card';
import { Typography } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = formData.get('lyrics');
    var lyrics = "Not Found";
    setLoading(true);
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
    } finally {
      setLoading(false); // Stop loading regardless of the result
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
        <CssBaseline />
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
          <p>You can generate a Wordcloud from a song</p>
          <p>Wordclouds may take a couple seconds to generate</p>
        </Box>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ width: "100%", height: "30rem" }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              marginLeft="15rem"
              marginRight="8rem"
              marginTop="10rem"
              sx={{ width:"15rem", height:"30rem" }}
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
                marginTop="10rem"
                sx={{ mt: 3, mb: 2, bgcolor: '#456789', '&:hover': { bgcolor: 'purple' } }}
              >
                Generate Wordcloud
              </Button>
            </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ width: "100%", height: "30rem" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              wordcloudImage && <img src={wordcloudImage} alt="Wordcloud" style={{ height: '100%', width: '100%' }} />
            )}
            </Card>
          </Grid>
        </Grid>
    </ThemeProvider>
  );
}