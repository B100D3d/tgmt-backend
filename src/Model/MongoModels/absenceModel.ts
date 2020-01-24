import mongoose from "mongoose";


const absenceSchema = new mongoose.Schema({
    classNumber: Number,
    date: Date,
    absence: Boolean
})

export default mongoose.model("Absence", absenceSchema);
