import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { useState } from 'react';
// import AdminSidePanel from '../SidePanel/SidePanel';
import { ProSidebarProvider } from 'react-pro-sidebar';

function RegistrationPage() {
    const [selectedClass, setSelectedClass] = useState();
    function handleSelectClass(data) {
        setSelectedClass(data);
    }
    const [selectedSubject, setSelectedSubject] = useState();
    function handleSelectSubject(data) {
        setSelectedSubject(data);
    }

    const [selectedOption, setSelectedOption] = useState("");
    const selectedDropDown = (event) => {
        setSelectedOption(event.target.value);
    };
    const classList = [
        { value: "1", label: "Class I" },
        { value: "2", label: "Class II" },
        { value: "3", label: "Class III" },
        { value: "4", label: "Class IV" },
        { value: "5", label: "Class V" },
        { value: "6", label: "Class VI" },
        { value: "7", label: "Class VII" },
        { value: "8", label: "Class VIII" }
    ];
    const subjectList = [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
        { value: "Social", label: "Social" },
        { value: "Maths", label: "Maths" },
        { value: "Science", label: "Science" },
        { value: "Computer", label: "Computer" },
        { value: "GK", label: "General Knowledge" },
    ];

    function handleSubmit(e) {
        console.log(e.target);
    }

    return (
        <>
            <ProSidebarProvider>
                {/* <AdminSidePanel /> */}
            </ProSidebarProvider>
            <form onSubmit={handleSubmit}>
                <MDBContainer fluid style={{ backgroundColor: "#8fc4b7" }}>
                    <MDBRow className='d-flex justify-content-center align-items-center register-container'>
                        <MDBCol lg='8'>
                            <MDBCard className='my-5 rounded-3 registration-container-inner' >
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' />

                                <MDBCardBody className='px-5'>
                                    <MDBRow >
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

                                    </MDBRow>
                                    <MDBRow style={{ marginBottom: "20px" }}>
                                        <MDBCol md='6'>
                                            <select value={selectedOption} onChange={selectedDropDown} class="form-select" aria-label="Default select example">
                                                <option selected>Select Role</option>
                                                <option value="1">Student</option>
                                                <option value="2">Teacher</option>
                                            </select>
                                        </MDBCol>
                                    </MDBRow>
                                    {selectedOption === "1" && (
                                        <div>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='First Name' id='form1' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Last Name' id='form1' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Father Name' id='form1' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Mother Name' id='form1' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow style={{ marginBottom: "15px" }}>
                                                <MDBCol md='6' >
                                                    <LocalizationProvider style={{ height: "45px" }} dateAdapter={AdapterDayjs}>
                                                        <DatePicker label="Date of Birth" />
                                                    </LocalizationProvider>
                                                </MDBCol>
                                                <MDBCol md='6' >
                                                    <LocalizationProvider style={{ height: "45px" }} dateAdapter={AdapterDayjs}>
                                                        <DatePicker label="Joining Date" />
                                                    </LocalizationProvider>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6' className='mb-4'>
                                                    <select class="form-select" aria-label="Default select example">
                                                        <option selected>Gender</option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                        <option value="3">Other</option>
                                                    </select>
                                                </MDBCol>
                                                <MDBCol md='6' className='mb-4'>
                                                    <select class="form-select" aria-label="Default select example">
                                                        <option selected>Select Class</option>
                                                        <option value="1">Class I</option>
                                                        <option value="2">Class II</option>
                                                        <option value="3">Class III</option>
                                                        <option value="4">Class IV</option>
                                                        <option value="5">Class V</option>
                                                        <option value="6">Class VI</option>
                                                        <option value="7">Class VII</option>
                                                        <option value="8">Class VIII</option>
                                                    </select>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Flat No./House No.' id='form3' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Street/Colony' id='form3' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='City' id='form3' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='State' id='form3' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Mobile No.' id='form3' type='number' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Enrollment ID' id='form3' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                        </div>
                                    )}
                                    {selectedOption === "2" && (
                                        <div>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='First Name' id='form1' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Last Name' id='form1' type='text' />
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow style={{ marginBottom: "15px" }}>
                                                <MDBCol md='6' >
                                                    <LocalizationProvider style={{ height: "45px" }} dateAdapter={AdapterDayjs}>
                                                        <DatePicker label="Date of Birth" />
                                                    </LocalizationProvider>
                                                </MDBCol>
                                                <MDBCol md='6' >
                                                    <LocalizationProvider style={{ height: "45px" }} dateAdapter={AdapterDayjs}>
                                                        <DatePicker label="Joining Date" />
                                                    </LocalizationProvider>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6' className='mb-4'>
                                                    <select class="form-select" aria-label="Default select example">
                                                        <option selected>Gender</option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                        <option value="3">Other</option>
                                                    </select>

                                                </MDBCol>
                                                <MDBCol md='6' className='mb-4'>
                                                    <Select
                                                        options={classList}
                                                        placeholder="Select Class" isSearchable={true} value={selectedClass}
                                                        onChange={handleSelectClass}
                                                        isMulti
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6' className='mb-4'>
                                                    <select class="form-select" aria-label="Default select example">
                                                        <option selected>If class teacher, Select Class</option>
                                                        <option value="1">Class I</option>
                                                        <option value="2">Class II</option>
                                                        <option value="3">Class III</option>
                                                        <option value="4">Class IV</option>
                                                        <option value="5">Class V</option>
                                                        <option value="6">Class VI</option>
                                                        <option value="7">Class VII</option>
                                                        <option value="8">Class VIII</option>

                                                    </select>
                                                </MDBCol>
                                                <MDBCol md='6' className='mb-4'>
                                                    <Select
                                                        options={subjectList}
                                                        placeholder="Select Class" isSearchable={true} value={selectedSubject}
                                                        onChange={handleSelectSubject}
                                                        isMulti
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Flat No./House No.' id='form3' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Street/Colony' id='form3' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='City' id='form3' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='State' id='form3' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Mobile No.' id='form3' type='number' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Teacher ID' id='form3' type='text' />
                                                </MDBCol>
                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='text' />
                                                </MDBCol>
                                            </MDBRow>
                                        </div>
                                    )}
                                    <MDBBtn color='success' className='mb-4' size='lg' type='submit'>Submit</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
        </>
    );
}



export default RegistrationPage;