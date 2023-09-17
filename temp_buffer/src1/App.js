import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Accordion from './Components/Accordion';
import Registration from './Components/Registration';
import NavBar from './Components/Navbar';

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                {/* <Route path='/login exact' element={<Login />} /> */}
                <Route index exact path='/login' element={<Login />} />
                <Route path='/faq' exact element={<Accordion />} />
                <Route path='/register' element={<Registration />} />
                {/* <Route index exact element={<Registration />} /> */}
            </Routes>
        </div>
    );
}

export default App;
