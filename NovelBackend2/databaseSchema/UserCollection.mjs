import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        unique : true
    },
    userDescription : String,
    walletAddress : {
        type : String,
        unique : true
    },
    socialMedia : {
        userWebsite : String,
        email : String,
        instagram : String,
        twitter : String
    },
    userImage : String,
    stars : [{
        novel : String,
        stars : Number
    }],
    bookmarks : Array,
    transactions :[{
        novleName : String,
        chapterNumber : String,
        price : String
    }],
    following : Array,
    followers : Number,
    lastLogined : Number,
    visitedToday : Array,
    subscribed : [
        {
            novelName : String,
            chapter : {
                type : Number,
                default : 0
            }
        }
    ]
})

userSchema.index({username : "text"});

userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id : this._id}, "MeetOswal");
        return token;
    }catch(error){
        return("incorrect value");
    }
}

const User = new mongoose.model("user", userSchema);

export default User;