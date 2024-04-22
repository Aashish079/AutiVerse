import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Pages/WelcomeScreen/Welcome'
import HomeScreen from './Pages/HomeScreen/HomeScreen'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Welcome />} />
          <Route path = "/get-started" element = {<HomeScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App