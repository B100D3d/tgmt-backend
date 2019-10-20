
import express from 'express';
import weekRouter from './routes/week.js';

const app = express();
const port = 3001;

app.use('/api', weekRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
