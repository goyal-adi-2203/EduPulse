import React from "react";
import { Link, useParams } from "react-router-dom";
function Login(){
return(
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 login-form rounded w-25">
            <h4 className="d-flex justify-content-center mb-3">Enter your Login Credentials</h4>
            <form action="/">
                <div className="mb-4">
                    <label className="mb-2">User ID</label>
                     <input type="text" id="login-id" name="login-id" className="input__login" placeholder="User ID" required=""></input>
                </div>
                <div className="mb-4">
                    <label className="mb-2">Password</label>
                    <input type="password" id="password" name="password" className="input__login" placeholder="Password" required=""></input>
                </div>   
            </form>
            <button class="button">
                <span className="button-content">Login </span>
            </button>
            <div className="mt-3">
            <Link to="/faq" style={{textDecoration: "none",float:"right"}}>Need Help?</Link>
            </div>
        </div>  
    </div>
)
}

export default Login