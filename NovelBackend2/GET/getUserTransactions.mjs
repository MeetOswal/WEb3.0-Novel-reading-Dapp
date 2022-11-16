import User from "../databaseSchema/UserCollection.mjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import express from "express";

const app = express.Router();


app.use(cookieParser());

app.get("/", async (req, res) => {
  try {
    if (req.cookies.JWT) {
      const verifyUser = jwt.verify(req.cookies.JWT, "MeetOswal");

      const userTransactions = User.findone({_id : verifyUser._id}).select({transactions : 1, _id : 0});

      const response = {
        status : "success",
        data : userTransactions
      }

      return res.status(200).send(response);
    }else{
        const response = {
            status : "failure",
            data : "not Logined"
          }
    
          return res.status(200).send(response);
    }
}catch(error){
    const response = {
        status : "failure",
        data : error.message
      }

      return res.status(400).send(response)
}  
});

export default app;