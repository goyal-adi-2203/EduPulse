/* eslint-disable no-unused-vars */
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';
import Profile from '../Profile/Profile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


function SidePanel(props) {
    const user = props.Person;
    console.log("User:" + user);

    let userSidePanel;
    if (user === "Admin") {
        console.log("admin");
        userSidePanel = <AdminSidePanel />;
    } else if (user === "Student") {
        console.log("student");
        userSidePanel = <StudentSidePanel />;
    } else if (user === "Teacher") {
        console.log("teacher");
        userSidePanel = <TeacherSidePanel />;
    }


    return (
        <div style={({ height: "100vh" }, { display: "flex" })}>
            {userSidePanel}
            <Profile Person={user} />

        </div>
    );
}


function StudentSidePanel() {
    const navigate = useNavigate();
    const { collapseSidebar } = useProSidebar();
    const [open, setOpen] = useState(true);

    function handleClick() {
        setOpen(!open)
    }

    const handleLogout = (e) => {
        navigate('/login');
    }

    return (
        <div id="StudentSidePanel" style={
            (
                { height: "100vh" },
                { display: "flex" },
                { background: "#DF8A71" }
            )
        }>
            <Sidebar style={({ height: "100vh" })}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Student</h2>
                    </MenuItem>

                    <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />}>Announcement</MenuItem>
                    <MenuItem icon={<CalendarTodayOutlinedIcon />}>Attendance</MenuItem>
                    <hr id="hr" />
                    <MenuItem icon={<FormatListBulletedIcon/>}
                        onClick={function(){
                            navigate('/student/marks');
                        }}
                    >Marks</MenuItem>
                    <MenuItem 
                    icon={<ExitToAppIcon />}
                    onClick={handleLogout}
                    >Logout</MenuItem>
                   
                </Menu>
            </Sidebar>
        </div>
    );
}

function TeacherSidePanel() {
    const navigate = useNavigate();
    const { collapseSidebar } = useProSidebar();
    const handleLogout = (e) => {
        navigate('/login');
    }
    return (
        <div id="TeacherSidePanel" style={({ height: "100vh" }, { display: "flex" }, { background: "#DF8A71" })}>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Teacher</h2>
                    </MenuItem>

                    <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />}>Announcement</MenuItem>
                    <MenuItem icon={<CalendarTodayOutlinedIcon />}>Class V Attendance</MenuItem>
                    <MenuItem icon={<AutoStoriesIcon />}>Class IV English</MenuItem>
                    <MenuItem icon={<AutoStoriesIcon />}>Class V English</MenuItem>
                    <MenuItem icon={<AutoStoriesIcon />}>Class VI English</MenuItem>
                    <MenuItem 
                    icon={<ExitToAppIcon />}
                    onClick={handleLogout}
                    >Logout</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

function AdminSidePanel() {
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const handleCreateProfile = (e) => {
        navigate('/admin/register');
    }
    const handleLogout = (e) => {
        navigate('/login');
    }


    return (
        <div id="AdminSidePanel" style={({ height: "100vh" }, { display: "flex" }, { background: "#DF8A71" })}>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>

                    <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />}>Announcement</MenuItem>
                    <MenuItem icon={<AddIcon />} onClick={handleCreateProfile}>Create Profile</MenuItem>
                    <MenuItem icon={<BorderColorIcon />}>Edit Profile</MenuItem>
                    <MenuItem 
                    icon={<ExitToAppIcon />}
                    onClick={handleLogout}
                    >Logout</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

export {SidePanel, StudentSidePanel, TeacherSidePanel, AdminSidePanel};