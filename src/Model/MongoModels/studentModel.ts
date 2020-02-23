import mongoose from "mongoose";
import { StudentModel } from "../../types";


const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    grades: [{type: mongoose.Schema.Types.ObjectId, ref: "Grades"}], // оценки по месяцам
    absences: [{type: mongoose.Schema.Types.ObjectId, ref: "Absence"}],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
});

export default mongoose.model<StudentModel>("Student", studentSchema);
