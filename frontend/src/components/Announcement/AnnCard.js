/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React from "react";

import './AnnCard.css';

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

    return (
        <div className="ann-card-container">
            <div id={key} className="ann-card">
                <h1>{announcement.title}</h1>
                Date - {announcement.date}     <br />
                By - {announcement.first_name} {announcement.last_name} {announcement.user_id}  <br />
                <div>
                    <button onClick={(e) => {
                        document.getElementById(key2).classList.add("show");
                    }}>Open Pop Up</button>

                </div>
            </div>
        </div>
    );
}

export default AnnCard;