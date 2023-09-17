import React from 'react';
import Login from './components/Login/Login';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
// import ContactUs from './components/ContactUs/ContactUs';
import Dashboard from './components/Dashboard/Dashboard';
import Website from './components/Website/Website';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
// import OurServices from './components/OurServices/OurServices';
// import AboutUs from './components/AboutUs/AboutUs';
// import Accordion from './components/FAQAccordion/FAQAccordion';
import './App.css';
import ViewMarks from './components/ViewMarks/viewMarks';

function App() {
    return (
        <>
            <Routes>
                <Route index exact element={<Website />}/>
                {['/', "/home"].map((path) => 
                    <Route path={path} element={<Website/>}/>
                )}
                <Route path='/home' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin/register' element={<RegistrationPage/>}/>
                {/* <Route path='/contactus' element={<ContactUs/>}/>
                <Route path='/services' element={<AboutUs/>}/>
                <Route path='/aboutus' element={<OurServices/>}/>
                <Route path='/faq' element={<Accordion/>}/> */}
                <Route path='/admin/dashboard' element={<Dashboard Person="Admin"/>}/>
                <Route path='/student/dashboard' element={<Dashboard Person="Student"/>}/>
                <Route path='/teacher/dashboard' element={<Dashboard Person="Teacher"/>}/>
                <Route path='/student/marks' element={<ViewMarks/>}/>
            </Routes>
        </>
    );
}

export default App;