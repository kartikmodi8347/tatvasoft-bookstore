import React from 'react'
import '../styles/Header.css'
import logo from '../assets/images/logo.jpg'
import { Button } from '@mui/material'
import { AiOutlineShoppingCart } from 'react-icons/ai';

function Header() {
  return (
    <div className="header">
      <img src={logo} />
      <div className="button">
        <Button variant="text" color="primary">Login</Button>
        <Button variant="text">Register</Button>
        <Button variant="contained" endIcon={<AiOutlineShoppingCart />}>cart</Button>
      </div>



    </div>
  )
}
export default Header;
