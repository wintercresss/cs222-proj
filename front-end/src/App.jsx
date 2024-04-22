import './App.css'
import React from 'react'
import { Outlet, Navigate, Routes, Route } from 'react-router-dom'

import { AuthProvider, useAuth } from './AuthContext.jsx';
import WordCloud from './WordCloud'
import MyProfile from './MyProfile'
import SongSearch from './SongSearch'
import { Navbar } from './NavBar.jsx'
import SignIn from './SignIn.jsx'
import SongGeneration from './SongGeneration.jsx'
import SignUp from './SignUp.jsx'
import LandingPage from './LandingPage.jsx';

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>
      <Navbar /> {/* render navbar */}
      <Outlet /> {/* render the child routes */}
    </>
  ) : <Navigate to="/" />;
}

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoutes />}> {/* render if authentication is successful */}
          <Route path="/wordcloud" element={<WordCloud />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/songsearch" element={<SongSearch />} />
          <Route path="/songgeneration" element={<SongGeneration />} />
        </Route>

      </Routes>
    </AuthProvider>
  )
}

export default App
