import {BrowserRouter,Route,Routes} from "react-router-dom"
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
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        
        {/* Wrap protected routes with ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/todos" element={<LoginHome />} />
          <Route path="/todos/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
