import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";

const app = express.Router();
app.use(cookieParser());

const upload = multer();

const uploadMultiple = upload.fields([
    {name : "userWebsite"},
    {name : "instagram"},
    {name : "email"},
    {name : "twitter"}
])

app.patch("/", uploadMultiple, async (req, res) => {
  try {
    if(req.cookies.JWT){
        const user = jwt.verify(req.cookies.JWT, "MeetOswal");
    await User.updateOne(
      { _id: user._id },
      {
        $set :{
            socialMedia : {
                userWebsite : req.body.userWebsite,
                email : req.body.email,
                instagram : req.body.instagram,
                twitter : req.body.twitter
            }
        }
      }
    );

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
