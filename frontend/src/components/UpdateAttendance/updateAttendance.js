import React, { useEffect, useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import './updateAttendance.css';
import { useLocation } from "react-router-dom";
// , { useEffect, useState }

const data2 = [
    {
        "sid": "s00001",
        "sname": "Aditya Bajpai",
        "present": "5",
        "absent": "2",
        "Percent": "68",
    },
    {
        "sid": "s00002",
        "sname": "Aditya Goyal",
        "present": "7",
        "absent": "1",
        "Percent": "68",
    },
    {
        "sid": "s00003",
        "sname": "Adeesh Jain",
        "present": "2",
        "absent": "5",
        "Percent": "68",
    },
    {
        "sid": "s00004",
        "sname": "Aditi Solanki",
        "present": "0",
        "absent": "7",
        "Percent": "68",
    },
    {
        "sid": "s00005",
        "sname": "Anishiddh Suryawanshi",
        "present": "7",
        "absent": "0",
        "Percent": "68",
    }
];

const data3 = [
    {
        "sid": "s00001",
        "date": "2023-09-23",
        "flag": "0"
    },
    {
        "sid": "s00002",
        "date": "2023-09-23",
        "flag": "1"
    },
    {
        "sid": "s00003",
        "date": "2023-09-23",
        "flag": "1"
    },
    {
        "sid": "s00004",
        "date": "2023-09-23",
        "flag": "0"
    },
    {
        "sid": "s00005",
        "date": "2023-09-23",
        "flag": "0"
    },
    {
        "sid": "s00001",
        "date": "2023-09-21",
        "flag": "0"
    },
    {
        "sid": "s00001",
        "date": "2023-09-22",
        "flag": "1"
    },
    {
        "sid": "s00002",
        "date": "2023-09-21",
        "flag": "1"
    },
    {
        "sid": "s00002",
        "date": "2023-09-22",
        "flag": "0"
    },
    {
        "sid": "s00003",
        "date": "2023-09-21",
        "flag": "0"
    },
    {
        "sid":"s00003",
        "date": "2023-09-22",
        "flag": "0"
    },
    {
        "sid":"s00004",
        "date": "2023-09-21",
        "flag": "0"
    },
    {
        "sid":"s00004",
        "date": "2023-09-22",
        "flag": "0"
    },
    {
        "sid": "s00005",
        "date": "2023-09-21",
        "flag": "0"
    },
    {
        "sid": "s00005",
        "date": "2023-09-22",
        "flag": "0"
    }
];

function UpdateAttendance() {
    const location = useLocation();
    const data = { ...location.state.data };
    const class_name = data.class_name;
    // const class_id = data.class_id;
    // const tot_no_stu = data.tot_no_stu;
    
    const today = new Date();
    let toDay = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    if (today.getMonth() < 10) todayMonth = '0' + todayMonth;
    if (today.getDate() < 10) toDay = '0' + toDay;

    const TODAY = todayYear + '-' + todayMonth + '-' + toDay;

    const [studentData, setStudentData] = useState(data2);
    var [attendanceData, setAttendanceData] = useState(data3);
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
                    "sid": val.sid,
                    "date" : TODAY,
                    "flag": '1'
                }

                arr.push(obj);
                return {...val};
            });

            console.log(arr);
            setAttendanceData(arr);
        }
    };
    addDate();

    const [dateArray, setDateArray] = useState(getDateRange(
        new Date().setDate(today.getDate() - 3),
        new Date().setDate(today.getDate() + 1)
    ));

    // const date

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
            var obj = attendanceData.find((o, i) => {
                if(o.sid === val.sid && o.date === TODAY){
                    return o.flag === f;
                }
            });
        } 

        var updateStudentData = [...data2];
        updateStudentData = updateStudentData.map((val, key) => {
            var present = parseFloat(val.present);
            var absent = parseFloat(val.absent);            

            // present += checkAttend(val.sid, "0");
            // absent += checkAttend(val.sid, "1");

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
        const sid = props.sid;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // const updatedDateArray = [...dateArray];
        const updatedArray = [...attendanceData];
        
        useEffect(() => {
            updatedArray.find((o, i) => {
                if (o.sid === sid && o.date === current) {
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
        } else if ((current[8] + current[9]) == toDay && (current[5]+current[6]) == todayMonth){
            enable = "";
        }

        const handleChange = (active) => {
            console.log(sid);

            let obj = updatedArray.find((o, i) => {
                if (o.sid === sid && o.date === current) {
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
                    "sid": sid,
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
            <div id="sidePanel">
                <ProSidebarProvider>
                    <TeacherSidePanel />
                </ProSidebarProvider>
            </div>
            <div className="classAttendance" id="classAttendance">
                <h1 className="classHeading">{class_name}</h1>
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
                                const sid = val.sid;
                                return (
                                    <tr key={sid}>
                                        <td className="attendanceTD">{key + 1}.</td>
                                        <td className="attendanceTD">{sid}</td>
                                        <td className="attendanceTD">{val.sname}</td>
                                        {dateArray.map((val, key) => {
                                            return (
                                                <td className="attendanceTD">
                                                    <ChecklistItem 
                                                        val={val} 
                                                        key={key} 
                                                        sid={sid}
                                                    />
                                                </td>
                                            );
                                        })}
                                        <td className="attendanceTD">{val.Percent}</td>
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