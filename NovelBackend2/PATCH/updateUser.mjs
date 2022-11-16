import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();

const upload = multer();

app.use(cookieParser());

const uploadMultiple = upload.fields([
    {name : "username"},
    {name : "description"},
])

app.patch("/", uploadMultiple, async(req, res) => {

    try {
        token = jwt.verify(req.cookies.JWT, "MeetOswal");

    if(req.body.username){
        await User.updateOne({_id : token._id},{
            $set : {
                username : req.body.username
            }
        })
    }
    if(req.body.description){
        await User.updateOne({_id : token._id},{
            $set : {
                userDescription : req.body.description
            }
        })
    }

    const response = {
        status: "success",
        data: "success",
      };
      return res.status(200).send(response);
    } catch (error) {
        const response = {
            status: "failure",
            data: "failure",
          };
          return res.status(400).send(response);
    }
})

export default app;