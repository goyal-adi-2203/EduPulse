/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { addDays } from 'date-fns';
import { DateRange, DateRangePicker } from 'react-date-range';
import './ApplyLeave.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


function LeaveDialogBox() {
    return (
        <div className="leave-dialog-box">
            <button onClick={(e)=>{
                document.getElementById("leave-popup").classList.add("show");
            }} className="apply-leave-btn">Apply For Leave</button>
        </div>
    );
}   

function LeavePopUp(){

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    return (
        <div className="leave-pop-up" id="leave-popup">
            <div className="leave-popup-content">

                <DateRange
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                />

                <button onClick={(e) => {
                    document.getElementById("leave-popup").classList.remove("show");
                }} className="box-close">x</button>

                <div>
                    <button onClick={(e) => {
                        document.getElementById("leave-popup").classList.remove("show");
                    }} className="close-pop-up">Close Pop Up</button>
                </div>
            </div>
        </div>
    );
}

export {LeaveDialogBox, LeavePopUp};