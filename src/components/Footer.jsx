import React from "react";
import "../styles/Footer.css";
 import logo from '../assets/images/logo.jpg'

function Footer() {
  return (
    <>
    
      <div className="footer">
      { <img src={logo} /> }
        
      </div>
    </>
  );
}

export default Footer;
