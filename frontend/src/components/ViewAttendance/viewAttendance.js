import React, { useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { StudentSidePanel } from "../SidePanel/SidePanel";
import Calendar from 'react-calendar';
import './viewAttendance.css';

function ViewAttendance() {
    var today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    if (today.getMonth() < 10) todayMonth = '0' + todayMonth;
    if (today.getDate() < 10) todayDate = '0' + todayDate;
    var mark = ['01-09-2023', '15-09-2023', '23-09-2023'];
    const [value, onChange] = useState(new Date());
    // const element = document.getElementById()
    
    return (
        <div id="ViewAttendance">
            <div id="sidePanel">
                <ProSidebarProvider>
                    <StudentSidePanel />
                </ProSidebarProvider>
            </div>
            <div className="studentAttendance">
                <h1 className="attendanceHeading">Attendance</h1>
                <div className="calendar">
                    <Calendar
                        onChange={onChange}
                        value={value}
                        tileClassName={({ date }) => {
                            let day = date.getDate();
                            let month = date.getMonth() + 1;
                            let weekday = date.getDay();

                            if(month < 10)    month = '0'+month;
                            if(day < 10)     day = '0'+ day;
                            
                            var realDate = day + '-' + month + '-' + date.getFullYear();
                            if (mark.find(val => val === realDate)) {
                                return 'red';
                            } else if (date.getFullYear() < todayYear){
                                return 'green';
                            } else if(weekday === 0){
                                return 'white';
                            } else if(date.getFullYear() === todayYear){
                                if(month < todayMonth) return 'green';
                                else if(month === todayMonth){
                                    if(day <= todayDate){
                                        return 'green';
                                    }
                                }
                            }
                            return '';
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewAttendance;