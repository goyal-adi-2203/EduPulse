import React from "react";
import { StudentSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./viewMarks.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
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
    return mark >= 33 ? "Pass" : "Fail";
  }

  function checkGrade(val) {
    let mark =
      val.Annual + val.HalfYear + (val.MST1 + val.MST2 + val.MST3 + val.MST4);
    mark = (mark * 100) / 280;
    mark = parseFloat(mark.toFixed(2));

    var grade = "";

    switch (true) {
      case mark < 33:
        grade = "F";
        break;
      case mark < 45:
        grade = "E";
        break;
      case mark < 60:
        grade = "D";
        break;
      case mark < 75:
        grade = "C";
        break;
      case mark < 90:
        grade = "B";
        break;
      case mark <= 100:
        grade = "A";
        break;
      default:
        grade = "C";
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
      Grade: "",
      Percent: 0,
      Remark: "",
    },
    {
      Subject: "Maths",
      MST1: 19,
      MST2: 19,
      HalfYear: 50,
      MST3: 19,
      MST4: 19,
      Annual: 78,
      Grade: "",
      Percent: 0,
      Remark: "",
    },
    {
      Subject: "Social",
      MST1: 1,
      MST2: 9,
      HalfYear: 34,
      MST3: 4,
      MST4: 6,
      Annual: 20,
      Grade: "",
      Percent: 0,
      Remark: "",
    },
    {
      Subject: "Hindi",
      MST1: 19,
      MST2: 19,
      HalfYear: 50,
      MST3: 19,
      MST4: 19,
      Annual: 69,
      Grade: "",
      Percent: 0,
      Remark: "",
    },
    {
      Subject: "English",
      MST1: 19,
      MST2: 17,
      HalfYear: 100,
      MST3: 20,
      MST4: 19,
      Annual: 100,
      Grade: "",
      Percent: 0,
      Remark: "",
    },
  ];

  let percent = 0;
  let status = "Pass";

  function calculateFinal() {
    let count = 0;
    data = data.map((val, key) => {
      val.Remark = checkRemark(val.Annual);
      count += val.Remark === "Fail" ? 1 : 0;
      [val.Percent, val.Grade] = checkGrade(val);
      return val;
    });

    if (count > 1) status = "Fail";

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      percent += element.Percent;
    }

    percent = parseFloat((percent / 5).toFixed(2));
  }
  const HandlePrint = () => {
    window.print();
  };

  calculateFinal();

  return (
    <div id="ViewMarks">
      <div id="sidePanel">
        <ProSidebarProvider>
          <StudentSidePanel />
        </ProSidebarProvider>
      </div>
      <div className="studentMarks" id="markSheet">
        <div className="marks-heading">Marks</div>
        <MDBTable className="table-marks">
          <MDBTableHead>
            <tr>
              <th className="viewMarks-th">Subject</th>
              <th className="viewMarks-th">MST1</th>
              <th className="viewMarks-th">MST2</th>
              <th className="viewMarks-th">Half Yearly</th>
              <th className="viewMarks-th">MST3</th>
              <th className="viewMarks-th">MST4</th>
              <th className="viewMarks-th">Annual</th>
              <th className="viewMarks-th">Percent(%)</th>
              <th className="viewMarks-th">Grade</th>
              <th className="viewMarks-th">Remark</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <th className="subjects viewMarks-th">{val.Subject}</th>
                  <td className="viewMarks-td">{val.MST1}</td>
                  <td className="viewMarks-td">{val.MST2}</td>
                  <td className="viewMarks-td">{val.HalfYear}</td>
                  <td className="viewMarks-td">{val.MST3}</td>
                  <td className="viewMarks-td">{val.MST4}</td>
                  <td className="viewMarks-td">{val.Annual}</td>
                  <td className="viewMarks-td">{val.Percent}</td>
                  <td className="viewMarks-td">{val.Grade}</td>
                  <td className="remark viewMarks-td">{val.Remark}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <div className="percent-marks">Percent : {percent}%</div>
        <div className="Status status-marks">
          Status : {status}
          <div cl>
            {status === "Fail" ? "Better Luck next time" : "Well done!!!"}
          </div>
        </div>
        <div>
          <h6 style={{ color: "red" }}>
            *Note: Grade is based on the average of all Exams.
          </h6>
          <br />
        </div>

        <div>
          <button onClick={HandlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
}

export default ViewMarks;
