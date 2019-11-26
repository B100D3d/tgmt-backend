import mongoose from 'mongoose';


const resourceSchema = new mongoose.Schema({
    img: String,
    text: String,
    url: String
});

const resourceModel = mongoose.model('Resource', resourceSchema);

export default resourceModel;