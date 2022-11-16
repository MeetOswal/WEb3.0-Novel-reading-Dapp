import express from "express";
import User from "../databaseSchema/UserCollection.mjs";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";


const app = express.Router();

app.use(cookieParser());//---

app.patch("/:id", async (req, res) => {
  try {

    if(!(req.cookies.JWT)){
      const response = {
        status: "Failure",
        data: "User Not Found"
      }
      return res.status(200).send(response)
    }

    const verifyUser = jwt.verify(req.cookies.JWT,"MeetOswal")

    const allreadyFollowed = await User.findOne({
      _id: verifyUser._id,
      following: req.params.id,
    });

    if(!allreadyFollowed) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $inc: {
            followers: 1,
          },
        }
      );

      await User.updateOne(
        { _id: verifyUser._id },
        {
          $push: {
            following: req.params.id,
          },
        }
      );
      const response = {
        status: "Success",
        data: "Followed"
      }

      return res.status(200).send(response);
    }else {
      await User.updateOne(
        { _id: req.params.id },
        {
          $inc: {
            followers: -1,
          },
        }
      );

      await User.updateOne(
        { _id: verifyUser._id},
        {
          $pull: {
            following: req.params.id,
          },
        }
      );

      const response = {
        status: "Success",
        data: "data updated"
      }

      return res.status(200).send(response);
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default app;