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

  const sql = "SELECT * FROM users Where username = ? and password = ?";
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
      return res.json({ Status: "Error", Error: ".     Wrong Credentials" });
    }
  });
});

app.post("/admin/:id/register", async (req, res) => {
  const sql = "INSERT INTO users (username, password, usertype) VALUES ?";

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
    "Select count(username) as admin from users where usertype = 'Admin'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});
app.get("/teacherCount", (req, res) => {
  const sql =
    "Select count(username) as teacher from users where usertype = 'Teacher'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/studentCount", (req, res) => {
  const sql =
    "SELECT COUNT(username) AS student FROM users WHERE usertype = 'Student'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
