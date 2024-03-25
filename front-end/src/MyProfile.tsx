import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Container, CssBaseline } from '@mui/material';

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

export default function MyProfile() {
  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <big>Welcome {localStorage.getItem('username')} </big>
        </Container>
  );
}
