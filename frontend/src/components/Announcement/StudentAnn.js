/* eslint-disable no-unused-vars */
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import AnnCard from "./AnnCard";
import AnnPopUp from "./AnnPopUp";


function StudentAnns() {

    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;
    var userType = decodedToken.userType;

    // Announcements
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState("");

    const values = {
        "user_id": user_id,
        "userType": userType
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/admin/getAnnouncements", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data], "hello");
                    setAnnouncements([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>

            <h1>Student Announcements</h1>
            <div className="ann-container">
                {announcements.map((val, key) => {
                    const popupId = `ann-pop-up-id-${key}`;
                    const cardId = `ann-card-id-${key}`;
                    console.log(popupId);
                    return (
                        <>
                            <AnnCard data={val} id={cardId} id2={popupId} />
                            <AnnPopUp data={val} id={popupId} />
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default StudentAnns;