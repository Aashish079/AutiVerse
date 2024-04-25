import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScoreProvider } from "./contexts/ScoreContext";
import Welcome from "./Pages/WelcomeScreen/Welcome";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import GameWindow1 from "./Pages/GameWindow1/GameWindow1";
import GameWindow2 from "./Pages/GameWindow2/GameWindow2";
import "./App.css";

const App = () => {
  return (
    <ScoreProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/get-started" element={<HomeScreen />} />
            <Route path="/game1" element={<GameWindow1 />} />
            <Route path="/game2" element={<GameWindow2 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ScoreProvider>
  );
};

export default App;
