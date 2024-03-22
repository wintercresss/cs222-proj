import { useState } from 'react'
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import WordCloud from './WordCloud'
import MyProfile from './MyProfile'
import SongSearch from './SongSearch'
import { Navbar } from './NavBar.jsx'
import SignIn from './SignIn.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path='/' element={<WordCloud />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/songsearch' element={<SongSearch />} />
        </Routes>
      </div>
    </>
  )
}

export default App
