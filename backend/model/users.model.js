import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlengthe: 3
    }
});

const User = mongoose.model("User", userschema);
export default User;