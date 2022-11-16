import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../databaseSchema/UserCollection.mjs";

const app = express.Router();
const upload = multer();

app.use(cookieParser());

app.patch("/:type/:id", upload.single("tags"), async(req, res) => {

    try {

    if(req.cookies.JWT){

        const verifyUser = jwt.verify(req.cookies.JWT, "MeetOswal");
        const novelCreator  = await NOVEL.findOne({_id : req.params.id});
        const user = await User.findOne({_id : verifyUser._id});
        
        if(user.username === novelCreator.novelCreator){
            if(req.params.type === "add"){
                    await NOVEL.updateOne({_id : req.params.id},{
                        $push : {
                            tags : req.body.tags
                        }
                    })
            }else{
                    await NOVEL.updateOne({_id : req.params.id},{
                        $pull : {
                            tags : req.body.tags
                        }
                    })
            }
    
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
    
            return res.status(400).send(response); 
        }
    }

    } catch (error) {
        const response = {
            status : "Failure",
            data :error.message
        }

        return res.status(400).send(response);
    }
})

export default app;