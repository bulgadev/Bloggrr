import './App.css';
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from './components/navbar';

function App() {
  const navigate = useNavigate();

  function LoginR() {
    navigate("/login");
  }

  function RegisterR() {
    navigate("/register");
  }

  return (
    <div className="App">
      {/*Nanbar Component*/}
      <Navbar />
      <header className="App-header">
        <p className="app-description">Bloggr is a platform for sharing your stories, ideas, and blogs. Click start to begin your journey!</p>
        <button type="button" onClick={LoginR} className="btn-start">Start</button>
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
