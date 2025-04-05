import mongoose from "mongoose";

const exerciseschema = new mongoose.Schema({
    username: {type: String,required: true},
    description:{type:String,required:true},
    duration:{type:Number,require:true},
    date:{type:Date,require:true}
});

const Exercise = mongoose.model("Exercise", exerciseschema);
export default Exercise;