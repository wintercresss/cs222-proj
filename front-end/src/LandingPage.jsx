import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LinearGradient } from 'react-text-gradients';
import background from './assets/backgrounddd.mp4';
import { motion } from "framer-motion";

const themeLight = createTheme({
    palette: {
      background: {
        default: "transparent"
      },
      text: {
        primary: "#191414",
        secondary: "#191414"
      }
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            background: 'none',  // Ensuring container has no background
            position: 'relative', // Needed for video background context
            zIndex: 2,            // Ensures form elements are above the video
          }
        }
      }
      
    }
  });
  
  export default function LandingPage() {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
            navigate('/signin');
        }, 1000);
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
      <ThemeProvider theme={themeLight}>
        <video autoPlay loop muted style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          zIndex: 1,
        }}>
          <source src={background} type="video/mp4" />
        </video>
        <Container component="main" maxWidth={false} sx={{height: '100vh', maxHeight: 'none'}}>
          <CssBaseline />
          <Container maxWidth="md">
          <Box
            sx={{
              marginTop: '25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
              <Typography component="h1" variant="h3" fontWeight={'bold'}>
                Welcome to Song Assistance!
              </Typography>
            </LinearGradient>
          </Box>
          </Container>
            {fadeOut && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'white',
                    zIndex: 3
                    }}
                />
            )}
        </Container>
      </ThemeProvider>
    );
  }
  
  