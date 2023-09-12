import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dorenv from 'dotenv';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8000;

app.use(cors);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adityaroot',
    database: 'EduPulse'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to the MySQL database');
});

app.use('/', require('./routes/authRoutes'));

// Login
app.get('/login', async (req, res) =>{
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Login failed' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const user = results[0];
            // Compare the hashed password with the provided password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Create a JWT token for authentication
                const token = jwt.sign({ id: user.id, username: user.username }, 'LoginUserIdAndPassword', {
                    expiresIn: '24h', // You can adjust the expiration time
                });

                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        }
    });
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Login failed' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const user = results[0];
            // Compare the hashed password with the provided password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Create a JWT token for authentication
                const token = jwt.sign({ id: user.id, username: user.username }, 'LoginUserIdAndPassword', {
                    expiresIn: '24h', // You can adjust the expiration time
                });

                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Serrver is running on port ${port}`);
});


