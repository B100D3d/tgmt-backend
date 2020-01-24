import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    img: String,
    text: String,
    url: String
});

export default mongoose.model("Resource", resourceSchema);

