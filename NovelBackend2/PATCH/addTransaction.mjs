import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";

const app = express.Router();
app.use(cookieParser());

const upload = multer();

const uploadMultiple = upload.fields([
    {name : "novel"},//novelName
    {name : "chapter"},
    {name : "price"}
])

app.patch("/", async (req, res) => {
  try {
    if(req.cookies.JWT){
        const user = jwt.verify(req.cookies.JWT, "MeetOswal");

        await User.updateOne({
            _id : user._id
        },{
            $push : {
                transactions : {
                    novleName : req.body.novel,
                    chapter : req.body.chapter,
                    price : req.body.price
                },
            }
        })

        if(req.body.chapter === 1){
            await User.updateOne({
                _id : user._id
            },{
                $push : {
                    subscribed : {
                        novleName : req.body.novel,
                        chapter : req.body.chapter,
                    },
                }
            })
        }else{
            await User.updateOne({_id : user._id},{
                $set : {
                    "subscribed.$[addressFilter].chapter" : req.body.chapter,
                }
            },{
                "arrayFilters": [
                    {
                        "subscribed.novelName" : req.body.novel
                    }
                ],"multi":true

            })
        }
    
    const response = {
        status : "Success",
        data : "success"
    }

    return res.status(200).send(response);
    }
  } catch (error) {
    const response = {
        status : "Failure",
        data : error.message
    }

    return res.status(400).send(response);
  }
});

export default app;