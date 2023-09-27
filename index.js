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
      return res.status(200).json({ Status: "Success", result });
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
      if (err) return res.status(500).json({ Error: "Error in Storing", err });
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

      return res.status(200).json({ Status: "Success", result });
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

// POSTing to SidePanel
// API to sent classes for a teacher and
// to send classTeacher flag for the teacher
app.post("/teacher/getClasses", (req, res) => {
  const { user_id, userType } = { ...req.body };
  // console.log(req.body);

  // to send classes
  const q1 =
    "SELECT t.class_id, t.subject_name, c.class_name FROM teaches t JOIN classes c ON c.class_id = t.class_id WHERE t.teacher_id = ? ";

  // send class teacher flag
  const q2 =
    "SELECT t.class_teacher_flag, c.class_name from teachers t \
            JOIN classes c ON c.class_id = t.class_teacher_flag \
            WHERE t.teacher_id = ?";

  const sql = q1 + ";" + q2 + ";";

  db.query(sql, [req.body.user_id, req.body.user_id], (err, result) => {
    // console.log(result);

    if (err) return res.json({ Error: err });
    if (result.length > 0) {
      // console.log(result.length);
      return res.json({ Status: "Success", data: result });
    } else {
      return res.json({ Status: "Error", Error: "No Details" });
    }
  });
});

// POSTing to updateMarks
// API to send students who belong to that class
app.post("/teacher/getStudentDataMark", (req, res) => {
  // const { user_id, userType, class_id, subject_name } = {...req.body};
  console.log(req.body);
  // to get marks
  const q1 =
    "SELECT m.student_id, s.class_id, s.first_name, s.last_name, m.MST1, m.MST2, \
        m.half_yearly, m.MST3, m.MST4, m.annual, m.percent, m.grade, m.remark FROM marks m \
        JOIN students s ON s.student_id = m.student_id \
        WHERE s.class_id = ? AND m.subject_name = ?; ";

  db.query(q1, [req.body.class_id, req.body.subject_name], (err, result) => {
    // console.log(result);

    if (err) return res.json({ Error: err });
    if (result.length > 0) {
      console.log(result);
      return res.json({ Status: "Success", data: result });
    } else {
      console.log(result, "error");
      return res.json({ Status: "Error", Error: "No Details" });
    }
  });
});

// POSTing to updateMarks
// API to update Marks
app.post("/teacher/studentUpdateMarks", (req, res) => {
  // console.log(req.body.studentData);

  const studentData = req.body.studentData;
  const subject_name = req.body.subject_name.subject_name;
  const class_id = req.body.subject_name.class_id;
  // console.log(studentData.subject_name);
  // console.log(req.body.subject_name);
  var sql = "";

  studentData.forEach((element) => {
    const q1 =
      "UPDATE marks SET MST1=" +
      (element.MST1 || 0) +
      ", MST2=" +
      (element.MST2 || 0) +
      ", MST3=" +
      (element.MST3 || 0) +
      ", MST4=" +
      (element.MST4 || 0) +
      ", half_yearly=" +
      (element.half_yearly || 0) +
      ", annual=" +
      (element.annual || 0) +
      ", percent=" +
      (element.percent || 0) +
      ", grade='" +
      (element.grade || "'C'") +
      "', remark='" +
      (element.remark || "'PASS'") +
      "' WHERE student_id ='" +
      element.student_id +
      "' AND subject_name='" +
      subject_name +
      "';";

    // console.log(q1,"\n");
    sql += q1;
  });

  // console.log(sql);

  db.query(sql, (err, result) => {
    // console.log(result);

    if (err) return res.json({ Error: err });
    return res.json({ Status: "Success", data: result });
  });
});

// student_id VARCHAR(10) NOT NULL,
//     class_id INT NOT NULL,
//         subject_name VARCHAR(50) NOT NULL,
//             MST1 char(5) DEFAULT '',
//                 MST2 char(5) DEFAULT '',
//                     half_yearly char(5) DEFAULT '',
//                         MST3 char(5) DEFAULT '',
//                             MST4 char(5) DEFAULT '',
//                                 annual char(5) DEFAULT '',
//                                     percent char(5) DEFAULT '',
//                                         grade char(5) DEFAULT 'C',
//                                             remark char(10) DEFAULT 'PASS'

// POSTing to updateMarks
// API to send students who belong to that class
app.post("/teacher/getAttendanceData", (req, res) => {
  // const { user_id, userType, class_id, subject_name } = {...req.body};
  console.log(req.body, "nope");

  const q1 =
    "SELECT a.student_id, a.date, a.flag FROM attendance a \
            WHERE (SELECT class_id FROM students WHERE student_id = a.student_id) = '?' \
            AND date LIKE ? OR date LIKE ? OR LIKE ?;";

  db.query(q1, [req.body.student_id, req.body.subject_name], (err, result) => {
    // console.log(result);

    if (err) return res.json({ Error: err });
    if (result.length > 0) {
      // console.log(result.length);
      return res.json({ Status: "Success", data: result });
    } else {
      console.log(result, "error");
      return res.json({ Status: "Error", Error: "No Details" });
    }
  });
});

app.post("/teacher/getStudentDataAttendance", (req, res) => {
  console.log(req.body);
  const q1 =
    "SELECT student_id, first_name, last_name, tot_atten_percent FROM students\
            WHERE class_id = ?;";

  db.query(q1, [req.body.class_id], (err, result) => {
    if (err) return res.json({ Error: err });
    if (result.length > 0) {
      return res.json({ Status: "Success", data: result });
    } else {
      console.log(result, "error");
      return res.json({ Status: "Error", Error: "No Details" });
    }
  });
});

// POSTing to viewMarks
// API to send marks of student
app.post("/student/getMarks", (req, res) => {
  const q1 = "SELECT * FROM marks WHERE student_id = ?;";
  console.log(req.body.user_id);
  db.query(q1, [req.body.user_id], (err, result) => {
    if (err) return res.json({ Error: err });
    if (result.length > 0) return res.json({ Status: "Success", data: result });
    else return res.json({ Status: "Error", Error: "No Details" });
  });
});

app.post("/getData", (req, res) => {
  const user_id = req.body.user_id;
  const userType = req.body.userType;

  if (userType === "Student") {
    db.query(
      "SELECT * FROM students s JOIN parents p ON p.student_id = s.student_id WHERE s.student_id = ?;",
      [user_id],
      (err, result) => {
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
          console.log(result);
          return res.json({ Status: "Success", data: result });
        } else {
          return res.json({ Status: "Error", Error: "No Details" });
        }
      }
    );
  } else if (userType === "Admin") {
    db.query(
      "SELECT * FROM admin WHERE admin_id = ?;",
      [user_id],
      (err, result) => {
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
          console.log(result);
          return res.json({ Status: "Success", data: result });
        } else {
          return res.json({ Status: "Error", Error: "No Details" });
        }
      }
    );
  } else if (userType === "Teacher") {
    db.query(
      "SELECT * FROM teachers WHERE teacher_id = ?;",
      [user_id],
      (err, result) => {
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
          console.log(result);
          return res.json({ Status: "Success", data: result });
        } else {
          return res.json({ Status: "Error", Error: "No Details" });
        }
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
