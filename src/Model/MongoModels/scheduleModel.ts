import mongoose from "mongoose";
import { ScheduleModel } from "../../types";


const scheduleSchema = new mongoose.Schema({
    classNumber: Number,
    weekday: Number,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
});

export default mongoose.model<ScheduleModel>("Schedule", scheduleSchema);
