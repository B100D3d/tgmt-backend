
import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './Model/mongodb';
import apiRouter from './routes/apiRouter';
import checkToken from './middleware/auth';

dotenv.config();

const rootDir = '../../../../etc/ssl/';

const app = express();
const port = process.env.PORT;

app.use(cors());
//app.use('/api', checkToken)
app.use('/api', apiRouter);


https.createServer({
    key: fs.readFileSync(path.join(rootDir, 'tgmt.key')),
    cert: fs.readFileSync(path.join(rootDir, 'tgmt.crt'))

}, app).listen(port, () => {
    console.log(`Server is running on port ${port}`);

    db.on('error', err => {
        console.log(`Mongodb connection has error: ${err}`);
    });
})

