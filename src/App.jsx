import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useAuth } from './provider/AuthProvider'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)
  const { register } = useAuth()

  return (
    <>
     <Login />
    </>
  )
}

export default App
