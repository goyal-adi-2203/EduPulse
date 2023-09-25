/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import './updateAttendance.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
// , { useEffect, useState }

const data3 = [
    {
        "student_id": "s001",
        "date": "2023-09-23",
        "flag": "0"
    },
    {
        "student_id": "s002",
        "date": "2023-09-23",
        "flag": "1"
    },
    {
        "student_id": "s003",
        "date": "2023-09-23",
        "flag": "1"
    },
    {
        "student_id": "s001",
        "date": "2023-09-22",
        "flag": "1"
    },
    {
        "student_id": "s002",
        "date": "2023-09-22",
        "flag": "0"
    },
    {
        "student_id":"s003",
        "date": "2023-09-22",
        "flag": "0"
    },
    {
        "student_id": "s001",
        "date": "2023-09-24",
        "flag": "0"
    },
    {
        "student_id": "s002",
        "date": "2023-09-24",
        "flag": "1"
    },
    {
        "student_id": "s003",
        "date": "2023-09-24 ",
        "flag": "1"
    }
];

function UpdateAttendance() {
    const location = useLocation();
    const data = { ...location.state.data };
    const class_name = data.class_name;
    const class_id = data.class_teacher_flag;
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;

    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState("");

    const values = {
        "class_id": class_id,
    };
    console.log(values);

    useEffect(() => {
        axios
            .post("http://localhost:4000/teacher/getStudentDataAttendance", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    console.log([...res.data.data], "hello");
                    setStudentData([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(studentData);
    
    var [attendanceData, setAttendanceData] = useState(data3);
    const [error2, setError2] = useState("");



    useEffect(() => {
        axios
            .post("http://localhost:4000/teacher/getAttendanceData", studentData)
            .then((res) => {
                if (res.data.Status === "Success") {
                    console.log([...res.data.data], "hello");
                    setAttendanceData([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const today = new Date();
    let toDay = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    if (today.getMonth() < 10) todayMonth = '0' + todayMonth;
    if (today.getDate() < 10) toDay = '0' + toDay;

    const TODAY = todayYear + '-' + todayMonth + '-' + toDay;

    const [buttonText, setButtonText] = useState("Edit");
    const [globalEnable, setGlobalEnable] = useState(false);

    const getDateRange = (start, end) => {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            var d = new Date(dt)
            let dDay = d.getDate();
            let dMonth = d.getMonth() + 1;
            let dYear = d.getFullYear();
            if (d.getMonth() < 10) dMonth = '0' + dMonth;
            if (d.getDate() < 10) dDay = '0' + dDay;

            let t = dYear + '-' + dMonth + '-' + dDay;

            var obj = {
                "date": t,
                "totPresent": "0"
            }

            arr.push(obj);
        }

        return arr;
    };

    const addDate = () => {
        let obj = attendanceData.find((o, i) => {
            if(o.date === TODAY){
                return true;
            }
            
            return false;
        })

        if(obj === undefined){
            var arr = [...attendanceData]; 
            studentData.map((val, key) => {
                let obj = {
                    "student_id": val.student_id,
                    "date" : TODAY,
                    "flag": '1'
                }

                attendanceData.push(obj);
                return {...val};
            });

            // setAttendanceData(arr);
        }
    };
    addDate();
    // console.log(attendanceData, "attendance");

    const [dateArray, setDateArray] = useState(getDateRange(
        new Date().setDate(today.getDate() - 3),
        new Date().setDate(today.getDate() + 1)
    ));

    if(dateArray === undefined)    
        getDateRange(
            new Date().setDate(today.getDate() - 3), 
            new Date().setDate(today.getDate() + 1)
        );
    


    
    const handleEditButton = () => {
        if(!globalEnable){
            setGlobalEnable(true);
            setButtonText("Save");
        } else {
            setButtonText("Edit");
            setGlobalEnable(false);
        }
    }

    const handleSubmit = () => {
        alert("Submitted Successfully");
        var updatedDateArray = [...dateArray];
        updatedDateArray = updatedDateArray.map((val, key) => {
            var count = 0;
            for (let i = 0 ; i < attendanceData.length; i++){
                if (val.date === attendanceData[i].date){
                    if (attendanceData[i].flag === '0'){
                        count++;
                    }
                }
            }
            // alert(count);
            val.totPresent = count;
            // alert(val.totPresent);
            return val;
        }); 
        console.log(updatedDateArray);
        setDateArray(updatedDateArray);

        const checkAttend = (val, f) => {
            // eslint-disable-next-line array-callback-return
            var obj = attendanceData.find((o, i) => {
                if(o.student_id === val.student_id && o.date === TODAY){
                    return o.flag === f;
                }
            });
        } 

        var updateStudentData = [...studentData];
        updateStudentData = updateStudentData.map((val, key) => {
            var present = parseFloat(val.present);
            var absent = parseFloat(val.absent);            

            // present += checkAttend(val.student_id, "0");
            // absent += checkAttend(val.student_id, "1");

            var percent = ((present)*100/(present + absent)).toFixed(2);        
            val.Percent = percent+"%";
            return val;
        });

        console.log(updateStudentData);
        setStudentData(updateStudentData);

    }

    function ChecklistItem(props) {
        var [isActive, setIsActive] = useState(false);
        // const key = props.key;

        const current = props.val.date;
        const student_id = props.student_id;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // const updatedDateArray = [...dateArray];
        const updatedArray = [...attendanceData];
        
        useEffect(() => {
            updatedArray.find((o, i) => {
                if (o.student_id === student_id && o.date === current) {
                    if (o.flag === "0") setIsActive(true);
                    else                setIsActive(false);
                    return true;
                }
                return false;
            });
        });

        var enable = "disabled";
        if(globalEnable){
            enable = "";
        // eslint-disable-next-line eqeqeq
        } else if ((current[8] + current[9]) == toDay && (current[5]+current[6]) == todayMonth){
            enable = "";
        }

        const handleChange = (active) => {
            console.log(student_id);

            let obj = updatedArray.find((o, i) => {
                if (o.student_id === student_id && o.date === current) {
                    let t = updatedArray[i].flag;
                    updatedArray[i].flag = (t === "0") ? "1" : "0";
                    setIsActive(active);
                    setAttendanceData(updatedArray);
                    console.log(updatedArray);
                    return true;
                }
                return false;
            });

            if (obj === undefined) {
                console.log("hello");
                let obj = {
                    "student_id": student_id,
                    "date": current,
                    "flag": active ? "0" : "1"
                };

                console.log(obj);
                updatedArray.push(obj);
                setAttendanceData(updatedArray);
                setIsActive(active);
                console.log(updatedArray);
            }
        }

        return (
            <input 
                type="checkbox" 
                checked={isActive} 
                onChange={(e) => handleChange(e.target.checked)} 
                disabled={enable}
            />
        );
    };

    return (
        <div id="ViewAttendance">
            {/* <div id="student_idePanel">
                <ProSidebarProvider>
                    <TeacherSidePanel />
                </ProSidebarProvider>
            </div> */}
            
            <div className="classAttendance" id="classAttendance">
                <h1 className="classHeading">Class {class_name} Attendance</h1>
                <div className="attendanceList">
                    <table className="attendanceTable">
                        <thead>
                            <tr>
                                <th className="attendanceTH">S. No.</th>
                                <th className="attendanceTH">Sid</th>
                                <th className="attendanceTH">SName</th>
                                {dateArray.map((val, key) => {
                                    const date = val.date;
                                    var mon = '';
                                    switch(date[5]+date[6]){
                                        case '01':     mon = "Jan";    break;
                                        case '02':     mon = "Feb";    break;
                                        case '03':     mon = "Mar";    break;
                                        case '04':     mon = "Apr";    break;
                                        case '05':     mon = "May";    break;
                                        case '06':     mon = "Jun";    break;
                                        case '07':     mon = "Jul";    break;
                                        case '08':     mon = "Aug";    break;
                                        case '09':     mon = "Sep";    break;
                                        case '10':     mon = "Oct";    break;
                                        case '11':     mon = "Nov";    break;
                                        case '12':     mon = "Dec";    break;
                                        default:    break;
                                    }
                                    return (
                                        <th className="attendanceTH">{date[8]+date[9] +" "+mon}</th>
                                    );
                                })}
                                <th className="attendanceTH">Percent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((val, key) => {
                                const student_id = val.student_id;
                                return (
                                    <tr key={student_id}>
                                        <td className="attendanceTD">{key + 1}.</td>
                                        <td className="attendanceTD">{student_id}</td>
                                        <td className="attendanceTD">{val.first_name} {val.last_name}</td>
                                        {dateArray.map((val, key) => {
                                            return (
                                                <td className="attendanceTD">
                                                    <ChecklistItem 
                                                        val={val} 
                                                        key={key} 
                                                        student_id={student_id}
                                                    />
                                                </td>
                                            );
                                        })}
                                        <td className="attendanceTD">{val.tot_atten_percent}</td>
                                    </tr>
                                ); 
                            })}

                            <tr id="totPresent">
                                <td className="totPresent1"></td>
                                <td className="totPresent1">Total</td>
                                <td>Present :</td>
                                {dateArray.map((val, key) => {
                                    return <td>{val.totPresent}</td>;
                                })}
                            </tr>
                        </tbody>
                    </table>

                    <button id="attendanceEditButton" onClick={handleEditButton}>{buttonText}</button>

                    <button id="attendanceSubmitButton" onClick={handleSubmit}>Submit</button>

                </div>
            </div>
        </div>
    );
}


export default UpdateAttendance;