import mongoose from "mongoose";
import { GradesModel } from "../../types";


const gradesSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    date: Date,
    grades: [Number]
});

export default mongoose.model<GradesModel>("Grades", gradesSchema);
