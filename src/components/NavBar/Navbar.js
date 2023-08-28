import React from "react";
// import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
// import Login from './Login';
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import './Navbar.css'
// import {GiHamburgerMenu} from 'react-icons/gi';

export default function NavBar() {

    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [active, setActive] = useState(false);

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise((resolve) => setTimeout(resolve, 1000));
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => {
        setLoading(true);
        setTimeout(function(){
            navigate("/login");
        }, 1000);
    };

    return (
        <>
            <Navbar fixed="top" key='md' expand='md' className="bg-body-tertiary mb-5 navbar Navbar-main">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <h1 className="navbar-heading">
                            
                            SmartSchool
                        </h1>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$md`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-$md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-$md`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title  id={`offcanvasNavbarLabel-expand-$md`}>
                                SmartSchool
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link style={{color:"#E5D2CB"}} href="#home">Home</Nav.Link>
                                <Nav.Link style={{color:"#E5D2CB"}} href="#about-us">About Us</Nav.Link>
                                <NavDropdown  title="More" id="collasible-nav-dropdown" className="navbar-dropdown navbar-more">
                                    <NavDropdown.Item href="">Our System</NavDropdown.Item>
                                    <NavDropdown.Item href="">Contact Us</NavDropdown.Item>
                                    <NavDropdown.Item href="">FAQs</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#Login">
                                    <Button
                                         style={{color:"#383C53"}}
                                        disabled={isLoading}
                                        onClick={!isLoading ? handleClick : null}
                                        className="navbar-button navbar-login"
                                    >
                                        {isLoading ? 'Loading..' : 'Login'}
                                    </Button>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    )
}