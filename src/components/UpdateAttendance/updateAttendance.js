import React, { useEffect, useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./updateAttendance.css";
import { useLocation } from "react-router-dom";
// , { useEffect, useState }

const data2 = [
  {
    sid: "s00001",
    sname: "Aditya Bajpai",
    Percent: "68",
  },
  {
    sid: "s00002",
    sname: "Aditya Goyal",
    Percent: "68",
  },
  {
    sid: "s00003",
    sname: "Adeesh Jain",
    Percent: "68",
  },
  {
    sid: "s00004",
    sname: "Aditi Solanki",
    Percent: "68",
  },
  {
    sid: "s00005",
    sname: "Rishabh Jain",
    Percent: "68",
  },
];

const data3 = [
  {
    sid: "s00001",
    date: "2023-09-20",
    flag: "0",
  },
  {
    sid: "s00002",
    date: "2023-09-20",
    flag: "1",
  },
  {
    sid: "s00003",
    date: "2023-09-20",
    flag: "1",
  },
  {
    sid: "s00004",
    date: "2023-09-20",
    flag: "0",
  },
  {
    sid: "s00005",
    date: "2023-09-20",
    flag: "0",
  },
  {
    sid: "s00001",
    date: "2023-09-21",
    flag: "0",
  },
  {
    sid: "s00001",
    date: "2023-09-22",
    flag: "1",
  },
  {
    sid: "s00002",
    date: "2023-09-21",
    flag: "1",
  },
  {
    sid: "s00002",
    date: "2023-09-22",
    flag: "0",
  },
  {
    sid: "s00003",
    date: "2023-09-21",
    flag: "0",
  },
  {
    sid: "s00003",
    date: "2023-09-22",
    flag: "0",
  },
  {
    sid: "s00004",
    date: "2023-09-21",
    flag: "0",
  },
  {
    sid: "s00004",
    date: "2023-09-22",
    flag: "0",
  },
  {
    sid: "s00005",
    date: "2023-09-21",
    flag: "0",
  },
  {
    sid: "s00005",
    date: "2023-09-22",
    flag: "0",
  },
];

function UpdateAttendance() {
  const location = useLocation();
  const data = { ...location.state.data };
  const class_name = data.class_name;
  // const class_id = data.class_id;
  // const tot_no_stu = data.tot_no_stu;
  const today = new Date();
  const [activeItemsCount, setActiveItemsCount] = useState(0);
  const [attendanceData, setAttendanceData] = useState(data3);
  const [buttonText, setButtonText] = useState("Edit");
  const [globalEnable, setGlobalEnable] = useState(false);

  const getDateRange = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      var obj = {
        date: new Date(dt),
        totPresent: "0",
      };

      arr.push(obj);
    }

    return arr;
  };

  const [dateArray, setDateArray] = useState(
    getDateRange(
      new Date().setDate(today.getDate() - 3),
      new Date().setDate(today.getDate() + 1)
    )
  );

  if (dateArray === undefined)
    getDateRange(
      new Date().setDate(today.getDate() - 3),
      new Date().setDate(today.getDate() + 1)
    );

  const handleEditButton = () => {
    if (!globalEnable) {
      setGlobalEnable(true);
      setButtonText("Submit");
    } else {
      setButtonText("Edit");
      setGlobalEnable(false);
    }
  };

  function ChecklistItem(props) {
    var [isActive, setIsActive] = useState(false);
    const key = props.key;

    const curDate = props.val.date;
    let curDay = curDate.getDate();
    let curDateMonth = curDate.getMonth() + 1;
    let curDateYear = curDate.getFullYear();
    if (curDate.getMonth() < 10) curDateMonth = "0" + curDateMonth;
    if (curDate.getDate() < 10) curDay = "0" + curDay;

    const current = curDateYear + "-" + curDateMonth + "-" + curDay;
    const sid = props.sid;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updatedDateArray = [...dateArray];
    const updatedArray = [...attendanceData];

    useEffect(() => {
      updatedArray.find((o, i) => {
        if (o.sid === sid && o.date === current) {
          if (o.flag === "0") setIsActive(true);
          else setIsActive(false);
          return true;
        }
        return false;
      });
    });

    var enable = "disabled";
    if (globalEnable) {
      enable = "";
    } else if (
      curDate.getDate() === today.getDate() &&
      curDate.getMonth() === today.getMonth()
    ) {
      enable = "";
    }

    const handleChange = (active) => {
      console.log(sid);

      let obj = updatedArray.find((o, i) => {
        if (o.sid === sid && o.date === current && globalEnable) {
          let t = updatedArray[i].flag;
          updatedArray[i].flag = t === "0" ? "1" : "0";

          // console.log(active);
          setIsActive(active);
          // console.log(updatedArray);
          return true;
        }
        return false;
      });

      if (obj === undefined) {
        console.log("hello");
        let obj = {
          sid: sid,
          date: current,
          flag: active ? "0" : "1",
        };

        console.log(obj);
        updatedArray.push(obj);
        setAttendanceData(updatedArray);
        setIsActive(active);
        console.log(attendanceData);
      }
    };

    return (
      <input
        type="checkbox"
        checked={isActive}
        onChange={(e) => handleChange(e.target.checked)}
        disabled={enable}
      />
    );
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
          <table className="attendanceTable">
            <thead>
              <tr>
                <th className="attendanceTH">S. No.</th>
                <th className="attendanceTH">Sid</th>
                <th className="attendanceTH">SName</th>
                {dateArray.map((val, key) => {
                  const date = val.date;
                  var mon = "";
                  switch (date.getMonth()) {
                    case 0:
                      mon = "Jan";
                      break;
                    case 1:
                      mon = "Feb";
                      break;
                    case 2:
                      mon = "Mar";
                      break;
                    case 3:
                      mon = "Apr";
                      break;
                    case 4:
                      mon = "May";
                      break;
                    case 5:
                      mon = "Jun";
                      break;
                    case 6:
                      mon = "Jul";
                      break;
                    case 7:
                      mon = "Aug";
                      break;
                    case 8:
                      mon = "Sep";
                      break;
                    case 9:
                      mon = "Oct";
                      break;
                    case 10:
                      mon = "Nov";
                      break;
                    case 11:
                      mon = "Dec";
                      break;
                    default:
                      break;
                  }
                  return (
                    <th className="attendanceTH">
                      {date.getDate() + " " + mon}
                    </th>
                  );
                })}
                <th className="attendanceTH">Percent</th>
              </tr>
            </thead>
            <tbody>
              {data2.map((val, key) => {
                const sid = val.sid;
                return (
                  <tr key={sid}>
                    <td className="attendanceTD">{key + 1}.</td>
                    <td className="attendanceTD">{sid}</td>
                    <td className="attendanceTD">{val.sname}</td>
                    {dateArray.map((val, key) => {
                      return (
                        <td className="attendanceTD">
                          <ChecklistItem val={val} key={key} sid={sid} />
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

          <button id="attendanceButton" onClick={handleEditButton}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateAttendance;
