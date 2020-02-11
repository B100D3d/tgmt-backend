import mongoose from "mongoose";
import { TeacherModel } from "../../types";

const teacherSchema = new mongoose.Schema({
    name: String,
    groups: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Group",
        default: []
    }
});

export default mongoose.model<TeacherModel>("Teacher", teacherSchema);
