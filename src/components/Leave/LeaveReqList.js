/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import "./LeaveReqList.css";

function LeaveReqList() {
  const navigate = useNavigate();

  // data from previous page
  const location = useLocation();
  const data = { ...location.state.data };
  const class_name = data.class_name;
  const class_id = data.class_teacher_flag;

  // JWT token
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.username;
  const userType = decodedToken.userType;

  // console.log(data, user_id, userType)
  var [leaveData, setLeaveData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:4000/teacher/getLeaveReqs", { class_id })
      .then((res) => {
        if (res.data.Status === "Success") {
          var t = res.data.data;
          // t = t.map((val, key) => {
          // return ({ ...val, accepted: false });
          // });
          // console.log(t, "hello");
          setLeaveData(t);
        } else {
          console.log(res.data.Error);
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function LeaveRow(props) {
    const val = props.props.val;
    const key = props.props.key;

    const [accept, setAccept] = useState(val.accepted);
    // console.log(accept, "leave");
    // console.log(val, "row");

    const handleAcceptance = (e) => {
      const values = {
        id: val.id,
        accepted: accept ? 0 : 1,
      };

      // console.log(values);

      axios
        .post("http://localhost:4000/teacher/leaveAccept", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            alert(
              "Leave " +
                (values.accepted ? "Accepted" : "Denied") +
                " of " +
                val.student_id
            );
          } else {
            alert("Failed to update status!");
            setError(res.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };

    return (
      <tr>
        <td className="leave-req-td">{key + 1}.</td>
        <td className="leave-req-td">{val.student_id}</td>
        <td className="leave-req-td">{val.first_name + " " + val.last_name}</td>
        <td className="leave-req-td">{val.class_id}</td>
        <td className="leave-req-td">{val.date_asked}</td>
        <td className="leave-req-td">{val.date_from}</td>
        <td className="leave-req-td">{val.date_to}</td>
        <td className="leave-req-td">{val.subject}</td>
        <td className="leave-req-td leave-reason">
          {val.reason.length > 10 ? "View Reason..." : ""}
          {val.reason.length > 10 ? (
            <div className="leave-reason-expanded">
              Reason :
              <br />
              {val.reason}
            </div>
          ) : (
            val.reason
          )}
        </td>

        <td className="leave-req-td">
          <button
            className="leave-action-btn"
            onClick={(e) => {
              leaveData[key].accepted = accept ? 0 : 1;
              setAccept(accept ? 0 : 1);
              handleAcceptance(e);
            }}
          >
            {accept ? (
              <i className="fa-sharp fa-regular fa-circle-check leave-accept"></i>
            ) : (
              <i className="fa-sharp fa-regular fa-circle-xmark leave-denied"></i>
            )}
          </button>
        </td>

        <td className="leave-req-td">{accept ? "Accepted" : "Not Accepted"}</td>
      </tr>
    );
  }

  return (
    <div className="leave-reqs">
      <div className="leave-req-heading">
        <h1>Leave Requests</h1>
      </div>

      <MDBTable className="leave-req-table">
        <MDBTableHead>
          <tr className="leave-req-col-head">
            <th className="leave-req-th">
              <span className="border-limit"></span>
              S. No.
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              Student Id
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              Student Name
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              Class
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              Date Asked
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              From
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              To
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              Subject
            </th>
            <th className="leave-req-th leave-reason">
              <span className="border-limit"></span>
              Reason
            </th>
            <th className="leave-req-th">
              <span className="border-limit"></span>
              Accept
            </th>
            <th className="leave-req-th">
              <span className="border-limit" style={{ border: "none" }}></span>
              Status
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {leaveData.map((val, key) => {
            // console.log(key);
            const props = { val: val, key: key };
            return <LeaveRow props={props} key={key} />;
          })}
        </MDBTableBody>
      </MDBTable>

      <div>
        <button
          className="button-89"
          onClick={(e) => navigate(`/teacher/dashboard`)}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export { LeaveReqList };
