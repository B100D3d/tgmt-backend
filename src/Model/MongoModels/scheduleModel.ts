import mongoose from "mongoose";
import { ScheduleModule } from "../../types";


const scheduleSchema = new mongoose.Schema({
    classNumber: Number,
    weekday: Number,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
});

export default mongoose.model<ScheduleModule>("Schedule", scheduleSchema);
