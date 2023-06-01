import React, { useState } from "react";
//import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/Login.css'
import { useAuthContext } from "../context/auth";
//import { Navigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const authContext = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://book-e-sell-node-api.vercel.app/api/user/login", state)
      .then((res) => {
        console.log(res);
        // window.localStorage.setItem("token", res.data.result);
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
        authContext.setUser(res);

        window.location.href="/productlist";
      })
      .catch((err) => {
        console.log(err);
        toast.error("Loggin Denied", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
      
  };
  return (
    
    <div className="login">
       
      <div className="contact-formlog">
      <h2 className="login-title"> Login an Account</h2>
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
    </div>
  );
};



export default Login;