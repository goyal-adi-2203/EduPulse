import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dorenv from 'dotenv';
import { dirname } from "path";
import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8000;
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EduPulse'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to the MySQL database');
});




// Login
 app.post('/login', async (req, res) =>{
     const sql = "SELECT * FROM users Where username = ? and password = ?";
     db.query(sql,[req.body.username, req.body.password],(err,result) =>{
        if(err) return res.json({Error: "Error in Server"});
        if(result.length > 0){
            return res.json({Status: "Success"})
        }
        else{
            return res.json({Status: "Error",Error: ".      Wrong Credentials"})
        }
     })
 })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


