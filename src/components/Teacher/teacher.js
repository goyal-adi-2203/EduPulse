import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminSidePanel, TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";

function Teacher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getTeacher")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {};

  return (
    <div id="manageTeacher" style={{ display: "flex" }}>
      <div id="sidePanel">
        <ProSidebarProvider>
          <AdminSidePanel />
        </ProSidebarProvider>
      </div>

      <div className="px-5 py-3">
        <div className="d-flex justify-content-center mt-2">
          <div>
            <h3>Teacher List</h3>
          </div>
          <Link to="/admin/register" className="btn btn-success">
            Add Teacher
          </Link>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((teacher, index) => {
                  return (
                    <tr key={index}>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.address}</td>
                      <td>
                        <Link
                          to={"/admin/editTeacher"}
                          className="btn btn-primary btn-sm me-2"
                        >
                          edit
                        </Link>
                        <button
                          onClick={(e) => handleDelete()}
                          className="btn btn-sm btn-danger"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
