import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Login.css';
import LoginCover from './images/login-cover2.jpg'
import NavBar from '../NavBar/Navbar';

function Login(){
    return (
        <MDBContainer fluid className='Login-main'>
          <NavBar />
          <MDBRow style={{width:"100%"}}>
    
            <MDBCol sm='6'>
    
              <div className='d-flex flex-row ps-5 pt-5 mt-5'>
                <span className="h1 fw-bold mb-0">Welcome to SmartSchool!</span>
                
              </div>
    
              <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4' style={{height:"600px"}}>
    
                <h2 className="fw-normal mb-3  ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h2>
    
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='User ID' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>
    
                <MDBBtn className="mb-4 px-5 mx-5 w-100 login-button"   size='lg'>Login</MDBBtn>
                
    
              </div>
    
            </MDBCol>
    
            <MDBCol sm='6' className='d-none d-sm-block px-0'>
              <img src={LoginCover}
                alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'center',height:"100vh"}} />
            </MDBCol>
    
          </MDBRow>
    
        </MDBContainer>
      );
}

export default Login;