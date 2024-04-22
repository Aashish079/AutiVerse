import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Pages/WelcomeScreen/Welcome'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Welcome />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App