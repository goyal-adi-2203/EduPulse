import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Login.css';
import LoginCover from './images/login-cover2.jpg'
import NavBar from '../NavBar/Navbar';
import { useNavigate } from 'react-router-dom';
import AboutUs from '../AboutUs/AboutUs';
import OurServices from '../OurServices/OurServices';
import ContactUs from '../ContactUs/ContactUs';
import Accordion from '../FAQAccordion/FAQAccordion';
import jwt_decode from 'jwt-decode';


// const users = [
//     {
//         id: 's00001',
//         key: 's00001@ss'
//     },
//     {
//         id: 't001',
//         key: 't001@ss'
//     },
//     {
//         id: 'a01',
//         key: 'a01@ss'
//     }
// ];
// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//         .then(data => data.json())
// }

function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    // navigate('/admin/dashboard');

                    if (values.username[0] === "a") {
                        setText("Admin");
                        navigate('/admin/dashboard');

                    }
                    else if (values.username[0] === 's') {
                        setText("Student");
                        navigate('/student/dashboard');
                    }
                    else if (values.username[0] === 't') {
                        setText("Teacher");
                        navigate('/teacher/dashboard');
                    }

                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err))
    }
    const navigate = useNavigate();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [text, setText] = useState("Login");
    // const [userID, setUserId] = useState(null);

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     alert(username+password);

    //     const response = fetch('http://localhost:3001/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ username, password }),
    //     });

    //     if (response.ok) {

    //         // Login successful
    //         const data = response.json();
    //         const token = data.token;
    //         const decoded = jwt_decode(token);
    //         alert(`Logged in as User ID: ${decoded.id}`);
    //         setUserId(decoded.id);
    //         console.log('Login successful');            
    //         alert(decoded);

    //         if (userID[0] === "a") {
    //             alert("Hello admin!");
    //             setText("Admin");
    //             navigate(`/admin/dashboard`);

    //         }
    //         else if (userID[0] === 's') {
    //             alert("Hello student!!");
    //             setText("Student");
    //             navigate(`/student/dashboard`);
    //         }
    //         else if (userID[0] === 't') {
    //             alert("hello teacher");
    //             setText("Teacher");
    //             navigate(`/teacher/dashboard`);
    //         }
    //     } else {

    //         // Login failed
    //         console.error('Login failed');
    //     }
    // };

    return (
        <>
            <MDBContainer fluid className='Login-main'>
                <NavBar
                    Logintext={text}
                />
                <MDBRow style={{ width: "100%" }}>

                    <MDBCol sm='6'>

                        <div className='d-flex flex-row ps-5 pt-5 mt-5'>
                            <span className="h1 fw-bold mb-0">Welcome to SmartSchool!</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4' style={{ height: "600px" }}>
                            <div className='text-danger'>
                                {error && <p>{error}</p>}
                            </div>

                            <h2 className="fw-normal mb-3  ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h2>

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='User ID'
                                placeholder='User ID'
                                id='formControlLgUsername' type='text' size="lg" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })}
                            />
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLgPassword' type='password'
                                placeholder='Password' size="lg" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
                            <MDBBtn className="mb-4 px-5 mx-5 w-100 login-button" size='lg' id="loginBtn" onClick={handleLogin}>Login</MDBBtn>
                        </div>
                    </MDBCol>

                    <MDBCol sm='6' className='d-none d-sm-block px-0'>
                        <img src={LoginCover}
                            alt="LoginCover" className="w-100" style={{ objectFit: 'cover', objectPosition: 'center', height: "100vh" }} />
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