import React from "react";
import { SidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";


function Dashboard(props){
    return (
        <div id="dashboard">
            <ProSidebarProvider>
                <SidePanel Person={props.Person}/>
            </ProSidebarProvider>
        </div>
    );
}


export default Dashboard;