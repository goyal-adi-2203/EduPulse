import express from "express";
import mysql from 'mysql2';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app=express();

app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000/'}));
app.use(cookieParser())

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Aditya@bajpai',
    database:'EduPulse'
});
db.connect((err)=>{
    if(err) console.log("Error")
    else console.log("Databse connected")
});

app.post("/login",(req,res)=>{
    const sql = 'SELECT * from login where username=?';
    db.query(sql,[req.body.username],(err,data)=>{
        if(err) return res.json({Error:"Error in retrieval"});
        if(data.length>0){
            if(req.body.password===data[0].password)
            {  
                    return res.json({Status:"Success"})
            } 

            // bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                //     if(err) return res.json({Error: "Password compare error"});
                //if(response){
                    //return res.json({Status:"Success"})
                // }
           // })
        }
        else{
            return res.json({Error:"No Email Exists"});
        }
    });
})
app.listen(4000,()=>{
    console.log("Server Running")
})
