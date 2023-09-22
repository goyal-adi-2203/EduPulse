import React, { useEffect, useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import './updateAttendance.css';
import { useLocation } from "react-router-dom";
// , { useEffect, useState }

const data2 = [
    {
        "sid": "s000001",
        "sname": "Aditya Bajpai",
        "Percent": "68",
        "abs": "1"
    },
    {
        "sid": "s000002",
        "sname": "Aditya Goyal",
        "Percent": "68",
        "abs": "0"
    },
    {
        "sid": "s000003",
        "sname": "Adeesh Jain",
        "Percent": "68",
        "abs": "0"
    },
    {
        "sid": "s000004",
        "sname": "Aditi Solanki",
        "Percent": "68",
        "abs": "0"
    },
    {
        "sid": "s000005",
        "sname": "Rishabh Jain",
        "Percent": "68",
        "abs": "0"
    }
];


function UpdateAttendance() {
    const location = useLocation();
    const data = { ...location.state.data };
    const class_name = data.class_name;
    // const class_id = data.class_id;
    // const tot_no_stu = data.tot_no_stu;
    
    const [activeItemsCount, setActiveItemsCount] = useState(0);
    
    const today = new Date();

    const getDateRange = (start, end) => {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            console.log(dt);
            arr.push(new Date(dt));
        }
        return arr;
    };

    const dateArray = getDateRange(
        new Date().setDate(today.getDate() - 2), 
        new Date().setDate(today.getDate() + 2)
    );
    
    // dateArray = dateArray.map((val, key) => {
        
    // });

    const ChecklistItem = ({date}) => {
        const [isActive, setIsActive] = useState(false);

        const changeHandler = () => {
            setIsActive(!isActive);
        };

        useEffect(() => {
            if (!isActive) {
                setActiveItemsCount((prevCount) => {
                    if (prevCount !== 0) {
                        return prevCount - 1;
                    }

                    return prevCount;
                });
            }

            if (isActive) {
                setActiveItemsCount((prevCount) => prevCount + 1);
            }
        }, [isActive]);

        return (
            <input type="checkbox" checked={isActive} onChange={changeHandler} />
        );
    };

    const cells = () => {
        dateArray.map((val, key) => {
            return (
                <td>
                    <ChecklistItem/>
                </td>
            );
        })
    }

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
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Sid</th>
                                <th>SName</th>
                                {dateArray.map((val, key) => {
                                    var mon = '';
                                    switch(val.getMonth()){
                                        case 0:     mon = "Jan";    break;
                                        case 1:     mon = "Feb";    break;
                                        case 2:     mon = "Mar";    break;
                                        case 3:     mon = "Apr";    break;
                                        case 4:     mon = "May";    break;
                                        case 5:     mon = "Jun";    break;
                                        case 6:     mon = "Jul";    break;
                                        case 7:     mon = "Aug";    break;
                                        case 8:     mon = "Sep";    break;
                                        case 9:     mon = "Oct";    break;
                                        case 10:    mon = "Nov";    break;
                                        case 11:    mon = "Dec";    break;
                                        default:    break;
                                    }
                                    return (
                                        <th>{val.getDate() +" "+mon}</th>
                                    );
                                })}
                                <th>Percent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data2.map((val, key) => (
                                <tr key={val.sid}>
                                    <td>{key + 1}.</td>
                                    <td>{val.sid}</td>
                                    <td>{val.sname}</td>
                                    {dateArray.map((val, key) => {
                                        return (
                                            <td><ChecklistItem date={val}/></td>
                                        );
                                    })}
                                    <td>{val.Percent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <tr>
                        <thead><th>Total Percentage</th></thead>
                    </tr>
                </div>
            </div>
        </div>
    )
}

export default UpdateAttendance;