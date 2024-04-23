import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Pages/WelcomeScreen/Welcome'
import HomeScreen from './Pages/HomeScreen/HomeScreen'
import GameWindow1 from './Pages/GameWindow1/GameWindow1'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Welcome />} />
          <Route path = "/get-started" element = {<HomeScreen/>} />
          <Route path = "/game1" element = {<GameWindow1/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App