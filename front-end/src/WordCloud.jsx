import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';

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

const lyricsWordcloudApi = 'http://127.0.0.1:5000/lyrics_wordcloud';

export default function WordCloud() {
  const [wordcloudImage, setWordcloudImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const lyrics = formData.get('lyrics'); // Assuming you have a TextField with name="lyrics"

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
    } catch (error) {
      console.error("Failed to fetch wordcloud data:", error);
    }
  };

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth={false} sx={{height: '100vh', maxHeight: 'none'}}>
        <CssBaseline />
        <Container maxWidth="md">
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
          <TextField
          
            margin="normal"
            fullWidth
            name="lyrics"
            label="Enter a song"
            type="text"
            id="lyrics"
            multiline
            rows={4}
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