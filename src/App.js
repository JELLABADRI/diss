import {BrowserRouter,Switch,Route,Routes} from "react-router-dom"
import Home from "./components/Home";
import Profile from "./components/Profile"
import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/Login"
import LoginHome from "./components/LoginHome";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/profile" exact element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/todos" exact element={<ProtectedRoute><LoginHome /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
