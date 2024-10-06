import express from 'express';
import Connection from './db.js';
import dotenv from 'dotenv';
import { Router } from './route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',Router);
const PORT = 8000;
app.listen(PORT,() => console.log(`server is running on PORT ${PORT}`));
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));