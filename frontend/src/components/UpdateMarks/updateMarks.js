import React, { useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
import './updateMarks.css';

const data2 = [
    {
        "sid": "s000001",
        "sname": "Aditya Bajpai",
        "MST1": "19",
        "MST2": "17",
        "HalfYear": "100",
        "MST3": "20",
        "MST4": "19",
        "Annual": "",
        "Percent": '-',
        "Grade": '-',
        "Remark": '-',
        "Enable": "disabled"
    },
    {
        "sid": "s000002",
        "sname": "Aditya Goyal",
        "MST1": "19",
        "MST2": "17",
        "HalfYear": "100",
        "MST3": "20",
        "MST4": "19",
        "Annual": "",
        "Percent": '-',
        "Grade": '',
        "Remark": '',
        "Enable": "disabled"
    },
    {
        "sid": "s000003",
        "sname": "Adeesh Jain",
        "MST1": 19,
        "MST2": 17,
        "HalfYear": 100,
        "MST3": 20,
        "MST4": 19,
        "Annual": "",
        "Percent": '-',
        "Grade": '-',
        "Remark": '-',
        "Enable": "disabled"
    },
    {
        "sid": "s000004",
        "sname": "Aditi Solanki",
        "MST1": 19,
        "MST2": 17,
        "HalfYear": 100,
        "MST3": 20,
        "MST4": 19,
        "Annual": "",
        "Percent": '-',
        "Grade": '-',
        "Remark": '-',
        "Enable": "disabled"
    },
    {
        "sid": "s000005",
        "sname": "Rishabh Jain",
        "MST1": 19,
        "MST2": 17,
        "HalfYear": 100,
        "MST3": 20,
        "MST4": 19,
        "Annual": "",
        "Percent": '-',
        "Grade": '-',
        "Remark": '-',
        "Enable": "disabled"
    }
];

function UpdateMarks() {
    const location = useLocation();
    const [studentData, setStudentData] = useState(data2);

    const data = { ...location.state.data };
    const class_name = data.class_name;
    const sub_name = data.sub_name;
    // const class_id = data.class_id;
    // const sub_id = data.sub_id;

        
    const onChangeInput = (name, value, k) => {
        const updatedData = [...studentData];
        updatedData[k][name] = value;
        setStudentData(updatedData);
    }

    const handleClick = (key) => {
        const updatedData = [...studentData];
        updatedData[key].Enable = "";
        setStudentData(updatedData);
    }

    const handleSubmit = () => {
        const updatedData = [...studentData];
        for(let i = 0; i < updatedData.length; i++){
            updatedData[i].Enable = "disabled";
        }

        setStudentData(updatedData);
        alert("Submitted Successfully!!!");
    }

    let flag = false;
    function calculateFinal() {
        var updatedData = [...studentData];

        const checkRemark = (mark) => {
            if(mark)
                if(mark >= 33)  return 'Pass';
                else            return 'Fail';
            else                return '-';
        };

        const checkGrade = (val) => {
            const annual = parseFloat(val.Annual?val.Annual:0);
            const halfYearly = parseFloat(val.HalfYear?val.HalfYear:0);
            const mst1 = parseFloat(val.MST1?val.MST1:0);
            const mst2 = parseFloat(val.MST2?val.MST2:0);
            const mst3 = parseFloat(val.MST3?val.MST3:0);
            const mst4 = parseFloat(val.MST4?val.MST4:0);

            let mark = (annual + halfYearly) + (mst1 + mst2 + mst3 + mst4);
            mark = mark * 100 / 280;
            mark = parseFloat(mark.toFixed(2));

            var grade = '';

            switch (true) {
                case (mark < 33):   grade = 'F';    break;
                case (mark < 45):   grade = 'E';    break;
                case (mark < 60):   grade = 'D';    break;
                case (mark < 75):   grade = 'C';    break;
                case (mark < 90):   grade = 'B';    break;
                case (mark <= 100): grade = 'A';    break;
                default:            grade = '-';    break;
            }

            return [mark, grade];
        }
        
        updatedData = updatedData.map((val, key) => {
            const [mark, grade] = checkGrade(val);
            const remark = checkRemark(mark);

            if (flag){
                val.Grade = '-';
                val.Percent = '-';
                val.Remark = '-';
            } else {
                val.Percent = mark;
                val.Grade = grade;
                val.Remark = remark;
            }

            return val;
        });

        if(flag){
            alert("Exams Remaining!");
        }

        setStudentData(updatedData);
    }

    return (
        <div id="ViewMarks">
            <div id="sidePanel">
                <ProSidebarProvider>
                    <TeacherSidePanel />
                </ProSidebarProvider>
            </div>

            <div className="classMarks" id="classMarks">
                <h1 className="classHeading">{class_name} {sub_name}</h1>
                <div className="markList">
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Sid</th>
                                <th>SName</th>
                                <th>MST1</th>
                                <th>MST2</th>
                                <th>Half-Yearly</th>
                                <th>MST3</th>
                                <th>MST4</th>
                                <th>Annual</th>
                                <th>Grade</th>
                                <th>Percent</th>
                                <th>Remark</th>
                                <th id="action">Edit Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((val, key) => (
                                <tr key={val.sid}>
                                    <td>{key + 1}.</td>
                                    <td>{val.sid}</td>
                                    <td>{val.sname}</td>
                                    <td>
                                        <input
                                            name="MST1"
                                            value={val.MST1}
                                            type="text"
                                            onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
                                            placeholder="MST1"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="MST2"
                                            value={val.MST2}
                                            type="text"
                                            onChange={(e) => onChangeInput(e.target.name, e.target.value, key) }
                                            placeholder="MST2"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="HalfYear"
                                            value={val.HalfYear}
                                            type="text"
                                            onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
                                            placeholder="Half-Yearly"
                                            disabled={val.Enable}
                                        />

                                    </td>
                                    <td>
                                        <input
                                            name="MST3"
                                            value={val.MST3}
                                            type="text"
                                            onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
                                            placeholder="MST3"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="MST4"
                                            value={val.MST4}
                                            type="text"
                                            onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
                                            placeholder="MST4"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    
                                    <td>
                                        <input
                                            name="Annual"
                                            value={val.Annual}
                                            type="text"
                                            onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
                                            placeholder="Annual"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td>{val.Grade}</td>
                                    <td>{val.Percent}</td>
                                    <td>{val.Remark}</td>
                                    <td>
                                        <button className="editDetils" onClick={()=>handleClick(key)}>Edit</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={calculateFinal}>Calculate Grades</button>
                </div>
                
            </div>
        </div>
    )
}




export default UpdateMarks;

// <input
//     name="MST1"
//     value={val.MST1}
//     type="text"
//     onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
//     placeholder="MST1 marks"
// />