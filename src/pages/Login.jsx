import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, TextField } from "@mui/material";
import '../styles/Login.css'

function Login() {
  return (
    <>
      <h1><Header /></h1>
      
        <div className="login"><h1>Login Component</h1>
      <br />
      <br />
      <br />
      <TextField id="outlined-basic" label="User Name" variant="outlined" /> 
      <TextField id="filled-basic" label="Password" variant="filled" /> <br /><br />

      <Link to="/product-list"><Button variant="contained">Login</Button> <br /> <br /></Link>


      
      <Link className='link' to='/register'> <Button variant="contained">Register</Button> <br /> <br /> </Link>
      </div>
      <h1><Footer /></h1>
    </>
  );
}

export default Login;
