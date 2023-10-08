/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { addDays } from 'date-fns';
import { DateRange, DateRangePicker } from 'react-date-range';
import './ApplyLeave.css'
import 'react-date-range/dist/styles.css';        // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import jwtDecode from "jwt-decode";
import axios from "axios";


function LeaveDialogBox() {
    return (
        <div className="leave-dialog-box">
            <button onClick={(e) => {
                document.getElementById("leave-popup").classList.add("show");
            }} className="apply-leave-btn">Apply For Leave</button>
        </div>
    );
}

function LeavePopUp() {

    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;
    const userType = decodedToken.userType;
    const [classId, setClassId] = useState(-1);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [reason, setReason] = useState("");
    const [subject, setSubject] = useState("");

    const dateFormat = (date) => {
        var d = date;
        let dDate = d.getDate();
        let dMonth = d.getMonth() + 1;
        let dYear = d.getFullYear();
        // console.log(start.getMonth());
        if (d.getMonth() + 1 < 10) dMonth = "0" + dMonth;
        if (d.getDate() < 10) dDate = "0" + dDate;
        const ddate = dYear + '-' + dMonth + '-' + dDate;
        return ddate;
    }

    // start date
    const startdate = dateFormat(state[0].startDate);

    // end date
    const enddate = dateFormat(state[0].endDate);

    // date
    const currentDate = dateFormat(new Date());
    const [error, setError] = useState("");

    // class
    useEffect(() => {
        axios
            .post("http://localhost:4000/student/getClass", {user_id})
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log(res.data.data[0].class_id, "hello");
                    setClassId(res.data.data[0].class_id);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {

        const values = {
            user_id: user_id,
            userType: userType,
            today: currentDate,
            startdate: startdate,
            enddate: enddate,
            class_id: classId,
            subject: subject,
            reason: reason
        };

        axios
            .post("http://localhost:4000/student/applyLeave", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data], "hello");
                    // setStudentData([...res.data.data]);
                    alert("Application Submitted");
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }


    return (
        <div className="leave-pop-up" id="leave-popup">
            <div className="leave-popup-content">
                <DateRange
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    className="date-range-calender"
                />

                

                <div>
                    <label>Subject : </label>
                    <input
                        type="text"
                        className="leave-subject"
                        placeholder={`Subject For Application`}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required={true}
                    />
                </div>

                <div>
                    <label>Reason : </label>
                    <textarea
                        className="leave-reason"
                        placeholder={`Enter Your Reason for Leave`}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required={true}
                    >Enter Reason here</textarea>
                </div>

                <div>
                    <button onClick={handleSubmit}>Apply Now</button>
                </div>

                <button onClick={(e) => {
                    document.getElementById("leave-popup").classList.remove("show");
                }} className="box-close">x</button>

                <div>
                    <button onClick={(e) => {
                        document.getElementById("leave-popup").classList.remove("show");
                    }} className="close-pop-up">Close</button>
                </div>
            </div>
        </div>
    );
}

export { LeaveDialogBox, LeavePopUp };