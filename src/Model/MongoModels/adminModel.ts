import * as argon2 from "argon2";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    login: String,
    hash: String
});


adminSchema.methods.setPassword = async function(password: string) {

    this.hash = await argon2.hash(password);

};


adminSchema.methods.isPasswordValid = async function(password: string) {

    const isValid = await argon2.verify(this.hash, password);

    return isValid;
};

export default mongoose.model("Admin", adminSchema);
