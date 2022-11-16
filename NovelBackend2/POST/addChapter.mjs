import express from "express";
import UploadToIPFS from "./ChapterUpload.mjs";
import multer from "multer";

const app = express.Router();
var filename = '';
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

app.post("/", upload.single("image"), async(req, res) => {
   try {
    const url = UploadToIPFS(filename);
    return res.status(200).send({data : url});
   } catch (error) {
    return res.status(400).send({data : error.message});
   }
})

export default app;