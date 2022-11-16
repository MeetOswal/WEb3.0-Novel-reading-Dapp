import NOVEL from "../databaseSchema/NovelCollection.mjs";
import User from "../databaseSchema/UserCollection.mjs";
import express from "express"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";

const app = express.Router();
app.use(cookieParser());
const upload = multer();

app.patch("/:type/:novelid", upload.single("data"), async(req, res) => {

    try {
       if(req.cookies.JWT){
        const verifyUser = jwt.verify(req.cookies.JWT, "MeetOswal");
        const user = await User.findOne({_id : verifyUser._id});
    
        if(req.params.type === "add"){
            await NOVEL.updateOne({_id : req.params.novelid},{
                $push : {
                    comments : {
                        by : user.username,
                        data : req.body.data,
                    }
                }
            })
        }else{
            await NOVEL.updateOne({_id : req.params.novelid},{
                $pull : {
                    comments : {
                        by : user.username,
                        data : req.body.data,
                    }
                }
            })
        }

        const response = {
            statu : "Success",
            data : "SUccess"
        }

        return res.status(200).send(response);
       }else{
        const response = {
            statu : "Failure",
            data : "login required"
        }

        return res.status(200).send(response);
       }
    } catch (error) {
        const response = {
            statu : "Failure",
            data : error.message
        }

        return res.status(400).send(response);
    }
});

export default app;