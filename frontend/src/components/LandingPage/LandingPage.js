import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
import NavBar from "../NavBar/Navbar";

function LandingPage() {
    return (
        <div id="Home">
            <NavBar Logintext="Login" />
            <div className=" w-full h-screen Landing-page">
                <div className="landing-page-text-div">
                    <h2 className="main-head-landing-page-welcome">Welcome to </h2>
                    <span className="main-head-landing-page">EduPulse</span>
                    <div className="main-body-landing-page">
                        <span className="main-body-span-landing-page" >
                            A one stop solution where you can track all of your child's progress and ensure their safety in real time.
                        </span>
                    </div>
                    <div className="button-div">
                        <button to="/login" class="button2">
                            <Link to="/login" style={{textDecoration:"none"}}>Login</Link>
                        </button>
                        <button class="button2"
                            onClick={() => {
                                const anchor = document.querySelector('#About-Us');
                                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                        >
                            About Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;