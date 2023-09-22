import React from "react";
import { StudentSidePanel } from '../SidePanel/SidePanel';
import { ProSidebarProvider } from "react-pro-sidebar";
import './viewMarks.css';
// , { useEffect, useState }
function ViewMarks() {
    // const [final, setFinal] = useState(false);

    // useEffect(() => {
    //     if(final){
    //         calculateFinal();
    //     } else {
    //         setFinal(false);
    //     }
    // }, [calculateFinal, final]);

    function checkRemark(mark) {
        return (mark >= 33) ? 'Pass' : 'Fail';
    }

    function checkGrade(val) {
        let mark = (val.Annual + val.HalfYear) + (val.MST1 + val.MST2 + val.MST3 + val.MST4);
        mark = mark * 100 / 280;
        mark = parseFloat(mark.toFixed(2));

        var grade = '';

        switch (true) {
            case (mark < 33):
                grade = 'F';
                break;
            case (mark < 45):
                grade = 'E';
                break;
            case (mark < 60):
                grade = 'D';
                break;
            case (mark < 75):
                grade = 'C';
                break;
            case (mark < 90):
                grade = 'B';
                break;
            case (mark <= 100):
                grade = 'A';
                break;
            default:
                grade = 'C';
                break;
        }

        return [mark, grade];
    }


    var data = [
        {
            Subject: "Science",
            MST1: 19,
            MST2: 19,
            HalfYear: 50,
            MST3: 19,
            MST4: 19,
            Annual: 70,
            Grade: '',
            Percent: 0,
            Remark: ''
        },
        {
            Subject: "Maths",
            MST1: 19,
            MST2: 19,
            HalfYear: 50,
            MST3: 19,
            MST4: 19,
            Annual: 78,
            Remark: ''
        },
        {
            Subject: "Social",
            MST1: 1,
            MST2: 9,
            HalfYear: 34,
            MST3: 4,
            MST4: 6,
            Annual: 20,
            Remark: ''
        },
        {
            Subject: "Hindi",
            MST1: 19,
            MST2: 19,
            HalfYear: 50,
            MST3: 19,
            MST4: 19,
            Annual: 69,
            Remark: ''
        },
        {
            Subject: "English",
            MST1: 19,
            MST2: 17,
            HalfYear: 100,
            MST3: 20,
            MST4: 19,
            Annual: 100,
            Remark: ''
        }
    ]

    let percent = 0;
    let status = 'Pass';

    function calculateFinal() {
        let count = 0;
        data = data.map((val, key) => {
            val.Remark = checkRemark(val.Annual);
            count += (val.Remark === 'Fail') ? 1 : 0;
            [val.Percent, val.Grade] = checkGrade(val);
            return val;
        })

        if (count > 1)
            status = 'Fail';

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            percent += element.Percent;
        }

        percent = parseFloat((percent / 5).toFixed(2));
    }

    calculateFinal();

    return (
        <div id="ViewMarks">
            <div id="sidePanel">
                <ProSidebarProvider>
                    <StudentSidePanel />
                </ProSidebarProvider>
            </div>
            <div className="studentMarks" id="markSheet">
                <table>
                    <tr>
                        <th>Subject</th>
                        <th>MST1</th>
                        <th>MST2</th>
                        <th>Half Yearly</th>
                        <th>MST3</th>
                        <th>MST4</th>
                        <th>Annual</th>
                        <th>Percent(%)</th>
                        <th>Grade</th>
                        <th>Remark</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className="subjects">{val.Subject}</td>
                                <td>{val.MST1}</td>
                                <td>{val.MST2}</td>
                                <td>{val.HalfYear}</td>
                                <td>{val.MST3}</td>
                                <td>{val.MST4}</td>
                                <td>{val.Annual}</td>
                                <td>{val.Percent}</td>
                                <td>{val.Grade}</td>
                                <td>{val.Remark}</td>
                            </tr>
                        )
                    })}
                </table>
                <div>
                    Percent : {percent}%
                </div>
                <div className="Status">Status : {status}
                    <div>
                        {
                            (status === 'Fail') ?
                                'Better Luck next time' :
                                'Well done!!!'
                        }
                    </div>
                </div>
                <div>
                    <h6 style={{ color: 'red' }}>*Note: Grade is based on the average of all Exams.</h6><br />
                </div>

                <div>
                    <button onClick={window.print} >Print</button>
                </div>
            </div>
        </div>
    )
}

export default ViewMarks;