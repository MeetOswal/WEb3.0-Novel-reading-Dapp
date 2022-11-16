import NOVEL from "../databaseSchema/NovelCollection.mjs";
import User from "../databaseSchema/UserCollection.mjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import express from "express";
const app = express.Router();
const upload = multer();

app.use(cookieParser());
app.patch("/:novelid", upload.single("price"), async(req, res)=> {

    try {
        console.log(req.params.novelid);
        if(req.cookies.JWT){
            const verifyUser = jwt.verify(req.cookies.JWT, "MeetOswal");
            const novelCreator  = await NOVEL.findOne({_id : req.params.novelid});
            const user = await User.findOne({_id : verifyUser._id});
           
            if(user.username === novelCreator.novelCreator){
                        await NOVEL.updateOne({_id : req.params.novelid},{
                            $set : {
                                chapterPrice : req.body.price
                            }
                        })
        
                const response = {
                    status : "Success",
                    data : "save success"
                }
        
                return res.status(200).send(response);
            }else{
                const response = {
                    status : "Failure",
                    data : "fail to success"
                }
                return res.status(200).send(response); 
            }
        }else{
            const response = {
                status : "Failure",
                data : "fail to success"
            }
            return res.status(200).send(response);
        }
    
        } catch (error) {
            const response = {
                status : "Failure",
                data :error.message
            }
    
            return res.status(400).send(response);
        }    
});

export default app;