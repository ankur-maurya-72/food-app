import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    completed:{
        type:Boolean,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // require: true
    }
})

export default mongoose.model('todo', todoSchema)