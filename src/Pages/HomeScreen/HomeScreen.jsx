import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/">
            <Route index element={} />
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default HomeScreen