import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './SignIn.jsx'
import Landingpage from './Landingpage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <SignIn/>
    </div>
    </>
  )
}

export default App
