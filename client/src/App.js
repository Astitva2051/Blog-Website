import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import Home from "./views/Home";
import Login from "./views/Login";
import About from "./views/About";
import Signup from "./views/Signup";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/read/:slug" element={<Read />} />
          <Route exact path="/create" element={<Create />} />
          <Route path="/update/:slug" element={<Update />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
