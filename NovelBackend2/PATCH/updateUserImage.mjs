import User from "../databaseSchema/UserCollection.mjs";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import UploadToIPFS from "./userImageUpload.mjs";

const app = express.Router();
var filename = "";

app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../userImage/");
    },
  
    filename: (req, file, cb) => {
      console.log(file);
      var fileExtension = file.originalname.split(".");
      let x = Math.floor(Math.random() * 1000 + 1);
      filename = `${x}--${fileExtension[0]}`;
      cb(null, `${filename}.${fileExtension[1]}`);
    },
  });


const upload = multer({ storage: storage });

app.patch("/", upload.single("image"), async(req, res) => {

    try {
        const token = jwt.verify(req.cookies.JWT, "MeetOswal");

    let url = await UploadToIPFS(filename, token._id);
    await User.updateOne({_id : token._id},{
        $set : {
            userImage : url
        }
    })

    return res.status(200).send({status : "success"});
    } catch (error) {
        return res.status(400).send({status : error.message});
    }
})

export default app;
