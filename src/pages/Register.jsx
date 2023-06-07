import {
  Breadcrumbs,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik } from "formik";
import * as Yup from "yup";
import userService from "../service/user.service";
import authService from "../service/auth.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link to={"/"} underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,

    <Typography key="2" color={{ color: "#f14d54" }}>
      Create an Account
    </Typography>,
  ];
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validate = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("FirstName is Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("LastName is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password must Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    roleId: Yup.string().required("Role is required"),
  });

  const onSubmit = (values) => {
    delete values.confirmPassword;
    // alert(JSON.stringify(values));
    authService
      .create(values)
      .then((res) => {
        setTimeout(() => {
          toast.success("Succesfully Registered");
        }, 2000);

        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [roleList, setRoleList] = useState([]);

  const getRoles = () => {
    userService
      .getAllRoles()
      .then((res) => {
        setRoleList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          marginTop: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          marginTop: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Login or Create an Account
      </Typography>
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-[#f14d54] w-32"></div>
      </div>
      <Typography variant="h6" sx={{ marginTop: "50px", marginLeft: "160px" }}>
        Personal Information
      </Typography>
      <Divider
        sx={{ marginTop: "20px", marginLeft: "160px", marginRight: "160px" }}
      />
      <Typography
        variant="body2"
        sx={{ marginTop: "20px", marginLeft: "160px" }}
      >
        Please enter the following information to create your account
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
          <form onSubmit={handleSubmit} className="flex-1 ml-40 mr-40">
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              <FormControl fullWidth>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name*
                </label>
                <TextField
                  size="small"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name*
                </label>
                <TextField
                  size="small"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              </FormControl>

              <FormControl fullWidth>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address*
                </label>
                <TextField
                  size="small"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.email && touched.email && errors.email}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="roleId"
                >
                  Role*
                </label>
                <Select
                  id="roleId"
                  name="roleId"
                  label="RoleId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.roleId}
                  error={errors.roleId && touched.roleId}
                  size="small"
                >
                  {roleList.length > 0 &&
                    roleList.map((role) => (
                      <MenuItem value={role.id} key={"name" + role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
                <div className="text-red-600">
                  {errors.roleId && touched.roleId && errors.roleId}
                </div>
              </FormControl>
            </div>
            <Typography variant="h6" sx={{ marginTop: "70px" }}>
              Login Information
            </Typography>
            <Divider />
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              <FormControl fullWidth>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password*
                </label>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="password"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <div className="text-red-600">
                  {errors.password && touched.password && errors.password}
                </div>
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </FormControl>
              {/* <div className="password-input">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="password"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div> */}
              <FormControl fullWidth>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password*
                </label>
                <TextField
                  type="confirmPassword"
                  name="confirmPassword"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <div className="text-red-600">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </div>
              </FormControl>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded mt-12"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
