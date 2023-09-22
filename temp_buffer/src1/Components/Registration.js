import React,{ useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Dropdown from 'react-bootstrap/Dropdown';

function Registration(){
    const [selectedOption, setSelectedOption] = useState("");
    const selectedDropDown= (event)=>{
        setSelectedOption(event.target.value);
    };

    
    return (
        
        <div className="registration-container">
            <h2 style={{textAlign:"center"}}>Registration Form</h2> 
            <label> Please select an Option: </label>
            <select value={selectedOption} className="select" placeholder="Select" onChange={selectedDropDown}>
                <option default>Select</option>
                <option value="option-1">Student</option>
                <option value="option-2">Teacher</option>
            </select>
    
    {selectedOption==="option-1" && (
        <Container >
                <Row >
                <Col>
                    <label className="registration-label">First Name</label>
                    <input type="text" className="form-control registration-input" placeholder="First Name" required></input>
            </Col>
            <Col>
                <label className="registration-label">Last Name</label>
                <input type="text" className="form-control registration-input" placeholder="Last Name" required></input>
            </Col>
                </Row>
            <Row>
            <Col>
                <label className="registration-label">Contact Number</label>
                <input type="number" className="form-control registration-input" placeholder="Contact Number" required></input>
            </Col>
            <Col>
                <label className="registration-label">Parent's Contact Number</label>
                <input type="number" className="form-control  registration-input" placeholder="Alternate Contact Number"></input>
            </Col>
            </Row>
            <Row>
            <Col>
                <label className="registration-label">Flat No./House No.</label>
                <input type="text" className="form-control registration-input" placeholder="House Number" required></input>
            </Col>
            <Col>
                <label className="registration-label">Street</label>
                <input type="text" className="form-control  registration-input" placeholder="Street"></input>
            </Col>
            </Row>
            <Row>
            <Col>
                <label className="registration-label">City</label>
                <input type="text" className="form-control registration-input" placeholder="City" required></input>
            </Col>
            <Col>
                <label className="registration-label">State</label>
                <input type="text" className="form-control  registration-input" placeholder="State"></input>
            </Col>
            </Row>
            <Row>
            <Col>
                <label className="registration-label">Class</label>
                <input type="text" className="form-control registration-input" placeholder="Class" required></input>
            </Col>
            <Col>
                <label className="registration-label">Enrollment ID</label>
                <input type="text" className="form-control  registration-input" placeholder="Enrollment ID" required></input>
            </Col>
            </Row>
            </Container>
    )}
            </div>

    )
}
export default Registration;