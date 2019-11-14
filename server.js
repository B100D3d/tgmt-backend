
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/apiRouter';
import checkToken from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));
//app.use('/api', checkToken)
app.use('/api', apiRouter);

app.get((res, req) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

