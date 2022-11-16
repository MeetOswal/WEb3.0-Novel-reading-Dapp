import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag : {
        type : String,
        unique : true
    }
})

tagSchema.index({tag : "text"});

const TAG = new mongoose.model("TAG", tagSchema);

export default TAG;