import * as React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function MyProfile() {
  return (
        <Container component="main" maxWidth={false} sx={{height: '100vh', maxHeight: 'none'}}>
          <CssBaseline/>
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
                Welcome {localStorage.getItem('username')}!
              </Typography>
            </LinearGradient>
            </Box>
        </Container>
  );
}
