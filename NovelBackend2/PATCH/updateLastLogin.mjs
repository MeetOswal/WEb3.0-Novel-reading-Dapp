import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();
app.use(cookieParser());

app.patch("/", async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.JWT, "MeetOswal");
    let x = new Date();
    x = x.getDate();
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogined: x,
        },
      }
    );

    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default app;
