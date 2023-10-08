/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import "./AnnPopUp.css";
import { Page, Document } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { pdfjs } from "react-pdf";

function AnnPopUp(props) {
  // JWT token
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userid = decodedToken.username;
  var userType = decodedToken.userType;

  // announcements
  const {
    ann_id,
    user_id,
    usertype,
    first_name,
    last_name,
    class_id,
    subject_name,
    date,
    title,
    content,
    imgurl,
  } = props.data;
  const key = props.id;
  var extension = imgurl ? imgurl.substring(imgurl.lastIndexOf(".") + 1) : "";

  const [page, setPage] = useState(1);
  // console.log(key, "key");

  const MyDocument = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    return (
      <Document file={"/uploads/" + imgurl} className="pdf-preview">
        <Page
          pageNumber={page}
          width={250}
          onClick={(e) => {
            setPage(page + 1);
          }}
          onLoadError={(error) => {
            alert(`No pages! Redirecting to first`);
            setPage(1);
          }}
        />
      </Document>
    );
  };

  const MyComp = () => {
    if (subject_name && class_id)
      return (
        <div>
          <div>{class_id}</div>
          <div>{subject_name}</div>
        </div>
      );

    return <></>;
  };

  return (
    <div id={key} className="ann-popup">
      <div className="ann-popup-content">
        <h1>{title}</h1>
        <hr />

        <MyComp />

        <hr />
        {content}
        <hr />
        <div className="top-right-in-pop-up">{date}</div>

        {imgurl &&
          (((extension === "pdf" || extension === "PDF") && <MyDocument />) || (
            <img
              className="ann-img-preview"
              alt=""
              src={"/uploads/" + imgurl}
              width={300}
            />
          ))}

        {imgurl && (
          <button>
            <a href={"/uploads/" + imgurl} download={imgurl}>
              Download File
            </a>
          </button>
        )}

        <button
          onClick={(e) => {
            document.getElementById(key).classList.remove("show");
          }}
          className="box-close"
        >
          x
        </button>

        <div>
          <button
            onClick={(e) => {
              document.getElementById(key).classList.remove("show");
            }}
            className="close-pop-up"
          >
            Close Pop Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnnPopUp;
