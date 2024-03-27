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

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Container, CssBaseline } from '@mui/material';

export default function MyProfile() {
  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Stack
              spacing={4}
              sx={{
                display: 'flex',
                maxWidth: '1000px',
                mx: 'auto',
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
              }}
            >
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Personal info</Typography>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                      >
                        <Input size="sm" placeholder="Username" />
                        <Input size="sm" placeholder="Password" sx={{ flexGrow: 1 }} />
                        <Input size="sm" placeholder="New Password" sx={{ flexGrow: 1 }} />
                      </FormControl>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                >
                  <Stack direction="row" spacing={2}>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                      <FormLabel>Name</FormLabel>
                      <FormControl
                        sx={{
                          display: {
                            sm: 'flex-column',
                            md: 'flex-row',
                          },
                          gap: 2,
                        }}
                      >
                        <Input size="sm" placeholder="First name" />
                        <Input size="sm" placeholder="Last name" />
                      </FormControl>
                    </Stack>
                  </Stack>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input size="sm" defaultValue="UI Developer" />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="email"
                      defaultValue="siriwatk@test.com"
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                  
                </Stack>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                  <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                      Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                      Save
                    </Button>
                  </CardActions>
                </CardOverflow>
              </Card>
            </Stack>
          </Box>
        </Container>
  );
}
