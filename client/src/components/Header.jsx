import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  let navigate = useNavigate();
  const { logout } = useAuth();
  function handleLogout() {
    logout().then((resp) => {
      console.log("logout user");
      navigate("/");
    });
  }

  return (
    <AppBar style={{ backgroundColor: "white", color: "black" }}>
      <Toolbar style={{ justifyContent: "center" }}>
        <Link to="/home" style={{ color: "#000000", textDecoration: "none" }}>
          <Button color="inherit" style={{ padding: 10 }}>
            Home
          </Button>
        </Link>
        <Link to="/about" style={{ color: "#000000", textDecoration: "none" }}>
          <Button color="inherit" style={{ padding: 10 }}>
            About
          </Button>
        </Link>
        <Link
          to="/contact"
          style={{ color: "#000000", textDecoration: "none" }}
        >
          <Button color="inherit" style={{ padding: 10 }}>
            Contact
          </Button>
        </Link>
        <Button color="inherit" style={{ padding: 10 }} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
