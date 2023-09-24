import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { dirname } from "path";
import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
const port = 4000;
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
const secret = "drhftvgjbhjtstzdfhxcgjh";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adityaroot',
    database: 'edupulse_2',
    multipleStatements: true
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
    console.log('Connected to the MySQL database');
});


// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);

    const sql = "SELECT * FROM users Where user_id = ? and password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, result) => {
        // console.log(result);
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
            const userType = result[0].usertype;
            // console.log(username, userType);
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
            return res.json({ Status: "Error", Error: ".     Wrong Credentials" });
        }
    });
});

app.post("/admin/:id/register", async (req, res) => {
    const sql = "INSERT INTO users (user_id, password, usertype) VALUES ?";

    var values = [[req.body.username, req.body.password, req.body.userType]];

    console.log(values);

    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Error in Storing" });
        return res.json({ Status: "Success" });
    });
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
    const {user_id, userType} = {...req.body};
    // console.log(req.body);

    // to send classes
    const q1 = 
        "SELECT t.class_id, t.subject_name, c.class_name FROM teaches t JOIN classes c ON c.class_id = t.class_id WHERE t.teacher_id = ? ";

    // send class teacher flag
    const q2 = 
        "SELECT t.class_teacher_flag, c.class_name from teachers t \
            JOIN classes c ON c.class_id = t.class_teacher_flag \
            WHERE t.teacher_id = ?";

    const sql = q1+';'+q2+';';
    
    db.query(sql, [req.body.user_id, req.body.user_id], (err, result) => {
        // console.log(result);

        if (err) return res.json({ Error: err });
        if (result.length > 0) {
            // console.log(result.length);
            return res.json({Status: "Success", data: result});
        } else {
            return res.json({ Status: "Error", Error: "No Details"});
        }
    });

});


// POSTing to updateMarks
// API to send students who belong to that class
app.post("/teacher/getStudentDataMark", (req, res) => {
    // const { user_id, userType, class_id, subject_name } = {...req.body};
    console.log(req.body);
    // to get marks
    const q1 = "SELECT m.student_id, s.class_id, s.first_name, s.last_name, m.MST1, m.MST2, \
        m.half_yearly, m.MST3, m.MST4, m.annual, m.percent, m.grade, m.remark FROM marks m \
        JOIN students s ON s.student_id = m.student_id \
        WHERE s.class_id = ? AND m.subject_name = ?; ";
    
    db.query(q1, [req.body[0], req.body.subject_name], (err, result) => {
        // console.log(result);

        if(err) return res.json({Error: err});
        if(result.length > 0){
            // console.log(result.length);
            return res.json({Status: "Success", data: result});
        } else {
            console.log(result, "error");
            return res.json({Status: "Error", Error: "No Details"});
        }
    });
});

// POSTing to updateMarks
// API to send students who belong to that class
app.post("/teacher/getStudentDataAttendance", (req, res) => {
    // const { user_id, userType, class_id, subject_name } = {...req.body};
    console.log(req.body);
    // to get marks
    // const q1 = "SELECT m.student_id, s.class_id, s.first_name, s.last_name, m.MST1, m.MST2, \
    //     m.half_yearly, m.MST3, m.MST4, m.annual, m.percent, m.grade, m.remark FROM marks m \
    //     JOIN students s ON s.student_id = m.student_id \
    //     WHERE s.class_id = ? AND m.subject_name = ?; ";

    const q1 = 
        "SELECT a.student_id, a.date, a.flag FROM attendance a \
            WHERE (SELECT class_id FROM students WHERE student_id = a.student_id) = '?' \
            AND date LIKE ? OR date LIKE ? OR LIKE ?;"

    db.query(q1, [req.body[0], req.body.subject_name], (err, result) => {
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




// POSTing to viewMarks
// API to send marks of student
app.post("/student/getMarks", (req, res) => {
    const q1 = "SELECT * FROM marks WHERE student_id = ?;";

    db.query(q1, [req.body.user_id], (err, result) => {
        if(err)                 return res.json({Error: err});
        if(result.length > 0)   return res.json({Status: "Success", data: result});
        else                    return res.json({Status: "Error", Error: "No Details"});
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


