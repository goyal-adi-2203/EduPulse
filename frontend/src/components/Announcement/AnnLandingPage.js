/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react"
import CreateAnnouncement from "./CreateAnn";
import { useNavigate } from "react-router-dom";
import StudentAnns from "./StudentAnn";
import AdminAnns from "./AdminAnns";
import TeacherAnns from "./TeacherAnns";
import axios from "axios";


function AnnLandingPage() {
    const [canCreate, setCanCreate] = useState(false);
    const navigate = useNavigate();

    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;
    var userType = decodedToken.userType;


    useEffect(() => {
        if (user_id[0] === 'a' || user_id[0] === 't') setCanCreate(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Announcements = (props) => {
        if (userType === "Student")     return <StudentAnns />;
        if (userType === "Admin")       return <AdminAnns />;
        if (userType === "Teacher")     return <TeacherAnns />;
    }

    return (
        <div>
            {canCreate && <CreateAnnouncement />}
            <Announcements />
            <button onClick={() => {
                if (userType === "Teacher")
                    navigate(`/Teacher/${user_id}/dashboard`);
                else
                    navigate(`/${userType}/dashboard`);
            }}>Go to dashboard</button>
        </div>
    );
}


export default AnnLandingPage;