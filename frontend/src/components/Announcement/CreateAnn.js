/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import Image from '../../assets/img.png';
import axios from "axios";
import "./createAnn.css";
import {Page, Document} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { pdfjs } from 'react-pdf';




function CreateAnnouncement() {

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const values = {
        user_id: decodedToken.username,
        userType: decodedToken.userType
    };

    // date
    var today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    // console.log(today.getMonth());
    if (today.getMonth()+1 < 10) todayMonth = "0" + todayMonth;
    if (today.getDate() < 10) todayDate = "0" + todayDate;
    const currentDate = todayYear + '-' + todayMonth + '-' + todayDate;

    // userInfo
    const [userInfo, setUserInfo] = useState(["Admin"]);
    const [error, setError] = useState("");

    // annnoucement
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [classId, setClassId] = useState("");
    const [subject, setSubject] = useState("");
    const [file, setFile] = useState();
    const [imgURL, setImgurl] = useState("");

    const [page, setPage] = useState(1);

    var extension = file ? file.name.substring((file.name.lastIndexOf('.') + 1)): "";

    useEffect(() => {
        axios
            .post("http://localhost:4000/getData", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data], 'wjdbvjhwb');
                    setUserInfo([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // alert(title+content);

    // handle Post announcement
    const handlePost = async (e) => {
        e.preventDefault();
        if(title && content){
            // alert(title + '\n' + content);
            
            let imgURL = "";
            if(file){
                const formData = new FormData();
                formData.append("file", file);

                await axios
                    .post("http://localhost:4000/api/upload", formData)
                    .then((res) => {
                        if (res.data.Status === "Success") {
                            imgURL = res.data.data;
                            // console.log(imgURL, "hemlo");
                            setImgurl(res.data.data);
                        } else {
                            console.log(res.data.Error);
                            throw Error('Upload Failed!');
                        }
                    })
                    .catch((err) => console.log(err));
            }
            
            // console.log(imgURL,"outside");
            // console.log();
            setTitle("");
            setContent("");
            setImgurl("");
            setFile(null);
            setClassId("");
            setSubject("");

            var values2 = [
                values.user_id,
                values.userType,
                userInfo[0].first_name,
                userInfo[0].last_name,
                classId || "",
                subject || "",
                currentDate,
                title,
                content,
                imgURL || ""
            ];

            // console.log(values2);
            axios
                .post("http://localhost:4000/addAnnouncement", values2)
                .then((res) => {
                    if(res.data.Status === "Success"){
                        alert("Post added");
                        window.location.reload();
                    } else {
                        console.log(res.data.Error);
                    }
                })
                .catch((err) => console.log(err));
            
        } else {
            alert('Please fill all the fields');
        }
        
    }
    // console.log(imgURL, "handlePost");
    // console.log();
    
    const MyDocument = () =>{
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

        return (
            <Document file={URL.createObjectURL(file)} className="pdf-preview">
                <Page pageNumber={page} width={200} onClick={(e) => {
                    // alert(page);
                    if (page === URL.createObjectURL(file).numPages){
                        alert("pdf completed!!");
                        return;
                    }
                    setPage(page+1);
                }} onLoadError={(error) => {
                    alert(`No pages! Redirecting to first`)
                    setPage(1);
                }}/>
            </Document>
        );
    }

    return (
        <div className="create-ann-box">
            <div className="ann-heading">
                <h3>Post Announcement</h3>
            </div>

            <hr/>
            
            <div className="top-row-create-ann">
                <div className="user-info">
                    <span className="user-type">{values.userType} </span>
                    <span className="user-name">
                        {userInfo[0].first_name} {userInfo[0].last_name}
                    </span>
                    <span className="user-id"> {values.user_id} </span>
                </div>
                <div className="today-date">{currentDate}</div>
            </div>

            <hr/>

            <div className="post-announcement">
                {(values.userType === "Teacher") && (<>
                    <div>
                        <label>Class Id : </label>
                        <input
                            type="text"
                            className="ann-class"
                            placeholder={`For Class`}
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                            required={true}
                        />
                    </div>
                    
                    <div>
                    <label>Subject : </label>
                    <input
                        type="text"
                        className="ann-subject"
                            placeholder={`For Subject`}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required={true}
                    />
                    </div>
                </>)}


                <div>
                    <label>Title : </label>
                    <input
                        type="text"
                        className="ann-title"
                        placeholder={`Set Announcement Title`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required={true}
                    />
                </div>

                <div>
                    <label>Content : </label>
                    <textarea
                        className="ann-content"
                        placeholder={`Create Announcement`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required={true}    
                    >Enter content here</textarea>
                    
                    {/* <input
                        type="text"
                        className="ann-content"
                        placeholder={`Create Announcement`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required={true}
                    /> */}
                </div>

                <div className="img-preview">
                    {file && (
                        (
                            (extension === 'pdf' || extension === 'PDF') && 
                                (<MyDocument/>)
                        ) || 
                        (<img className="ann-img-preview" alt="" src={URL.createObjectURL(file)}/>)
                    )}
                </div>
            </div>

            <hr/>

            <div className="ann-image">
                <input
                    type="file"
                    id="ann-file"
                    style={{display: "none"}}
                    onChange={(e) => {
                        setPage(1);
                        setFile(e.target.files[0]);
                    }}
                />

                <label htmlFor="ann-file">
                    <div className="ann-file">
                        <img src={Image} alt="" id="img-landscape"/>
                        <span>Upload File</span>
                    </div>
                    <button onClick={(e) => {
                        setFile(null)
                    }}>Cancel</button>
                </label>
            </div>

            <div className="submit-ann">
                <button onClick={handlePost}>Post</button>
            </div>
        </div>  
    );
}

export default CreateAnnouncement;