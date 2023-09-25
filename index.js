import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = 4000;
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
const secret = "drhftvgjbhjtstzdfhxcgjh";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aditya@bajpai",
  database: "EduPulse",
  multipleStatements: "true",
});

function verifyToken(req, res, next) {
  const token = req.cookies.token; // Get the token from the cookie

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // You can access the user information from the decoded JWT payload
    const { username, userType } = decoded;

    // Add user information to the request object for later use
    req.user = { username, userType };

    // Continue with the next middleware or route handler
    next();
  });
}

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users Where user_id = ? and password = ?";
  db.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) return res.json({ Error: "Error in Server" });
    if (result.length > 0) {
      const userType = result[0].usertype;
      jwt.sign(
        { username, password, userType },
        secret,
        { expiresIn: "2h" },
        (err, token) => {
          if (err) throw err;
          return res.cookie("token", token).json({
            username,
            userType,
            token,
            Status: "Success",
          });
        }
      );
    } else {
      return res.json({ Status: "Error", Error: ".      Wrong Credentials" });
    }
  });
});

app.post("/admin/:id/register", async (req, res) => {
  if (req.body.userType === "Teacher") {
    const {
      username,
      password,
      userType,
      First_name,
      Last_name,
      class1,
      class2,
      class3,
      subject1,
      subject2,
      subject3,
      class_teacher,
      mobile,
      flatno,
      colony,
      district,
      state,
      email,
      gender,
    } = req.body;
    const sql =
      "INSERT INTO users (user_id, password, usertype) VALUES ?; INSERT INTO teachers (teacher_id, first_name, last_name, email, phone_no, flat_no, gender, colony, district, state, class_teacher_flag) VALUES ?; INSERT INTO teaches (teacher_id,class_id,subject_name) VALUES ?;";
    var values1 = [[username, password, userType]];
    var values2 = [
      [
        username,
        First_name,
        Last_name,
        email,
        mobile,
        flatno,
        gender,
        colony,
        district,
        state,
        class_teacher,
      ],
    ];
    var values3 = [[username, class1, subject1]];
    if (class2 === undefined && class3 === undefined) {
      values3 = [[username, class1, subject1]];
    } else if (class3 === undefined) {
      values3 = [
        [username, class1, subject1],
        [username, class2, subject2],
      ];
    } else {
      values3 = [
        [username, class1, subject1],
        [username, class2, subject2],
        [username, class3, subject3],
      ];
    }
    // console.log(class2);
    // console.log(values1);
    // console.log(values2);

    db.query(sql, [values1, values2, values3], (err, result) => {
      if (err) return res.json({ Error: "Error in Storing", err });
      return res.json({ Status: "Success", result });
    });
  } else if (req.body.userType === "Student") {
    const {
      username,
      password,
      userType,
      First_name,
      Last_name,
      student_class,
      mobile,
      flatno,
      colony,
      district,
      state,
      email,
      gender,
      Father_name,
      Mother_name,
    } = req.body;

    const sql =
      "INSERT INTO users (user_id, password, usertype) VALUES ?; INSERT INTO students (student_id, first_name, last_name, flat_no, colony, district, class_id, state, gender) VALUES ?; INSERT INTO parents (student_id, Father_name, Mother_name, phone_no, email_id) VALUES ?; SELECT subject_name from subjects where class_id= ?";
    var values1 = [[username, password, userType]];
    var values2 = [
      [
        username,
        First_name,
        Last_name,
        flatno,
        colony,
        district,
        student_class,
        state,
        gender,
      ],
    ];
    var data = [];
    var values3 = [[username, Father_name, Mother_name, mobile, email]];
    const sql2 =
      "INSERT INTO marks (student_id, class_id, subject_name) VALUES ?";
    db.query(sql, [values1, values2, values3, student_class], (err, result) => {
      if (err) return res.json({ Error: "Error in Storing", err });
      const sub1 = result[3][0].subject_name;
      const sub2 = result[3][1].subject_name;
      const sub3 = result[3][2].subject_name;
      const sub4 = result[3][3].subject_name;
      const sub5 = result[3][4].subject_name;
      var values4 = [
        [username, student_class, sub1],
        [username, student_class, sub2],
        [username, student_class, sub3],
        [username, student_class, sub4],
        [username, student_class, sub5],
      ];
      db.query(sql2, [values4], (err2, result2) => {
        if (err2) console.log(err2);
      });

      return res.json({ Status: "Success", result });
    });
  }
});

// app.get("/teacher/dashboard/:id", verifyToken, async (req, res) => {
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;
//   try {
//     const token = req.header(tokenHeaderKey);
//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) {
//       console.log("HELIIIIIIIIII");
//       return res.send("Successfully Verified");
//     } else {
//       return res.status(401).send(error);
//     }
//   } catch (error) {
//     return res.status(401).send(error);
//   }
// });

app.get("/adminCount", (req, res) => {
  const sql =
    "Select count(user_id) as admin from users where usertype = 'Admin'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});
app.get("/teacherCount", (req, res) => {
  const sql =
    "Select count(user_id) as teacher from users where usertype = 'Teacher'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/studentCount", (req, res) => {
  const sql =
    "SELECT COUNT(user_id) AS student FROM users WHERE usertype = 'Student'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
