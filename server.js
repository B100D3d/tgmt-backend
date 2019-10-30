
import express from 'express';
import dotenv from 'dotenv';
import weekRouter from './routes/week.js';
import checkToken from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT;

//app.use('/api', checkToken)
app.use('/api', weekRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

