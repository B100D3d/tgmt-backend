
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import https from "https";
import path from "path";
import checkToken from "./middleware/auth";
import db from "./Model/mongodb";
import apiRouter from "./routes/apiRouter";

dotenv.config();

const sslDir = "../../../../etc/ssl/";

const app = express();
const port = process.env.PORT;

app.use(cors());
// app.use('/api', checkToken)
app.use("/api", apiRouter);

https.createServer({
    cert: fs.readFileSync(path.join(sslDir, "tgmt.crt")),
    key: fs.readFileSync(path.join(sslDir, "tgmt.key"))
}, app).listen(port, () => {
    console.log(`Server is running on port ${port}`);

    db.on("error", err => {
        console.log(`Mongodb connection has error: ${err}`);
    });
});
