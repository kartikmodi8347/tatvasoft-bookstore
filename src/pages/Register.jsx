import React, { useState } from 'react';
//import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/Register.css'
import { TextField, Button } from '@mui/material'
import { AiOutlineSearch } from 'react-icons/ai';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    //  for Validate FirstName using this formate
    if (firstName.trim() === '') {
      errors.firstName = 'First Name is required';
    }

    // for Validate LastName using this formate
    if (lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
    }

    // for Validate EmailAddress using this formate
    if (email.trim() === '') {
      errors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid Email Address';
    }

    //  for Validate Password must be this formate
    if (password === '') {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    //  for Validate ConfirmPassword must be same as Password
    if (confirmPassword === '') {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);

    // Check if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform form submission or API call put API here
      console.log('Form submitted!');
    }
  };

  return (
    <>
    <div className= "Reg-form">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
   </>
  );
};

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
        <RegistrationForm />
      </div>
      <Footer />
    </>
  )
}
export default Register;