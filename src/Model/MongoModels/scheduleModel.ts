import mongoose, { mongo } from "mongoose";


const scheduleSchema = new mongoose.Schema({
    classNumber: Number,
    weekday: Number,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
})

export default mongoose.model("Schedule", scheduleSchema);
