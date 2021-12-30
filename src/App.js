import logo from "./logo.svg";
import "./App.css";
import ToDo from "./ToDo";
import CardDemo from "./CardDemo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDo/>}  />
        <Route path="/card" element={<CardDemo/>}  />
      </Routes>
    </Router>
  );
}

export default App;
