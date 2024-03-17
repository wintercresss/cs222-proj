import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactWordcloud from 'react-wordcloud';
 
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

const words = [
    {
      text: 'Song1',
      song: 64,
    },
    {
      text: 'Song2',
      value: 11,
    },
    {
      text: 'Song3',
      value: 16,
    },
]

const callbacks = {
    getWordColor: word => word.value > 50 ? "#1DB954" : "darkgreen",
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: word => `${word.value}`,
}

const options = {
    rotations: 2,
    rotationAngles: [0, 0],
};

const size = [500, 500];

export default function WordCloud() {

  return (
    <ThemeProvider theme={themeLight}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <ReactWordcloud
                    callbacks={callbacks}
                    options={options}
                    size={size}
                    words={words} />
        </Container>
    </ThemeProvider>
  );
}