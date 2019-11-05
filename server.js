
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import weekRouter from './routes/week.js';
import checkToken from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT;

//app.use('/api', checkToken)
app.use(express.static(path.join(__dirname, 'tgmt')));
app.use('/api', weekRouter);

app.get((res, req) => {
    res.sendFile(path.join(__dirname, 'tgmt/index.html'));
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

