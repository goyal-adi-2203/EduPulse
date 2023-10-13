/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { StudentSidePanel } from "../SidePanel/SidePanel";
import Calendar from "react-calendar";
import "./viewAttendance.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LeaveDialogBox, LeavePopUp } from "../Leave/ApplyLeave";

function ViewAttendance() {
    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;

    // date
    var today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    if (today.getMonth() + 1 < 10) todayMonth = "0" + todayMonth;
    if (today.getDate() < 10) todayDate = "0" + todayDate;
    const [value, onChange] = useState(new Date());
    // const element = document.getElementById()

    const values = {
        student_id: user_id,
    };

    // console.log('values', values );

    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .post("http://localhost:4000/student/getAttendance", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data], "hello");
                    setStudentData([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(studentData);

    return (
        <div id="ViewAttendance">
            <div id="sidePanel">
                <ProSidebarProvider>
                    <StudentSidePanel />
                </ProSidebarProvider>
            </div>
            <div className="studentAttendance">
                <h1 className="attendanceHeading">Attendance</h1>
                <div className="calendar">
                    <Calendar
                        onChange={onChange}
                        value={value}
                        tileClassName={({ date }) => {
                            let day = date.getDate();
                            let month = date.getMonth() + 1;
                            let weekday = date.getDay();

                            if (month < 10) month = "0" + month;
                            if (day < 10) day = "0" + day;

                            var realDate = date.getFullYear() + "-" + month + "-" + day;
                            var obj = studentData.find((val) => {
                                return val.date === realDate;
                            });

                            if (obj) {
                                if (obj.flag === "0") {
                                    return "green";
                                } else if (obj.flag === "1") {
                                    return "red";
                                } else if (obj.flag === "2") {
                                    return "purple";
                                }
                            }
                            return "";
                        }}
                    />
                </div>
            </div>

            <LeaveDialogBox/>   
            <LeavePopUp />
        </div>
    );
}

export default ViewAttendance;
