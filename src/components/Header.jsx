import React from 'react'
import '../styles/Header.css'
import logo from '../assets/images/logo.jpg'
import { Button } from '@mui/material'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <img src={logo} />
      <div className="button">
      <Link to="/login"><Button variant="text" color="primary">Login</Button></Link>
      <Link to="/register"><Button variant="text">Register</Button></Link>
        <Button variant="contained" endIcon={<AiOutlineShoppingCart />}>cart</Button>
      </div>



    </div>
  )
}
export default Header;
