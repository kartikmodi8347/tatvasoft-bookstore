import React, { useState } from "react";
//import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Login.css'
//import { Navigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://book-e-sell-node-api.vercel.app/api/user/login", state)
      .then((res) => {
        console.log(res);
        // window.localStorage.setItem("token", res.data);
        window.localStorage.setItem("loggedIn", true);

        toast.info("Logged in Succesfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        window.location.href="/productlist";
      })
      .catch((err) => console.log(err));
  };
  return (
    
    <div className="login">
       <Header />
      <div className="contact-formlog">
        <form
          onSubmit={handleSubmit}
         
          className="contact-inputs"
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            autoComplete="off"
            // className="space"
            // value=""
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            autoComplete="off"
            // className="space"
            // value=""
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          

          <div >
            <input type="submit" value="LogIn" />
          </div>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};



export default Login;