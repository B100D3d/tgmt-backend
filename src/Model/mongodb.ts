import mongoose from "mongoose";

const servUrl = "mongodb+srv://devourer:fSociety00@tgmtdb-sf49z.mongodb.net/tgmtdb?retryWrites=true&w=majority";
const localUrl = "mongodb://localhost:27017/tgmt_db";

mongoose.connect(servUrl, { autoIndex: false, 
                            useNewUrlParser: true, 
                            useUnifiedTopology: true,
                            useFindAndModify: false });

mongoose.Promise = global.Promise;

const db = mongoose.connection;

export default db;
