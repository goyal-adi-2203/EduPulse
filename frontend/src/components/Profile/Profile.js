import React from "react";
import './Profile.css';

function Profile(props) {
    const user = props.Person;
    // console.log("User:" + user);

    let userProfile;
    if (user === "Admin") {
        // console.log("admin");
        userProfile = <AdminProfile />;
    } else if (user === "Student") {
        // console.log("student");
        userProfile = <StudentProfile />;
    } else if (user === "Teacher") {
        // console.log("teacher");
        userProfile = <TeacherProfile />;
    }

    return (
        <>
            {userProfile}
        </>
    );
}


function AdminProfile() {
    return (
        <>
            <section class="vh-100 w-100 h-100" style={({ "background-color": "#f4f5f7;" })}>
                <div class="container py-5 h-100 bigcard">
                    <div class="row d-flex justify-content-center align-items-center h-100 ">
                        <div class="col col-lg-6 mb-4 mb-lg-0 w-100 admin h-100">
                            <div class="card mb-3 h-100" style={({ "border-radius": ".5rem" , "height":"100vh"})}>
                                <div class="row g-0 h-100">
                                    <div class="col-md-4 gradient-custom text-center text-white"
                                        style={({ "border-top-left-radius": ".5rem", "border-bottom-left-radius": ".5rem" })}>
                                        <img src="https://www.transparentpng.com/thumb/user/black-male-icon-clipart-png-Uc8rbw.png"
                                            alt="Avatar" class="img-fluid my-5" style={({ "width": "80px;" })} />
                                        <h5>Administrator</h5>
                                        <p>Little Flower School</p>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body p-4">
                                            <h6>Information</h6>
                                            <hr class="mt-0 mb-4" />
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>Name</h6>
                                                    <p class="text-muted">School Admin</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Role</h6>
                                                    <p class="text-muted">Administrator</p>
                                                </div>
                                            </div>
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p class="text-muted">schooladmin@gmail.com</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p class="text-muted">8269164751</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
function StudentProfile() {
    return (
        <>
            <main>
                <h1 style={{ color: "black", marginLeft: "5rem" }}>
                    I'm Student
                </h1>
            </main>
        </>
    );
}
function TeacherProfile() {
    return (
        <>
            <main>
                <h1 style={{ color: "black", marginLeft: "5rem" }}>
                    I'm Teacher
                </h1>
            </main>
        </>
    );
}

export default Profile;

/* <h6>Projects</h6>
    <hr class="mt-0 mb-4"/>
    <div class="row pt-1">
        <div class="col-6 mb-3">
            <h6>Recent</h6>
            <p class="text-muted">Lorem ipsum</p>
        </div>
        <div class="col-6 mb-3">
            <h6>Most Viewed</h6>
            <p class="text-muted">Dolor sit amet</p>
        </div>
*/
