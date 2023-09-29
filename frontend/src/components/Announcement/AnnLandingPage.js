import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react"
import CreateAnnouncement from "./CreateAnn";
import { useNavigate } from "react-router-dom";

function AnnLandingPage() {
    const [canCreate, setCreate] = useState(false);
    const navigate = useNavigate();

    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;
    var userType = decodedToken.userType;
    

    useEffect(() => {
        if(user_id[0] === 'a' || user_id[0] === 't')  setCreate(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div>
            {canCreate && <CreateAnnouncement/>}
            <h1>Hello World!!</h1>
            <button onClick={() => {
                navigate(`/${userType}/dashboard`);
            }}>Go to dashboard</button>
        </div>
    );
}


export default AnnLandingPage;