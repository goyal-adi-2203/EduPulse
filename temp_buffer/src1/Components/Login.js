import React, { useState } from "react";
// import { ReactDOM } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import NavBar from "./Navbar";
// import Registration from "./Registration";
// import { useParams } from "react-router-dom";

const users = [
    {
        id: 's00001',
        key:'s00001@ss'
    },
    {
        id: 't001',
        key: 't001@ss'
    },
    {
        id: 'a01',
        key: 'a01@ss'
    }
];


function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const account = users.find((user) => (user.id === username));
        if (account && account.key === password) {
            if (username[0] === "a")
                navigate("/register");
            else if (username[0] === 's')
                alert("Hello student!!");
            else if ( username[0] === 't')
                alert("hello teacher");
        } else {
            alert("invalid user!");
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 login-form rounded w-25">
                <h4 className="d-flex justify-content-center mb-3">Enter your Login Credentials</h4>
                <form action="/">
                    <div className="mb-4">
                        <label className="mb-2">User ID</label>
                        <input type="text" id="login-id" name="login-id" className="input__login" placeholder="User ID" required=""
                            value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2">Password</label>
                        <input type="password" id="password" name="password" className="input__login" placeholder="Password" required=""
                            onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </form>
                <button class="button" onClick={handleSubmit}>
                    <span className="button-content">Login </span>
                </button>
                <div className="mt-3">
                    <Link to="/faq" style={{ textDecoration: "none", float: "right" }}>Need Help?</Link>
                </div>
            </div>
            
        </div>
    )
}

export default Login