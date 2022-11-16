import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    genre : {
        type : String,
        unique : true
    }
})

tagSchema.index({tag : "text"});

const GENRE = new mongoose.model("GENRE", genreSchema);

export default GENRE;