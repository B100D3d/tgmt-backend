import mongoose from "mongoose";
import { SubjectModel } from "../../types";


const subjectSchema = new mongoose.Schema({
    name: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
});

export default mongoose.model<SubjectModel>("Subject", subjectSchema);
