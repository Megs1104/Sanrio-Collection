import CharacterDetails from "./components/CharacterDetails";
import HomePage from "./components/HomePage";
import SignUp from "./components/Auth/SignUp";
import VerifyEmail from "./components/Auth/VerifyEmail";
import SignIn from "./components/Auth/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
