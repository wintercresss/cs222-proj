import * as React from 'react';
import {useState} from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'

const get_search_history_api = "http://127.0.0.1:5002/get_searches"

export default function MyProfile() {
  const initialHistory = [{
    "id": 3,
    "search_query": "",
    "search_time": "2024-04-22 18:47:53.319150",
    "username": "A"
}]
  const [history, setHistory] = useState(initialHistory)
  function handleRefresh(){
    const url = new URL(get_search_history_api);
    var username =  localStorage.getItem("username")
    if (username == null) username = ""
    url.searchParams.append('username', username);
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
      mode: "cors",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setHistory(data);
    })
  }
  if(history == initialHistory){
    handleRefresh()
  }
  return (
        <Container component="main" maxWidth={false} sx={{height: '100vh', maxHeight: 'none'}}>
          <CssBaseline/>
            <Box
            sx={{
              marginTop: '15rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
                <Typography component="h1" variant="h3" fontWeight={'bold'}>
                  Welcome {localStorage.getItem('username')}!
                </Typography>
              </LinearGradient>
                <Box
                sx={{
                  marginTop: '5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  justifyContent: 'center',
                  width: '30rem',
                  height: '15rem',
                  borderRadius: 5,
                  bgcolor: '#eff0ef',
                }}
                >
                  <Typography component="h5" variant="h5" fontWeight={'medium'} marginBottom={'10px'} marginLeft={'25px'}>
                    Full Name: {localStorage.getItem('prf_full_name')}
                  </Typography>
                  <Typography component="h5" variant="h5" fontWeight={'medium'} marginBottom={'10px'} marginLeft={'25px'}>
                    Email: {localStorage.getItem('email')}
                  </Typography>
                  <Typography component="h5" variant="h5" fontWeight={'medium'} marginBottom={'10px'} marginLeft={'25px'}>
                    Phone Number: {localStorage.getItem('ph_no')}
                  </Typography>
                  <Typography component="h5" variant="h5" fontWeight={'medium'} marginBottom={'10px'} marginLeft={'25px'}>
                    Favourite Song: {localStorage.getItem('fav_song')}
                  </Typography>
                  <Typography component="h5" variant="h5" fontWeight={'medium'} marginBottom={'10px'} marginLeft={'25px'}>
                    Favourite Genre: {localStorage.getItem('fav_genre')}
                  </Typography>
                </Box>

                <Box
                sx={{
                  marginTop: '5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  justifyContent: 'left',
                  width: '30rem',
                  height: '22rem',
                  borderRadius: 5,
                  bgcolor: '#eff0ef',
                }}>
                  
                  <Typography component="h5" variant="h5" fontWeight={'medium'} marginBottom={'10px'} marginLeft={'25px'}>
                    Search History
                    {history.map(search => (
                      <li>{search.search_query}</li>
                    ))}
                  </Typography>
                </Box>
            </Box>
        </Container>
  );
}

