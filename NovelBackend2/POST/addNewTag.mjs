import TAG from "../databaseSchema/TagsCollection.mjs";
import express  from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();
const upload = multer();

app.use(cookieParser());

app.post("/", upload.single("tagName"), async(req, res) => {
    
    try {
    const ADMIN = "636cd7ae70c8d1ed85d760b3";

    const token = req.cookies.JWT;
    const user = jwt.verify(token, "MeetOswal");    

    if(ADMIN === user._id){
        await new TAG({
            tag : req.body.tagName 
        }).save();
        const response = {
            status : "success",
            response : `${req.body.tagName} saved`
        }
    
        return res.status(200).send(response);
    }
   } catch (error) {
   }
})

export default app;