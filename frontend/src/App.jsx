import { Routes, Route } from "react-router-dom";
import Login from "./components/login";     // points to login/index.jsx
import Welcome from "./components/welcome"; // points to welcome/index.jsx

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;