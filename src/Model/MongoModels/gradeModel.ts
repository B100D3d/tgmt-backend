import mongoose from "mongoose";


const gradeSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    date: Date,
    grade: Number
});

export default mongoose.model("Grade", gradeSchema);
