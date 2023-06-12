import {
  Breadcrumbs,
  Divider,
  FormControl,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { Formik } from "formik";
import * as Yup from "yup";
import authService from "../service/auth.service";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../State/Slice/authSlice";
import shared from "../utils/shared";

function Login() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const str = JSON.parse(localStorage.getItem("user"));
    if (str?.id) {
      dispatch(setUser(str));
      navigate("/");
    }
    const access = shared.hasAccess(pathname, authData);
    if (!access) {
      toast.warning("sorry, you are not authorized to access this page");
      navigate("/");
      return;
    }
    // eslint-disable-next-line
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };
  const validate = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(5, "Password must be 5 charaters at minimum")
      .required("Password must Required"),
  });

  const onSubmit = (values) => {
    authService
      .login(values)
      .then((res) => {
        delete res._id;
        delete res.__v;
        // authContext.setUser(res);
        dispatch(setUser(res));
        navigate("/");
        toast.success("successfully logged in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const breadcrumbs = [
    <Link to={"/"} underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="2" color="error">
      Login
    </Typography>,
  ];

  return (
    <div className="flex-1">

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className="flex justify-center mt-5"
      >
        {breadcrumbs}
      </Breadcrumbs>

      <Typography variant="h4" className="flex justify-center mt-5">
        Login or Create an Account
      </Typography>

      <div className="flex items-center justify-center mt-6">
        <div className="border-t-2 border-[#f14d54] w-32"></div>
      </div>

      <div className="grid grid-cols-2 gap-36 mt-12">
        <div className="ml-40">
          <Typography variant="h6">New Customer</Typography>
          <Divider className="mt-5" />
          <Typography variant="body2" className="mt-5">
            Registration is free and easy.
          </Typography>

          <ul className="list-disc mt-5 ml-5">
            <li>Faster Checkout</li>
            <li>Save Multiple shipping addresses</li>
            <li>View and track orders and more</li>
          </ul>

          
          <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded mt-12"
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                 CREATE AN ACCOUNT
                </button>
        </div>

        <div>
          <Typography variant="h6">Registered Customers</Typography>
          <Divider className="mt-5 mr-160" />
          <Typography variant="body2" className="mt-5">
            If you have an account with us, please log in.
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="">
                <FormControl fullWidth className="mt-5">
                  <label>Email Address*</label>
                  <TextField
                    size="small"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="w-96"
                  />
                  <div className="text-red-600">
                    {errors.email && touched.email && errors.email}
                  </div>
                </FormControl>

                <FormControl fullWidth className="mt-5">
                  <label>Password*</label>
                  <TextField
                    type="password"
                    name="password"
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-96"
                  />
                  <div className="text-red-600">
                    {errors.password && touched.password && errors.password}
                  </div>
                </FormControl>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  type="submit"
                  variant="contained"
                >
                  Click me!
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
