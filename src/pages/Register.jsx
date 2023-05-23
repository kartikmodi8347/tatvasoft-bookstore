import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/Register.css'
import { TextField, Button } from '@mui/material'
import { AiOutlineSearch } from 'react-icons/ai';



function Register() {
  return (
    <>
     <Header/>
      

      <div className="search">

        <TextField label="What are you looking for.." size="small" />
        <Button variant="contained" color="success" endIcon={<AiOutlineSearch />}>Search</Button>
        <Button variant="contained" color='error'>Cancel</Button></div>
     
      <div className="register">
        
        <p>Home : Create an Account for expirience</p>
        <h1>Login or Create an Account</h1><br />
      
        <Link to="/login"><Button variant="contained">Login</Button> <br /> <br /></Link>
        </div>
      <Footer />
    </>
  )
}
export default Register;