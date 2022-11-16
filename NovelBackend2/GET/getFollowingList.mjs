import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();

app.use(cookieParser());

app.get("/", async(req, res) => {

    try {
        if(req.cookies.JWT){

            const token = jwt.verify(req.cookies.JWT, "MeetOswal");
            const user = User.findOne({ _id : token._id});
            const following = user.following;
            let artists = [];
    
            for(const obj of following){
                let writter = await User.findOne({_id : obj}).select({username : 1, userImage : 1});
                artists.push(writter);
            }
    
            const response = {
                status : "success",
                data : artists
            }
            return res.status(200).send(response);
        }else{
            const response = {
                status : "success",
                data : "Not Logined"
            }
    
            return res.status(200).send(response)
        }
    } catch (error) {
        const response = {
            status : "failure",
            data : error.message
        }

        return res.status(400).send(response);
    }
})

export default app;