import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import MyProfile from './MyProfile.tsx';

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

export default function Profile() {

    return (
        <ThemeProvider theme={themeLight}>
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <MyProfile />
            </CssVarsProvider>
        </ThemeProvider>
    );
  }