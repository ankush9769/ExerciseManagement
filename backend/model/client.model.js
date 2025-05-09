import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: {type:String,required:true},
    password:{type:String,required:true},
});
const Clients = mongoose.model( "Clients", ClientSchema );
export default Clients
