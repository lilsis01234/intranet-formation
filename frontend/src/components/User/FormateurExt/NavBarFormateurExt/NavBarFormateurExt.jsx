import React from "react";
import "./NavBarAdmin.css";
import Logo from "../../../../image/logo_sahaza.png"
import { Link} from "react-router-dom";
import UserProfile from "../../../Authentification/UserProfile/UserProfile";
import '../../../Administrateur/NavBar/NavBarAdmin.css'


function Navbar() {
  return (
    <div className="navBar">
      <div className="nav-left">
        <Link to="/invite">
        <img src={Logo} alt="logo" className="navbar_logo"/>
        </Link> 
      </div>
      <div className="nav-right">
        <div className="menu">
        </div>
      </div>
        <div className="nav-profile"><UserProfile/> </div>
    </div>
  );
}

export default Navbar;