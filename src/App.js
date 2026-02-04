import CharacterDetails from "./components/CharacterDetails";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
