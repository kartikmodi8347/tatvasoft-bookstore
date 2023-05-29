import React, { Component } from "react";
//import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import { TextField, Button } from "@mui/material";
//import { AiOutlineSearch } from "react-icons/ai";
import "../styles/Register.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
      roleId: "",
     
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, roleId, phone } = this.state;

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Invalid email address!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Check if the phone number is a 10-digit integer
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phone)) {
      toast.error("Invalid phone number!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    
  
    // Check if the email and role already exist in the previous data
    // const previousData = []; // Replace with your previous data
    // const userExists = previousData.some(
    //   (user) => user.email === email && user.roleId === roleId
    // );
  
    // if (userExists) {
    //   toast.error("User already exists!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    //   return;
    // }
  
    fetch("https://book-e-sell-node-api.vercel.app/api/user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        roleId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        
        toast.info("Registered Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        window.location.href = "/login";
      });
  }
  

  render() {
    return (
      <div>
        <Header />
        
        <h2 className="account-title">Home : Create an Account for expirience</h2>
        <div className="container">
          <div className="contact-form">
            <form
              onSubmit={this.handleSubmit}
              method="POST"
              className="contact-inputs"
            >
              <h3>Personal Information</h3>
              <br />
              <hr />
              <br />
              <div className="grid-two-column">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  required
                  autoComplete="off"
                  className="space"
                  // value=""
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  required
                  autoComplete="off"
                  className="space"
                  // value=""
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
              </div>
              <div className="grid-two-column">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  autoComplete="off"
                  className="space"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />

                <input
                  type="tel"
                  placeholder="Phone No"
                  name="phone"
                  required
                  autoComplete="off"
                  className="space"
                   value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
              </div>

              <br />
              <h3>Login Information</h3>
              <br />
              <hr />
              <br />
              <div className="grid-two-column">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  autoComplete="off"
                  className="space"
                  // value=""
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm-password"
                  required
                  autoComplete="off"
                  className="space"
                  // value=""
                  // onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>

              <br />
              <h3>Role Information</h3>
              <br />
              <hr />
              <br />
              {/* <div className=""> */}
              <select
                name="roles"
                id="role"
                className="space sort-selection--style"
                onChange={(e) => {
                  // console.log(e.target.value);
                  this.setState({ role: e.target.value });
                  if (e.target.value === "buyer") {
                    this.setState({ roleId: 2 });
                  } else {
                    this.setState({ roleId: 3 });
                  }
                }}
              >
                <option value="" selected disabled hidden>
                  Choose Role
                </option>
                <option value="buyer">Buyer</option>
                {/* <option value="" disabled></option> */}
                <option value="seller">Seller</option>
              </select>
              {/* </div> */}
              <div>
                <input type="submit" value="SignUp" />
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}
