import React, { useState } from "react";
//import { Link } from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Register.css";
import { TextField, Button } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);


  const validateForm = () => {
    const errors = {};

    //  for Validate FirstName using this formate
    if (firstName.trim() === "") {
      errors.firstName = "First Name is required";
    }

    // for Validate LastName using this formate
    if (lastName.trim() === "") {
      errors.lastName = "Last Name is required";
    }

    // for Validate EmailAddress using this formate
    if (email.trim() === "") {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid Email Address";
    }

    //  for Validate Password must be this formate
    if (password === "") {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    //  for Validate ConfirmPassword must be same as Password
    if (confirmPassword === "") {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    // for role puposes
    if (role === "") {
      errors.role = "Role is required";
    }
    setErrors(errors);

    // Check if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const formData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      };
  
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("User registered sucessfully");
         // window.location.href = "/"
          console.log("Form submitted!", formData);
          console.log("Data stored on API successfully.");
          setIsSubmitted(true);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setRole("");
        }
        else {
          console.log("Form submission failed.");
          // Handle form submission failure
        }
      } catch (error) {
        console.log("An error occurred during form submission:", error);
        // Handle error during form submission
      }
    }
  };
  
  

  return (
    <>
      <div className="register">
        <p>Home : Create an Account for expirience</p>
        <h2 className="txt">Login or Create an Account</h2>
        <div className="Reg-form">
          <form onSubmit={handleSubmit}>
          <h6>give your personal info</h6>
            <div className="personal-information">
              <div>
                <label htmlFor="firstName">*First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <span>{errors.firstName}</span>}
              </div>
              <div>
                <label htmlFor="lastName">*Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
              </div>
            </div>

            <div className="role-information">
              <div>
                <label htmlFor="email">*Email_Add</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span>{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="role">*Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
                {errors.role && <span>{errors.role}</span>}
              </div>
            </div>

            <div className="leagel-information">
              <div>
                <label htmlFor="password">*Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span>{errors.password}</span>}
              </div>
              <div>
                <label htmlFor="confirmPassword">*Conf_Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword}</span>
                )}
              </div>
            </div>
            <div className="btn-wrapper">
            <button type="submit" onClick={() => setIsSubmitted(false)}> Submit</button>
            </div>
          </form>
        </div>
        
      </div>
    </>
  );
};

function Register() {
  return (
    <>
      <Header />

      <div className="search">
        <TextField label="What are you looking for.." size="small" />
        <Button
          variant="contained"
          color="success"
          endIcon={<AiOutlineSearch />}
        >
          Search
        </Button>
        <Button variant="contained" color="error">
          Cancel
        </Button>
      </div>

      <RegistrationForm />

      <Footer />
    </>
  );
}
export default Register;
