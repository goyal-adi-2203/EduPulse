import React, { useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
import "./updateMarks.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
const data2 = [
  {
    sid: "s00001",
    sname: "Aditya Bajpai",
    MST1: "19",
    MST2: "17",
    HalfYear: "100",
    MST3: "20",
    MST4: "19",
    Annual: "",
    Percent: "-",
    Grade: "-",
    Remark: "-",
    Enable: "disabled",
  },
  {
    sid: "s00002",
    sname: "Aditya Goyal",
    MST1: "19",
    MST2: "17",
    HalfYear: "100",
    MST3: "20",
    MST4: "19",
    Annual: "",
    Percent: "-",
    Grade: "",
    Remark: "",
    Enable: "disabled",
  },
  {
    sid: "s00003",
    sname: "Adeesh Jain",
    MST1: 19,
    MST2: 17,
    HalfYear: 100,
    MST3: 20,
    MST4: 19,
    Annual: "",
    Percent: "-",
    Grade: "-",
    Remark: "-",
    Enable: "disabled",
  },
  {
    sid: "s00004",
    sname: "Aditi Solanki",
    MST1: 19,
    MST2: 17,
    HalfYear: 100,
    MST3: 20,
    MST4: 19,
    Annual: "",
    Percent: "-",
    Grade: "-",
    Remark: "-",
    Enable: "disabled",
  },
  {
    sid: "s00005",
    sname: "Rishabh Jain",
    MST1: 19,
    MST2: 17,
    HalfYear: 100,
    MST3: 20,
    MST4: 19,
    Annual: "",
    Percent: "-",
    Grade: "-",
    Remark: "-",
    Enable: "disabled",
  },
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
  };

  const handleClick = (key) => {
    const updatedData = [...studentData];
    updatedData[key].Enable = "";
    setStudentData(updatedData);
  };

  const handleSubmit = () => {
    const updatedData = [...studentData];
    for (let i = 0; i < updatedData.length; i++) {
      updatedData[i].Enable = "disabled";
    }

    setStudentData(updatedData);
    alert("Submitted Successfully!!!");
  };

  let flag = false;
  function calculateFinal() {
    var updatedData = [...studentData];

    const checkRemark = (mark) => {
      if (mark)
        if (mark >= 33) return "Pass";
        else return "Fail";
      else return "-";
    };

    const checkGrade = (val) => {
      const annual = parseFloat(val.Annual ? val.Annual : 0);
      const halfYearly = parseFloat(val.HalfYear ? val.HalfYear : 0);
      const mst1 = parseFloat(val.MST1 ? val.MST1 : 0);
      const mst2 = parseFloat(val.MST2 ? val.MST2 : 0);
      const mst3 = parseFloat(val.MST3 ? val.MST3 : 0);
      const mst4 = parseFloat(val.MST4 ? val.MST4 : 0);

      let mark = annual + halfYearly + (mst1 + mst2 + mst3 + mst4);
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
          grade = "-";
          break;
      }

      return [mark, grade];
    };

    updatedData = updatedData.map((val, key) => {
      const [mark, grade] = checkGrade(val);
      const remark = checkRemark(mark);

      if (flag) {
        val.Grade = "-";
        val.Percent = "-";
        val.Remark = "-";
      } else {
        val.Percent = mark;
        val.Grade = grade;
        val.Remark = remark;
      }

      return val;
    });

    if (flag) {
      alert("Exams Remaining!");
    }

    setStudentData(updatedData);
    console.log(updatedData);
  }

  return (
    <div id="ViewMarks">
      <div id="sidePanel">
        <ProSidebarProvider>
          <TeacherSidePanel />
        </ProSidebarProvider>
      </div>

      <div className="classMarks" id="classMarks">
        <h1 className="classHeading">
          {class_name} {sub_name}
        </h1>
        <div className="markList">
          <MDBTable className="table-marks-update">
            <MDBTableHead className="student-list-update-heading" dark={true}>
              <tr>
                <td colSpan={13}>Student's List</td>
              </tr>
            </MDBTableHead>
            <MDBTableHead>
              <tr>
                <th className="updateMarks-th">S. No.</th>
                <th className="updateMarks-th">Sid</th>
                <th className="updateMarks-th">Name</th>
                <th className="updateMarks-th">MST1</th>
                <th className="updateMarks-th">MST2</th>
                <th className="updateMarks-th">Half-Yearly</th>
                <th className="updateMarks-th">MST3</th>
                <th className="updateMarks-th">MST4</th>
                <th className="updateMarks-th">Annual</th>
                <th className="updateMarks-th">Grade</th>
                <th className="updateMarks-th">Percent</th>
                <th className="updateMarks-th">Remark</th>
                <th className="updateMarks-th" id="action">
                  Edit Details
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {studentData.map((val, key) => (
                <tr key={val.sid}>
                  <td className="update-marks-td">{key + 1}.</td>
                  <td className="update-marks-td">{val.sid}</td>
                  <td className="update-marks-td">{val.sname}</td>
                  <td className="update-marks-td">
                    <input
                      name="MST1"
                      value={val.MST1}
                      className="td-input-update-marks"
                      type="text"
                      onChange={(e) =>
                        onChangeInput(e.target.name, e.target.value, key)
                      }
                      placeholder="MST1"
                      disabled={val.Enable}
                    />
                  </td>
                  <td className="update-marks-td ">
                    <input
                      name="MST2"
                      className="td-input-update-marks"
                      value={val.MST2}
                      type="text"
                      onChange={(e) =>
                        onChangeInput(e.target.name, e.target.value, key)
                      }
                      placeholder="MST2"
                      disabled={val.Enable}
                    />
                  </td>
                  <td className="update-marks-td">
                    <input
                      name="HalfYear"
                      className="td-input-update-marks"
                      value={val.HalfYear}
                      type="text"
                      onChange={(e) =>
                        onChangeInput(e.target.name, e.target.value, key)
                      }
                      placeholder="Half-Yearly"
                      disabled={val.Enable}
                    />
                  </td>
                  <td className="update-marks-td">
                    <input
                      name="MST3"
                      className="td-input-update-marks"
                      value={val.MST3}
                      type="text"
                      onChange={(e) =>
                        onChangeInput(e.target.name, e.target.value, key)
                      }
                      placeholder="MST3"
                      disabled={val.Enable}
                    />
                  </td>
                  <td className="update-marks-td">
                    <input
                      name="MST4"
                      className="td-input-update-marks"
                      value={val.MST4}
                      type="text"
                      onChange={(e) =>
                        onChangeInput(e.target.name, e.target.value, key)
                      }
                      placeholder="MST4"
                      disabled={val.Enable}
                    />
                  </td>

                  <td className="update-marks-td">
                    <input
                      name="Annual"
                      className="td-input-update-marks"
                      value={val.Annual}
                      type="text"
                      onChange={(e) =>
                        onChangeInput(e.target.name, e.target.value, key)
                      }
                      placeholder="Annual"
                      disabled={val.Enable}
                    />
                  </td>
                  <td className="update-marks-td">{val.Grade}</td>
                  <td className="update-marks-td">{val.Percent}</td>
                  <td className="update-marks-td">{val.Remark}</td>
                  <td className="update-marks-td">
                    <button
                      className="button-18"
                      role="button"
                      onClick={() => handleClick(key)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
          <div
            style={{ padding: "1%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ marginRight: "30%" }}>
              <button
                onClick={handleSubmit}
                className="button-89"
                role="button"
              >
                Submit
              </button>
            </div>
            <div style={{ marginLeft: "20%" }}>
              <button className="button-89" onClick={calculateFinal}>
                Calculate Grades
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMarks;

// <input
//     name="MST1"
//     value={val.MST1}
//     type="text"
//     onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
//     placeholder="MST1 marks"
// />

/* CSS */