import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";
import LoginCover from "./images/login-cover2.jpg";
import NavBar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import OurServices from "../OurServices/OurServices";
import ContactUs from "../ContactUs/ContactUs";
import Accordion from "../FAQAccordion/FAQAccordion";
import jwtDecode from "jwt-decode";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          // navigate('/admin/dashboard');

          const token = res.data.token;
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);

          if (res.data.userType === "Admin") {
            setText("Admin");
            if (decodedToken.username === values.username)
              navigate(`/admin/dashboard`);
          } else if (res.data.userType === "Student") {
            setText("Student");
            if (decodedToken.username === values.username)
              navigate(`/student/dashboard`);
          } else if (res.data.userType === "Teacher") {
            setText("Teacher");
            if (decodedToken.username === values.username)
              navigate(`/teacher/dashboard`);
          }
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  const navigate = useNavigate();
  const [text, setText] = useState("Login");

  // const handleToggleVisibility = () => {
  //   var ele = document.getElementById("formControlLgPassword");
  //   if(ele.type === "password") ele.type ===
  // }

  return (
    <>
      <MDBContainer fluid className="Login-main">
        <NavBar Logintext={text} />
        <MDBRow style={{ width: "100%" }}>
          <MDBCol sm="6">
            <div className="d-flex flex-row ps-5 pt-5 mt-5">
              <span className="h1 fw-bold mb-0">Welcome to EduPulse!</span>
            </div>

            <div
              className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4"
              style={{ height: "600px" }}
            >
              <div className="text-danger">{error && <p>{error}</p>}</div>

              <h2
                className="fw-normal mb-3  ps-5 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Log in
              </h2>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="User ID"
                placeholder="User ID"
                id="formControlLgUsername"
                type="text"
                size="lg"
                value={values.username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                id="formControlLgPassword"
                type="password"
                placeholder="Password"
                size="lg"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {/* <input type="checkbox" onClick={handleToggleVisibility}/> Show Password */}
              <MDBBtn
                className="mb-4 px-5 mx-5 w-100 login-button"
                size="lg"
                id="loginBtn"
                onClick={handleLogin}
              >
                Login
              </MDBBtn>
            </div>
          </MDBCol>

          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src={LoginCover}
              alt="LoginCover"
              className="w-100"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                height: "100vh",
              }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <OurServices />
      <AboutUs />
      <Accordion />
      <ContactUs />
    </>
  );
}

export default Login;
