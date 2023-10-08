/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React from "react";

import "./AnnCard.css";

function AnnCard(props) {
  // JWT token
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.username;
  var userType = decodedToken.userType;

  // announcements
  const announcement = props.data;
  const key = props.id;
  const key2 = props.id2;

  // const annCard = document.getElementById(key);
  // const annPopUp = document.getElementById(key2);
  const MyComp = () => {
    if (announcement.subject_name && announcement.class_id)
      return (
        <div>
          <hr style={{ color: "black", borderTop: "2px solid" }} />
          <div className="ann-card-teacher-data">
            Class : {announcement.class_id}
          </div>
          <div className="ann-card-teacher-data">
            Subject : {announcement.subject_name}
          </div>
          <hr style={{ color: "black", borderTop: "2px solid" }} />
        </div>
      );

    return <></>;
  };
  return (
    <div className="ann-card-container">
      <div id={key} className="ann-card">
        <h3 className="ann-card-title">{announcement.title}</h3>
        <span className="ann-card-date">Date - {announcement.date} </span>
        <br />
        <span className="ann-card-by">
          By - {announcement.first_name} {announcement.last_name}
        </span>
        <span className="ann-card-id">{announcement.user_id}</span> <br />
        <MyComp />
        <button
          className="popup-announcement-button button-17"
          onClick={(e) => {
            document.getElementById(key2).classList.add("show");
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
}

export default AnnCard;
